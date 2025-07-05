"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Target, Clock, Users, Activity, Wallet, TrendingUp, Award, ExternalLink } from "lucide-react"

// Mock challenge data
const mockChallenge = {
  id: 1,
  type: "distance",
  title: "10K Running Challenge",
  description: "First to complete 10 kilometers wins the pot!",
  metric: "10 km run",
  target: 10,
  stake: 5,
  totalPot: 9.5, // After platform fee
  startDate: "2024-01-15",
  endDate: "2024-01-22",
  status: "active",
  timeLeft: "2 days, 14 hours",
  participants: [
    {
      id: 1,
      name: "You",
      walletAddress: "0x1234...5678",
      stravaId: "athlete_12345",
      progress: 7.2,
      lastActivity: "2 hours ago",
      activities: [
        { date: "2024-01-20", distance: 3.2, duration: "18:30", type: "run" },
        { date: "2024-01-19", distance: 2.5, duration: "15:45", type: "run" },
        { date: "2024-01-18", distance: 1.5, duration: "9:20", type: "run" },
      ],
      isCurrentUser: true,
    },
    {
      id: 2,
      name: "FitRunner23",
      walletAddress: "0x9876...4321",
      stravaId: "athlete_67890",
      progress: 6.8,
      lastActivity: "4 hours ago",
      activities: [
        { date: "2024-01-20", distance: 2.8, duration: "16:45", type: "run" },
        { date: "2024-01-19", distance: 4.0, duration: "24:30", type: "run" },
      ],
      isCurrentUser: false,
    },
  ],
}

