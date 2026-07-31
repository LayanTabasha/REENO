import type { Session, User } from '@supabase/supabase-js'
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import * as authService from '../services/authService'
import type { RecruiterProfile } from '../types/database'
import { AuthContext } from './useAuth'

const errorText = (reason: unknown) => reason instanceof Error ? reason.message : 'An unexpected authentication error occurred.'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null), [session, setSession] = useState<Session | null>(null), [profile, setProfile] = useState<RecruiterProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true), [authError, setAuthError] = useState('')
  const clear = useCallback(() => { setUser(null); setSession(null); setProfile(null) }, [])
  const refreshProfile = useCallback(async () => { setProfile(await authService.getCurrentProfile()) }, [])

  useEffect(() => {
    let active = true
    const restore = async () => {
      try {
        const currentSession = await authService.getCurrentSession()
        if (!active) return
        if (!currentSession) { clear(); return }
        setSession(currentSession); setUser(currentSession.user)
        const currentProfile = await authService.getCurrentProfile()
        if (active) setProfile(currentProfile)
      } catch (reason) {
        if (active) { clear(); setAuthError(errorText(reason)); await authService.signOut().catch(() => undefined) }
      } finally { if (active) setIsLoading(false) }
    }
    void restore()
    const subscription = supabase?.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return
      setSession(nextSession); setUser(nextSession?.user ?? null)
      if (!nextSession) { setProfile(null); setIsLoading(false) }
    })
    return () => { active = false; subscription?.data.subscription.unsubscribe() }
  }, [clear])

  const signIn = useCallback(async (email: string, password: string) => {
    setIsLoading(true); setAuthError('')
    try { const result = await authService.signIn(email, password); setUser(result.user); setSession(result.session); setProfile(result.profile) }
    catch (reason) { clear(); const message = errorText(reason); setAuthError(message); throw new Error(message, { cause: reason }) }
    finally { setIsLoading(false) }
  }, [clear])
  const signOut = useCallback(async () => { setAuthError(''); try { await authService.signOut() } finally { clear(); setIsLoading(false) } }, [clear])
  const value = useMemo(() => ({ user, session, profile, isAuthenticated: Boolean(user && session && profile), isLoading, authError, signIn, signOut, refreshProfile }), [user, session, profile, isLoading, authError, signIn, signOut, refreshProfile])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
