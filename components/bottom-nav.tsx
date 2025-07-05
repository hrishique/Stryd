"use client"

import { Home, Trophy, Plus, BarChart3, User } from "lucide-react"

export type Page = "landing" | "dashboard" | "create" | "challenge" | "leaderboard"

interface BottomNavProps {
  currentPage: Page
  onPageChange: (page: Page) => void
}

export function BottomNav({ currentPage, onPageChange }: BottomNavProps) {
  const navItems = [
    {
      id: "landing" as Page,
      label: "Home",
      icon: Home,
      color: "text-vibrant-yellow",
    },
    {
      id: "dashboard" as Page,
      label: "Dashboard",
      icon: User,
      color: "text-bright-purple",
    },
    {
      id: "create" as Page,
      label: "Create",
      icon: Plus,
      color: "text-green-500",
    },
    {
      id: "challenge" as Page,
      label: "Challenge",
      icon: Trophy,
      color: "text-blue-500",
    },
    {
      id: "leaderboard" as Page,
      label: "Leaderboard",
      icon: BarChart3,
      color: "text-red-500",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id

            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 min-w-[60px] ${
                  isActive
                    ? "bg-gradient-to-br from-vibrant-yellow/20 to-bright-purple/20 scale-110 shadow-lg"
                    : "hover:bg-gray-50 hover:scale-105"
                }`}
              >
                <div
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    isActive ? "bg-gradient-to-br from-vibrant-yellow to-bright-purple shadow-glow" : "bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-600"}`}
                  />
                </div>
                <span
                  className={`text-xs font-medium mt-1 transition-colors duration-300 ${
                    isActive ? "text-dark-blue font-bold" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -top-1 w-1 h-1 bg-gradient-to-r from-vibrant-yellow to-bright-purple rounded-full animate-pulse" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