export function ChallengeDetail() {
  const [activeTab, setActiveTab] = useState("overview")

  const currentUser = mockChallenge.participants.find((p) => p.isCurrentUser)
  const opponent = mockChallenge.participants.find((p) => !p.isCurrentUser)

  const getLeader = () => {
    return mockChallenge.participants.reduce((leader, participant) =>
      participant.progress > leader.progress ? participant : leader,
    )
  }

  const leader = getLeader()
  const progressPercentage = (progress: number) => (progress / mockChallenge.target) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-grey to-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>Challenges</span>
            <span>/</span>
            <span className="text-dark-blue font-medium">{mockChallenge.title}</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-dark-blue mb-2">{mockChallenge.title}</h1>
              <p className="text-gray-600">{mockChallenge.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                className={`${
                  mockChallenge.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                } px-3 py-1`}
              >
                {mockChallenge.status.toUpperCase()}
              </Badge>
              <Button
                variant="outline"
                className="border-bright-purple text-bright-purple hover:bg-bright-purple hover:text-white rounded-2xl bg-transparent"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Blockchain
              </Button>
            </div>
          </div>
        </div>

        {/* Challenge Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-vibrant-yellow/10">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-vibrant-yellow to-bright-purple rounded-2xl mx-auto mb-3 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Prize</p>
              <p className="text-2xl font-bold text-dark-blue">{mockChallenge.totalPot} APT</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-bright-purple/10">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-bright-purple to-vibrant-yellow rounded-2xl mx-auto mb-3 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Target</p>
              <p className="text-2xl font-bold text-dark-blue">{mockChallenge.target} km</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Leading</p>
              <p className="text-2xl font-bold text-dark-blue">{leader.name}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Time Left</p>
              <p className="text-lg font-bold text-dark-blue">{mockChallenge.timeLeft}</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Live Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockChallenge.participants.map((participant) => (
                <div key={participant.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          participant.isCurrentUser
                            ? "bg-gradient-to-br from-vibrant-yellow to-bright-purple"
                            : "bg-gradient-to-br from-gray-400 to-gray-600"
                        }`}
                      >
                        <span className="text-white font-bold">{participant.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-dark-blue">
                          {participant.name}
                          {participant.isCurrentUser && (
                            <Badge className="ml-2 bg-vibrant-yellow text-dark-blue">You</Badge>
                          )}
                        </p>
                        <p className="text-sm text-gray-600">Last activity: {participant.lastActivity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-dark-blue">{participant.progress.toFixed(1)} km</p>
                      <p className="text-sm text-gray-600">
                        {progressPercentage(participant.progress).toFixed(1)}% complete
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <Progress value={progressPercentage(participant.progress)} className="h-4" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-white mix-blend-difference">
                        {participant.progress.toFixed(1)} / {mockChallenge.target} km
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-light-grey rounded-2xl p-1">
            <TabsTrigger
              value="overview"
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md"
            >
              Activities
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md"
            >
              Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Challenge Info */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Challenge Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-light-grey rounded-2xl">
                      <p className="text-sm text-gray-600 mb-1">Type</p>
                      <p className="font-semibold text-dark-blue capitalize">{mockChallenge.type}</p>
                    </div>
                    <div className="p-3 bg-light-grey rounded-2xl">
                      <p className="text-sm text-gray-600 mb-1">Metric</p>
                      <p className="font-semibold text-dark-blue">{mockChallenge.metric}</p>
                    </div>
                    <div className="p-3 bg-light-grey rounded-2xl">
                      <p className="text-sm text-gray-600 mb-1">Start Date</p>
                      <p className="font-semibold text-dark-blue">{mockChallenge.startDate}</p>
                    </div>
                    <div className="p-3 bg-light-grey rounded-2xl">
                      <p className="text-sm text-gray-600 mb-1">End Date</p>
                      <p className="font-semibold text-dark-blue">{mockChallenge.endDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Participants */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Participants
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockChallenge.participants.map((participant) => (
                    <div key={participant.id} className="p-4 bg-light-grey rounded-2xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              participant.isCurrentUser
                                ? "bg-gradient-to-br from-vibrant-yellow to-bright-purple"
                                : "bg-gradient-to-br from-gray-400 to-gray-600"
                            }`}
                          >
                            <span className="text-white text-sm font-bold">
                              {participant.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-dark-blue">{participant.name}</p>
                            <p className="text-xs text-gray-600">{participant.stravaId}</p>
                          </div>
                        </div>
                        {participant.isCurrentUser && <Badge className="bg-vibrant-yellow text-dark-blue">You</Badge>}
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600">Wallet</p>
                          <p className="font-mono text-dark-blue">{participant.walletAddress}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Progress</p>
                          <p className="font-semibold text-dark-blue">{participant.progress} km</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {mockChallenge.participants.map((participant) => (
                <Card key={participant.id} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      {participant.name}'s Activities
                      {participant.isCurrentUser && <Badge className="bg-vibrant-yellow text-dark-blue">You</Badge>}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {participant.activities.map((activity, index) => (
                        <div key={index} className="p-3 bg-light-grey rounded-2xl">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gradient-to-br from-vibrant-yellow to-bright-purple rounded-full flex items-center justify-center">
                                <Activity className="w-3 h-3 text-white" />
                              </div>
                              <span className="font-semibold text-dark-blue capitalize">{activity.type}</span>
                            </div>
                            <span className="text-sm text-gray-600">{activity.date}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-gray-600">Distance</p>
                              <p className="font-semibold text-dark-blue">{activity.distance} km</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Duration</p>
                              <p className="font-semibold text-dark-blue">{activity.duration}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Smart Contract Details */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Smart Contract Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-light-grey rounded-2xl font-mono text-sm">
                    <p className="text-gray-600 mb-2">Contract Address:</p>
                    <p className="text-dark-blue break-all">0xabcdef1234567890abcdef1234567890abcdef12</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-light-grey rounded-2xl">
                      <p className="text-sm text-gray-600 mb-1">Total Staked</p>
                      <p className="font-semibold text-dark-blue">{mockChallenge.stake * 2} APT</p>
                    </div>
                    <div className="p-3 bg-light-grey rounded-2xl">
                      <p className="text-sm text-gray-600 mb-1">Platform Fee</p>
                      <p className="font-semibold text-dark-blue">5%</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-bright-purple text-bright-purple hover:bg-bright-purple hover:text-white rounded-2xl bg-transparent"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Aptos Explorer
                  </Button>
                </CardContent>
              </Card>

              {/* Rules & Conditions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Rules & Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-vibrant-yellow rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        First participant to reach the target distance wins the entire pot
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-vibrant-yellow rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Activities must be recorded on Strava and verified automatically</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-vibrant-yellow rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Challenge ends when target is reached or time expires</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-vibrant-yellow rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        If no one reaches the target, participant with highest progress wins
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-vibrant-yellow rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Platform takes 5% fee, winner receives 95% of total pot</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
