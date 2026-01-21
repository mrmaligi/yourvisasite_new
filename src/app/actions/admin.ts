'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getAdminStats() {
    const supabase = await createClient()

    // Total users count
    const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'user')

    // Verified lawyers count  
    const { count: verifiedLawyersCount } = await supabase
        .from('lawyer_profiles')
        .select('*, profiles!inner(*)', { count: 'exact', head: true })
        .eq('is_verified', true)

    // Pending lawyers count
    const { count: pendingLawyersCount } = await supabase
        .from('lawyer_profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_verified', false)

    // Tracker entries count
    const { count: trackersCount } = await supabase
        .from('trackers')
        .select('*', { count: 'exact', head: true })

    return {
        totalUsers: usersCount || 0,
        verifiedLawyers: verifiedLawyersCount || 0,
        pendingLawyers: pendingLawyersCount || 0,
        trackerEntries: trackersCount || 0
    }
}

export async function getPendingLawyers() {
    const supabase = await createClient()

    const { data } = await supabase
        .from('lawyer_profiles')
        .select('*, profiles!inner(email, full_name, created_at)')
        .eq('is_verified', false)
        .order('created_at', { ascending: false })

    return data || []
}

export async function getAllLawyers() {
    const supabase = await createClient()

    const { data } = await supabase
        .from('lawyer_profiles')
        .select('*, profiles!inner(email, full_name, role, created_at)')
        .order('created_at', { ascending: false })

    return data || []
}

export async function approveLawyer(lawyerId: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('lawyer_profiles')
        .update({ is_verified: true })
        .eq('id', lawyerId)

    if (error) return { error: error.message }

    revalidatePath('/admin/dashboard')
    revalidatePath('/admin/lawyers')
    return { success: true }
}

export async function rejectLawyer(lawyerId: string) {
    const supabase = await createClient()

    // Delete lawyer profile (will cascade to user profile if needed)
    const { error } = await supabase
        .from('lawyer_profiles')
        .delete()
        .eq('id', lawyerId)

    if (error) return { error: error.message }

    revalidatePath('/admin/dashboard')
    revalidatePath('/admin/lawyers')
    return { success: true }
}
