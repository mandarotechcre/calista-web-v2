"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Calendar, History, BookOpen, LogOut, Menu, Heart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Tracker", href: "/dashboard", icon: Calendar },
  { name: "History", href: "/history", icon: History },
  { name: "Articles", href: "/articles", icon: BookOpen },
]

export function Navigation() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-pink-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-pink-600" />
              <span className="text-xl font-bold text-gray-900">CycleTracker</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? "bg-pink-100 text-pink-700" : "text-gray-600 hover:text-pink-600 hover:bg-pink-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
            <div className="flex items-center space-x-4 ml-8 pl-8 border-l border-gray-200">
              <span className="text-sm text-gray-600">Hi, {user?.username}</span>
              <Button onClick={logout} variant="ghost" size="sm" className="text-gray-600 hover:text-pink-600">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive ? "bg-pink-100 text-pink-700" : "text-gray-600 hover:text-pink-600 hover:bg-pink-50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <div className="px-3 py-2 text-sm text-gray-600">Hi, {user?.username}</div>
                    <Button
                      onClick={() => {
                        logout()
                        setIsOpen(false)
                      }}
                      variant="ghost"
                      className="w-full justify-start text-gray-600 hover:text-pink-600"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
