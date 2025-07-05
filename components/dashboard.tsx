"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Clock, Users, Plus, TrendingUp, Activity, Wallet } from "lucide-react"

// Mock data
const mockUser = {
  walletAddress: "0x1234...5678",
  stravaId: "athlete_12345",
  totalChallenges: 15,
  challengesWon: 8,
  totalEarnings: 125.5,
  currentStreak: 5,
}

const mockChallenges = [
  {
    id: 1,
    type: "distance",
    metric: "10 km run",
    opponent: "FitRunner23",
    stake: 5,
    timeLeft: "2 days",
    status: "active",
    myProgress: 7.2,
    opponentProgress: 6.8,
    target: 10,
  },
  {
    id: 2,
    type: "duration",
    metric: "60 min workout",
    opponent: "GymBeast99",
    stake: 3,
    timeLeft: "5 hours",
    status: "active",
    myProgress: 45,
    opponentProgress: 52,
    target: 60,
  },
  {
    id: 3,
    type: "distance",
    metric: "5 km run",
    opponent: "SpeedDemon",
    stake: 2,
    timeLeft: "Completed",
    status: "won",
    myProgress: 5,
    opponentProgress: 4.2,
    target: 5,
  },
]

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("active")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500"
      case "won":
        return "bg-green-500"
      case "lost":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getProgressColor = (myProgress: number, opponentProgress: number) => {
    if (myProgress > opponentProgress) return "bg-green-500"
    if (myProgress < opponentProgress) return "bg-red-500"
    return "bg-yellow-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-grey to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-dark-blue mb-2">Welcome back, Athlete! 🏃‍♂️</h1>
          <p className="text-gray-600">Track your challenges and earnings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-vibrant-yellow/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-dark-blue">{mockUser.totalEarnings} APT</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-vibrant-yellow to-bright-purple rounded-2xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-bright-purple/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Challenges Won</p>
                  <p className="text-2xl font-bold text-dark-blue">
                    {mockUser.challengesWon}/{mockUser.totalChallenges}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-bright-purple to-vibrant-yellow rounded-2xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Win Streak</p>
                  <p className="text-2xl font-bold text-dark-blue">{mockUser.currentStreak} wins</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Challenges</p>
                  <p className="text-2xl font-bold text-dark-blue">
                    {mockChallenges.filter((c) => c.status === "active").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Info */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Connected Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-vibrant-yellow/10 to-vibrant-yellow/5 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-vibrant-yellow rounded-full flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-dark-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark-blue">Aptos Wallet</p>
                    <p className="text-sm text-gray-600">{mockUser.walletAddress}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-bright-purple/10 to-bright-purple/5 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-bright-purple rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark-blue">Strava Account</p>
                    <p className="text-sm text-gray-600">{mockUser.stravaId}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Challenges Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display font-bold text-dark-blue">My Challenges</h2>
          <Button className="bg-gradient-to-r from-vibrant-yellow to-bright-purple text-white hover:from-vibrant-yellow/90 hover:to-bright-purple/90 rounded-2xl font-semibold shadow-glow transition-all duration-300 hover:scale-105">
            <Plus className="w-4 h-4 mr-2" />
            Create Challenge
          </Button>
        </div>

        {/* Challenge Tabs */}
        <div className="flex space-x-1 mb-6 bg-light-grey rounded-2xl p-1">
          {["active", "completed", "all"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-200 ${
                activeTab === tab ? "bg-white text-dark-blue shadow-md" : "text-gray-600 hover:text-dark-blue"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Challenge Cards */}
        <div className="grid gap-6">
          {mockChallenges
            .filter(
              (challenge) =>
                activeTab === "all" ||
                (activeTab === "active" && challenge.status === "active") ||
                (activeTab === "completed" && challenge.status !== "active"),
            )
            .map((challenge) => (
              <Card key={challenge.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Challenge Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-vibrant-yellow to-bright-purple rounded-2xl flex items-center justify-center">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-dark-blue text-lg">{challenge.metric}</h3>
                          <p className="text-gray-600">vs {challenge.opponent}</p>
                        </div>
                        <Badge className={`${getStatusColor(challenge.status)} text-white ml-auto lg:ml-0`}>
                          {challenge.status}
                        </Badge>
                      </div>

                      {/* Progress Bars */}
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">
                              You: {challenge.myProgress}/{challenge.target}
                            </span>
                            <span className="text-gray-500">
                              {Math.round((challenge.myProgress / challenge.target) * 100)}%
                            </span>
                          </div>
                          <Progress value={(challenge.myProgress / challenge.target) * 100} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">
                              {challenge.opponent}: {challenge.opponentProgress}/{challenge.target}
                            </span>
                            <span className="text-gray-500">
                              {Math.round((challenge.opponentProgress / challenge.target) * 100)}%
                            </span>
                          </div>
                          <Progress value={(challenge.opponentProgress / challenge.target) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>

                    {/* Challenge Details */}
                    <div className="flex flex-col items-end gap-3 min-w-[200px]">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Stake</p>
                        <p className="text-xl font-bold text-dark-blue">{challenge.stake} APT</p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-600">Time Left</p>
                        <p className="font-semibold text-dark-blue flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {challenge.timeLeft}
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        className="border-bright-purple text-bright-purple hover:bg-bright-purple hover:text-white rounded-2xl font-semibold transition-all duration-300 bg-transparent"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {mockChallenges.filter(
          (challenge) =>
            activeTab === "all" ||
            (activeTab === "active" && challenge.status === "active") ||
            (activeTab === "completed" && challenge.status !== "active"),
        ).length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No challenges found</h3>
              <p className="text-gray-500 mb-6">
                {activeTab === "active"
                  ? "You don't have any active challenges. Create one to get started!"
                  : "No challenges in this category yet."}
              </p>
              <Button className="bg-gradient-to-r from-vibrant-yellow to-bright-purple text-white hover:from-vibrant-yellow/90 hover:to-bright-purple/90 rounded-2xl font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Challenge
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
