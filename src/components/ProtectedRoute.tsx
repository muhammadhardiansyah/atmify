'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function withAuth<P extends object>(
    Component: React.ComponentType<P>
) {
    return function ProtectedComponent(props: P) {
        const router = useRouter()

        useEffect(() => {
            const checkAuth = async () => {
                const {
                    data: { user },
                } = await supabase.auth.getUser()

                if (!user) {
                    router.push('/auth/login')
                }
            }

            checkAuth()
        }, [router])

        return <Component {...props} />
    }
}