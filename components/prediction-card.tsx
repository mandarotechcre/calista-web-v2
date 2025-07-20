"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, TrendingUp, AlertTriangle, Loader2 } from "lucide-react"
import { format, addDays } from "date-fns"
import { CyclePrediction } from "@/app/types/cycle"

interface PredictionCardProps {
  prediction: CyclePrediction | null
  isLoading?: boolean
  error?: string | null
}

const PredictionLoadingState = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <TrendingUp className="w-5 h-5 text-pink-600" />
        <span>Prediksi Siklus</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col items-center justify-center py-8">
      <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
      <p className="mt-2 text-sm text-gray-500">Menganalisis data siklus kamu...</p>
    </CardContent>
  </Card>
)

const PredictionEmptyState = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <TrendingUp className="w-5 h-5 text-pink-600" />
        <span>Prediksi Siklus</span>
      </CardTitle>
      <CardDescription>Lengkapi satu siklus terlebih dahulu</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600">
        Catat setidaknya satu siklus menstruasi lengkap untuk mendapatkan prediksi yang dipersonalisasi.
      </p>
    </CardContent>
  </Card>
)

const PredictionErrorState = ({ error }: { error: string }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2 text-red-600">
        <AlertTriangle className="w-5 h-5" />
        <span>Terjadi Kesalahan</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-red-500">{error}</p>
    </CardContent>
  </Card>
)

const DateDisplay = ({ date, label }: { date: Date; label: string }) => (
  <div className="space-y-1">
    <div className="flex items-center space-x-2">
      <Calendar className="w-4 h-4 text-gray-500" />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <p className="text-lg font-semibold text-pink-600">
      {format(date, "dd MMM yyyy")}
    </p>
  </div>
)

const StatBox = ({ value, label, color = "pink" }: { 
  value: number; 
  label: string; 
  color?: "pink" | "purple" 
}) => {
  const colorClasses = {
    pink: "bg-pink-50 text-pink-600",
    purple: "bg-purple-50 text-purple-600"
  }
  
  return (
    <div className={`text-center p-3 rounded-lg ${colorClasses[color]}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  )
}

export function PredictionCard({ 
  prediction, 
  isLoading = false,
  error = null 
}: PredictionCardProps) {
  if (isLoading) return <PredictionLoadingState />
  if (error) return <PredictionErrorState error={error} />
  if (!prediction) return <PredictionEmptyState />

  const nextCycleEnd = addDays(prediction.nextCycleStart, prediction.expectedDuration - 1)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-pink-600" />
          <span>Prediksi Siklus</span>
        </CardTitle>
        <CardDescription>
          Berdasarkan rata-rata siklus kamu selama {prediction.averageCycleLength} hari
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateDisplay date={prediction.nextCycleStart} label="Perkiraan Mulai" />
          <DateDisplay date={nextCycleEnd} label="Perkiraan Selesai" />
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <StatBox value={prediction.expectedDuration} label="Durasi Haid" color="pink" />
          <StatBox value={prediction.averageCycleLength} label="Rata-rata Siklus" color="purple" />
        </div>

        {prediction.isIrregular && (
          <div className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Pola Tidak Teratur Terdeteksi
              </p>
              <p className="text-xs text-yellow-700">
                Siklus kamu menunjukkan variasi yang melebihi batas normal. 
                Pertimbangkan untuk mencatat gejala tambahan atau berkonsultasi dengan tenaga medis.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
