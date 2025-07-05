"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Wallet, Activity, User, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAptosWallet } from "../lib/aptos-wallet"
import { useStravaAuth } from "../lib/strava-auth"
import { WalletModal } from "./wallet-modal"
import { DarkModeToggle } from "./dark-mode-toggle"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)

  const { connected, account, disconnectWallet, balance } = useAptosWallet()
  const {
    isConnected: stravaConnected,
    athlete,
    connectStrava,
    disconnectStrava,
    isLoading: stravaLoading,
  } = useStravaAuth()

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleWalletClick = () => {
    if (connected) {
      disconnectWallet()
    } else {
      setShowWalletModal(true)
    }
  }

  const handleStravaClick = () => {
    if (stravaConnected) {
      disconnectStrava()
    } else {
      connectStrava()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pb-20 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-purple-600 bg-clip-text text-transparent">
                Stryd
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["Dashboard", "Challenges", "Leaderboard"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                  whileHover={{ y: -2, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Right side controls */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <DarkModeToggle />

              {/* Wallet Button */}
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleWalletClick}
                  className={`${
                    connected
                      ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500 shadow-lg"
                      : "border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-gray-900 border-2 bg-transparent dark:border-yellow-400 dark:text-yellow-400"
                  } rounded-2xl font-semibold transition-all duration-300`}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {connected ? (
                    <div className="flex items-center gap-2">
                      <span>{formatAddress(account?.address || "")}</span>
                      <Badge className="bg-white/20 text-gray-900 text-xs">{balance.toFixed(2)} APT</Badge>
                    </div>
                  ) : (
                    "Connect Wallet"
                  )}
                </Button>
              </motion.div>

              {/* Strava Button */}
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleStravaClick}
                  disabled={stravaLoading}
                  className={`${
                    stravaConnected
                      ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg"
                      : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white border-2 bg-transparent dark:border-purple-400 dark:text-purple-400"
                  } rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50`}
                >
                  {stravaLoading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Activity className="w-4 h-4 mr-2" />
                  )}
                  {stravaConnected ? (
                    <div className="flex items-center gap-2">
                      <span>{athlete?.firstname || "Connected"}</span>
                      <User className="w-3 h-3" />
                    </div>
                  ) : (
                    "Connect Strava"
                  )}
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <DarkModeToggle />
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div
                className="px-2 pt-2 pb-3 space-y-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {["Dashboard", "Challenges", "Leaderboard"].map((item, index) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                ))}

                <motion.div
                  className="flex flex-col space-y-3 px-3 pt-4 border-t border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  {/* Mobile Wallet Button */}
                  <Button
                    onClick={handleWalletClick}
                    className={`${
                      connected
                        ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                        : "border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-gray-900 border-2 bg-transparent dark:border-yellow-400 dark:text-yellow-400"
                    } rounded-2xl font-semibold w-full justify-start`}
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    {connected ? (
                      <div className="flex items-center justify-between w-full">
                        <span>{formatAddress(account?.address || "")}</span>
                        <Badge className="bg-white/20 text-gray-900 text-xs">{balance.toFixed(2)} APT</Badge>
                      </div>
                    ) : (
                      "Connect Wallet"
                    )}
                  </Button>

                  {/* Mobile Strava Button */}
                  <Button
                    onClick={handleStravaClick}
                    disabled={stravaLoading}
                    className={`${
                      stravaConnected
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white border-2 bg-transparent dark:border-purple-400 dark:text-purple-400"
                    } rounded-2xl font-semibold w-full justify-start disabled:opacity-50`}
                  >
                    {stravaLoading ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Activity className="w-4 h-4 mr-2" />
                    )}
                    {stravaConnected ? (
                      <div className="flex items-center justify-between w-full">
                        <span>{athlete?.firstname || "Connected"}</span>
                        <LogOut className="w-3 h-3" />
                      </div>
                    ) : (
                      "Connect Strava"
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 mt-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-purple-600 bg-clip-text text-transparent mb-4">
              Stryd
            </div>
            <p className="text-gray-300 mb-8">Turn Fitness into Rewards!</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Wallet Modal */}
      <WalletModal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)} />
    </div>
  )
}
