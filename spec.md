# EduConnect Tamil Nadu

## Current State
The app has tutor registration, student registration, admin dashboard, and various pages. The backend has a `registerTutor` function but no dedicated tutor application flow with approval status tracking. Admin dashboard shows sample/hardcoded data.

## Requested Changes (Diff)

### Add
- `TutorApplication` type in backend with fields: id, name, email, phone, gender, subjects, classes, tuitionType, city, experience, qualification, bio, fees, status (pending/approved/rejected), submittedAt
- `submitTutorApplication` backend function
- `getTutorApplications` query function
- `updateApplicationStatus` (approve/reject) function
- `/tutor-apply` frontend page with a real form collecting all tutor fields
- Admin dashboard "Applications" tab showing real backend data with approve/reject buttons

### Modify
- Admin dashboard to fetch and display real tutor applications from backend
- App.tsx to add `/tutor-apply` route
- Navbar/homepage "Become a Tutor" link to point to `/tutor-apply`

### Remove
- Nothing removed

## Implementation Plan
1. Update backend: add TutorApplication type, submitTutorApplication, getTutorApplications, updateApplicationStatus functions
2. Create TutorApply.tsx page with full real input form (name, email, phone, gender, subjects, classes, tuition type, city, experience, qualification, bio, monthly fees)
3. Update AdminDashboard to show real applications from backend with approve/reject actions
4. Add `/tutor-apply` route in App.tsx
5. Update "Become a Tutor" links to `/tutor-apply`
