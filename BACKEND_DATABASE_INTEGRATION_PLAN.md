# Multi-Tenant Backend & Database Integration Plan: SafeRoute FYP

## 1. Executive Summary & Objective

The SafeRoute School Admin portal has complete frontend interfaces for:
1. **Drivers Management** (`DriversManagment.jsx`)
2. **Vehicles Management** (`VehicleManagment.jsx`)
3. **Parents Management** (`ParentManagment.jsx`)
4. **Students Management** (`StudentManagment.jsx` & `Addstudent.jsx`)

Currently, these components display hardcoded mock data and mutate local React state in memory. The objective of this integration is to:
- Establish a production-grade PostgreSQL database schema inside **Supabase**.
- Enforce strict **multi-tenant data isolation**: each school account only reads, creates, modifies, and deletes records assigned to their unique `school_id`.
- Connect all four modules to dynamic Supabase queries with loading indicators, empty states, and error handling.
- Enable relational lookups (e.g., student forms dynamically populate vehicle and driver options from that school's registered fleet).

---

## 2. Multi-Tenant Architecture & Data Flow

```
┌────────────────────────────────────────────────────────┐
│               School Admin Authentication              │
│       (Login via /functions/v1/school-account)         │
└───────────────────────────┬────────────────────────────┘
                            │ Returns user session
                            ▼
┌────────────────────────────────────────────────────────┐
│          localStorage: user = { id: "<school_uuid>" }  │
└───────────────────────────┬────────────────────────────┘
                            │ Extracted by getCurrentSchoolId()
                            ▼
┌────────────────────────────────────────────────────────┐
│             Centralized Supabase Service Layer         │
│  (driversService, vehiclesService, parentsService...)  │
└───────────────────────────┬────────────────────────────┘
                            │ Enforces WHERE school_id = :school_id
                            ▼
┌────────────────────────────────────────────────────────┐
│                 Supabase PostgreSQL DB                 │
│  - schools   (Tenant Root)                             │
│  - drivers   (school_id FK)                            │
│  - vehicles  (school_id FK)                            │
│  - parents   (school_id FK)                            │
│  - students  (school_id FK, parent_id FK)              │
└───────────────────────────┘
```

### Security & Isolation Invariants:
1. Every query (`SELECT`) MUST filter by `.eq('school_id', currentSchoolId)`.
2. Every mutation (`INSERT`) MUST inject `{ ...data, school_id: currentSchoolId }`.
3. Every update/delete (`UPDATE`, `DELETE`) MUST condition on `.eq('id', id).eq('school_id', currentSchoolId)`.
4. No school admin can view or mutate records belonging to a different school.

---

## 3. Database Schema Definitions (SQL)

The following SQL script will be executed in the Supabase SQL Editor.

```sql
-- 1. Ensure UUID extension is enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. DRIVERS TABLE
CREATE TABLE IF NOT EXISTS public.drivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    license VARCHAR(100) NOT NULL,
    license_type VARCHAR(100) DEFAULT 'Heavy Transport',
    phone VARCHAR(50) NOT NULL,
    vehicle VARCHAR(100) DEFAULT 'Unassigned',
    route VARCHAR(100) DEFAULT 'Unassigned',
    status VARCHAR(50) DEFAULT 'Online',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_drivers_school_id ON public.drivers(school_id);

-- 3. VEHICLES TABLE
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    reg_no VARCHAR(100) NOT NULL,
    model VARCHAR(100),
    capacity_seats VARCHAR(50) DEFAULT '30 Seats',
    driver_name VARCHAR(255),
    route VARCHAR(100) DEFAULT 'Route 1',
    status VARCHAR(50) DEFAULT 'Running',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vehicles_school_id ON public.vehicles(school_id);

-- 4. PARENTS TABLE
CREATE TABLE IF NOT EXISTS public.parents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    address TEXT,
    route VARCHAR(100) DEFAULT 'Route 1',
    bus VARCHAR(100) DEFAULT 'Bus 01',
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_parents_school_id ON public.parents(school_id);

-- 5. STUDENTS TABLE
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_code VARCHAR(50) NOT NULL, -- e.g. '#ST-9041'
    school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.parents(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    class_grade VARCHAR(50) NOT NULL,
    section VARCHAR(50),
    roll_no VARCHAR(50),
    gender VARCHAR(20) DEFAULT 'Other',
    parent_name VARCHAR(255),
    relationship VARCHAR(50),
    vehicle VARCHAR(100),
    driver VARCHAR(255),
    route VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Waiting',
    address TEXT,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_students_school_id ON public.students(school_id);
CREATE INDEX IF NOT EXISTS idx_students_parent_id ON public.students(parent_id);
```

---

## 4. Phase-by-Phase Execution Plan

### Phase 1: Database Setup & Migration
- [x] **Task 1.1**: Run schema creation script in Supabase SQL editor.
- [x] **Task 1.2**: Confirm foreign key relations and indexes on `school_id`.
- [x] **Task 1.3**: Validate test row insertion with a dummy `school_id`.

### Phase 2: Frontend API Client & Service Layer
- [x] **Task 2.1**: Create `src/lib/supabaseClient.js` using `@supabase/supabase-js` with environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- [x] **Task 2.2**: Implement session utility `src/lib/session.js`:
  - `getCurrentSchoolId()`: Reads and validates the active school UUID from `localStorage.getItem('user')`.
- [x] **Task 2.3**: Create `src/services/driversService.js`:
  - `getDrivers()`
  - `addDriver(driverData)`
  - `updateDriver(driverId, driverData)`
  - `deleteDriver(driverId)`
- [x] **Task 2.4**: Create `src/services/vehiclesService.js`:
  - `getVehicles()`
  - `addVehicle(vehicleData)`
  - `updateVehicle(vehicleId, vehicleData)`
  - `deleteVehicle(vehicleId)`
- [x] **Task 2.5**: Create `src/services/parentsService.js`:
  - `getParents()`
  - `addParent(parentData)`
  - `updateParent(parentId, parentData)`
- [x] **Task 2.6**: Create `src/services/studentsService.js`:
  - `getStudents()`
  - `addStudent(studentData)`
  - `updateStudent(studentId, studentData)`
  - `deleteStudent(studentId)`

### Phase 3: Drivers Management Integration
- [x] **Task 3.1**: Update `DriversManagment.jsx`:
  - Add state: `loading`, `error`.
  - Fetch drivers on mount via `driversService.getDrivers()`.
  - Compute KPI counters dynamically from fetched database rows.
- [x] **Task 3.2**: Update `AddDriverModal.jsx`:
  - Wire submission to `driversService.addDriver()`.
  - Add error banner and disable submit button while inserting.
- [x] **Task 3.3**: Update `DriverDetailsModal.jsx`:
  - Wire modal edit save action to `driversService.updateDriver()`.
- [x] **Task 3.4**: Handle empty state ("No drivers yet. Add your first driver").

### Phase 4: Vehicles Management Integration
- [x] **Task 4.1**: Update `VehicleManagment.jsx`:
  - Replace `initialVehiclesData` with Supabase fetch.
  - Dynamically compute KPI counters (*Running*, *Idle*, *Maintenance*).
- [x] **Task 4.2**: Update `AddVehicleModal.jsx`:
  - Persist new vehicle to `vehiclesService.addVehicle()`.
  - Optionally populate assigned driver dropdown from the school's active drivers.
- [x] **Task 4.3**: Update `VehicleDetailsModal.jsx`:
  - Persist vehicle updates to `vehiclesService.updateVehicle()`.
- [x] **Task 4.4**: Add loading state and empty state display.

### Phase 5: Parents & Students Management Integration
- [x] **Task 5.1**: Update `ParentManagment.jsx`:
  - Fetch parent list for current `school_id`.
  - Update `AddParentModal.jsx` to insert directly into Supabase.
- [x] **Task 5.2**: Update `StudentManagment.jsx`:
  - Fetch student roster from `studentsService.getStudents()`.
  - Connect `StudentDetailsModal.jsx` to update student info and status.
- [x] **Task 5.3**: Update `Addstudent.jsx`:
  - Fetch active vehicles and drivers for the current school to populate select options dynamically.
  - Wire submit button to `studentsService.addStudent()`.
  - Support linking to an existing parent or newly added parent.
- [x] **Task 5.4**: Reconcile `App.jsx` student state handling so data stays synced across page transitions.

### Phase 6: Multi-Tenant Verification & Quality Assurance
- [ ] **Task 6.1 (Tenant Isolation Test)**:
  - Register **School Alpha** and add 1 vehicle, 1 driver, 1 parent, 1 student.
  - Register **School Beta** and verify all four pages display empty tables (0 records).
  - Add records under School Beta and switch back to School Alpha to confirm zero data leakage.
- [ ] **Task 6.2 (Resilience & Edge Cases)**:
  - Verify behavior when session expires or `localStorage` is cleared.
  - Ensure meaningful error messages on network failure.
  - Validate that page refreshes maintain data consistency.

---

## 5. Risk Assessment & Mitigations

| Risk | Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **Missing `school_id` in session** | User gets errors or unauthorized queries | Provide an automatic redirect to `/login` if `getCurrentSchoolId()` returns null. |
| **Empty tables for newly registered schools** | Page layout appears broken or blank | Add friendly empty state illustrations with action buttons (e.g. "Add Driver", "Add Vehicle"). |
| **Data mismatch in dropdowns** | Students assigned to non-existent buses/drivers | Dynamically fetch that school's registered vehicles and drivers rather than using static strings. |
| **Network latency / slow queries** | Sluggish UI transitions | Add database indexes on `school_id` and show subtle skeleton loaders during data fetch. |
