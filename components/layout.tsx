"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Wallet, Activity, User, LogOut } from "lucide-react"
import { useAptosWallet } from "../lib/aptos-wallet"
import { useStravaAuth } from "../lib/strava-auth"
import { WalletModal } from "./wallet-modal"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [balance, setBalance] = useState<number>(0)

  const { connected, account, disconnectWallet, getBalance } = useAptosWallet()
  const {
    isConnected: stravaConnected,
    athlete,
    connectStrava,
    disconnectStrava,
    isLoading: stravaLoading,
  } = useStravaAuth()

  useEffect(() => {
    if (connected && account) {
      getBalance().then(setBalance).catch(console.error)
    }
  }, [connected, account, getBalance])

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
    <div className="min-h-screen bg-gradient-to-br from-light-grey to-white pb-20">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-light-grey sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-display font-bold bg-gradient-to-r from-vibrant-yellow to-bright-purple bg-clip-text text-transparent">
                Stryd
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-dark-blue hover:text-bright-purple transition-colors font-medium">
                Dashboard
              </a>
              <a href="#" className="text-dark-blue hover:text-bright-purple transition-colors font-medium">
                Challenges
              </a>
              <a href="#" className="text-dark-blue hover:text-bright-purple transition-colors font-medium">
                Leaderboard
              </a>
            </div>

            {/* Wallet & Strava Connection */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Wallet Button */}
              <Button
                onClick={handleWalletClick}
                className={`${
                  connected
                    ? "bg-vibrant-yellow text-dark-blue hover:bg-vibrant-yellow/90 shadow-glow"
                    : "border-vibrant-yellow text-vibrant-yellow hover:bg-vibrant-yellow hover:text-dark-blue border-2 bg-transparent"
                } rounded-2xl font-semibold transition-all duration-300 hover:scale-105`}
              >
                <Wallet className="w-4 h-4 mr-2" />
                {connected ? (
                  <div className="flex items-center gap-2">
                    <span>{formatAddress(account?.address || "")}</span>
                    <Badge className="bg-white/20 text-dark-blue text-xs">{balance.toFixed(2)} APT</Badge>
                  </div>
                ) : (
                  "Connect Wallet"
                )}
              </Button>

              {/* Strava Button */}
              <Button
                onClick={handleStravaClick}
                disabled={stravaLoading}
                className={`${
                  stravaConnected
                    ? "bg-bright-purple text-white hover:bg-bright-purple/90 shadow-glow-purple"
                    : "border-bright-purple text-bright-purple hover:bg-bright-purple hover:text-white border-2 bg-transparent"
                } rounded-2xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50`}
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
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-dark-blue">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-light-grey">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-dark-blue hover:text-bright-purple font-medium">
                Dashboard
              </a>
              <a href="#" className="block px-3 py-2 text-dark-blue hover:text-bright-purple font-medium">
                Challenges
              </a>
              <a href="#" className="block px-3 py-2 text-dark-blue hover:text-bright-purple font-medium">
                Leaderboard
              </a>

              <div className="flex flex-col space-y-3 px-3 pt-4 border-t border-gray-200">
                {/* Mobile Wallet Button */}
                <Button
                  onClick={handleWalletClick}
                  className={`${
                    connected
                      ? "bg-vibrant-yellow text-dark-blue hover:bg-vibrant-yellow/90"
                      : "border-vibrant-yellow text-vibrant-yellow hover:bg-vibrant-yellow hover:text-dark-blue border-2 bg-transparent"
                  } rounded-2xl font-semibold w-full justify-start`}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {connected ? (
                    <div className="flex items-center justify-between w-full">
                      <span>{formatAddress(account?.address || "")}</span>
                      <Badge className="bg-white/20 text-dark-blue text-xs">{balance.toFixed(2)} APT</Badge>
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
                      ? "bg-bright-purple text-white hover:bg-bright-purple/90"
                      : "border-bright-purple text-bright-purple hover:bg-bright-purple hover:text-white border-2 bg-transparent"
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
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-dark-blue text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-3xl font-display font-bold bg-gradient-to-r from-vibrant-yellow to-bright-purple bg-clip-text text-transparent mb-4">
              Stryd
            </div>
            <p className="text-gray-300 mb-8">Turn Fitness into Rewards!</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-vibrant-yellow transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-300 hover:text-vibrant-yellow transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-300 hover:text-vibrant-yellow transition-colors">
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
