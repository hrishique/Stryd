"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Sparkles, Award, ExternalLink, Share2, Download } from "lucide-react"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  challengeData?: {
    title: string
    earnings: number
    opponent: string
    metric: string
    achievement: string
  }
}

export function SuccessModal({ isOpen, onClose, challengeData }: SuccessModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      setAnimationPhase(1)

      const timer1 = setTimeout(() => setAnimationPhase(2), 500)
      const timer2 = setTimeout(() => setAnimationPhase(3), 1000)
      const timer3 = setTimeout(() => setShowConfetti(false), 3000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const mockChallengeData = challengeData || {
    title: "10K Running Challenge",
    earnings: 9.5,
    opponent: "FitRunner23",
    metric: "10.2 km completed",
    achievement: "Speed Demon",
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 animate-bounce ${
                i % 4 === 0
                  ? "bg-vibrant-yellow"
                  : i % 4 === 1
                    ? "bg-bright-purple"
                    : i % 4 === 2
                      ? "bg-green-500"
                      : "bg-blue-500"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <Card
        className={`w-full max-w-md border-0 shadow-2xl transform transition-all duration-500 ${
          animationPhase >= 1 ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <CardContent className="p-8 text-center relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-vibrant-yellow/10 via-bright-purple/10 to-green-500/10 rounded-lg"></div>

          {/* Trophy Animation */}
          <div
            className={`relative mb-6 transform transition-all duration-700 ${
              animationPhase >= 2 ? "scale-100 rotate-0" : "scale-0 rotate-180"
            }`}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-vibrant-yellow to-bright-purple rounded-full mx-auto flex items-center justify-center shadow-glow animate-pulse-slow">
              <Trophy className="w-12 h-12 text-white" />
            </div>

            {/* Sparkles around trophy */}
            <div className="absolute -top-2 -left-2">
              <Sparkles className="w-6 h-6 text-vibrant-yellow animate-spin" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Star className="w-5 h-5 text-bright-purple animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -left-2">
              <Star className="w-4 h-4 text-green-500 animate-bounce" />
            </div>
            <div className="absolute -bottom-2 -right-2">
              <Sparkles className="w-5 h-5 text-blue-500 animate-ping" />
            </div>
          </div>

          {/* Success Message */}
          <div
            className={`transform transition-all duration-500 delay-300 ${
              animationPhase >= 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h2 className="text-3xl font-display font-bold text-dark-blue mb-2">🎉 Congratulations!</h2>
            <p className="text-lg text-gray-600 mb-6">You won the challenge!</p>
          </div>

          {/* Challenge Details */}
          <div
            className={`space-y-4 mb-6 transform transition-all duration-500 delay-500 ${
              animationPhase >= 3 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="p-4 bg-gradient-to-r from-vibrant-yellow/10 to-bright-purple/10 rounded-2xl">
              <h3 className="font-bold text-dark-blue mb-2">{mockChallengeData.title}</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">Your Performance</p>
                  <p className="font-semibold text-dark-blue">{mockChallengeData.metric}</p>
                </div>
                <div>
                  <p className="text-gray-600">Defeated</p>
                  <p className="font-semibold text-dark-blue">{mockChallengeData.opponent}</p>
                </div>
              </div>
            </div>

            {/* Earnings */}
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Earnings</span>
              </div>
              <p className="text-3xl font-bold text-green-600">+{mockChallengeData.earnings} APT</p>
              <p className="text-sm text-green-700">Transferred to your wallet</p>
            </div>

            {/* NFT Badge */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-800">Achievement Unlocked</span>
              </div>
              <Badge className="bg-gradient-to-r from-bright-purple to-vibrant-yellow text-white mb-2">
                {mockChallengeData.achievement}
              </Badge>
              <p className="text-sm text-purple-700">NFT badge minted to your wallet</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className={`space-y-3 transform transition-all duration-500 delay-700 ${
              animationPhase >= 3 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-bright-purple text-bright-purple hover:bg-bright-purple hover:text-white rounded-2xl font-semibold bg-transparent"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>

              <Button
                variant="outline"
                className="border-vibrant-yellow text-vibrant-yellow hover:bg-vibrant-yellow hover:text-dark-blue rounded-2xl font-semibold bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Save NFT
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full border-gray-300 text-gray-600 hover:bg-gray-100 rounded-2xl font-semibold bg-transparent"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Transaction
            </Button>

            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-vibrant-yellow to-bright-purple text-white hover:from-vibrant-yellow/90 hover:to-bright-purple/90 rounded-2xl font-bold py-3 shadow-glow transition-all duration-300 hover:scale-105"
            >
              Create Another Challenge
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
