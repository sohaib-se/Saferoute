import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { Alert } from 'react-native';
import { useAuth } from './AuthContext';

export type RosterShiftPhase =
  | 'idle' // Not started yet (Start Roster button visible)
  | 'morning_pickup' // Morning: Picking up students from home -> converting to Drop School
  | 'at_school' // Reached school: All picked students dropped at school
  | 'afternoon_return' // Afternoon: "Pick All" boarded from school -> dropping home one by one
  | 'completed'; // Daily route completed

export type TransitMilestone =
  | 'waiting_home' // Waiting at home (morning)
  | 'picked_home' // Picked up from home (onboard van)
  | 'dropped_school' // Dropped off at school
  | 'picked_school' // Picked up from school (onboard return)
  | 'dropped_home' // Dropped off at home
  | 'absent'; // Absent today

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
  adminNotice?: string; // REQ-D2.3: Admin-side absence notice
}

export interface GPSBroadcastState {
  isBroadcasting: boolean;
  latitude: number;
  longitude: number;
  speedKmh: number;
  lastPingTime: string;
  queuedPings: number; // REQ-D4.3: Unsent pings queued locally
  isOnline: boolean;
  frequencySeconds: number; // REQ-D4.1: 5-10 seconds
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
  // Scoped vehicle & route (REQ-D1.3)
  vehicleName: string;
  vehiclePlate: string;
  routeTitle: string;

  // Active Trip State (REQ-D3, REQ-D6)
  isTripActive: boolean;
  tripStartTime: Date | null;
  tripElapsedTime: string;
  tripId: string | null;
  startTrip: () => boolean;
  endTrip: (force?: boolean) => { success: boolean; unmarkedCount: number };
  lastCompletedTrip: TripArchiveRecord | null;
  clearLastCompletedTrip: () => void;

  // New Roster Shift Workflow
  rosterPhase: RosterShiftPhase;
  startRoster: () => void;
  pickUpStudent: (studentId: string) => { success: boolean; message: string };
  dropStudentAtSchool: (studentId: string) => { success: boolean; message: string };
  dropAllAtSchool: () => { count: number; message: string };
  pickAllFromSchool: () => { count: number; message: string };
  dropStudentAtHome: (studentId: string) => { success: boolean; message: string };
  resetRosterDay: () => void;

  // Student Roster & Attendance (REQ-D2, REQ-D5)
  students: StudentRosterItem[];
  markAttendance: (
    studentId: string,
    status: 'Picked up' | 'Dropped off' | 'Absent'
  ) => { success: boolean; message: string; parentPhone: string; parentName: string };

  // Live Location Broadcast (REQ-D4)
  gpsState: GPSBroadcastState;
  toggleConnectivitySimulation: () => void;

  // In-App Call Control (REQ-D7.2)
  activeCall: ActiveCallState | null;
  startInAppCall: (parentName: string, studentName: string, phone: string) => void;
  endInAppCall: () => void;
  toggleMuteCall: () => void;
  toggleSpeakerCall: () => void;

  // Admin Roster Changes (REQ-D2.3)
  adminNoticeCount: number;

  // First Login Password Change (REQ-D1.2)
  mustChangePassword: boolean;
  completePasswordChange: (newPass: string) => void;

  // Trip Notification Alerts
  tripNotifications: TripNotificationItem[];
  markNotificationsAsRead: () => void;
}

const DriverTripContext = createContext<DriverTripContextType | undefined>(undefined);

