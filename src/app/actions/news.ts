'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getNewsArticles() {
    const supabase = await createClient()
    const { data } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false })
    return data || []
}

export async function createNewsArticle(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const type = formData.get('type') as string

    const { error } = await supabase.from('news').insert({
        title,
        content,
        type: type || 'article',
        author_id: user.id,
        published_at: new Date().toISOString()
    })

    if (error) return { error: error.message }

    revalidatePath('/lawyer/marketing')
    revalidatePath('/news')
    return { success: true }
}

export async function deleteNewsArticle(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('news').delete().eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/lawyer/marketing')
    return { success: true }
}
