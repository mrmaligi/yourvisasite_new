'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getDocuments() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data, error } = await supabase
        .from('user_documents')
        .select('*')
        .eq('user_id', user.id)
        .order('uploaded_at', { ascending: false })

    if (error) {
        console.error('Error fetching documents:', error)
        return []
    }
    return data
}

export async function uploadDocument(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    const file = formData.get('file') as File
    const category = formData.get('category') as string

    if (!file) {
        return { error: 'No file uploaded' }
    }

    // Sanitized file name
    const fileName = `${user.id}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

    // Upload to Storage
    const { error: uploadError } = await supabase.storage
        .from('user_documents')
        .upload(fileName, file)

    if (uploadError) {
        console.error('Upload error:', uploadError)
        return { error: uploadError.message }
    }

    // Insert to DB
    const { error: dbError } = await supabase.from('user_documents').insert({
        user_id: user.id,
        file_name: file.name,
        file_path: fileName,
        category: category,
        file_size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        status: 'pending',
        uploaded_at: new Date().toISOString()
    })

    if (dbError) {
        console.error('DB error:', dbError)
        return { error: dbError.message }
    }

    revalidatePath('/user/documents')
    return { success: true }
}
