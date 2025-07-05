"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Target, Wallet, Users, MapPin, Trophy, AlertCircle, CheckCircle } from "lucide-react"

export function CreateChallenge() {
  const [challengeType, setChallengeType] = useState("")
  const [metric, setMetric] = useState("")
  const [target, setTarget] = useState("")
  const [opponent, setOpponent] = useState("")
  const [stake, setStake] = useState("")
  const [duration, setDuration] = useState("")
  const [description, setDescription] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const challengeTypes = [
    { value: "distance", label: "Distance Challenge", icon: "🏃‍♂️", description: "Run/walk a specific distance" },
    { value: "duration", label: "Duration Challenge", icon: "⏱️", description: "Exercise for a set amount of time" },
    { value: "calories", label: "Calorie Challenge", icon: "🔥", description: "Burn a target number of calories" },
    { value: "elevation", label: "Elevation Challenge", icon: "⛰️", description: "Climb a specific elevation gain" },
  ]

  const handleCreateChallenge = async () => {
    setIsCreating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsCreating(false)
    // Handle success/redirect
  }

  const isFormValid = challengeType && metric && target && opponent && stake && duration

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-grey to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-dark-blue mb-2">Create New Challenge 🎯</h1>
          <p className="text-gray-600">Set up a peer-to-peer fitness challenge and stake your APT</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Challenge Type Selection */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Challenge Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {challengeTypes.map((type) => (
                    <div
                      key={type.value}
                      onClick={() => setChallengeType(type.value)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        challengeType === type.value
                          ? "border-bright-purple bg-bright-purple/10 shadow-glow-purple"
                          : "border-gray-200 hover:border-bright-purple/50"
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <h3 className="font-semibold text-dark-blue mb-1">{type.label}</h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Challenge Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Challenge Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="metric">Metric</Label>
                    <Select value={metric} onValueChange={setMetric}>
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue placeholder="Select metric" />
                      </SelectTrigger>
                      <SelectContent>
                        {challengeType === "distance" && (
                          <>
                            <SelectItem value="5k">5 Kilometers</SelectItem>
                            <SelectItem value="10k">10 Kilometers</SelectItem>
                            <SelectItem value="half-marathon">Half Marathon (21K)</SelectItem>
                            <SelectItem value="marathon">Marathon (42K)</SelectItem>
                          </>
                        )}
                        {challengeType === "duration" && (
                          <>
                            <SelectItem value="30min">30 Minutes</SelectItem>
                            <SelectItem value="60min">60 Minutes</SelectItem>
                            <SelectItem value="90min">90 Minutes</SelectItem>
                            <SelectItem value="120min">120 Minutes</SelectItem>
                          </>
                        )}
                        {challengeType === "calories" && (
                          <>
                            <SelectItem value="300cal">300 Calories</SelectItem>
                            <SelectItem value="500cal">500 Calories</SelectItem>
                            <SelectItem value="750cal">750 Calories</SelectItem>
                            <SelectItem value="1000cal">1000 Calories</SelectItem>
                          </>
                        )}
                        {challengeType === "elevation" && (
                          <>
                            <SelectItem value="100m">100 Meters</SelectItem>
                            <SelectItem value="250m">250 Meters</SelectItem>
                            <SelectItem value="500m">500 Meters</SelectItem>
                            <SelectItem value="1000m">1000 Meters</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="target">Custom Target (Optional)</Label>
                    <Input
                      id="target"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      placeholder="Enter custom target"
                      className="rounded-2xl"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a description or motivation for your challenge..."
                    className="rounded-2xl resize-none"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Opponent & Stakes */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Opponent & Stakes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="opponent">Opponent Wallet Address</Label>
                  <Input
                    id="opponent"
                    value={opponent}
                    onChange={(e) => setOpponent(e.target.value)}
                    placeholder="0x1234567890abcdef..."
                    className="rounded-2xl font-mono"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Enter the wallet address of the person you want to challenge
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stake">Stake Amount (APT)</Label>
                    <Input
                      id="stake"
                      type="number"
                      value={stake}
                      onChange={(e) => setStake(e.target.value)}
                      placeholder="5.0"
                      className="rounded-2xl"
                      min="0.1"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="duration">Challenge Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1day">1 Day</SelectItem>
                        <SelectItem value="3days">3 Days</SelectItem>
                        <SelectItem value="1week">1 Week</SelectItem>
                        <SelectItem value="2weeks">2 Weeks</SelectItem>
                        <SelectItem value="1month">1 Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            {/* Challenge Summary */}
            <Card className="border-0 shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Challenge Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-vibrant-yellow/10 to-bright-purple/10 rounded-2xl">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-semibold text-dark-blue">
                        {challengeType ? challengeTypes.find((t) => t.value === challengeType)?.label : "Not selected"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Metric:</span>
                      <span className="font-semibold text-dark-blue">{metric || "Not selected"}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold text-dark-blue">{duration || "Not selected"}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Stake:</span>
                      <span className="font-semibold text-dark-blue">{stake ? `${stake} APT` : "Not set"}</span>
                    </div>
                  </div>
                </div>

                {/* Potential Rewards */}
                {stake && (
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Potential Rewards</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-700">Winner takes:</span>
                        <span className="font-semibold text-green-800">
                          {(Number.parseFloat(stake) * 1.9).toFixed(1)} APT
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Platform fee:</span>
                        <span className="font-semibold text-green-800">
                          {(Number.parseFloat(stake) * 0.1).toFixed(1)} APT
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Validation Status */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {challengeType ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    )}
                    <span className={`text-sm ${challengeType ? "text-green-600" : "text-gray-500"}`}>
                      Challenge type selected
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {metric ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    )}
                    <span className={`text-sm ${metric ? "text-green-600" : "text-gray-500"}`}>Metric configured</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {opponent ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    )}
                    <span className={`text-sm ${opponent ? "text-green-600" : "text-gray-500"}`}>
                      Opponent specified
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {stake && duration ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    )}
                    <span className={`text-sm ${stake && duration ? "text-green-600" : "text-gray-500"}`}>
                      Stakes & duration set
                    </span>
                  </div>
                </div>

                {/* Create Button */}
                <Button
                  onClick={handleCreateChallenge}
                  disabled={!isFormValid || isCreating}
                  className={`w-full rounded-2xl font-bold py-3 transition-all duration-300 ${
                    isFormValid
                      ? "bg-gradient-to-r from-vibrant-yellow to-bright-purple text-white hover:from-vibrant-yellow/90 hover:to-bright-purple/90 shadow-glow hover:scale-105"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isCreating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Challenge...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4 mr-2" />
                      Create & Sign Transaction
                    </>
                  )}
                </Button>

                {!isFormValid && (
                  <p className="text-sm text-gray-500 text-center">Complete all required fields to create challenge</p>
                )}
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-blue-800 mb-3">💡 Pro Tips</h4>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Start with smaller stakes for your first challenges</li>
                  <li>• Make sure your opponent has Strava connected</li>
                  <li>• Choose realistic targets you can achieve</li>
                  <li>• Longer challenges allow for more strategy</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
