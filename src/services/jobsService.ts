import { requireSupabase } from '../lib/supabase'
import type { CreateJobInput, JobStatus, JobWithStartup, Startup } from '../types/database'

const jobSelect = '*, startup:startups(*)'

const message = (operation: string, detail?: string) =>
  `Unable to ${operation}${detail ? `: ${detail}` : '. Please try again.'}`

export async function getStartups(): Promise<Startup[]> {
  const { data, error } = await requireSupabase().from('startups').select('*').order('name')
  if (error) throw new Error(message('load startups', error.message))
  return (data ?? []) as Startup[]
}

export async function getRecruiterJobs(): Promise<JobWithStartup[]> {
  const { data, error } = await requireSupabase().from('jobs').select(jobSelect).order('created_at', { ascending: false })
  if (error) throw new Error(message('load jobs', error.message))
  return (data ?? []) as JobWithStartup[]
}

export async function getPublicJobs(): Promise<JobWithStartup[]> {
  const { data, error } = await requireSupabase().from('jobs').select(jobSelect).eq('status', 'active').order('created_at', { ascending: false })
  if (error) throw new Error(message('load jobs', error.message))
  return (data ?? []) as JobWithStartup[]
}

export async function getPublicJobBySlug(slug: string): Promise<JobWithStartup | null> {
  const { data, error } = await requireSupabase().from('jobs').select(jobSelect).eq('slug', slug).eq('status', 'active').maybeSingle()
  if (error) throw new Error(message('load this job', error.message))
  return data as JobWithStartup | null
}

export async function getJobById(id: string): Promise<JobWithStartup | null> {
  const { data, error } = await requireSupabase().from('jobs').select(jobSelect).eq('id', id).maybeSingle()
  if (error) throw new Error(message('load this job', error.message))
  return data as JobWithStartup | null
}

export async function createJob(input: CreateJobInput): Promise<JobWithStartup> {
  const { data: userData, error: userError } = await requireSupabase().auth.getUser()
  if (userError || !userData.user) throw new Error('You must be signed in as an active recruiter to create a job.')
  const payload = { ...input, created_by: userData.user.id, published_at: input.status === 'active' ? (input.published_at ?? new Date().toISOString()) : null }
  const { data, error } = await requireSupabase().from('jobs').insert(payload).select(jobSelect).single()
  if (error) {
    if (error.code === '42501') throw new Error('Your account is not authorized to create jobs. Ask the QSTP Hiring Team to confirm your access.')
    throw new Error('Unable to create the job. Check the job details and try again.')
  }
  return data as JobWithStartup
}

export async function updateJob(id: string, input: CreateJobInput): Promise<JobWithStartup> {
  const { data: userData, error: userError } = await requireSupabase().auth.getUser()
  if (userError || !userData.user) throw new Error('You must be signed in as an active recruiter to update a job.')
  const payload = { ...input, published_at: input.status === 'active' ? (input.published_at ?? new Date().toISOString()) : null }
  const { data, error } = await requireSupabase().from('jobs').update(payload).eq('id', id).select(jobSelect).maybeSingle()
  if (error) {
    if (error.code === '42501') throw new Error('Your account is not authorized to update jobs. Ask the QSTP Hiring Team to confirm your access.')
    throw new Error('Unable to update the job. Check the job details and try again.')
  }
  if (!data) throw new Error('This job no longer exists or you do not have access to it.')
  return data as JobWithStartup
}

export async function updateJobStatus(id: string, status: JobStatus): Promise<JobWithStartup> {
  const changes = { status, published_at: status === 'active' ? new Date().toISOString() : null }
  const { data, error } = await requireSupabase().from('jobs').update(changes).eq('id', id).select(jobSelect).single()
  if (error) throw new Error(message('update the job status', error.message))
  return data as JobWithStartup
}
