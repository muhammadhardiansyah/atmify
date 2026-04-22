'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function CallbackPage() {
    const router = useRouter()

    useEffect(() => {
        const handleCallback = async () => {
            // Get session from URL
            const { data: { session } } = await supabase.auth.getSession()

            if (session) {
                router.push('/dashboard')
            } else {
                router.push('/auth/login')
            }
        }

        handleCallback()
    }, [router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
                <p className="text-slate-600">Memproses verifikasi...</p>
            </div>
        </div>
    )
}