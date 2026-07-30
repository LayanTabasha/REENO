import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import ApplicantsPage from '../pages/applicants/ApplicantsPage'
import DashboardPage from '../pages/dashboard/DashboardPage'
import CreateJobPage from '../pages/jobs/CreateJobPage'
import JobsPage from '../pages/jobs/JobsPage'
import SettingsPage from '../pages/settings/SettingsPage'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="jobs/new" element={<CreateJobPage />} />
          <Route path="applicants" element={<ApplicantsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
