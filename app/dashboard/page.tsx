"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import ClientWrapper from "@/components/client-wrapper"
import { useState, useEffect } from "react"
import { PrivateRoute } from "@/components/private-route"
import { Navigation } from "@/components/layout/navigation"
import { CalendarTracker } from "@/components/calendar-tracker"
import { PredictionCard } from "@/components/prediction-card"
import { CyclePrediction } from "../types/cycle"
import { MenstrualApi } from "@/lib/menstrual"

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [prediction, setPrediction] = useState<CyclePrediction | null>(null)
  const [predictionLoading, setPredictionLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, authLoading, router])

  useEffect(() => {
    const fetchPrediction = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("Token tidak ditemukan")
        setPrediction(null)
        return
      }

      setPredictionLoading(true)

      try {
        const data = await MenstrualApi.getCurrentPrediction(token)
        if (!data) {
          setPrediction(null)
          setError(null)
          return
        }

        const start = new Date(data.predicted_dates.start_date)
        const end = new Date(data.predicted_dates.end_date)
        const peak = new Date(data.predicted_dates.peak_date)

        const mappedPrediction: CyclePrediction = {
          nextCycleStart: start,
          expectedDuration: data.predicted_period_length,
          averageCycleLength: data.predicted_cycle_length,
          isIrregular: false,
          confidence: 80,
          fertileWindow: {
            start: new Date(peak.getTime() - 2 * 24 * 60 * 60 * 1000),
            end: new Date(peak.getTime() + 2 * 24 * 60 * 60 * 1000)
          },
          ovulationDate: peak
        }

        setPrediction(mappedPrediction)
        setError(null)
      } catch (err) {
        setError("Gagal memuat data prediksi")
      } finally {
        setPredictionLoading(false)
      }
    }

    fetchPrediction()
  }, [])

  if (authLoading) {
    return <div className="flex justify-center items-center h-screen">Memuat...</div>
  }

  if (!isAuthenticated) {
    return null // Akan dialihkan oleh useEffect
  }

  return (
    <ClientWrapper>
      <PrivateRoute>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.username ? `Halo, ${user.username.split('@')[0]}!` : 'Pelacak Siklus'}
              </h1>
              <p className="text-gray-600 mt-2">
               Pantau Siklus Haid dengan Panduan Syariah
Aplikasi cerdas yang membantu prediksi siklus dan bimbingan ibadah.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3">
                <CalendarTracker />
              </div>
              <div className="xl:col-span-1">
                <PredictionCard 
                  prediction={prediction} 
                  isLoading={predictionLoading}
                  error={error}
                />
              </div>
            </div>
          </main>
        </div>
      </PrivateRoute>
    </ClientWrapper>
  )
}