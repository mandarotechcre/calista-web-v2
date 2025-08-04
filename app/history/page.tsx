"use client"

import { useEffect, useState } from "react"
import { PrivateRoute } from "@/components/private-route"
import { Navigation } from "@/components/layout/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { History, Calendar, AlertTriangle, Edit, Save, X } from "lucide-react"
import { format, parseISO } from "date-fns"
import { toast } from "@/hooks/use-toast"

interface CycleHistory {
  id?: string
  startDate: string
  endDate: string
  peakDate?: string | null
  duration: number
  cycleLength?: number | null
  isIstihaadhah: boolean
}

interface EditFormData {
  startDate: string
  endDate: string
  peakDate: string
  duration: number
  cycleLength: number
  isIstihaadhah: boolean
}

export default function HistoryPage() {
  const [cycles, setCycles] = useState<CycleHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<EditFormData>({
    startDate: "",
    endDate: "",
    peakDate: "",
    duration: 0,
    cycleLength: 0,
    isIstihaadhah: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchCycles = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:8080/api/v1/menstrual/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) throw new Error("Gagal mengambil data riwayat siklus")
        const data = await response.json()
        setCycles(data || [])
      } catch (error) {
        console.error("Gagal mengambil data:", error)
        setCycles([])
        toast({
          title: "Error",
          description: "Gagal mengambil data riwayat siklus",
          variant: "destructive",
        })
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

  const handleEdit = (cycle: CycleHistory, index: number) => {
    const cycleId = cycle.id || index.toString()
    setEditingId(cycleId)
    setEditForm({
      startDate: cycle.startDate.split("T")[0], // Convert to YYYY-MM-DD format
      endDate: cycle.endDate.split("T")[0],
      peakDate: cycle.peakDate ? cycle.peakDate.split("T")[0] : "",
      duration: cycle.duration,
      cycleLength: cycle.cycleLength || 0,
      isIstihaadhah: cycle.isIstihaadhah,
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm({
      startDate: "",
      endDate: "",
      peakDate: "",
      duration: 0,
      cycleLength: 0,
      isIstihaadhah: false,
    })
  }

  const handleSaveEdit = async () => {
    if (!editingId) return

    setIsSubmitting(true)
    try {
      const token = localStorage.getItem("token")

      // Calculate duration based on dates
      const startDate = new Date(editForm.startDate)
      const endDate = new Date(editForm.endDate)
      const calculatedDuration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

      const updateData = {
        startDate: editForm.startDate,
        endDate: editForm.endDate,
        peakDate: editForm.peakDate || null,
        duration: calculatedDuration,
        cycleLength: editForm.cycleLength || null,
        isIstihaadhah: editForm.isIstihaadhah,
      }

      const response = await fetch(`http://localhost:8080/api/v1/menstrual/history/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) throw new Error("Gagal mengupdate data siklus")

      // Update local state
      setCycles((prevCycles) =>
        prevCycles.map((cycle, index) => {
          const cycleId = cycle.id || index.toString()
          if (cycleId === editingId) {
            return {
              ...cycle,
              ...updateData,
              duration: calculatedDuration,
            }
          }
          return cycle
        }),
      )

      toast({
        title: "Berhasil",
        description: "Data siklus berhasil diperbarui",
      })

      handleCancelEdit()
    } catch (error) {
      console.error("Gagal mengupdate data:", error)
      toast({
        title: "Error",
        description: "Gagal mengupdate data siklus",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFormChange = (field: keyof EditFormData, value: string | number | boolean) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }))
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
              <span>Riwayat Siklus</span>
            </h1>
            <p className="text-gray-600 mt-2">Lihat riwayat lengkap dan pola siklus menstruasimu</p>
          </div>

          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-pink-600">{stats.totalCycles}</div>
                  <div className="text-sm text-gray-600">Total Siklus</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.avgDuration}</div>
                  <div className="text-sm text-gray-600">Rata-rata Durasi (hari)</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.avgCycleLength}</div>
                  <div className="text-sm text-gray-600">Rata-rata Panjang Siklus</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{stats.irregularCycles}</div>
                  <div className="text-sm text-gray-600">Siklus Tidak Teratur</div>
                </CardContent>
              </Card>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Riwayat Menstruasi</CardTitle>
              <CardDescription>Catatan siklus menstruasi kamu yang tersimpan</CardDescription>
            </CardHeader>
            <CardContent>
              {cycles.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Belum ada data riwayat siklus</p>
                  <p className="text-sm text-gray-500 mt-2">Mulai lacak siklus kamu untuk melihat riwayat di sini</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cycles.map((cycle, index) => {
                    const cycleId = cycle.id || index.toString()
                    const isEditing = editingId === cycleId

                    return (
                      <div key={index} className="border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        {isEditing ? (
                          // Edit Form
                          <div className="p-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="startDate">Tanggal Mulai</Label>
                                <Input
                                  id="startDate"
                                  type="date"
                                  value={editForm.startDate}
                                  onChange={(e) => handleFormChange("startDate", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="endDate">Tanggal Selesai</Label>
                                <Input
                                  id="endDate"
                                  type="date"
                                  value={editForm.endDate}
                                  onChange={(e) => handleFormChange("endDate", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="peakDate">Hari Puncak (Opsional)</Label>
                                <Input
                                  id="peakDate"
                                  type="date"
                                  value={editForm.peakDate}
                                  onChange={(e) => handleFormChange("peakDate", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="cycleLength">Panjang Siklus (hari)</Label>
                                <Input
                                  id="cycleLength"
                                  type="number"
                                  value={editForm.cycleLength}
                                  onChange={(e) =>
                                    handleFormChange("cycleLength", Number.parseInt(e.target.value) || 0)
                                  }
                                />
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="isIstihaadhah"
                                checked={editForm.isIstihaadhah}
                                onCheckedChange={(checked) => handleFormChange("isIstihaadhah", checked as boolean)}
                              />
                              <Label htmlFor="isIstihaadhah">Istihaadhah (Pendarahan Tidak Normal)</Label>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                onClick={handleSaveEdit}
                                disabled={isSubmitting}
                                className="flex items-center space-x-2"
                              >
                                <Save className="w-4 h-4" />
                                <span>{isSubmitting ? "Menyimpan..." : "Simpan"}</span>
                              </Button>
                              <Button
                                variant="outline"
                                onClick={handleCancelEdit}
                                disabled={isSubmitting}
                                className="flex items-center space-x-2 bg-transparent"
                              >
                                <X className="w-4 h-4" />
                                <span>Batal</span>
                              </Button>
                            </div>
                          </div>
                        ) : (
                          // Display Mode
                          <div className="flex flex-col md:flex-row md:items-center justify-between p-4">
                            <div className="flex-1 space-y-2 md:space-y-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-medium">
                                  {format(parseISO(cycle.startDate), "dd MMM yyyy")} -{" "}
                                  {format(parseISO(cycle.endDate), "dd MMM yyyy")}
                                </span>
                                {cycle.isIstihaadhah && (
                                  <Badge variant="destructive" className="flex items-center space-x-1">
                                    <AlertTriangle className="w-3 h-3" />
                                    <span>Istihaadhah</span>
                                  </Badge>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <span>Durasi: {cycle.duration} hari</span>
                                {cycle.cycleLength && <span>Panjang Siklus: {cycle.cycleLength} hari</span>}
                                {cycle.peakDate && (
                                  <span>Hari Puncak: {format(parseISO(cycle.peakDate), "dd MMM")}</span>
                                )}
                              </div>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(cycle, index)}
                                className="flex items-center space-x-2"
                              >
                                <Edit className="w-4 h-4" />
                                <span>Edit</span>
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </PrivateRoute>
  )
}
