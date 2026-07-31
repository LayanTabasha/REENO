import type { Session, User } from '@supabase/supabase-js'
import { requireSupabase } from '../lib/supabase'
import type { RecruiterProfile } from '../types/database'

export interface SignInResult { user: User; session: Session; profile: RecruiterProfile }

function authMessage(error: unknown, fallback: string): string {
  if (!(error instanceof Error)) return fallback
  const detail = error.message.toLowerCase()
  if (detail.includes('invalid login credentials')) return 'The email or password is incorrect.'
  if (detail.includes('fetch') || detail.includes('network')) return 'Unable to reach the authentication service. Check your connection and try again.'
  return fallback
}

export async function getCurrentSession(): Promise<Session | null> {
  const { data, error } = await requireSupabase().auth.getSession()
  if (error) throw new Error(authMessage(error, 'Unable to restore your session. Please sign in again.'))
  return data.session
}
export async function getCurrentUser(): Promise<User | null> {
  const { data, error } = await requireSupabase().auth.getUser()
  if (error) throw new Error(authMessage(error, 'Your session has expired. Please sign in again.'))
  return data.user
}
export async function getCurrentProfile(): Promise<RecruiterProfile> {
  const user = await getCurrentUser()
  if (!user) throw new Error('Your session has expired. Please sign in again.')
  const { data, error } = await requireSupabase().from('profiles').select('*').eq('id', user.id).maybeSingle()
  if (error) throw new Error('Unable to load your recruiter profile. Please try again.')
  if (!data) throw new Error('Recruiter access is missing, inactive, or unauthorized for this account.')
  const profile = data as RecruiterProfile
  if (!profile.is_active || !['recruiter', 'admin'].includes(profile.role)) throw new Error('This recruiter account is inactive or unauthorized.')
  return profile
}
export async function signIn(email: string, password: string): Promise<SignInResult> {
  const { data, error } = await requireSupabase().auth.signInWithPassword({ email: email.trim(), password })
  if (error || !data.user || !data.session) throw new Error(authMessage(error, 'Unable to sign in. Please try again.'))
  try { return { user: data.user, session: data.session, profile: await getCurrentProfile() } }
  catch (reason) { await requireSupabase().auth.signOut(); throw reason }
}
export async function signOut(): Promise<void> {
  const { error } = await requireSupabase().auth.signOut()
  if (error) throw new Error('Unable to sign out. Please try again.')
}
