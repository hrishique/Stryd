"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Wallet, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"
import { useAptosWallet } from "../lib/aptos-wallet"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connectWallet, connecting, availableWallets, connected, account } = useAptosWallet()
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  if (!isOpen) return null

  const handleConnect = async (walletName: string) => {
    setSelectedWallet(walletName)
    try {
      await connectWallet(walletName)
      onClose()
    } catch (error) {
      console.error("Failed to connect:", error)
      setSelectedWallet(null)
    }
  }

  const walletLogos: Record<string, string> = {
    Petra: "🟠",
    Pontem: "🔵",
    Martian: "🔴",
    Fewcha: "🟡",
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {connected && account ? (
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-green-800 mb-2">Wallet Connected!</h3>
              <p className="text-sm text-green-700 font-mono break-all">{account.address}</p>
              <Button onClick={onClose} className="mt-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl">
                Continue
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <p className="text-gray-600">Choose a wallet to connect to Stryd</p>
              </div>

              <div className="space-y-3">
                {availableWallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => handleConnect(wallet.name)}
                    disabled={connecting && selectedWallet === wallet.name}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl hover:border-vibrant-yellow/50 hover:bg-vibrant-yellow/5 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-vibrant-yellow to-bright-purple rounded-full flex items-center justify-center text-xl">
                          {walletLogos[wallet.name] || "💼"}
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-dark-blue">{wallet.name}</h3>
                          <p className="text-sm text-gray-600">
                            {wallet.name === "Petra" && "Official Aptos Wallet"}
                            {wallet.name === "Pontem" && "Pontem Network Wallet"}
                            {wallet.name === "Martian" && "Martian Wallet"}
                            {wallet.name === "Fewcha" && "Fewcha Wallet"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {connecting && selectedWallet === wallet.name ? (
                          <div className="w-5 h-5 border-2 border-vibrant-yellow border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Badge className="bg-green-100 text-green-800 text-xs">Available</Badge>
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {availableWallets.length === 0 && (
                <div className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border border-red-200">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <h3 className="font-bold text-red-800 mb-2">No Wallets Found</h3>
                  <p className="text-sm text-red-700 mb-4">Please install a supported Aptos wallet to continue.</p>
                  <Button
                    onClick={() => window.open("https://petra.app/", "_blank")}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-2xl"
                  >
                    Install Petra Wallet
                  </Button>
                </div>
              )}

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  By connecting a wallet, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
