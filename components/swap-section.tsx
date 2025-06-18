"use client"

import { useState } from "react"
import { ArrowRight, Calculator, RefreshCw, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SwapSection() {
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("")
  const [condition, setCondition] = useState("")
  const [quote, setQuote] = useState<number | null>(null)

  const calculateQuote = () => {
    if (!brand || !model || !year || !condition) {
      alert("Please fill in all fields")
      return
    }

    // Simple quote calculation logic
    const baseValue = 5000

    // Brand multiplier
    const brandMultipliers: { [key: string]: number } = {
      Apple: 1.5,
      Dell: 1.2,
      HP: 1.1,
      Lenovo: 1.3,
      Microsoft: 1.4,
      Other: 1.0,
    }

    // Year multiplier
    const currentYear = new Date().getFullYear()
    const deviceYear = Number.parseInt(year)
    const yearDiff = currentYear - deviceYear
    const yearMultiplier = Math.max(0.3, 1 - yearDiff * 0.15)

    // Condition multiplier
    const conditionMultipliers: { [key: string]: number } = {
      Excellent: 1.0,
      Good: 0.8,
      Fair: 0.6,
      Poor: 0.3,
    }

    const calculatedQuote = Math.round(
      baseValue * (brandMultipliers[brand] || 1) * yearMultiplier * (conditionMultipliers[condition] || 0.5),
    )

    setQuote(calculatedQuote)
  }

  const resetForm = () => {
    setBrand("")
    setModel("")
    setYear("")
    setCondition("")
    setQuote(null)
  }

  return (
    <section className="py-16 bg-stone-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Swap & Top-up Program</h2>
          <p className="mt-4 text-lg text-gray-600">
            Upgrade your laptop seamlessly. Trade in your old device and top up for the latest model.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Calculator className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Get Instant Valuation</h3>
                  <p className="text-gray-600">
                    Use our online tool to get an instant quote for your current laptop. Fair prices guaranteed.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <RefreshCw className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Easy Exchange Process</h3>
                  <p className="text-gray-600">
                    Bring your old laptop to our store or schedule a pickup. We handle the rest while you choose your
                    upgrade.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Smartphone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Top-up & Upgrade</h3>
                  <p className="text-gray-600">
                    Pay only the difference to upgrade to your dream laptop. Flexible payment options available.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Your Trade-in
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="lg:pl-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
                <CardTitle className="text-center">Trade-in Calculator</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Laptop Brand</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    >
                      <option value="">Select Brand</option>
                      <option value="Apple">Apple</option>
                      <option value="Dell">Dell</option>
                      <option value="HP">HP</option>
                      <option value="Lenovo">Lenovo</option>
                      <option value="Microsoft">Microsoft</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                    <input
                      type="text"
                      placeholder="e.g., MacBook Air M1"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option value="">Select Year</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                    >
                      <option value="">Select Condition</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>

                  {quote && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2">Your Estimated Quote</h3>
                      <p className="text-2xl font-bold text-green-600">ZMW {quote.toLocaleString()}</p>
                      <p className="text-sm text-green-700 mt-2">
                        This is an estimated value. Final quote may vary based on physical inspection.
                      </p>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button onClick={calculateQuote} className="flex-1 bg-secondary hover:bg-secondary/90 text-white">
                      Get Instant Quote
                    </Button>
                    {quote && (
                      <Button onClick={resetForm} variant="outline">
                        Reset
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
