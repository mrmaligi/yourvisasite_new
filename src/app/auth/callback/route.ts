import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const origin = requestUrl.origin
    const next = requestUrl.searchParams.get('next') || '/user/dashboard'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Verify if session was actually created
            const { data: { user }, error: userError } = await supabase.auth.getUser()

            if (userError || !user) {
                console.error('Auth Callback: Exchange successful but no user found', userError)
                return NextResponse.redirect(`${origin}/login?error=exchange_success_but_no_session`)
            }

            return NextResponse.redirect(`${origin}${next}`)
        }

        console.error('Auth Callback Error:', error)
        // If there's an error, redirect to login with the error
        return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`)
    }

    // If no code, redirect to login
    return NextResponse.redirect(`${origin}/login?error=no_code_provided`)
}
