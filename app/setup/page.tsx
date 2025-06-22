"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Loader2, Database, AlertCircle } from "lucide-react"

export default function SetupPage() {
  const [dbStatus, setDbStatus] = useState<any>(null)
  const [initStatus, setInitStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [initLoading, setInitLoading] = useState(false)

  const checkDatabaseStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/db-status")
      const data = await response.json()
      setDbStatus(data)
    } catch (error) {
      setDbStatus({ status: "error", error: "Failed to connect" })
    } finally {
      setLoading(false)
    }
  }

  const initializeDatabase = async () => {
    setInitLoading(true)
    try {
      const response = await fetch("/api/init-db", { method: "POST" })
      const data = await response.json()
      setInitStatus(data)
      // Refresh status after initialization
      setTimeout(checkDatabaseStatus, 1000)
    } catch (error) {
      setInitStatus({ error: "Failed to initialize database" })
    } finally {
      setInitLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Swift-Vibe Database Setup</h1>
          <p className="text-gray-600">
            Initialize your Vercel Postgres database for the Swift-Vibe Electronics website
          </p>
        </div>

        <div className="grid gap-6">
          {/* Database Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Connection Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Connection Status:</span>
                {dbStatus ? (
                  <Badge variant={dbStatus.status === "connected" ? "default" : "destructive"}>
                    {dbStatus.status === "connected" ? (
                      <CheckCircle className="h-4 w-4 mr-1" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-1" />
                    )}
                    {dbStatus.status}
                  </Badge>
                ) : (
                  <Badge variant="secondary">Not checked</Badge>
                )}
              </div>

              {dbStatus?.tables && (
                <div>
                  <span className="font-medium">Tables:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {dbStatus.tables.map((table: string) => (
                      <Badge key={table} variant="outline">
                        {table}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {dbStatus?.laptopCount && (
                <div className="flex items-center justify-between">
                  <span>Laptops in Database:</span>
                  <Badge variant="secondary">{dbStatus.laptopCount}</Badge>
                </div>
              )}

              {dbStatus?.error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-800">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">Error:</span>
                  </div>
                  <p className="text-red-700 mt-1">{dbStatus.error}</p>
                </div>
              )}

              <Button onClick={checkDatabaseStatus} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  "Check Database Status"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Database Initialization Card */}
          <Card>
            <CardHeader>
              <CardTitle>Database Initialization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Initialize your database with the required tables and default laptop data.
              </p>

              {initStatus && (
                <div
                  className={`p-3 rounded-lg border ${
                    initStatus.error ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
                  }`}
                >
                  {initStatus.error ? (
                    <div className="text-red-800">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4" />
                        <span className="font-medium">Initialization Failed</span>
                      </div>
                      <p className="mt-1">{initStatus.error}</p>
                    </div>
                  ) : (
                    <div className="text-green-800">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-medium">Database Initialized Successfully!</span>
                      </div>
                      <p className="mt-1">{initStatus.message}</p>
                      {initStatus.tablesCreated && (
                        <div className="mt-2">
                          <span className="text-sm">Tables created: </span>
                          {initStatus.tablesCreated.join(", ")}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <Button onClick={initializeDatabase} disabled={initLoading} className="w-full" variant="default">
                {initLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Initializing...
                  </>
                ) : (
                  "Initialize Database"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Setup Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Setup Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Create Vercel Postgres Database</h4>
                    <p className="text-sm text-gray-600">
                      Go to your Vercel dashboard → Storage → Create Database → Postgres
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Add Environment Variables</h4>
                    <p className="text-sm text-gray-600">Copy the connection strings to your environment variables</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Check Connection</h4>
                    <p className="text-sm text-gray-600">Use the "Check Database Status" button above</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium">Initialize Database</h4>
                    <p className="text-sm text-gray-600">
                      Click "Initialize Database" to create tables and add default data
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