// Initial mock roster ordered by stop sequence (REQ-D2)
const INITIAL_ROSTER: StudentRosterItem[] = [
  {
    id: 'st-1',
    stopNumber: 1,
    name: 'Sohaib Khan',
    grade: 'Grade 5 - Sec A',
    stopAddress: 'Khatme Nabuwat Chowk, Ghari Rashida',
    pickupTime: '07:15 AM',
    status: 'Waiting',
    milestone: 'waiting_home',
    parentName: 'Muhammad Khan',
    parentPhone: '03001234567',
    avatarInitials: 'SK',
  },
  {
    id: 'st-2',
    stopNumber: 2,
    name: 'Hamza Ali',
    grade: 'Grade 7 - Sec B',
    stopAddress: 'Main Ring Road, Gate 2',
    pickupTime: '07:25 AM',
    status: 'Waiting',
    milestone: 'waiting_home',
    parentName: 'Ali Raza',
    parentPhone: '0312412412',
    avatarInitials: 'HA',
  },
  {
    id: 'st-3',
    stopNumber: 3,
    name: 'Ayesha Malik',
    grade: 'Grade 4 - Sec C',
    stopAddress: 'Street 4, Sector G-10/2',
    pickupTime: '07:35 AM',
    status: 'Waiting',
    milestone: 'waiting_home',
    parentName: 'Zeeshan Malik',
    parentPhone: '03339876543',
    avatarInitials: 'AM',
  },
  {
    id: 'st-4',
    stopNumber: 4,
    name: 'Zainab Fatima',
    grade: 'Grade 6 - Sec A',
    stopAddress: 'Gulberg Greens, Block B',
    pickupTime: '07:45 AM',
    status: 'Absent',
    milestone: 'absent',
    parentName: 'Tariq Mehmood',
    parentPhone: '03215554433',
    avatarInitials: 'ZF',
    adminNotice: 'Absent (Admin Notice: Parent submitted sick leave at 06:40 AM)',
  },
  {
    id: 'st-5',
    stopNumber: 5,
    name: 'Bilal Ahmed',
    grade: 'Grade 8 - Sec C',
    stopAddress: 'I-8 Markaz, Near Clock Tower',
    pickupTime: '07:55 AM',
    status: 'Waiting',
    milestone: 'waiting_home',
    parentName: 'Ahmed Raza',
    parentPhone: '03007778899',
    avatarInitials: 'BA',
  },
];

