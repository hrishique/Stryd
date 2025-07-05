"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, Target, Crown, Zap } from "lucide-react"

// Mock leaderboard data
const mockLeaderboardData = {
  topWinners: [
    {
      rank: 1,
      name: "FitnessKing",
      walletAddress: "0x1234...5678",
      stravaId: "athlete_001",
      challengesWon: 25,
      totalEarnings: 450.5,
      winRate: 89,
      avatar: "👑",
    },
    {
      rank: 2,
      name: "RunnerPro",
      walletAddress: "0x2345...6789",
      stravaId: "athlete_002",
      challengesWon: 22,
      totalEarnings: 380.2,
      winRate: 85,
      avatar: "🏃‍♂️",
    },
    {
      rank: 3,
      name: "SpeedDemon",
      walletAddress: "0x3456...7890",
      stravaId: "athlete_003",
      challengesWon: 18,
      totalEarnings: 320.8,
      winRate: 78,
      avatar: "⚡",
    },
    {
      rank: 4,
      name: "You",
      walletAddress: "0x4567...8901",
      stravaId: "athlete_004",
      challengesWon: 8,
      totalEarnings: 125.5,
      winRate: 53,
      avatar: "🎯",
      isCurrentUser: true,
    },
  ],
  topDistance: [
    {
      rank: 1,
      name: "MarathonMaster",
      walletAddress: "0x5678...9012",
      stravaId: "athlete_005",
      totalDistance: 1250.5,
      challengesCompleted: 45,
      avatar: "🏃‍♀️",
    },
    {
      rank: 2,
      name: "EnduranceElite",
      walletAddress: "0x6789...0123",
      stravaId: "athlete_006",
      totalDistance: 1180.2,
      challengesCompleted: 38,
      avatar: "💪",
    },
    {
      rank: 3,
      name: "DistanceDestroyer",
      walletAddress: "0x7890...1234",
      stravaId: "athlete_007",
      totalDistance: 980.7,
      challengesCompleted: 32,
      avatar: "🔥",
    },
  ],
  recentWinners: [
    {
      name: "QuickSprint",
      challenge: "5K Speed Run",
      earnings: 15.5,
      timeAgo: "2 hours ago",
      avatar: "🚀",
    },
    {
      name: "ClimbMaster",
      challenge: "Hill Climbing Challenge",
      earnings: 8.2,
      timeAgo: "5 hours ago",
      avatar: "⛰️",
    },
    {
      name: "CycleChamp",
      challenge: "50K Bike Ride",
      earnings: 22.0,
      timeAgo: "1 day ago",
      avatar: "🚴‍♂️",
    },
  ],
}

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState("winners")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-grey to-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-display font-bold text-dark-blue mb-2">🏆 Leaderboard</h1>
          <p className="text-gray-600">See who's dominating the fitness challenges</p>
        </div>

        {/* Top 3 Podium */}
        <Card className="border-0 shadow-lg mb-8 bg-gradient-to-br from-white to-vibrant-yellow/5">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6 items-end">
              {/* 2nd Place */}
              <div className="text-center order-1 md:order-1">
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full mx-auto flex items-center justify-center text-3xl mb-2">
                    {mockLeaderboardData.topWinners[1].avatar}
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-gray-300 to-gray-500 text-white">
                    #2
                  </Badge>
                </div>
                <h3 className="font-bold text-dark-blue text-lg mb-1">{mockLeaderboardData.topWinners[1].name}</h3>
                <p className="text-gray-600 text-sm mb-2">{mockLeaderboardData.topWinners[1].challengesWon} wins</p>
                <p className="font-semibold text-gray-700">{mockLeaderboardData.topWinners[1].totalEarnings} APT</p>
              </div>

              {/* 1st Place */}
              <div className="text-center order-2 md:order-2 transform md:scale-110">
                <div className="relative mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto flex items-center justify-center text-4xl mb-2 shadow-glow animate-pulse-slow">
                    {mockLeaderboardData.topWinners[0].avatar}
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                    #1
                  </Badge>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Crown className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>
                <h3 className="font-bold text-dark-blue text-xl mb-1">{mockLeaderboardData.topWinners[0].name}</h3>
                <p className="text-gray-600 mb-2">{mockLeaderboardData.topWinners[0].challengesWon} wins</p>
                <p className="font-bold text-vibrant-yellow text-lg">
                  {mockLeaderboardData.topWinners[0].totalEarnings} APT
                </p>
              </div>

              {/* 3rd Place */}
              <div className="text-center order-3 md:order-3">
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mx-auto flex items-center justify-center text-3xl mb-2">
                    {mockLeaderboardData.topWinners[2].avatar}
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white">
                    #3
                  </Badge>
                </div>
                <h3 className="font-bold text-dark-blue text-lg mb-1">{mockLeaderboardData.topWinners[2].name}</h3>
                <p className="text-gray-600 text-sm mb-2">{mockLeaderboardData.topWinners[2].challengesWon} wins</p>
                <p className="font-semibold text-amber-600">{mockLeaderboardData.topWinners[2].totalEarnings} APT</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Leaderboards */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-light-grey rounded-2xl p-1">
            <TabsTrigger
              value="winners"
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Top Winners
            </TabsTrigger>
            <TabsTrigger
              value="distance"
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md"
            >
              <Target className="w-4 h-4 mr-2" />
              Distance Leaders
            </TabsTrigger>
            <TabsTrigger
              value="recent"
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md"
            >
              <Zap className="w-4 h-4 mr-2" />
              Recent Winners
            </TabsTrigger>
          </TabsList>

          <TabsContent value="winners" className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Top Challenge Winners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLeaderboardData.topWinners.map((user, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                        user.isCurrentUser
                          ? "bg-gradient-to-r from-vibrant-yellow/10 to-bright-purple/10 border-2 border-vibrant-yellow/30"
                          : "bg-light-grey hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3">
                            {getRankIcon(user.rank)}
                            <div className="w-12 h-12 bg-gradient-to-br from-vibrant-yellow to-bright-purple rounded-full flex items-center justify-center text-xl">
                              {user.avatar}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-dark-blue text-lg">{user.name}</h3>
                              {user.isCurrentUser && <Badge className="bg-vibrant-yellow text-dark-blue">You</Badge>}
                            </div>
                            <p className="text-sm text-gray-600 font-mono">{user.walletAddress}</p>
                            <p className="text-sm text-gray-600">Strava: {user.stravaId}</p>
                          </div>
                        </div>

                        <div className="text-right space-y-2">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-2xl font-bold text-dark-blue">{user.challengesWon}</p>
                              <p className="text-xs text-gray-600">Wins</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-vibrant-yellow">{user.totalEarnings}</p>
                              <p className="text-xs text-gray-600">APT</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-bright-purple">{user.winRate}%</p>
                              <p className="text-xs text-gray-600">Win Rate</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distance" className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Distance Leaders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLeaderboardData.topDistance.map((user, index) => (
                    <div
                      key={index}
                      className="p-4 bg-light-grey rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3">
                            {getRankIcon(user.rank)}
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-xl">
                              {user.avatar}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-bold text-dark-blue text-lg">{user.name}</h3>
                            <p className="text-sm text-gray-600 font-mono">{user.walletAddress}</p>
                            <p className="text-sm text-gray-600">{user.challengesCompleted} challenges completed</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-3xl font-bold text-green-600">{user.totalDistance}</p>
                          <p className="text-sm text-gray-600">km total</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Recent Winners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLeaderboardData.recentWinners.map((winner, index) => (
                    <div
                      key={index}
                      className="p-4 bg-light-grey rounded-2xl hover:bg-gray-100 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-vibrant-yellow to-bright-purple rounded-full flex items-center justify-center text-xl">
                            {winner.avatar}
                          </div>

                          <div>
                            <h3 className="font-bold text-dark-blue">{winner.name}</h3>
                            <p className="text-sm text-gray-600">Won: {winner.challenge}</p>
                            <p className="text-xs text-gray-500">{winner.timeAgo}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold text-vibrant-yellow">+{winner.earnings} APT</p>
                          <Badge className="bg-green-100 text-green-800 text-xs">Winner</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="border-0 shadow-lg mt-8 bg-gradient-to-r from-vibrant-yellow to-bright-purple">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-display font-bold text-white mb-4">Ready to Climb the Leaderboard?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join the competition and start earning rewards for your fitness achievements. Every challenge is an
              opportunity to rise in the rankings!
            </p>
            <Button
              size="lg"
              className="bg-white text-dark-blue hover:bg-gray-100 rounded-2xl font-bold text-lg px-8 py-4 shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Create Challenge
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
