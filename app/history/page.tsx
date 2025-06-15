"use client"

import { useEffect, useState } from "react"
import { PrivateRoute } from "@/components/private-route"
import { Navigation } from "@/components/layout/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, Calendar, AlertTriangle } from "lucide-react"
import { format, parseISO } from "date-fns"

interface CycleHistory {
  id?: string
  startDate: string
  endDate: string
  peakDate?: string | null
  duration: number
  cycleLength?: number | null
  isIstihaadhah: boolean
}

export default function HistoryPage() {
  const [cycles, setCycles] = useState<CycleHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCycles = async () => {
      try {
        const token = localStorage.getItem("token") // sesuaikan jika token disimpan di tempat lain
        const response = await fetch("http://localhost:8080/api/v1/menstrual/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error("Failed to fetch cycle history")

        const data = await response.json()
        setCycles(data || [])
      } catch (error) {
        console.error("Error fetching data:", error)
        setCycles([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCycles()
  }, [])

  const getAverageStats = () => {
    if (cycles.length === 0) return null

    const avgDuration = cycles.reduce((sum, cycle) => sum + cycle.duration, 0) / cycles.length
    const validCycles = cycles.filter((cycle) => cycle.cycleLength != null)
    const avgCycleLength = validCycles.reduce((sum, cycle) => sum + (cycle.cycleLength || 0), 0) / validCycles.length

    return {
      avgDuration: Math.round(avgDuration * 10) / 10,
      avgCycleLength: Math.round(avgCycleLength * 10) / 10,
      totalCycles: cycles.length,
      irregularCycles: cycles.filter((cycle) => cycle.isIstihaadhah).length,
    }
  }

  const stats = getAverageStats()

  if (isLoading) {
    return (
      <PrivateRoute>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </main>
        </div>
      </PrivateRoute>
    )
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
              <History className="w-8 h-8 text-pink-600" />
              <span>Cycle History</span>
            </h1>
            <p className="text-gray-600 mt-2">View your complete menstrual cycle history and patterns</p>
          </div>

          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-pink-600">{stats.totalCycles}</div>
                  <div className="text-sm text-gray-600">Total Cycles</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.avgDuration}</div>
                  <div className="text-sm text-gray-600">Avg Duration (days)</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.avgCycleLength}</div>
                  <div className="text-sm text-gray-600">Avg Cycle Length</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{stats.irregularCycles}</div>
                  <div className="text-sm text-gray-600">Irregular Cycles</div>
                </CardContent>
              </Card>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Cycle History</CardTitle>
              <CardDescription>Your complete menstrual cycle records</CardDescription>
            </CardHeader>
            <CardContent>
              {cycles.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No cycle history available</p>
                  <p className="text-sm text-gray-500 mt-2">Start tracking your cycles to see history here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cycles.map((cycle, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 space-y-2 md:space-y-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">
                            {format(parseISO(cycle.startDate), "MMM dd, yyyy")} -{" "}
                            {format(parseISO(cycle.endDate), "MMM dd, yyyy")}
                          </span>
                          {cycle.isIstihaadhah && (
                            <Badge variant="destructive" className="flex items-center space-x-1">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Istihaadhah</span>
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span>Duration: {cycle.duration} days</span>
                          {cycle.cycleLength && <span>Cycle Length: {cycle.cycleLength} days</span>}
                          {cycle.peakDate && <span>Peak: {format(parseISO(cycle.peakDate), "MMM dd")}</span>}
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </PrivateRoute>
  )
}
