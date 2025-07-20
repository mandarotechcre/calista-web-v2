"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Droplets, TrendingUp, CalendarIcon, Loader2 } from "lucide-react"
import { format, isSameDay, differenceInDays, parseISO } from "date-fns"
import { useAuth } from "@/lib/auth-context"
import { toast } from "@/components/ui/use-toast"

interface CycleEvent {
  date: Date
  type: "start" | "peak" | "end"
  cycleId?: string
}

interface CurrentCycle {
  id?: string
  startDate?: Date
  peakDate?: Date | null
  endDate?: Date | null
  duration?: number | null
  isActive?: boolean
  isIstihaadhah?: boolean
  cycleLength?: number
  lastMenstrual?: Date
  createdAt?: Date
}

interface ApiActiveCycleResponse {
  lastMenstrual: string | null
  cycleLength: number | null
  startDate: string | null
  endDate: string | null
  peakDate: string | null
  duration: number | null
  isIstihaadhah: boolean
  isActive: boolean
  createdAt: string | null
}

export function CalendarTracker() {
  const { token } = useAuth()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [currentCycle, setCurrentCycle] = useState<CurrentCycle | null>(null)
  const [cycleEvents, setCycleEvents] = useState<CycleEvent[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedEventType, setSelectedEventType] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  // Fetch active cycle on component mount
  useEffect(() => {
    const fetchActiveCycle = async () => {
      if (!token) return

      try {
        setIsLoading(true)
        const response = await fetch("http://localhost:8080/api/v1/menstrual/active", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data: ApiActiveCycleResponse = await response.json()

          if (data.startDate) {
            const cycle: CurrentCycle = {
              id: data.createdAt || Date.now().toString(),
              startDate: data.startDate ? parseISO(data.startDate) : undefined,
              peakDate: data.peakDate ? parseISO(data.peakDate) : null,
              endDate: data.endDate ? parseISO(data.endDate) : null,
              duration: data.duration,
              isActive: data.isActive,
              isIstihaadhah: data.isIstihaadhah,
              cycleLength: data.cycleLength ? data.cycleLength : 0,
              lastMenstrual: data.lastMenstrual ? parseISO(data.lastMenstrual) : undefined,
              createdAt: data.createdAt ? parseISO(data.createdAt) : undefined,
            }

            setCurrentCycle(cycle)

            // Create cycle events based on API response
            const events: CycleEvent[] = []
            if (data.startDate) {
              events.push({
                date: parseISO(data.startDate),
                type: "start",
                cycleId: data.createdAt || undefined,
              })
            }
            if (data.peakDate) {
              events.push({
                date: parseISO(data.peakDate),
                type: "peak",
                cycleId: data.createdAt || undefined,
              })
            }
            if (data.endDate) {
              events.push({
                date: parseISO(data.endDate),
                type: "end",
                cycleId: data.createdAt || undefined,
              })
            }
            setCycleEvents(events)
          }
        }
      } catch (error) {
        console.error("Error fetching active cycle:", error)
        toast({
          title: "Kesalahan",
          description: "Gagal memuat data siklus",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchActiveCycle()
  }, [token])

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return
    setSelectedDate(date)
    setIsDialogOpen(true)
  }

  const handleEventAdd = async () => {
    if (!selectedDate || !selectedEventType || !token) return

    try {
      setIsLoading(true)
      const actionType = selectedEventType.toUpperCase()
      const dateString = format(selectedDate, "yyyy-MM-dd")

      const response = await fetch("http://localhost:8080/api/v1/menstrual/mark-it", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: dateString,
          actionType,
        }),
      })

      if (response.ok) {
        toast({
          title: "Berhasil",
          description: `Peristiwa siklus berhasil ditandai`,
        })

        // Refresh the active cycle data
        const cycleResponse = await fetch("http://localhost:8080/api/v1/menstrual/active", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (cycleResponse.ok) {
          const data: ApiActiveCycleResponse = await cycleResponse.json()

          if (data.startDate) {
            const cycle: CurrentCycle = {
              id: data.createdAt || Date.now().toString(),
              startDate: data.startDate ? parseISO(data.startDate) : undefined,
              peakDate: data.peakDate ? parseISO(data.peakDate) : null,
              endDate: data.endDate ? parseISO(data.endDate) : null,
              duration: data.duration,
              isActive: data.isActive,
              isIstihaadhah: data.isIstihaadhah,
              cycleLength: data.cycleLength ? data.cycleLength : 0,
              lastMenstrual: data.lastMenstrual ? parseISO(data.lastMenstrual) : undefined,
              createdAt: data.createdAt ? parseISO(data.createdAt) : undefined,
            }

            setCurrentCycle(cycle)

            // Update cycle events
            const events: CycleEvent[] = []
            if (data.startDate) {
              events.push({
                date: parseISO(data.startDate),
                type: "start",
                cycleId: data.createdAt || undefined,
              })
            }
            if (data.peakDate) {
              events.push({
                date: parseISO(data.peakDate),
                type: "peak",
                cycleId: data.createdAt || undefined,
              })
            }
            if (data.endDate) {
              events.push({
                date: parseISO(data.endDate),
                type: "end",
                cycleId: data.createdAt || undefined,
              })
            }
            setCycleEvents(events)
          }
        }
      } else {
        throw new Error("Failed to mark event")
      }
    } catch (error) {
      console.error("Error marking cycle event:", error)
      toast({
        title: "Kesalahan",
        description: "Gagal menandai peristiwa siklus",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsDialogOpen(false)
      setSelectedEventType("")
    }
  }

  const getEventForDate = (date: Date): CycleEvent | undefined => {
    return cycleEvents.find((event) => isSameDay(event.date, date))
  }

  const getCurrentCycleInfo = () => {
    if (!currentCycle?.startDate) return null

    const duration =
      currentCycle.duration ||
      (currentCycle.startDate ? differenceInDays(new Date(), currentCycle.startDate) + 1 : null)

    return {
      duration,
      isActive: currentCycle.isActive,
      startDate: currentCycle.startDate,
      peakDate: currentCycle.peakDate,
      endDate: currentCycle.endDate,
      isIstihaadhah: currentCycle.isIstihaadhah,
      cycleLength: currentCycle.cycleLength,
    }
  }

  const cycleInfo = getCurrentCycleInfo()

  return (
    <div className="space-y-6">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-pink-600" />
                <span>Pelacak Siklus</span>
              </CardTitle>
              <CardDescription>Klik pada tanggal untuk menandai peristiwa siklus Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border"
                modifiers={{
                  start: (date: Date) => getEventForDate(date)?.type === "start",
                  peak: (date: Date) => getEventForDate(date)?.type === "peak",
                  end: (date: Date) => getEventForDate(date)?.type === "end",
                }}
                modifiersClassNames={{
                  start: "bg-pink-500 text-white hover:bg-pink-600",
                  peak: "bg-red-500 text-white hover:bg-red-600",
                  end: "bg-purple-500 text-white hover:bg-purple-600",
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Droplets className="w-5 h-5 text-pink-600" />
                <span>Siklus Saat Ini</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cycleInfo ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge variant={cycleInfo.isActive ? "default" : "secondary"}>
                      {cycleInfo.isActive ? "Aktif" : "Selesai"}
                    </Badge>
                  </div>

                  {cycleInfo.startDate && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tanggal Mulai</span>
                      <span className="font-medium">{format(cycleInfo.startDate, "MMM dd")}</span>
                    </div>
                  )}
                  {cycleInfo.peakDate && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tanggal Puncak</span>
                      <span className="font-medium">{format(cycleInfo.peakDate, "MMM dd")}</span>
                    </div>
                  )}
                  {cycleInfo.endDate && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tanggal Berakhir</span>
                      <span className="font-medium">{format(cycleInfo.endDate, "MMM dd")}</span>
                    </div>
                  )}
                  {cycleInfo.isIstihaadhah && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge variant="destructive">Istihadhah</Badge>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-600">Tidak ada siklus aktif. Klik pada tanggal untuk mulai melacak.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-pink-600" />
                <span>Keterangan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-pink-500 rounded"></div>
                <span className="text-sm">Awal menstruasi</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">Aliran puncak</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-sm">Akhir menstruasi</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tandai Peristiwa Siklus</DialogTitle>
            <DialogDescription>
              Apa yang terjadi pada {selectedDate && format(selectedDate, "MMMM dd, yyyy")}?
            </DialogDescription>
          </DialogHeader>
          <RadioGroup value={selectedEventType} onValueChange={setSelectedEventType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="start" id="start" />
              <Label htmlFor="start">Awal menstruasi</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="peak" id="peak" />
              <Label htmlFor="peak">Hari aliran puncak</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="end" id="end" />
              <Label htmlFor="end">Akhir menstruasi</Label>
            </div>
          </RadioGroup>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleEventAdd} disabled={!selectedEventType || isLoading}>
              {isLoading ? "Memproses..." : "Tambah Peristiwa"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}