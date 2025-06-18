import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Leaf, Recycle, Award, Users, Truck, Shield, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SchedulePickupModal } from "@/components/schedule-pickup-modal"

export default function RecyclePage() {
  const stats = [
    { icon: Recycle, value: "2,500+", label: "Devices Recycled" },
    { icon: Leaf, value: "15 Tons", label: "E-waste Diverted" },
    { icon: Award, value: "98%", label: "Customer Satisfaction" },
    { icon: Users, value: "1,200+", label: "Happy Customers" },
  ]

  const acceptedItems = [
    "Laptops & Portable Computers",
    "Laptop Batteries & Chargers",
    "Laptop Keyboards & Trackpads",
    "Laptop Screens & Displays",
    "Laptop Hard Drives & Memory",
    "Laptop Cables & Adapters",
    "Laptop Cooling Fans",
    "Laptop Motherboards & Components",
  ]

  const recycleProcess = [
    {
      step: "Collection",
      description: "We collect your old electronics from your location or you can drop them off at our store.",
    },
    {
      step: "Assessment",
      description: "Our team evaluates each device to determine if it can be refurbished or needs recycling.",
    },
    {
      step: "Data Destruction",
      description: "We ensure complete data destruction using certified methods to protect your privacy.",
    },
    {
      step: "Refurbishment",
      description: "Laptops in good condition are professionally repaired and resold at affordable prices.",
    },
    {
      step: "Recycling",
      description: "Components that can't be refurbished are responsibly recycled to recover valuable materials.",
    },
    {
      step: "Environmental Impact",
      description: "We provide you with a certificate showing the environmental impact of your contribution.",
    },
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
              Recycle <span className="text-secondary">with us</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join Zambia's leading laptop recycling program. Protect the environment while giving your old laptops a
              new life.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Environmental Impact</h2>
            <p className="text-lg text-gray-600">
              Making a difference for Zambia's environment through laptop recycling
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                      <stat.icon className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Accept */}
      <section className="py-16 bg-stone-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Accept</h2>
            <p className="text-lg text-gray-600">We responsibly recycle all types of laptop components</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {acceptedItems.map((item, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Recycle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-gray-900">{item}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recycling Process */}
      <section className="py-16 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Recycling Process</h2>
            <p className="text-lg text-gray-600">How we handle your electronics responsibly</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {recycleProcess.map((process, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{process.step}</h3>
                    <p className="text-gray-600">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-stone-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600">Comprehensive e-waste solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Truck className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Free Pickup</h3>
                <p className="text-gray-600">
                  We offer free pickup service for bulk e-waste collections from homes and businesses across Lusaka.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Security</h3>
                <p className="text-gray-600">
                  Complete data destruction using certified methods to ensure your personal information is protected.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                    <Award className="h-8 w-8 text-secondary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Certification</h3>
                <p className="text-gray-600">
                  Receive a certificate of recycling showing the environmental impact of your contribution.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact for Recycling */}
      <section className="py-16 bg-primary">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl text-white/80 mb-8">
              Contact us today to schedule your e-waste pickup or drop off your electronics at our store.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card className="border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Call Us</span>
                  </div>
                  <p className="text-gray-600">+260 775523495</p>
                </CardContent>
              </Card>

              <Card className="border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Email Us</span>
                  </div>
                  <p className="text-gray-600">swiftvibeelectronics@gmail.com</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SchedulePickupModal>
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  Schedule Pickup
                </Button>
              </SchedulePickupModal>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Visit Our Store
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
