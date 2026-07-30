export type JobStatus = 'Active' | 'Draft' | 'Closed'
export type StatusFilter = JobStatus | 'All'

export interface Job {
  id: number
  title: string
  startup: 'AeroQ' | 'Sadeem Technology' | 'GreenRoute' | 'MedLoop'
  location: string
  applicants: number
  deadline: string
  status: JobStatus
}

export const jobs: Job[] = [
  { id: 1, title: 'Software Engineering Intern', startup: 'Sadeem Technology', location: 'Doha, Qatar', applicants: 31, deadline: '14 Aug 2026', status: 'Active' },
  { id: 2, title: 'Data Analytics Intern', startup: 'GreenRoute', location: 'Doha, Qatar', applicants: 24, deadline: '21 Aug 2026', status: 'Active' },
  { id: 3, title: 'Product Design Intern', startup: 'AeroQ', location: 'Hybrid', applicants: 27, deadline: '18 Aug 2026', status: 'Active' },
  { id: 4, title: 'Business Development Intern', startup: 'MedLoop', location: 'Doha, Qatar', applicants: 16, deadline: '28 Aug 2026', status: 'Active' },
  { id: 5, title: 'Sustainability Research Intern', startup: 'GreenRoute', location: 'Hybrid', applicants: 12, deadline: '02 Sep 2026', status: 'Active' },
  { id: 6, title: 'AI Research Intern', startup: 'Sadeem Technology', location: 'Doha, Qatar', applicants: 38, deadline: '25 Aug 2026', status: 'Active' },
  { id: 7, title: 'Marketing Intern', startup: 'AeroQ', location: 'Hybrid', applicants: 21, deadline: '30 Aug 2026', status: 'Active' },
  { id: 8, title: 'Operations Intern', startup: 'MedLoop', location: 'Doha, Qatar', applicants: 19, deadline: '25 Aug 2026', status: 'Active' },
  { id: 9, title: 'Cybersecurity Intern', startup: 'Sadeem Technology', location: 'Doha, Qatar', applicants: 0, deadline: '10 Sep 2026', status: 'Draft' },
  { id: 10, title: 'Finance Intern', startup: 'AeroQ', location: 'Doha, Qatar', applicants: 0, deadline: '12 Sep 2026', status: 'Draft' },
  { id: 11, title: 'Quality Assurance Intern', startup: 'MedLoop', location: 'Hybrid', applicants: 0, deadline: '15 Sep 2026', status: 'Draft' },
  { id: 12, title: 'UX Research Intern', startup: 'GreenRoute', location: 'Doha, Qatar', applicants: 44, deadline: '20 Jul 2026', status: 'Closed' },
]
