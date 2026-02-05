'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function login(prevState: unknown, formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Email and password are required' }
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/user/dashboard')
}

export async function signup(prevState: unknown, formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string

    if (!email || !password || !fullName) {
        return { error: 'All fields are required' }
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                role: 'user',
            },
        },
    })

    if (error) {
        return { error: error.message }
    }

    if (data.user && !data.session) {
        return { success: true, message: 'Please check your email to confirm your account.' }
    }

    revalidatePath('/', 'layout')
    redirect('/user/dashboard')
}

export async function lawyerSignup(prevState: unknown, formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const phone = formData.get('phone') as string
    const marn = formData.get('marn') as string
    const firmName = formData.get('firmName') as string
    const location = formData.get('location') as string

    if (!email || !password || !firstName || !lastName || !marn) {
        return { error: 'Required fields are missing' }
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: `${firstName} ${lastName}`,
                role: 'lawyer',
                phone,
                marn,
                firm_name: firmName,
                office_location: location
            },
        },
    })

    if (error) {
        return { error: error.message }
    }

    if (data.user && !data.session) {
        return { success: true, message: 'Please check your email to confirm your account.' }
    }

    revalidatePath('/', 'layout')
    redirect('/lawyer/dashboard')
}

export async function signInWithGoogle() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`,
        },
    })

    if (error) {
        console.error('Error signing in with Google:', error)
        return { error: error.message }
    }

    if (data.url) {
        redirect(data.url)
    }
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}
