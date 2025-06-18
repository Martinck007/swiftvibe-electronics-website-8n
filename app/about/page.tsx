import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Users, Award, Target, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const stats = [
    { icon: Users, value: "5,000+", label: "Happy Customers" },
    { icon: Award, value: "3+", label: "Years Experience" },
    { icon: Target, value: "98%", label: "Customer Satisfaction" },
    { icon: Heart, value: "24/7", label: "Support Available" },
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
              width={400}
              height={140}
              className="h-20 w-auto mx-auto mb-6"
              priority
            />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
              About <span className="text-secondary">Swift-Vibe Electronics</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Electronics Company · Computer Company</p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Store</h2>
            <p className="text-lg text-gray-600">Find us in the heart of Lusaka for all your technology needs</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                      <p className="text-gray-600">
                        Chachacha road, Leeds Complex next to Bata, Shop No.7C, Lusaka, Zambia
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                      <Phone className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Mobile</h3>
                      <p className="text-gray-600">
                        <a href="tel:+260775523495" className="hover:text-primary transition-colors">
                          +260 775523495
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                      <p className="text-gray-600">
                        <a
                          href="mailto:swiftvibeelectronics@gmail.com"
                          className="hover:text-primary transition-colors"
                        >
                          swiftvibeelectronics@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Service area</h3>
                      <p className="text-gray-600">Lusaka, Zambia · Lusaka Province</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Us Easily</h3>
                <p className="text-gray-600 mb-4">Located at Chachacha road, Leeds Complex next to Bata, Shop No.7C</p>
                <Button className="bg-primary hover:bg-primary/90">Get Directions</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-stone-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">Trusted by thousands across Zambia</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <stat.icon className="h-6 w-6 text-primary" />
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

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-lg text-gray-600">Building Zambia's digital future, one device at a time</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 mb-6">
                  Our mission at Swift Vibe Electronics is to provide a better technology experience for everyday people
                  across Zambia and to improve their quality of life by offering reliable electronics at affordable
                  prices with excellent customer service.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Do</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">🖥️ Premium Laptops</h4>
                    <p className="text-gray-600 text-sm">
                      Latest models from top brands, carefully selected for quality and performance.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">🔄 Swap & Top-up</h4>
                    <p className="text-gray-600 text-sm">
                      Seamless upgrade program that makes technology accessible and affordable.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">♻️ Professional Repair</h4>
                    <p className="text-gray-600 text-sm">
                      Professional repair of laptops to extend their lifespan and value.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">🌱 E-waste Collection</h4>
                    <p className="text-gray-600 text-sm">
                      Responsible recycling program protecting Zambia's environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience the Swift-Vibe Difference?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Visit our store in Leeds Complex or contact us today to discover how we can meet your technology needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Visit Our Store
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Call Us Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
