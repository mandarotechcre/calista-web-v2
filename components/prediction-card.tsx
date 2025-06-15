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
        <span>Cycle Prediction</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col items-center justify-center py-8">
      <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
      <p className="mt-2 text-sm text-gray-500">Analyzing your cycle data...</p>
    </CardContent>
  </Card>
)

const PredictionEmptyState = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <TrendingUp className="w-5 h-5 text-pink-600" />
        <span>Cycle Prediction</span>
      </CardTitle>
      <CardDescription>Complete a cycle to see predictions</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600">
        Track at least one full menstrual cycle to get personalized predictions.
      </p>
    </CardContent>
  </Card>
)

const PredictionErrorState = ({ error }: { error: string }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2 text-red-600">
        <AlertTriangle className="w-5 h-5" />
        <span>Prediction Error</span>
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
      {format(date, "MMM dd, yyyy")}
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
  const confidenceLevel = prediction.confidence > 75 ? "high" : 
                         prediction.confidence > 50 ? "medium" : "low"

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-pink-600" />
          <span>Cycle Prediction</span>
        </CardTitle>
        <CardDescription>
          Based on your {prediction.averageCycleLength}-day average cycle
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateDisplay date={prediction.nextCycleStart} label="Next Cycle Start" />
          <DateDisplay date={nextCycleEnd} label="Expected End" />
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <StatBox value={prediction.expectedDuration} label="Expected Duration" color="pink" />
          <StatBox value={prediction.averageCycleLength} label="Average Cycle" color="purple" />
        </div>

        {prediction.isIrregular && (
          <div className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Irregular Pattern Detected
              </p>
              <p className="text-xs text-yellow-700">
                Your cycles show variation beyond normal ranges. Consider tracking 
                additional symptoms or consulting a healthcare provider.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}