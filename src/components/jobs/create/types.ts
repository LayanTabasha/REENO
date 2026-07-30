export type JobDetails = {
  startup: string
  title: string
  department: string
  location: string
  employmentType: string
  workArrangement: string
  deadline: string
  openings: number
  description: string
  qualifications: string
  requirements: string
}

export type ApplicantField = { id: string; label: string; enabled: boolean; required: boolean; locked?: boolean }
export type QuestionType = 'Short text' | 'Long text' | 'Yes or no' | 'Multiple choice' | 'Number'
export type ScreeningQuestion = { id: string; text: string; type: QuestionType; required: boolean; options: string[] }
export type JobDraft = { details: JobDetails; fields: ApplicantField[]; questions: ScreeningQuestion[] }

