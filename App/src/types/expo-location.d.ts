declare module 'expo-location' {
  export enum Accuracy {
    Lowest = 1,
    Low = 2,
    Balanced = 3,
    High = 4,
    Highest = 5,
    BestForNavigation = 6,
  }

  export interface LocationPermissionResponse {
    status: 'granted' | 'denied' | 'undetermined';
    expires: 'never' | number;
    granted: boolean;
    canAskAgain: boolean;
  }

  export interface LocationObjectCoords {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  }

  export interface LocationObject {
    coords: LocationObjectCoords;
    timestamp: number;
  }

  export interface LocationSubscription {
    remove: () => void;
  }

  export function requestForegroundPermissionsAsync(): Promise<LocationPermissionResponse>;
  export function getForegroundPermissionsAsync(): Promise<LocationPermissionResponse>;
  export function getCurrentPositionAsync(options?: {
    accuracy?: Accuracy;
    maximumAge?: number;
    timeout?: number;
  }): Promise<LocationObject>;
  export function watchPositionAsync(
    options: {
      accuracy?: Accuracy;
      timeInterval?: number;
      distanceInterval?: number;
    },
    callback: (location: LocationObject) => void
  ): Promise<LocationSubscription>;
}
