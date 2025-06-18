import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { ArrowRight, Calculator, RefreshCw, CheckCircle, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SwapPage() {
  const steps = [
    {
      icon: Calculator,
      title: "Get Instant Valuation",
      description: "Use our online tool to get an instant quote for your current laptop. Fair prices guaranteed.",
    },
    {
      icon: RefreshCw,
      title: "Easy Exchange Process",
      description:
        "Bring your old laptop to our store or schedule a pickup. We handle the rest while you choose your upgrade.",
    },
    {
      icon: DollarSign,
      title: "Top-up & Upgrade",
      description: "Pay only the difference to upgrade to your dream laptop. Flexible payment options available.",
    },
  ]

  const benefits = [
    "Fair market value for your device",
    "Professional device assessment",
    "Instant credit towards new purchase",
    "Flexible payment plans available",
    "Free pickup service for bulk trades",
    "Data transfer assistance included",
  ]

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-stone-50 to-stone-100 py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Image
              src="/images/swift-vibe-logo.png"
              alt="Swift-Vibe Electronics"
              width={300}
              height={100}
              className="h-16 w-auto mx-auto mb-6"
              priority
            />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
              Swap & <span className="text-secondary">Top-up</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Upgrade your laptop seamlessly. Trade in your old device and top up for the latest model.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Simple steps to upgrade your laptop</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trade-in Calculator */}
      <section className="py-16 bg-stone-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get Your Quote Today</h2>
              <p className="text-lg text-gray-600 mb-8">
                Find out how much your current laptop is worth and discover your upgrade options.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Your Trade-in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
                  <CardTitle className="text-center">Trade-in Calculator</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Laptop Brand</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>Select Brand</option>
                        <option>Apple</option>
                        <option>Dell</option>
                        <option>HP</option>
                        <option>Lenovo</option>
                        <option>Microsoft</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                      <input
                        type="text"
                        placeholder="e.g., MacBook Air M1"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>Select Year</option>
                        <option>2024</option>
                        <option>2023</option>
                        <option>2022</option>
                        <option>2021</option>
                        <option>2020</option>
                        <option>Older</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>Excellent - Like new</option>
                        <option>Good - Minor wear</option>
                        <option>Fair - Visible wear</option>
                        <option>Poor - Significant damage</option>
                      </select>
                    </div>

                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">Get Instant Quote</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Upgrade?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Visit our store at Leeds Complex or contact us to start your laptop upgrade journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Visit Our Store
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Call +260 775523495
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
