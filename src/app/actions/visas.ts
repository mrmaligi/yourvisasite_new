'use server'
import { createClient } from '@/utils/supabase/server'

export async function getVisas() {
    const supabase = await createClient()
    const { data } = await supabase.from('visas').select('*').order('subclass', { ascending: true })
    return data || []
}
