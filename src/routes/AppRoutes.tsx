import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import PublicLayout from '../layouts/PublicLayout'
import ApplicantsPage from '../pages/applicants/ApplicantsPage'
import ApplicantProfilePage from '../pages/applicants/ApplicantProfilePage'
import DashboardPage from '../pages/dashboard/DashboardPage'
import CreateJobPage from '../pages/jobs/CreateJobPage'
import JobsPage from '../pages/jobs/JobsPage'
import SettingsPage from '../pages/settings/SettingsPage'
import ApplicationPage from '../pages/public/ApplicationPage'
import ApplicationSuccessPage from '../pages/public/ApplicationSuccessPage'
import CareersPage from '../pages/public/CareersPage'
import PublicJobPage from '../pages/public/PublicJobPage'

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
          <Route path="applicants/:applicantId" element={<ApplicantProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="careers" element={<CareersPage />} />
          <Route path="careers/:jobSlug" element={<PublicJobPage />} />
          <Route path="careers/:jobSlug/apply" element={<ApplicationPage />} />
          <Route path="careers/:jobSlug/application-success" element={<ApplicationSuccessPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
