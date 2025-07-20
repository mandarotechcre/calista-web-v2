"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import ClientWrapper from "@/components/client-wrapper"

export default function LoginPage() {
  const [email, setEmail] = useState("putri.calista.syafii@gmail.com")
  const [password, setPassword] = useState("Fauzanputri")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const { login, register, isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, authLoading, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        toast({
          title: "Berhasil Masuk",
          description: "Mengalihkan ke dashboard...",
        })
        router.push("/dashboard")
      }
    } catch (error: any) {
      toast({
        title: "Gagal Masuk",
        description: error.response?.data?.message || "Terjadi kesalahan saat masuk",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await register(email, password)
      if (success) {
        toast({
          title: "Registrasi Berhasil",
          description: "Akun berhasil dibuat. Silakan masuk.",
        })
        setPassword("")
        setActiveTab("login")
      }
    } catch (error: any) {
      toast({
        title: "Gagal Registrasi",
        description: error.response?.data?.message || "Terjadi kesalahan saat registrasi",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ClientWrapper>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Selamat Datang di Calista</CardTitle>
            <CardDescription>Lacak siklus menstruasi kamu dengan percaya diri</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Masuk</TabsTrigger>
                <TabsTrigger value="register">Daftar</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email/Nama Pengguna</Label>
                    <Input 
                      id="email" 
                      type="text" 
                      placeholder="Masukkan email atau nama pengguna"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Kata Sandi</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Masukkan kata sandi"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={3}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-pink-600 hover:bg-pink-700" 
                    disabled={isLoading || authLoading}
                  >
                    {isLoading ? "Sedang masuk..." : "Masuk"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-username">Email/Nama Pengguna</Label>
                    <Input
                      id="reg-username"
                      type="text"
                      placeholder="Masukkan email atau nama pengguna"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Kata Sandi</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="Pilih kata sandi (min. 3 karakter)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={3}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-pink-600 hover:bg-pink-700" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Membuat akun..." : "Daftar"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ClientWrapper>
  )
}