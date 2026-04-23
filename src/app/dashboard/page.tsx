'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ThemeToggle from '@/components/ThemeToggle'
import styles from './dashboard.module.scss'

interface User {
    id: string
    email: string
}

export default function DashboardPage() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                console.log('🔍 Checking auth status...')

                const {
                    data: { user },
                    error: authError,
                } = await supabase.auth.getUser()

                console.log('📊 Auth check result:', { user, authError })

                if (authError) {
                    console.error('❌ Auth error:', authError)
                    setError(authError.message)
                    router.push('/auth/login')
                    return
                }

                if (!user) {
                    console.log('❌ No user found, redirecting to login')
                    router.push('/auth/login')
                    return
                }

                console.log('✅ User authenticated:', user.email)
                setUser({ id: user.id, email: user.email! })
            } catch (err: any) {
                console.error('❌ Unexpected error:', err)
                setError(err.message || 'Gagal mengecek autentikasi')
                router.push('/auth/login')
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [router])

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            router.push('/auth/login')
        } catch (err: any) {
            console.error('Logout error:', err)
        }
    }

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Memuat...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.loadingContainer}>
                <p style={{ color: 'red' }}>Error: {error}</p>
            </div>
        )
    }

    if (!user) {
        return (
            <div className={styles.loadingContainer}>
                <p>Redirecting...</p>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.logo}>✨ ATMIFY</h1>
                    <div className={styles.headerActions}>
                        <ThemeToggle />
                        <button onClick={handleLogout} className={styles.logoutBtn}>
                            Keluar
                        </button>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className={styles.main}>
                <div className={styles.container}>
                    {/* Welcome Section */}
                    <section className={styles.welcome}>
                        <h2 className={styles.welcomeTitle}>
                            Selamat datang, {user.email.split('@')[0]}! 👋
                        </h2>
                        <p className={styles.welcomeSubtitle}>
                            Kelola CV Anda dan mulai optimalkan untuk ATS
                        </p>
                    </section>

                    {/* CV List Section */}
                    <section className={styles.cvSection}>
                        <div className={styles.sectionHeader}>
                            <h3 className={styles.sectionTitle}>Dokumen Saya</h3>
                            <button className={styles.createBtn}>
                                ➕ CV Baru
                            </button>
                        </div>

                        {/* Empty State */}
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>📄</div>
                            <h4 className={styles.emptyTitle}>Belum ada CV</h4>
                            <p className={styles.emptyText}>
                                Buat CV pertama Anda dan optimalkan untuk lolos sistem ATS
                            </p>
                            <button className={styles.emptyBtn}>Buat CV Sekarang</button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}