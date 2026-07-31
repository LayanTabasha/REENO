export const applicantStatuses = ['New', 'Under review', 'Interview', 'Shortlisted', 'Rejected', 'Hired'] as const
export type ApplicantStatus = (typeof applicantStatuses)[number]
export type ApplicantStatusFilter = ApplicantStatus | 'All'

export interface Applicant {
  id: string
  name: string
  email: string
  jobTitle: string
  startup: 'AeroQ' | 'Sadeem Technology' | 'GreenRoute' | 'MedLoop'
  appliedDate: string
  status: ApplicantStatus
  match: number
}

export const applicants: Applicant[] = [
  { id: 'amina-al-kuwari', name: 'Amina Al-Kuwari', email: 'amina.alkuwari@example.com', jobTitle: 'Software Engineering Intern', startup: 'Sadeem Technology', appliedDate: '2026-07-31', status: 'New', match: 92 },
  { id: 'yousef-hassan', name: 'Yousef Hassan', email: 'yousef.hassan@example.com', jobTitle: 'Data Analytics Intern', startup: 'GreenRoute', appliedDate: '2026-07-31', status: 'New', match: 87 },
  { id: 'leila-mansour', name: 'Leila Mansour', email: 'leila.mansour@example.com', jobTitle: 'Product Design Intern', startup: 'AeroQ', appliedDate: '2026-07-30', status: 'Under review', match: 89 },
  { id: 'omar-al-sulaiti', name: 'Omar Al-Sulaiti', email: 'omar.alsulaiti@example.com', jobTitle: 'AI Research Intern', startup: 'Sadeem Technology', appliedDate: '2026-07-29', status: 'Interview', match: 85 },
  { id: 'sara-ibrahim', name: 'Sara Ibrahim', email: 'sara.ibrahim@example.com', jobTitle: 'Business Development Intern', startup: 'MedLoop', appliedDate: '2026-07-28', status: 'Shortlisted', match: 81 },
  { id: 'khalid-al-marri', name: 'Khalid Al-Marri', email: 'khalid.almarri@example.com', jobTitle: 'Cybersecurity Intern', startup: 'Sadeem Technology', appliedDate: '2026-07-27', status: 'Under review', match: 78 },
  { id: 'nour-el-din', name: 'Nour El-Din', email: 'nour.eldin@example.com', jobTitle: 'Marketing Intern', startup: 'AeroQ', appliedDate: '2026-07-25', status: 'Rejected', match: 64 },
  { id: 'maryam-al-ansari', name: 'Maryam Al-Ansari', email: 'maryam.alansari@example.com', jobTitle: 'Sustainability Research Intern', startup: 'GreenRoute', appliedDate: '2026-07-23', status: 'Hired', match: 94 },
  { id: 'ahmed-farouk', name: 'Ahmed Farouk', email: 'ahmed.farouk@example.com', jobTitle: 'Operations Intern', startup: 'MedLoop', appliedDate: '2026-07-21', status: 'Interview', match: 76 },
  { id: 'fatima-zahra', name: 'Fatima Zahra', email: 'fatima.zahra@example.com', jobTitle: 'Finance Intern', startup: 'AeroQ', appliedDate: '2026-07-18', status: 'Shortlisted', match: 88 },
  { id: 'daniel-kim', name: 'Daniel Kim', email: 'daniel.kim@example.com', jobTitle: 'Software Engineering Intern', startup: 'Sadeem Technology', appliedDate: '2026-07-15', status: 'Under review', match: 83 },
  { id: 'ranya-saad', name: 'Ranya Saad', email: 'ranya.saad@example.com', jobTitle: 'Data Analytics Intern', startup: 'GreenRoute', appliedDate: '2026-07-12', status: 'New', match: 74 },
  { id: 'ibrahim-musa', name: 'Ibrahim Musa', email: 'ibrahim.musa@example.com', jobTitle: 'Operations Intern', startup: 'MedLoop', appliedDate: '2026-07-08', status: 'Rejected', match: 61 },
  { id: 'sofia-martins', name: 'Sofia Martins', email: 'sofia.martins@example.com', jobTitle: 'Product Design Intern', startup: 'AeroQ', appliedDate: '2026-07-03', status: 'Hired', match: 90 },
  { id: 'tariq-rahman', name: 'Tariq Rahman', email: 'tariq.rahman@example.com', jobTitle: 'AI Research Intern', startup: 'Sadeem Technology', appliedDate: '2026-06-27', status: 'Shortlisted', match: 86 },
]

export const jobTitles = [
  'Software Engineering Intern', 'Data Analytics Intern', 'Product Design Intern',
  'Business Development Intern', 'Sustainability Research Intern', 'AI Research Intern',
  'Marketing Intern', 'Operations Intern', 'Cybersecurity Intern', 'Finance Intern',
] as const

