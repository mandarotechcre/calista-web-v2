"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Zap } from "lucide-react"

export function DevHelper() {
  const [showHelper, setShowHelper] = useState(false)

  if (process.env.NODE_ENV === "production") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {showHelper && (
        <Card className="mb-4 w-80 shadow-lg border-2 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Code className="w-4 h-4 text-blue-600" />
              <span>Development Helper</span>
              <Badge variant="secondary" className="text-xs">
                DEV
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex items-start space-x-2">
              <Database className="w-4 h-4 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Authentication</p>
                <p className="text-gray-600">Hardcoded - any email/password works</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Zap className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium">API Calls</p>
                <p className="text-gray-600">Mocked - check console for logs</p>
              </div>
            </div>
            <div className="pt-2 border-t">
              <p className="text-gray-500">Ready for production: uncomment API calls in auth-context.tsx and api.ts</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Button onClick={() => setShowHelper(!showHelper)} size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-lg">
        <Code className="w-4 h-4" />
      </Button>
    </div>
  )
}
