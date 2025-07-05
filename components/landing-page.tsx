"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Zap, Shield, Users, ArrowRight, Play } from "lucide-react"

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-vibrant-yellow/10 via-white to-bright-purple/10 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-display font-bold text-dark-blue sm:text-5xl lg:text-6xl">
                Turn Fitness into{" "}
                <span className="bg-gradient-to-r from-vibrant-yellow to-bright-purple bg-clip-text text-transparent">
                  Rewards!
                </span>
              </h1>

              <p className="mt-6 text-xl text-gray-600 sm:max-w-xl sm:mx-auto lg:mx-0">
                Challenge friends, stake crypto, and earn rewards for your fitness achievements. Connect your Strava and
                compete in peer-to-peer fitness challenges on Aptos blockchain.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-vibrant-yellow text-dark-blue hover:bg-vibrant-yellow/90 rounded-2xl font-bold text-lg px-8 py-4 shadow-glow animate-glow transition-all duration-300 hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Connect Wallet
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-bright-purple text-bright-purple hover:bg-bright-purple hover:text-white rounded-2xl font-bold text-lg px-8 py-4 transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  Connect Strava
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Secure & Decentralized
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Strava Integration
                </div>
              </div>
            </div>

            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-3xl shadow-2xl lg:max-w-md">
                <div className="relative bg-gradient-to-br from-vibrant-yellow/20 to-bright-purple/20 rounded-3xl p-8 backdrop-blur-sm border border-white/20">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-vibrant-yellow to-bright-purple rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce-slow">
                      <Trophy className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-dark-blue mb-2">Ready to Compete?</h3>
                    <p className="text-gray-600 mb-6">Join thousands of athletes earning rewards</p>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white/50 rounded-2xl p-4">
                        <div className="text-2xl font-bold text-bright-purple">1,247</div>
                        <div className="text-sm text-gray-600">Active Users</div>
                      </div>
                      <div className="bg-white/50 rounded-2xl p-4">
                        <div className="text-2xl font-bold text-vibrant-yellow">$12.5K</div>
                        <div className="text-sm text-gray-600">Rewards Paid</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-dark-blue sm:text-4xl">Why Choose Stryd?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              The first Web3 fitness platform that rewards your dedication with real value
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-vibrant-yellow/5">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-vibrant-yellow to-bright-purple rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark-blue mb-4">Instant Rewards</h3>
                <p className="text-gray-600">
                  Earn APT tokens immediately when you win challenges. No waiting, no delays.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-bright-purple/5">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-bright-purple to-vibrant-yellow rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark-blue mb-4">Secure & Fair</h3>
                <p className="text-gray-600">
                  Smart contracts ensure fair play. Your data and funds are always protected.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-vibrant-yellow/5">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-vibrant-yellow to-bright-purple rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark-blue mb-4">Social Fitness</h3>
                <p className="text-gray-600">
                  Challenge friends, join communities, and make fitness more engaging than ever.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-bright-purple/5">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-bright-purple to-vibrant-yellow rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark-blue mb-4">NFT Badges</h3>
                <p className="text-gray-600">
                  Collect unique achievement badges as NFTs to showcase your fitness journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-vibrant-yellow to-bright-purple">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-white sm:text-4xl mb-6">Ready to Start Earning?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join the fitness revolution where every step, every mile, every workout can earn you real rewards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-dark-blue hover:bg-gray-100 rounded-2xl font-bold text-lg px-8 py-4 shadow-lg transition-all duration-300 hover:scale-105"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-dark-blue rounded-2xl font-bold text-lg px-8 py-4 transition-all duration-300 hover:scale-105 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
