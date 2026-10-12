import { clearParentsCache } from './parentsService';
import { clearDriversCache } from './driversService';
import { clearVehiclesCache } from './vehiclesService';
import { clearStudentsCache } from './studentsService';
import { clearRoutesCache } from './routesService';
import { clearCredentialsCache } from './appCredentialsService';

/**
 * Clears all in-memory caches across all services.
 * Useful on logout or when switching schools/sessions.
 */
export const clearAllCaches = () => {
  if (typeof clearParentsCache === 'function') clearParentsCache();
  if (typeof clearDriversCache === 'function') clearDriversCache();
  if (typeof clearVehiclesCache === 'function') clearVehiclesCache();
  if (typeof clearStudentsCache === 'function') clearStudentsCache();
  if (typeof clearRoutesCache === 'function') clearRoutesCache();
  if (typeof clearCredentialsCache === 'function') clearCredentialsCache();
};
