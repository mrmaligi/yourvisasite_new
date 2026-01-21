'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getTrackerData() {
    const supabase = await createClient()
    const { data } = await supabase
        .from('trackers')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)
    return data || []
}

export async function submitProcessingTime(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    // Check if user is a lawyer
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    const isLawyer = profile?.role === 'lawyer'

    const visa_subclass = formData.get('visa_subclass') as string
    const processing_time = formData.get('processing_time') as string

    const { error } = await supabase.from('trackers').insert({
        visa_subclass,
        processing_time,
        submitted_by: user.id,
        is_lawyer_verified: isLawyer,
        created_at: new Date().toISOString()
    })

    if (error) return { error: error.message }

    revalidatePath('/tracker')
    revalidatePath('/lawyer/tracker')
    return { success: true }
}
