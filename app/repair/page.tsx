import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Wrench, Clock, Shield, CheckCircle, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ViewRepairsModal } from "@/components/view-repairs-modal"

export default function RepairPage() {
  const services = [
    {
      icon: Wrench,
      title: "Hardware Repair",
      description: "Screen replacement, keyboard repair, battery replacement, and motherboard fixes.",
      price: "From ZMW 150",
    },
    {
      icon: Shield,
      title: "Software Solutions",
      description: "OS installation, virus removal, data recovery, and performance optimization.",
      price: "From ZMW 100",
    },
    {
      icon: Clock,
      title: "Quick Diagnostics",
      description: "Complete system diagnosis to identify issues and provide repair estimates.",
      price: "ZMW 50",
    },
  ]

  const repairProcess = [
    "Bring your laptop to our store",
    "Free diagnostic assessment",
    "Receive detailed repair quote",
    "Approve repair and timeline",
    "Professional repair service",
    "Quality testing and pickup",
  ]

  const commonIssues = [
    { issue: "Cracked Screen", price: "ZMW 300 - 800" },
    { issue: "Battery Replacement", price: "ZMW 200 - 400" },
    { issue: "Keyboard Repair", price: "ZMW 150 - 300" },
    { issue: "Hard Drive Replacement", price: "ZMW 250 - 500" },
    { issue: "Virus Removal", price: "ZMW 100 - 150" },
    { issue: "Data Recovery", price: "ZMW 200 - 600" },
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
              Repair <span className="text-secondary">with us</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert laptop repair services in Lusaka. Fast, reliable, and affordable solutions for all your technology
              needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Repair Services</h2>
            <p className="text-lg text-gray-600">Professional solutions for all laptop issues</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <p className="text-lg font-bold text-secondary">{service.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <ViewRepairsModal>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                View All Repair Services
              </Button>
            </ViewRepairsModal>
          </div>
        </div>
      </section>

      {/* Repair Process */}
      <section className="py-16 bg-stone-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Repair Process</h2>
            <p className="text-lg text-gray-600">Simple steps to get your laptop fixed</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {repairProcess.map((step, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues & Pricing */}
      <section className="py-16 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Issues & Pricing</h2>
            <p className="text-lg text-gray-600">Transparent pricing for common laptop repairs</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commonIssues.map((item, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-gray-900">{item.issue}</span>
                      </div>
                      <span className="font-bold text-secondary">{item.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Repair */}
      <section className="py-16 bg-stone-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white text-center">
                <CardTitle className="text-2xl">Book Your Repair Today</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Visit Our Store</h3>
                    <p className="text-gray-600 mb-4">
                      Chachacha road, Leeds Complex next to Bata, Shop No.7C, Lusaka, Zambia
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <span className="text-gray-700">+260 775523495</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <span className="text-gray-700">swiftvibeelectronics@gmail.com</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Us?</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Certified technicians</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">90-day warranty on repairs</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Free diagnostics</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Quick turnaround time</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                    Schedule Repair Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
