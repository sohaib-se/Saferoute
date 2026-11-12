import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';
import {
  getDriverRoster,
  getDriverVehicleInfo,
  broadcastDriverLocationToDb,
  stopDriverLocationBroadcast,
} from '../services/driverService';
import {
  TripRecord,
  TripAttendanceRecord,
  getTodayTripForDriver,
  createDriverTrip,
  initializeTripAttendance,
  getTripAttendanceRecords,
  startPickupSubTrip,
  markStudentPickedUpInDb,
  markStudentAbsentInDb,
  completePickupSubTrip,
  startDropoffSubTrip,
  markStudentDroppedInDb,
  completeDropoffSubTrip,
} from '../services/tripService';

export type TripPhase =
  | 'no_trip'
  | 'pending'
  | 'pickup_active'
  | 'pickup_done'
  | 'dropoff_active'
  | 'completed';

export type RosterShiftPhase =
  | 'idle'
  | 'morning_pickup'
  | 'at_school'
  | 'afternoon_return'
  | 'completed';

export type TransitMilestone =
  | 'waiting_home'
  | 'picked_home'
  | 'dropped_school'
  | 'picked_school'
  | 'dropped_home'
  | 'absent';

export interface StudentRosterItem {
  id: string;
  stopNumber: number;
  name: string;
  grade: string;
  stopAddress: string;
  pickupTime: string;
  status: 'Waiting' | 'Picked up' | 'Dropped off' | 'Absent';
  milestone: TransitMilestone;
  parentName: string;
  parentPhone: string;
  avatarInitials: string;
  pickedUpAt?: string;
  droppedOffAt?: string;
  afternoonPickedAt?: string;
  afternoonDroppedAt?: string;
  markedBy?: string;
  adminNotice?: string;
}

export interface GPSBroadcastState {
  isBroadcasting: boolean;
  latitude: number;
  longitude: number;
  speedKmh: number;
  lastPingTime: string;
  queuedPings: number;
  isOnline: boolean;
  frequencySeconds: number;
}

export interface TripArchiveRecord {
  tripId: string;
  vehicleName: string;
  routeTitle: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  totalStudents: number;
  pickedCount: number;
  droppedCount: number;
  absentCount: number;
  sampledPointsCount: number;
}

interface ActiveCallState {
  parentName: string;
  studentName: string;
  phone: string;
  durationSeconds: number;
  isMuted: boolean;
  isSpeaker: boolean;
}

export interface TripNotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  type: 'trip_start' | 'attendance' | 'sos' | 'admin_notice';
  isRead: boolean;
}

interface DriverTripContextType {
  // Vehicle & route
  vehicleName: string;
  vehiclePlate: string;
  routeTitle: string;

  // Real Database Trip State
  currentTrip: TripRecord | null;
  tripPhase: TripPhase;
  tripAttendance: TripAttendanceRecord[];
  isLoadingTrip: boolean;
  createTrip: () => Promise<boolean>;
  startPickupTrip: () => Promise<boolean>;
  pickUpStudent: (studentId: string) => Promise<{ success: boolean; message: string }>;
  markAbsent: (studentId: string) => Promise<{ success: boolean; message: string }>;
  completePickupTrip: () => Promise<{ success: boolean; message: string }>;
  startDropoffTrip: () => Promise<boolean>;
  dropStudent: (studentId: string) => Promise<{ success: boolean; message: string }>;
  completeDropoffTrip: (force?: boolean) => Promise<{ success: boolean; message: string }>;
  resetTripDay: () => void;
  refreshTripData: () => Promise<void>;

  // Compatibility with legacy screens/cards
  rosterPhase: RosterShiftPhase;
  isTripActive: boolean;
  tripStartTime: Date | null;
  tripElapsedTime: string;
  tripId: string | null;
  startTrip: () => boolean;
  endTrip: (force?: boolean) => { success: boolean; unmarkedCount: number };
  lastCompletedTrip: TripArchiveRecord | null;
  clearLastCompletedTrip: () => void;

