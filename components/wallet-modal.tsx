"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAptosWallet } from "../lib/aptos-wallet"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connectWallet, isLoading, wallets } = useAptosWallet()

  const handleConnect = async (walletName: string) => {
    await connectWallet(walletName)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white dark:bg-gray-900 rounded-3xl p-6 w-full max-w-md shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-vibrant-yellow to-bright-purple rounded-xl">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Connect Wallet</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Wallet Options */}
            <div className="space-y-3">
              {wallets.map((wallet, index) => (
                <motion.button
                  key={wallet.name}
                  onClick={() => handleConnect(wallet.name)}
                  disabled={isLoading}
                  className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-vibrant-yellow dark:hover:border-vibrant-yellow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{wallet.icon}</div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{wallet.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Connect using {wallet.name} wallet</p>
                    </div>
                    {isLoading && (
                      <div className="w-5 h-5 border-2 border-vibrant-yellow border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                By connecting a wallet, you agree to our Terms of Service
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
