"use client"

import { useState, useCallback } from "react"

// Mock wallet types
export interface WalletAccount {
  address: string
  publicKey: string
}

export interface MockWallet {
  name: string
  icon: string
  connect: () => Promise<WalletAccount>
  disconnect: () => Promise<void>
  isConnected: () => boolean
}

// Mock wallet implementations
const mockWallets: MockWallet[] = [
  {
    name: "Petra",
    icon: "🟠",
    connect: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        address: "0x1234567890abcdef1234567890abcdef12345678",
        publicKey: "0xabcdef1234567890abcdef1234567890abcdef12",
      }
    },
    disconnect: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    },
    isConnected: () => localStorage.getItem("wallet-connected") === "petra",
  },
  {
    name: "Pontem",
    icon: "🔵",
    connect: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        address: "0xabcdef1234567890abcdef1234567890abcdef12",
        publicKey: "0x1234567890abcdef1234567890abcdef12345678",
      }
    },
    disconnect: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    },
    isConnected: () => localStorage.getItem("wallet-connected") === "pontem",
  },
  {
    name: "Martian",
    icon: "🔴",
    connect: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        address: "0x9876543210fedcba9876543210fedcba98765432",
        publicKey: "0xfedcba9876543210fedcba9876543210fedcba98",
      }
    },
    disconnect: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    },
    isConnected: () => localStorage.getItem("wallet-connected") === "martian",
  },
]

export function useAptosWallet() {
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState<WalletAccount | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [balance, setBalance] = useState(0)

  const connectWallet = useCallback(async (walletName: string) => {
    setIsLoading(true)
    try {
      const wallet = mockWallets.find((w) => w.name.toLowerCase() === walletName.toLowerCase())
      if (!wallet) throw new Error("Wallet not found")

      const account = await wallet.connect()
      setAccount(account)
      setConnected(true)
      setBalance(Math.random() * 100) // Mock balance
      localStorage.setItem("wallet-connected", walletName.toLowerCase())
      localStorage.setItem("wallet-account", JSON.stringify(account))
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const disconnectWallet = useCallback(async () => {
    setIsLoading(true)
    try {
      setAccount(null)
      setConnected(false)
      setBalance(0)
      localStorage.removeItem("wallet-connected")
      localStorage.removeItem("wallet-account")
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getBalance = useCallback(async () => {
    if (!connected) return 0
    // Mock balance fetch
    await new Promise((resolve) => setTimeout(resolve, 500))
    const mockBalance = Math.random() * 100
    setBalance(mockBalance)
    return mockBalance
  }, [connected])

  return {
    connected,
    account,
    isLoading,
    balance,
    connectWallet,
    disconnectWallet,
    getBalance,
    wallets: mockWallets,
  }
}