export const DriverTripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  // Scoped vehicle & route (REQ-D1.3)
  const vehicleName = user?.profile?.assignedVan || 'Bus 1';
  const vehiclePlate = user?.profile?.plateNumber || 'ICT-4921';
  const routeTitle = 'Morning Route - Sector G-10';

  // Trip state
  const [isTripActive, setIsTripActive] = useState<boolean>(false);
  const [tripStartTime, setTripStartTime] = useState<Date | null>(null);
  const [tripDurationSeconds, setTripDurationSeconds] = useState<number>(0);
  const [tripId, setTripId] = useState<string | null>(null);
  const [lastCompletedTrip, setLastCompletedTrip] = useState<TripArchiveRecord | null>(null);

  // Roster Shift Phase
  const [rosterPhase, setRosterPhase] = useState<RosterShiftPhase>('idle');

  // Roster state
  const [students, setStudents] = useState<StudentRosterItem[]>(INITIAL_ROSTER);

  // GPS state (REQ-D4)
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

  // Calling state (REQ-D7.2)
  const [activeCall, setActiveCall] = useState<ActiveCallState | null>(null);

  // First Login Password state (REQ-D1.2)
  const [mustChangePassword, setMustChangePassword] = useState<boolean>(false);

  // Notifications
  const [tripNotifications, setTripNotifications] = useState<TripNotificationItem[]>([
    {
      id: 'tn-1',
      title: 'Admin Roster Update',
      body: 'School Fleet Admin marked Zainab Fatima as Absent for today due to reported sick leave.',
      time: '06:45 AM • Today',
      type: 'admin_notice',
      isRead: false,
    },
    {
      id: 'tn-2',
      title: 'Assigned Vehicle Ready',
      body: 'Bus 1 (ICT-4921) telemetry check OK. Route: Sector G-10 Morning Shift.',
      time: '06:30 AM • Today',
      type: 'trip_start',
      isRead: false,
    },
  ]);

  // 1. Elapsed Time Timer while trip active
  useEffect(() => {
    let timer: any;
    if (isTripActive) {
      timer = setInterval(() => {
        setTripDurationSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTripActive]);

  // 2. Continuous GPS Location Broadcast sampling (REQ-D4.1, REQ-D4.2, REQ-D4.3, REQ-D4.4)
  useEffect(() => {
    let gpsInterval: any;

    if (isTripActive) {
      gpsInterval = setInterval(() => {
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
          return {
            ...prev,
            isBroadcasting: true,
            latitude: prev.latitude + (Math.random() - 0.48) * 0.0006,
            longitude: prev.longitude + (Math.random() - 0.48) * 0.0006,
            speedKmh: Math.floor(28 + Math.random() * 15),
            lastPingTime: wasQueued ? `${now} (Flushed ${prev.queuedPings} pings)` : now,
            queuedPings: 0,
          };
        });
      }, 5000);
    } else {
      setGpsState((prev) => ({
        ...prev,
        isBroadcasting: false,
        speedKmh: 0,
        lastPingTime: 'Broadcast Inactive',
        queuedPings: 0,
      }));
    }

    return () => clearInterval(gpsInterval);
  }, [isTripActive]);

  // 3. In-App Call Timer
  useEffect(() => {
    let callTimer: any;
    if (activeCall) {
      callTimer = setInterval(() => {
        setActiveCall((prev) => prev ? { ...prev, durationSeconds: prev.durationSeconds + 1 } : null);
      }, 1000);
    }
    return () => clearInterval(callTimer);
  }, [activeCall]);

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

  // REQ-D3: Trip Start
  const startTrip = (): boolean => {
    if (isTripActive) {
      return true;
    }

    const now = new Date();
    const newTripId = `TRP-${Date.now().toString().slice(-4)}`;
    setIsTripActive(true);
    setTripStartTime(now);
    setTripDurationSeconds(0);
    setTripId(newTripId);

    setGpsState((prev) => ({
      ...prev,
      isBroadcasting: true,
      lastPingTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));

    const startNotification: TripNotificationItem = {
      id: `tn-${Date.now()}`,
      title: 'Trip Started & Broadcast Live',
      body: `Parents of assigned students have been notified that ${vehicleName} has departed on ${routeTitle}.`,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'trip_start',
      isRead: false,
    };
    setTripNotifications((prev) => [startNotification, ...prev]);

    if (rosterPhase === 'idle') {
      setRosterPhase('morning_pickup');
    }

    return true;
  };

  // Start Roster
  const startRoster = () => {
    startTrip();
    setRosterPhase('morning_pickup');
  };

  // 1. Pick Up Student from Home (Morning)
  const pickUpStudent = (studentId: string): { success: boolean; message: string } => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let studentName = '';
    let parentName = '';

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          studentName = s.name;
          parentName = s.parentName;
          return {
            ...s,
            milestone: 'picked_home',
            status: 'Picked up',
            pickedUpAt: timeNow,
            markedBy: user?.name || 'Driver Hilal',
          };
        }
        return s;
      })
    );

    const logNotice: TripNotificationItem = {
      id: `tn-${Date.now()}`,
      title: `Picked Up: ${studentName}`,
      body: `Direct notification delivered strictly to ${parentName}: "${studentName} safely boarded ${vehicleName} at ${timeNow}."`,
      time: timeNow,
      type: 'attendance',
      isRead: false,
    };
    setTripNotifications((prev) => [logNotice, ...prev]);

    return {
      success: true,
      message: `${studentName} marked as Picked Up at ${timeNow}. Parent notified.`,
    };
  };

  // 2. Drop Single Student at School (Morning)
  const dropStudentAtSchool = (studentId: string): { success: boolean; message: string } => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let studentName = '';
    let parentName = '';
    let allFinished = false;

    setStudents((prev) => {
      const updated = prev.map((s) => {
        if (s.id === studentId) {
          studentName = s.name;
          parentName = s.parentName;
          return {
            ...s,
            milestone: 'dropped_school' as TransitMilestone,
            status: 'Dropped off' as const,
            droppedOffAt: timeNow,
          };
        }
        return s;
      });

      // Check if any students are still waiting or onboard
      const remainingMorning = updated.filter(
        (s) => s.milestone === 'waiting_home' || s.milestone === 'picked_home'
      );
      if (remainingMorning.length === 0) {
        allFinished = true;
      }
      return updated;
    });

    if (allFinished) {
      setRosterPhase('at_school');
      setIsTripActive(false);
      setGpsState((prev) => ({
        ...prev,
        isBroadcasting: false,
        speedKmh: 0,
        lastPingTime: `School Arrival Complete (${timeNow}) • Live Tracking Closed`,
      }));
    }

    const logNotice: TripNotificationItem = {
      id: `tn-${Date.now()}`,
      title: `Dropped at School: ${studentName}`,
      body: `Notification delivered to ${parentName}: "${studentName} safely arrived at school gate at ${timeNow}."`,
      time: timeNow,
      type: 'attendance',
      isRead: false,
    };
    setTripNotifications((prev) => [logNotice, ...prev]);

    return {
      success: true,
      message: `${studentName} dropped at School at ${timeNow}. Parent notified.`,
    };
  };

  // 3. Drop All Picked Students at School (Morning)
  const dropAllAtSchool = (): { count: number; message: string } => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let count = 0;

    setStudents((prev) =>
      prev.map((s) => {
        if (s.milestone === 'picked_home') {
          count += 1;
          return {
            ...s,
            milestone: 'dropped_school',
            status: 'Dropped off',
            droppedOffAt: timeNow,
          };
        }
        return s;
      })
    );

    // School arrival complete: Close live tracking trip until afternoon return
    setRosterPhase('at_school');
    setIsTripActive(false);
    setGpsState((prev) => ({
      ...prev,
      isBroadcasting: false,
      speedKmh: 0,
      lastPingTime: `School Arrival Complete (${timeNow}) • Live Tracking Closed`,
    }));

    const logNotice: TripNotificationItem = {
      id: `tn-${Date.now()}`,
      title: `Drop All Completed (${count} students)`,
      body: `All ${count} onboard students safely arrived and dropped at school at ${timeNow}. Live tracking paused until afternoon return. Parents notified.`,
      time: timeNow,
      type: 'attendance',
      isRead: false,
    };
    setTripNotifications((prev) => [logNotice, ...prev]);

    return {
      count,
      message: `All ${count} students have been dropped at school! Morning live tracking closed.`,
    };
  };

  // 4. Pick All Students from School for Afternoon Return Trip
  const pickAllFromSchool = (): { count: number; message: string } => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let count = 0;

    // Pick all students who were dropped at school in the morning
    setStudents((prev) =>
      prev.map((s) => {
        if (s.milestone === 'dropped_school') {
          count += 1;
          return {
            ...s,
            milestone: 'picked_school',
            status: 'Picked up',
            afternoonPickedAt: timeNow,
          };
        }
        return s;
      })
    );

    // Boarded from school: Start live location sharing for return trip!
    setIsTripActive(true);
    setTripStartTime(new Date());
    setTripDurationSeconds(0);
    setGpsState((prev) => ({
      ...prev,
      isBroadcasting: true,
      lastPingTime: `${timeNow} • Return Route Live`,
    }));

    setRosterPhase('afternoon_return');

    const logNotice: TripNotificationItem = {
      id: `tn-${Date.now()}`,
      title: `Afternoon Return Started: ${count} Students Boarded`,
      body: `${count} students boarded ${vehicleName} at school for the home drop-off trip at ${timeNow}. Live location broadcasting active. Parents notified.`,
      time: timeNow,
      type: 'trip_start',
      isRead: false,
    };
    setTripNotifications((prev) => [logNotice, ...prev]);

    return {
      count,
      message: `${count} students boarded for afternoon return! Live location sharing is now active until the last child is dropped home.`,
    };
  };

  // 5. Drop Single Student at Home (Afternoon)
  const dropStudentAtHome = (studentId: string): { success: boolean; message: string } => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let studentName = '';
    let parentName = '';
    let allCompleted = false;

    setStudents((prev) => {
      const updated = prev.map((s) => {
        if (s.id === studentId) {
          studentName = s.name;
          parentName = s.parentName;
          return {
            ...s,
            milestone: 'dropped_home' as TransitMilestone,
            status: 'Dropped off' as const,
            afternoonDroppedAt: timeNow,
          };
        }
        return s;
      });

      // Check if all attending students are dropped home
      const remainingHomeDrops = updated.filter((s) => s.milestone === 'picked_school');
      if (remainingHomeDrops.length === 0) {
        allCompleted = true;
      }
      return updated;
    });

    if (allCompleted) {
      // Last student dropped at home safely: Close live tracking!
      setRosterPhase('completed');
      setIsTripActive(false);
      setGpsState((prev) => ({
        ...prev,
        isBroadcasting: false,
        speedKmh: 0,
        lastPingTime: `All Students Dropped Home (${timeNow}) • Live Tracking Closed`,
      }));
    }

    const logNotice: TripNotificationItem = {
      id: `tn-${Date.now()}`,
      title: `Safely Dropped at Home: ${studentName}`,
      body: `Direct notification delivered to ${parentName}: "${studentName} arrived safely at home stop at ${timeNow}."`,
      time: timeNow,
      type: 'attendance',
      isRead: false,
    };
    setTripNotifications((prev) => [logNotice, ...prev]);

    return {
      success: true,
      message: `${studentName} safely dropped at home at ${timeNow}. Parent notified.`,
    };
  };

  // Reset entire day
  const resetRosterDay = () => {
    setStudents(INITIAL_ROSTER);
    setRosterPhase('idle');
    setIsTripActive(false);
    setTripStartTime(null);
    setTripDurationSeconds(0);
  };

  // Legacy markAttendance adapter
  const markAttendance = (
    studentId: string,
    newStatus: 'Picked up' | 'Dropped off' | 'Absent'
  ): { success: boolean; message: string; parentPhone: string; parentName: string } => {
    const student = students.find((s) => s.id === studentId);
    if (!student) {
      return { success: false, message: 'Student not found.', parentPhone: '', parentName: '' };
    }

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (newStatus === 'Picked up') {
      if (rosterPhase === 'afternoon_return' || student.milestone === 'dropped_school') {
        setStudents((prev) =>
          prev.map((s) => (s.id === studentId ? { ...s, milestone: 'picked_school', status: 'Picked up' } : s))
        );
      } else {
        pickUpStudent(studentId);
      }
    } else if (newStatus === 'Dropped off') {
      if (rosterPhase === 'afternoon_return' || student.milestone === 'picked_school') {
        dropStudentAtHome(studentId);
      } else {
        dropStudentAtSchool(studentId);
      }
    } else if (newStatus === 'Absent') {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === studentId
            ? { ...s, milestone: 'absent', status: 'Absent', adminNotice: 'Marked absent by driver' }
            : s
        )
      );
    }

    return {
      success: true,
      message: `${student.name} marked as ${newStatus} at ${timeNow}.`,
      parentPhone: student.parentPhone,
      parentName: student.parentName,
    };
  };

  // End Trip
  const endTrip = (force: boolean = false): { success: boolean; unmarkedCount: number } => {
    const waitingStudents = students.filter(
      (s) => s.milestone === 'waiting_home' || s.milestone === 'picked_home' || s.milestone === 'picked_school'
    );

    if (waitingStudents.length > 0 && !force) {
      return { success: false, unmarkedCount: waitingStudents.length };
    }

    const now = new Date();
    const durationMins = Math.max(1, Math.round(tripDurationSeconds / 60));

    const archiveRecord: TripArchiveRecord = {
      tripId: tripId || `TRP-COMPLETED`,
      vehicleName: `${vehicleName} (${vehiclePlate})`,
      routeTitle,
      startTime: tripStartTime ? tripStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '07:15 AM',
      endTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationMinutes: durationMins,
      totalStudents: students.length,
      pickedCount: students.filter((s) => s.status === 'Picked up').length,
      droppedCount: students.filter((s) => s.status === 'Dropped off').length,
      absentCount: students.filter((s) => s.status === 'Absent').length,
      sampledPointsCount: Math.max(12, Math.floor(tripDurationSeconds / 5)),
    };

    setLastCompletedTrip(archiveRecord);
    setIsTripActive(false);
    setTripStartTime(null);
    setTripDurationSeconds(0);
    setTripId(null);
    setRosterPhase('completed');

    setGpsState((prev) => ({
      ...prev,
      isBroadcasting: false,
      speedKmh: 0,
      lastPingTime: 'Broadcast Ended',
    }));

    return { success: true, unmarkedCount: 0 };
  };

  const clearLastCompletedTrip = () => {
    setLastCompletedTrip(null);
  };

  const toggleConnectivitySimulation = () => {
    setGpsState((prev) => {
      const nextOnline = !prev.isOnline;
      if (!nextOnline) {
        Alert.alert(
          'Simulated Connectivity Loss',
          'GPS pings are now being queued locally. Pings will automatically flush to the server upon reconnection.'
        );
      } else {
        Alert.alert(
          'Reconnected to SafeRoute Realtime',
          `Flushed ${prev.queuedPings} queued pings to vehicle channel. Real-time broadcast resumed.`
        );
      }
      return {
        ...prev,
        isOnline: nextOnline,
      };
    });
  };

  const startInAppCall = (parentName: string, studentName: string, phone: string) => {
    setActiveCall({
      parentName,
      studentName,
      phone,
      durationSeconds: 0,
      isMuted: false,
      isSpeaker: true,
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
    Alert.alert(
      'Password Updated',
      'Your administrative credential has been securely updated. You can now use your new password for all subsequent logins.'
    );
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
        isTripActive,
        tripStartTime,
        tripElapsedTime: formatElapsedTime(tripDurationSeconds),
        tripId,
        startTrip,
        endTrip,
        lastCompletedTrip,
        clearLastCompletedTrip,
        rosterPhase,
        startRoster,
        pickUpStudent,
        dropStudentAtSchool,
        dropAllAtSchool,
        pickAllFromSchool,
        dropStudentAtHome,
        resetRosterDay,
        students,
        markAttendance,
        gpsState,
        toggleConnectivitySimulation,
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
