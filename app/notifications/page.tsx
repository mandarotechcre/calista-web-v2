"use client"

import { useState } from "react"
import { PrivateRoute } from "@/components/private-route"
import { Navigation } from "@/components/layout/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Bell, BellRing, Calendar, Droplets, Heart, AlertTriangle, Sparkles, BookOpen, X } from "lucide-react"
import { format } from "date-fns"
import { toast } from "@/hooks/use-toast"

interface Notification {
  id: string
  type:
    | "welcome"
    | "login"
    | "period_approaching"
    | "period_started"
    | "period_long"
    | "period_finished"
    | "clean_period"
    | "istihadah_clean"
    | "no_update"
  title: string
  message: string
  emoji: string
  isRead: boolean
  createdAt: string
  priority: "high" | "medium" | "low"
  actionText?: string
  actionUrl?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "welcome",
    title: "Selamat Datang, Ukhti! 🌸",
    message:
      "Halo Ukhti, selamat datang! Mulai catat haidmu dan pelajari panduan syariah-nya biar ibadah tetap tenang dan sesuai aturan.",
    emoji: "🌸",
    isRead: false,
    createdAt: new Date().toISOString(),
    priority: "high",
    actionText: "Mulai Catat Siklus",
    actionUrl: "/tracker",
  },
  {
    id: "2",
    type: "period_approaching",
    title: "Haid Akan Segera Tiba 📅",
    message:
      "Assalamu'alaikum Ukhti! Perkiraan Haid Segera Tiba. Menurut catatanmu, haid diperkirakan akan datang dalam beberapa hari lagi. Yuk mulai siapkan diri secara fisik dan spiritual 💖\n\n📌 Jangan lupa:\n• Periksa persediaan pembalut atau menstrual cup\n• Pelajari panduan syariah terkait hal-hal yang dilarang saat haid 📖\n\n🕊️ Tenang dan siap ya, Ukhti! Calista akan terus menemani dan mengingatkanmu~",
    emoji: "📅",
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    priority: "high",
    actionText: "Lihat Panduan Syariah",
    actionUrl: "/articles",
  },
  {
    id: "3",
    type: "period_started",
    title: "Menstruasi Datang? Pause Dulu Ibadahnya ✋",
    message:
      "Reminder: Batas haid maksimal 15 hari. Kalau masih keluar melebihi batas, bisa jadi itu bukan haid.\n\nUpdate data siklusmu terus biar Calista bisa jadi pengingat setia kamu.\n\nYuk, pelajari panduan syariah dan tips jaga kebersihannya di sini 🧕🔍",
    emoji: "🩸",
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    actionText: "Update Siklus",
    actionUrl: "/tracker",
  },
  {
    id: "4",
    type: "period_long",
    title: "Darah Masih Keluar Setelah 15 Hari? 📢",
    message:
      "Ups! Darah menstruasimu masih keluar setelah 15 hari ya? 🩸 Itu bisa termasuk istihadah, lho.\n\nYuk mulai dengan mandi wajib dulu, lalu pelajari tata cara sholat saat istihadah 🧕\n\n📖 Klik di sini untuk panduannya!",
    emoji: "⚠️",
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    priority: "high",
    actionText: "Pelajari Istihadah",
    actionUrl: "/articles",
  },
  {
    id: "5",
    type: "period_finished",
    title: "Selesai Menstruasi! 🩷",
    message:
      "Sudah selesai menstruasi sesuai prediksi? Kalau iya, saatnya persiapkan mandi wajib supaya bisa kembali ibadah dengan tenang.\n\nPeriode kali ini berlangsung selama 7 hari, dengan panjang siklus 28 hari.\n\n👉 Cek Riwayat Siklus kamu, ya! Kalau ada yang belum sesuai, bisa langsung edit biar datanya tetap akurat.\n\n📖 Butuh panduan mandi wajib dan syariatnya? Klik di sini untuk cek selengkapnya! 🧕✨",
    emoji: "🩷",
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    actionText: "Lihat Riwayat",
    actionUrl: "/history",
  },
  {
    id: "6",
    type: "clean_period",
    title: "Pengingat Masa Suci 📅",
    message:
      "Masa suci setelah haid terakhirmu diperkirakan berlangsung hingga 15 Februari 2024 (15 hari).\n\nJika darah keluar sebelum tanggal ini, itu kemungkinan bukan haid, melainkan darah istihadhah.\n\nUpdate data siklusmu terus biar Calista bisa jadi pengingat setia kamu.\n\n👉 Jangan lupa cek juga panduan syariat untuk memahami perbedaannya 🧕📖",
    emoji: "✨",
    isRead: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "low",
    actionText: "Pelajari Panduan",
    actionUrl: "/articles",
  },
  {
    id: "7",
    type: "istihadah_clean",
    title: "Darah Keluar di Masa Suci? 📢",
    message:
      "Ups, darah keluar padahal belum waktunya haid? Kamu masih dalam masa suci. Kalau belum 15 hari sejak menstruasi terakhir, ini bisa jadi istihadhah, bukan menstruasi.\n\n✨ Kalau benar istihadhah:\n👉 Lakukan mandi wajib dulu\n👉 Ikuti tata cara sholat wanita istihadhah\n👉 Pelajari juga materi lengkap seputar istihadhah\n\n📖 Cek panduan syariahnya biar ibadah kamu tetap sah & tenang 🧕✅",
    emoji: "🔍",
    isRead: true,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "high",
    actionText: "Panduan Istihadah",
    actionUrl: "/articles",
  },
  {
    id: "8",
    type: "no_update",
    title: "Belum Ada Update Menstruasi? 🔍",
    message:
      "Belum ada update menstruasi bulan ini? Kalau kamu belum haid atau lupa update, coba cek lagi siklusnya, ya.\n\n❗ Kalau sudah lewat dari perkiraan haid tapi belum juga datang, lebih baik periksa ke fasilitas kesehatan terdekat untuk memastikan semuanya aman.\n\n🗓 Jangan lupa rutin update data siklusmu di Calista biar sistemnya bisa kasih pengingat yang tepat 🎀",
    emoji: "📝",
    isRead: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    actionText: "Update Sekarang",
    actionUrl: "/tracker",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all")

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.isRead
    if (filter === "read") return notification.isRead
    return true
  })

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification)
    setIsDialogOpen(true)

    // Mark as read if not already read
    if (!notification.isRead) {
      setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)))
    }
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    toast({
      title: "Berhasil",
      description: "Semua notifikasi telah ditandai sebagai dibaca",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "welcome":
        return <Heart className="w-5 h-5 text-pink-500" />
      case "login":
        return <Sparkles className="w-5 h-5 text-purple-500" />
      case "period_approaching":
        return <Calendar className="w-5 h-5 text-blue-500" />
      case "period_started":
        return <Droplets className="w-5 h-5 text-red-500" />
      case "period_long":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case "period_finished":
        return <Heart className="w-5 h-5 text-green-500" />
      case "clean_period":
        return <Sparkles className="w-5 h-5 text-teal-500" />
      case "istihadah_clean":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "no_update":
        return <BookOpen className="w-5 h-5 text-gray-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
              <BellRing className="w-8 h-8 text-pink-600" />
              <span>Notifikasi</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} baru
                </Badge>
              )}
            </h1>
            <p className="text-gray-600 mt-2">Pantau pengingat dan informasi penting seputar siklus menstruasimu</p>
          </div>

          {/* Filter and Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex space-x-2">
              <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                Semua ({notifications.length})
              </Button>
              <Button
                variant={filter === "unread" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("unread")}
              >
                Belum Dibaca ({unreadCount})
              </Button>
              <Button variant={filter === "read" ? "default" : "outline"} size="sm" onClick={() => setFilter("read")}>
                Sudah Dibaca ({notifications.length - unreadCount})
              </Button>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                Tandai Semua Dibaca
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Tidak ada notifikasi</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {filter === "unread" ? "Semua notifikasi sudah dibaca" : "Belum ada notifikasi tersedia"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    !notification.isRead ? "border-l-4 border-l-pink-500 bg-pink-50/30" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">{getTypeIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                              <span>{notification.title}</span>
                              {!notification.isRead && <div className="w-2 h-2 bg-pink-500 rounded-full"></div>}
                            </h3>
                            <p className="text-gray-600 mt-1 line-clamp-2">{notification.message.split("\n")[0]}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm text-gray-500">
                                {format(new Date(notification.createdAt), "dd MMM yyyy, HH:mm")}
                              </span>
                              <Badge variant="outline" className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                {notification.priority === "high"
                                  ? "Penting"
                                  : notification.priority === "medium"
                                    ? "Sedang"
                                    : "Rendah"}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-2xl ml-4">{notification.emoji}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Notification Detail Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              {selectedNotification && (
                <>
                  <DialogHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(selectedNotification.type)}
                        <DialogTitle className="text-xl">{selectedNotification.title}</DialogTitle>
                        <span className="text-2xl">{selectedNotification.emoji}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setIsDialogOpen(false)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <DialogDescription className="text-sm text-gray-500">
                      {format(new Date(selectedNotification.createdAt), "dd MMMM yyyy, HH:mm")}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <div className="prose max-w-none">
                      {selectedNotification.message.split("\n").map((line, index) => (
                        <p key={index} className="mb-2 text-gray-700 leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                    {selectedNotification.actionText && selectedNotification.actionUrl && (
                      <div className="mt-6 pt-4 border-t">
                        <Button
                          className="w-full sm:w-auto"
                          onClick={() => {
                            // Navigate to action URL
                            window.location.href = selectedNotification.actionUrl!
                          }}
                        >
                          {selectedNotification.actionText}
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </PrivateRoute>
  )
}
