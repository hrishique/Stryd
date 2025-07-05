"use client"

import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { PetraWallet } from "petra-plugin-wallet-adapter"
import { PontemWallet } from "@pontem/wallet-adapter-plugin"
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter"
import { FewchaWallet } from "fewcha-plugin-wallet-adapter"

// Wallet configuration
export const wallets = [new PetraWallet(), new PontemWallet(), new MartianWallet(), new FewchaWallet()]

// Aptos network configuration
export const APTOS_NETWORK = "testnet" // or "mainnet"
export const APTOS_NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1"

// Custom hook for wallet operations
export function useAptosWallet() {
  const {
    connect,
    disconnect,
    account,
    connected,
    connecting,
    wallet,
    wallets: availableWallets,
    signAndSubmitTransaction,
    signMessage,
  } = useWallet()

  const connectWallet = async (walletName?: string) => {
    try {
      if (walletName) {
        const selectedWallet = availableWallets.find((w) => w.name === walletName)
        if (selectedWallet) {
          await connect(selectedWallet.name)
        }
      } else {
        // Connect to first available wallet
        if (availableWallets.length > 0) {
          await connect(availableWallets[0].name)
        }
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      throw error
    }
  }

  const disconnectWallet = async () => {
    try {
      await disconnect()
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
      throw error
    }
  }

  const getBalance = async () => {
    if (!account?.address) return 0

    try {
      const response = await fetch(
        `${APTOS_NODE_URL}/accounts/${account.address}/resource/0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>`,
      )
      const data = await response.json()
      return Number.parseInt(data.data.coin.value) / 100000000 // Convert from Octas to APT
    } catch (error) {
      console.error("Failed to get balance:", error)
      return 0
    }
  }

  return {
    connectWallet,
    disconnectWallet,
    account,
    connected,
    connecting,
    wallet,
    availableWallets,
    signAndSubmitTransaction,
    signMessage,
    getBalance,
  }
}