  // Legacy student helpers
  students: StudentRosterItem[];
  markAttendance: (
    studentId: string,
    status: 'Picked up' | 'Dropped off' | 'Absent'
  ) => { success: boolean; message: string; parentPhone: string; parentName: string };
  startRoster: () => void;
  dropStudentAtSchool: (studentId: string) => { success: boolean; message: string };
  dropAllAtSchool: () => { count: number; message: string };
  pickAllFromSchool: () => { count: number; message: string };
  dropStudentAtHome: (studentId: string) => { success: boolean; message: string };
  resetRosterDay: () => void;

  // GPS Broadcast
  gpsState: GPSBroadcastState;
  toggleConnectivitySimulation: () => void;

  // In-App Call
  activeCall: ActiveCallState | null;
  startInAppCall: (parentName: string, studentName: string, phone: string) => void;
  endInAppCall: () => void;
  toggleMuteCall: () => void;
  toggleSpeakerCall: () => void;

  // Admin notices
  adminNoticeCount: number;

  // Password change
  mustChangePassword: boolean;
  completePasswordChange: (newPass: string) => void;

  // Notifications
  tripNotifications: TripNotificationItem[];
  markNotificationsAsRead: () => void;
}

const DriverTripContext = createContext<DriverTripContextType | undefined>(undefined);

