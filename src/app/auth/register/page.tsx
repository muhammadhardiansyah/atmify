'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import styles from './register.module.scss'

export default function RegisterPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        if (!email || !password || !confirmPassword) {
            setError('Semua field harus diisi')
            setLoading(false)
            return
        }

        if (password !== confirmPassword) {
            setError('Password tidak cocok')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError('Password minimal 6 karakter')
            setLoading(false)
            return
        }

        try {
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`
                }
            })

            if (signUpError) throw signUpError

            setEmail('')
            setPassword('')
            setConfirmPassword('')
            alert('✅ Registrasi berhasil! Cek email Anda untuk verifikasi.')
            router.push('/auth/login')
        } catch (err: any) {
            setError(err.message || 'Registrasi gagal')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>ATMIFY</h1>
                    <p className={styles.subtitle}>Buat akun baru</p>
                </div>

                <form onSubmit={handleRegister} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nama@email.com"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Minimal 6 karakter"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Konfirmasi Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Ketik ulang password"
                            className={styles.input}
                        />
                    </div>

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <button type="submit" disabled={loading} className={styles.submitButton}>
                        {loading ? 'Mendaftar...' : 'Daftar'}
                    </button>
                </form>

                <p className={styles.footer}>
                    Sudah punya akun?{' '}
                    <Link href="/auth/login" className={styles.link}>
                        Masuk di sini
                    </Link>
                </p>
            </div>
        </div>
    )
}