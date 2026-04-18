'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [status, setStatus] = useState('checking...')

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        setStatus('✅ Connected to Supabase!')
      } catch (e) {
        setStatus('❌ Connection failed')
        console.error(e)
      }
    }
    checkConnection()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">ATMIFY</h1>
        <p className="text-lg text-slate-600">{status}</p>
      </div>
    </div>
  )
}