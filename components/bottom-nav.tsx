"use client"

import { Home, Trophy, Plus, BarChart3, User } from "lucide-react"
import { motion } from "framer-motion"

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
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      id: "dashboard" as Page,
      label: "Dashboard",
      icon: User,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "create" as Page,
      label: "Create",
      icon: Plus,
      gradient: "from-green-400 to-blue-500",
    },
    {
      id: "challenge" as Page,
      label: "Challenge",
      icon: Trophy,
      gradient: "from-blue-400 to-purple-600",
    },
    {
      id: "leaderboard" as Page,
      label: "Leaderboard",
      icon: BarChart3,
      gradient: "from-red-400 to-pink-500",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-md mx-auto px-2">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id

            return (
              <motion.button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 min-w-[60px] relative ${
                  isActive ? "scale-110" : "hover:scale-105"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background glow for active item */}
                {isActive && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 rounded-2xl`}
                    layoutId="activeBackground"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Icon container */}
                <div
                  className={`p-2 rounded-xl transition-all duration-300 relative z-10 ${
                    isActive ? `bg-gradient-to-br ${item.gradient} shadow-lg` : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-gray-600 dark:text-gray-300"
                    }`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`text-xs font-medium mt-1 transition-colors duration-300 relative z-10 ${
                    isActive ? "text-gray-900 dark:text-white font-bold" : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {item.label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    className={`absolute -top-1 w-2 h-2 bg-gradient-to-r ${item.gradient} rounded-full`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
