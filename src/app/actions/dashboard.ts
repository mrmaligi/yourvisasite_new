'use server'
import { createClient } from '@/utils/supabase/server'

export async function getDashboardStats() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Get User Profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()

    // Get Docs Count
    const { count: documentsCount } = await supabase
        .from('user_documents')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

    return {
        userName: profile?.full_name || user.email?.split('@')[0] || 'User',
        documentsCount: documentsCount || 0
    }
}