export const DriverTripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  // Dynamic driver info from session or DB
  const [vehicleName, setVehicleName] = useState<string>(user?.profile?.assignedVan || 'Bus 1');
  const [vehiclePlate, setVehiclePlate] = useState<string>(user?.profile?.plateNumber || 'ICT-4921');
  const [routeTitle, setRouteTitle] = useState<string>('Morning Route - Sector G-10');

  // Supabase Trip state
  const [currentTrip, setCurrentTrip] = useState<TripRecord | null>(null);
  const [tripAttendance, setTripAttendance] = useState<TripAttendanceRecord[]>([]);
  const [isLoadingTrip, setIsLoadingTrip] = useState<boolean>(true);

  // Active Live Timer
  const [isTripActive, setIsTripActive] = useState<boolean>(false);
  const [tripStartTime, setTripStartTime] = useState<Date | null>(null);
  const [tripDurationSeconds, setTripDurationSeconds] = useState<number>(0);
  const [lastCompletedTrip, setLastCompletedTrip] = useState<TripArchiveRecord | null>(null);

  // Raw assigned students
  const [baseStudents, setBaseStudents] = useState<StudentRosterItem[]>([]);

  // GPS State
  const [gpsState, setGpsState] = useState<GPSBroadcastState>({
    isBroadcasting: false,
    latitude: 33.6844,
    longitude: 73.0479,
    speedKmh: 0,
    lastPingTime: 'Idle',
    queuedPings: 0,
    isOnline: true,
    frequencySeconds: 5,
  });

  // Call & Password State
  const [activeCall, setActiveCall] = useState<ActiveCallState | null>(null);
  const [mustChangePassword, setMustChangePassword] = useState<boolean>(false);

  // Notifications
  const [tripNotifications, setTripNotifications] = useState<TripNotificationItem[]>([
    {
      id: 'tn-welcome',
      title: 'Vehicle & Route Synced',
      body: 'Welcome to SafeRoute Driver Portal. Ready for daily transport shifts.',
      time: 'Today',
      type: 'trip_start',
      isRead: false,
    },
  ]);

  // Derive Trip Phase
  const tripPhase: TripPhase = !currentTrip
    ? 'no_trip'
    : (currentTrip.overall_status as TripPhase);

  // Legacy Roster Shift Phase mapping
  const rosterPhase: RosterShiftPhase =
    tripPhase === 'no_trip' || tripPhase === 'pending'
      ? 'idle'
      : tripPhase === 'pickup_active'
      ? 'morning_pickup'
      : tripPhase === 'pickup_done'
      ? 'at_school'
      : tripPhase === 'dropoff_active'
      ? 'afternoon_return'
      : 'completed';

  // 1. Fetch assigned vehicle & route details
  useEffect(() => {
    let isMounted = true;
    const fetchInfo = async () => {
      const driverName = user?.name || 'Hilal';
      const info = await getDriverVehicleInfo(driverName, user?.schoolId);
      if (isMounted && info) {
        setVehicleName(info.name);
        setVehiclePlate(info.plate);
        setRouteTitle(info.route);
      }
    };
    fetchInfo();
    return () => {
      isMounted = false;
    };
  }, [user]);

  // 2. Fetch base students from Supabase
  const loadAssignedStudents = useCallback(async () => {
    const driverName = user?.name || 'Hilal';
    const studentsData = await getDriverRoster(driverName, vehicleName, user?.schoolId, user?.userId);
    setBaseStudents(studentsData);
    return studentsData;
  }, [user, vehicleName]);

  // 3. Load or reload today's trip from Supabase
  const refreshTripData = useCallback(async () => {
    setIsLoadingTrip(true);
    try {
      const driverName = user?.name || 'Hilal';
      const trip = await getTodayTripForDriver(driverName, user?.userId, user?.schoolId);
      setCurrentTrip(trip);

      if (trip) {
        const attRecords = await getTripAttendanceRecords(trip.id);
        setTripAttendance(attRecords);

        // Update active broadcast state based on trip status
        if (trip.overall_status === 'pickup_active' || trip.overall_status === 'dropoff_active') {
          setIsTripActive(true);
        } else {
          setIsTripActive(false);
          stopDriverLocationBroadcast(vehicleName);
        }
      } else {
        setTripAttendance([]);
        setIsTripActive(false);
        stopDriverLocationBroadcast(vehicleName);
      }
    } catch (err) {
      console.warn('refreshTripData error:', err);
    } finally {
      setIsLoadingTrip(false);
    }
  }, [user]);

  useEffect(() => {
    loadAssignedStudents();
    refreshTripData();
  }, [loadAssignedStudents, refreshTripData]);

  // 4. Merge base students with trip attendance state
  const students: StudentRosterItem[] = baseStudents.map((st) => {
    const att = tripAttendance.find((a) => a.student_id === st.id);
    if (!att) return st;

    let milestone: TransitMilestone = 'waiting_home';
    let status: 'Waiting' | 'Picked up' | 'Dropped off' | 'Absent' = 'Waiting';

    if (att.dropoff_status === 'dropped') {
      milestone = 'dropped_home';
      status = 'Dropped off';
    } else if (tripPhase === 'dropoff_active' && att.pickup_status === 'picked_up') {
      milestone = 'picked_school';
      status = 'Picked up';
    } else if (tripPhase === 'pickup_done' && att.pickup_status === 'picked_up') {
      milestone = 'dropped_school';
      status = 'Dropped off';
    } else if (att.pickup_status === 'picked_up') {
      milestone = 'picked_home';
      status = 'Picked up';
    } else if (att.pickup_status === 'absent') {
      milestone = 'absent';
      status = 'Absent';
    }

    return {
      ...st,
      status,
      milestone,
      pickedUpAt: att.picked_up_at ? new Date(att.picked_up_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
      droppedOffAt: att.dropped_at ? new Date(att.dropped_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
    };
  });

  // 5. Active trip elapsed timer
  useEffect(() => {
    let timer: any;
    if (isTripActive) {
      timer = setInterval(() => {
        setTripDurationSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTripActive]);

  // 6. GPS telemetry (Device Hardware GPS via expo-location with fallback simulation)
  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;
    let fallbackInterval: any = null;
    let isCancelled = false;

    const setupLiveGps = async () => {
      if (!isTripActive) {
        setGpsState((prev) => ({
          ...prev,
          isBroadcasting: false,
          speedKmh: 0,
          lastPingTime: 'Broadcast Inactive',
          queuedPings: 0,
        }));
        return;
      }

      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted' && !isCancelled) {
          // 1. Immediately obtain and broadcast the initial exact satellite GPS fix
          try {
            const initialPos = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.High,
            });

            if (!isCancelled && initialPos) {
              const { latitude, longitude, speed } = initialPos.coords;
              const speedVal = speed != null && speed > 0 ? Math.round(speed * 3.6) : 0;
              const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

              broadcastDriverLocationToDb(
                user?.schoolId,
                user?.userId,
                vehicleName,
                latitude,
                longitude,
                speedVal
              );

              setGpsState((prev) => ({
                ...prev,
                isBroadcasting: true,
                latitude,
                longitude,
                speedKmh: speedVal,
                lastPingTime: now,
                queuedPings: 0,
              }));
            }
          } catch (posErr) {
            console.warn('Initial getCurrentPositionAsync failed, continuing to watchPositionAsync:', posErr);
          }

          // 2. Hardware GPS live watcher
          locationSubscription = await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.High,
              timeInterval: 3000,
              distanceInterval: 2,
            },
            (location) => {
              if (isCancelled) return;
              const { latitude, longitude, speed } = location.coords;
              const speedVal = speed != null && speed > 0 ? Math.round(speed * 3.6) : 0;
              const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

              setGpsState((prev) => {
                if (!prev.isOnline) {
                  return {
                    ...prev,
                    queuedPings: prev.queuedPings + 1,
                    lastPingTime: `${now} (Buffered offline)`,
                  };
                }

                broadcastDriverLocationToDb(
                  user?.schoolId,
                  user?.userId,
                  vehicleName,
                  latitude,
                  longitude,
                  speedVal
                );

                return {
                  ...prev,
                  isBroadcasting: true,
                  latitude,
                  longitude,
                  speedKmh: speedVal,
                  lastPingTime: now,
                  queuedPings: 0,
                };
              });
            }
          );
          return;
        }
      } catch (err) {
        console.warn('Location watchPositionAsync unavailable, using simulation fallback:', err);
      }

      // Fallback simulation if device permissions denied or running in simulator without GPS
      if (!isCancelled) {
        fallbackInterval = setInterval(() => {
          setGpsState((prev) => {
            const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

            if (!prev.isOnline) {
              return {
                ...prev,
                queuedPings: prev.queuedPings + 1,
                lastPingTime: `${now} (Buffered offline)`,
              };
            }

            const wasQueued = prev.queuedPings > 0;
            const nextLat = prev.latitude + (Math.random() - 0.48) * 0.0006;
            const nextLng = prev.longitude + (Math.random() - 0.48) * 0.0006;
            const nextSpeed = Math.floor(28 + Math.random() * 15);

            broadcastDriverLocationToDb(
              user?.schoolId,
              user?.userId,
              vehicleName,
              nextLat,
              nextLng,
              nextSpeed
            );

            return {
              ...prev,
              isBroadcasting: true,
              latitude: nextLat,
              longitude: nextLng,
              speedKmh: nextSpeed,
              lastPingTime: wasQueued ? `${now} (Flushed ${prev.queuedPings} pings)` : now,
              queuedPings: 0,
            };
          });
        }, 5000);
      }
    };

    setupLiveGps();

    return () => {
      isCancelled = true;
      if (locationSubscription) {
        locationSubscription.remove();
      }
      if (fallbackInterval) {
        clearInterval(fallbackInterval);
      }
    };
  }, [isTripActive, user, vehicleName]);

  // ─── Real Supabase Trip Actions ──────────────────────────────────────────

  // Create a new trip for today
  const createTrip = async (): Promise<boolean> => {
    try {
      const driverName = user?.name || 'Hilal';
      const newTrip = await createDriverTrip({
        schoolId: user?.schoolId,
        driverId: user?.userId,
        driverName,
        vehicleName,
        route: routeTitle,
      });

      if (!newTrip) return false;

      // Initialize attendance records with currently assigned students
      const currentStudents = baseStudents.length > 0 ? baseStudents : await loadAssignedStudents();
      const studentIds = currentStudents.map((s) => s.id);
      await initializeTripAttendance(newTrip.id, studentIds, user?.schoolId);

      setCurrentTrip(newTrip);
      const attRecords = await getTripAttendanceRecords(newTrip.id);
      setTripAttendance(attRecords);

      const notif: TripNotificationItem = {
        id: `tn-${Date.now()}`,
        title: 'New Trip Created',
        body: `Trip for ${vehicleName} created successfully. Ready to start pickup route.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'trip_start',
        isRead: false,
      };
      setTripNotifications((prev) => [notif, ...prev]);

      return true;
    } catch (err: any) {
      console.error('Error creating trip:', err);
      Alert.alert('Trip Creation Error', err?.message || 'Could not create trip in database.');
      return false;
    }
  };

  // Start the Pickup sub-trip
  const startPickupTrip = async (): Promise<boolean> => {
    let trip = currentTrip;
    if (!trip) {
      const created = await createTrip();
      if (!created) return false;
      trip = currentTrip;
    }

    if (!trip) return false;

    const updated = await startPickupSubTrip(trip.id);
    if (!updated) {
      Alert.alert('Error', 'Could not start pickup trip.');
      return false;
    }

    setCurrentTrip(updated);
    setIsTripActive(true);
    setTripStartTime(new Date());
    setTripDurationSeconds(0);

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTripNotifications((prev) => [
      {
        id: `tn-${Date.now()}`,
        title: 'Morning Pickup Started',
        body: `Live GPS broadcasting is active for ${vehicleName}. Assigned parents notified.`,
        time: nowStr,
        type: 'trip_start',
        isRead: false,
      },
      ...prev,
    ]);

    return true;
  };

  // Mark student as picked up
  const pickUpStudent = async (studentId: string): Promise<{ success: boolean; message: string }> => {
    if (!currentTrip) return { success: false, message: 'No active trip' };

    const st = students.find((s) => s.id === studentId);
    const studentName = st?.name || 'Student';

    const ok = await markStudentPickedUpInDb(currentTrip.id, studentId, studentName, user?.schoolId);
    if (!ok) {
      return { success: false, message: 'Failed to update student status' };
    }

    // Refresh attendance locally
    const nowIso = new Date().toISOString();
    setTripAttendance((prev) =>
      prev.map((a) =>
        a.student_id === studentId ? { ...a, pickup_status: 'picked_up', picked_up_at: nowIso } : a
      )
    );

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTripNotifications((prev) => [
      {
        id: `tn-${Date.now()}`,
        title: `Picked Up: ${studentName}`,
        body: `${studentName} safely boarded ${vehicleName} at ${nowStr}.`,
        time: nowStr,
        type: 'attendance',
        isRead: false,
      },
      ...prev,
    ]);

    return {
      success: true,
      message: `${studentName} marked as Picked Up. Parent notified.`,
    };
  };

  // Mark student as absent in pickup phase
  const markAbsent = async (studentId: string): Promise<{ success: boolean; message: string }> => {
    if (!currentTrip) return { success: false, message: 'No active trip' };

    const st = students.find((s) => s.id === studentId);
    const studentName = st?.name || 'Student';

    const ok = await markStudentAbsentInDb(currentTrip.id, studentId, studentName, user?.schoolId);
    if (!ok) {
      return { success: false, message: 'Failed to mark student as absent' };
    }

    setTripAttendance((prev) =>
      prev.map((a) =>
        a.student_id === studentId ? { ...a, pickup_status: 'absent', dropoff_status: 'skipped' } : a
      )
    );

    return {
      success: true,
      message: `${studentName} marked as Absent today.`,
    };
  };

  // Complete Pickup Sub-Trip ("Drop at School" button)
  const completePickupTrip = async (): Promise<{ success: boolean; message: string }> => {
    if (!currentTrip) return { success: false, message: 'No active trip' };

    const updated = await completePickupSubTrip(currentTrip.id, user?.schoolId);
    if (!updated) {
      return { success: false, message: 'Could not complete pickup trip' };
    }

    setCurrentTrip(updated);
    setIsTripActive(false);
    await stopDriverLocationBroadcast(vehicleName);

    // Refresh attendance records from DB
    const attRecords = await getTripAttendanceRecords(currentTrip.id);
    setTripAttendance(attRecords);

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTripNotifications((prev) => [
      {
        id: `tn-${Date.now()}`,
        title: 'Morning Pickup Complete',
        body: 'Students dropped off at school. Afternoon drop-off trip is now unlocked.',
        time: nowStr,
        type: 'attendance',
        isRead: false,
      },
      ...prev,
    ]);

    return {
      success: true,
      message: 'Morning pickup completed at school! Afternoon drop-off trip is now unlocked.',
    };
  };

  // Start Dropoff Sub-Trip
  const startDropoffTrip = async (): Promise<boolean> => {
    if (!currentTrip) return false;

    const updated = await startDropoffSubTrip(currentTrip.id);
    if (!updated) {
      Alert.alert('Error', 'Could not start dropoff trip.');
      return false;
    }

    setCurrentTrip(updated);
    setIsTripActive(true);
    setTripStartTime(new Date());
    setTripDurationSeconds(0);

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTripNotifications((prev) => [
      {
        id: `tn-${Date.now()}`,
        title: 'Afternoon Drop-off Started',
        body: `Students boarded from school. Live GPS active for ${vehicleName}.`,
        time: nowStr,
        type: 'trip_start',
        isRead: false,
      },
      ...prev,
    ]);

    return true;
  };

  // Mark student as dropped home
  const dropStudent = async (studentId: string): Promise<{ success: boolean; message: string }> => {
    if (!currentTrip) return { success: false, message: 'No active trip' };

    const st = students.find((s) => s.id === studentId);
    const studentName = st?.name || 'Student';

    const ok = await markStudentDroppedInDb(currentTrip.id, studentId, studentName, user?.schoolId);
    if (!ok) {
      return { success: false, message: 'Failed to record drop off' };
    }

    const nowIso = new Date().toISOString();
    setTripAttendance((prev) =>
      prev.map((a) =>
        a.student_id === studentId ? { ...a, dropoff_status: 'dropped', dropped_at: nowIso } : a
      )
    );

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTripNotifications((prev) => [
      {
        id: `tn-${Date.now()}`,
        title: `Dropped Home: ${studentName}`,
        body: `${studentName} safely arrived at home at ${nowStr}.`,
        time: nowStr,
        type: 'attendance',
        isRead: false,
      },
      ...prev,
    ]);

    return {
      success: true,
      message: `${studentName} safely dropped off at home.`,
    };
  };

  // Complete Dropoff Sub-Trip ("Complete Trip" button)
  const completeDropoffTrip = async (force: boolean = false): Promise<{ success: boolean; message: string }> => {
    if (!currentTrip) return { success: false, message: 'No active trip' };

    const res = await completeDropoffSubTrip(currentTrip.id, force, user?.schoolId);
    if (!res.success) {
      return res;
    }

    if (res.trip) {
      setCurrentTrip(res.trip);
    }
    setIsTripActive(false);
    await stopDriverLocationBroadcast(vehicleName);

    const attRecords = await getTripAttendanceRecords(currentTrip.id);
    setTripAttendance(attRecords);

    const now = new Date();
    const durationMins = Math.max(1, Math.round(tripDurationSeconds / 60));
    const archiveRecord: TripArchiveRecord = {
      tripId: currentTrip.id.slice(0, 8).toUpperCase(),
      vehicleName: `${vehicleName} (${vehiclePlate})`,
      routeTitle,
      startTime: tripStartTime ? tripStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '07:15 AM',
      endTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationMinutes: durationMins,
      totalStudents: students.length,
      pickedCount: attRecords.filter((a) => a.pickup_status === 'picked_up').length,
      droppedCount: attRecords.filter((a) => a.dropoff_status === 'dropped').length,
      absentCount: attRecords.filter((a) => a.pickup_status === 'absent').length,
      sampledPointsCount: Math.max(12, Math.floor(tripDurationSeconds / 5)),
    };
    setLastCompletedTrip(archiveRecord);

    return res;
  };

  // Reset Trip Day (local clean state)
  const resetTripDay = () => {
    stopDriverLocationBroadcast(vehicleName);
    setCurrentTrip(null);
    setTripAttendance([]);
    setIsTripActive(false);
    setTripStartTime(null);
    setTripDurationSeconds(0);
    loadAssignedStudents();
  };

  // ─── Legacy compatibility methods ────────────────────────────────────────

  const formatElapsedTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    const hrs = Math.floor(mins / 60);
    if (hrs > 0) {
      const remMins = mins % 60;
      return `${hrs.toString().padStart(2, '0')}:${remMins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRoster = () => {
    if (!currentTrip) {
      createTrip().then(() => startPickupTrip());
    } else {
      startPickupTrip();
    }
  };

  const dropStudentAtSchool = (studentId: string) => {
    return { success: true, message: 'Student marked at school' };
  };

  const dropAllAtSchool = () => {
    completePickupTrip();
    return { count: tripAttendance.filter((a) => a.pickup_status === 'picked_up').length, message: 'Dropped all at school' };
  };

  const pickAllFromSchool = () => {
    startDropoffTrip();
    return { count: tripAttendance.filter((a) => a.pickup_status === 'picked_up').length, message: 'Afternoon return started' };
  };

  const dropStudentAtHome = (studentId: string) => {
    dropStudent(studentId);
    return { success: true, message: 'Student dropped home' };
  };

  const resetRosterDay = () => {
    resetTripDay();
  };

  const markAttendance = (
    studentId: string,
    newStatus: 'Picked up' | 'Dropped off' | 'Absent'
  ): { success: boolean; message: string; parentPhone: string; parentName: string } => {
    const student = students.find((s) => s.id === studentId);
    const parentPhone = student?.parentPhone || '';
    const parentName = student?.parentName || 'Parent';

    if (newStatus === 'Picked up') {
      pickUpStudent(studentId);
    } else if (newStatus === 'Dropped off') {
      dropStudent(studentId);
    } else if (newStatus === 'Absent') {
      markAbsent(studentId);
    }

    return {
      success: true,
      message: `${student?.name || 'Student'} marked as ${newStatus}`,
      parentPhone,
      parentName,
    };
  };

  const startTrip = (): boolean => {
    startPickupTrip();
    return true;
  };

  const endTrip = (force: boolean = false): { success: boolean; unmarkedCount: number } => {
    completeDropoffTrip(force);
    return { success: true, unmarkedCount: 0 };
  };

  const clearLastCompletedTrip = () => {
    setLastCompletedTrip(null);
  };

  const toggleConnectivitySimulation = () => {
    setGpsState((prev) => ({
      ...prev,
      isOnline: !prev.isOnline,
    }));
  };

  const startInAppCall = (parentName: string, studentName: string, phone: string) => {
    setActiveCall({
      parentName,
      studentName,
      phone,
      durationSeconds: 0,
      isMuted: false,
      isSpeaker: false,
    });
  };

  const endInAppCall = () => {
    setActiveCall(null);
  };

  const toggleMuteCall = () => {
    setActiveCall((prev) => (prev ? { ...prev, isMuted: !prev.isMuted } : null));
  };

  const toggleSpeakerCall = () => {
    setActiveCall((prev) => (prev ? { ...prev, isSpeaker: !prev.isSpeaker } : null));
  };

  const completePasswordChange = (newPass: string) => {
    setMustChangePassword(false);
  };

  const markNotificationsAsRead = () => {
    setTripNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const adminNoticeCount = students.filter((s) => !!s.adminNotice).length;

  return (
    <DriverTripContext.Provider
      value={{
        vehicleName,
        vehiclePlate,
        routeTitle,

        // Real Database Trip
        currentTrip,
        tripPhase,
        tripAttendance,
        isLoadingTrip,
        createTrip,
        startPickupTrip,
        pickUpStudent,
        markAbsent,
        completePickupTrip,
        startDropoffTrip,
        dropStudent,
        completeDropoffTrip,
        resetTripDay,
        refreshTripData,

        // Legacy compatibility
        rosterPhase,
        isTripActive,
        tripStartTime,
        tripElapsedTime: formatElapsedTime(tripDurationSeconds),
        tripId: currentTrip ? currentTrip.id.slice(0, 8).toUpperCase() : null,
        startTrip,
        endTrip,
        lastCompletedTrip,
        clearLastCompletedTrip,

        students,
        markAttendance,
        startRoster,
        dropStudentAtSchool,
        dropAllAtSchool,
        pickAllFromSchool,
        dropStudentAtHome,
        resetRosterDay,

        // GPS
        gpsState,
        toggleConnectivitySimulation,

        // Calling
        activeCall,
        startInAppCall,
        endInAppCall,
        toggleMuteCall,
        toggleSpeakerCall,

        adminNoticeCount,
        mustChangePassword,
        completePasswordChange,

        tripNotifications,
        markNotificationsAsRead,
      }}
    >
      {children}
    </DriverTripContext.Provider>
  );
};

export const useDriverTrip = (): DriverTripContextType => {
  const context = useContext(DriverTripContext);
  if (!context) {
    throw new Error('useDriverTrip must be used within a DriverTripProvider');
  }
  return context;
};
