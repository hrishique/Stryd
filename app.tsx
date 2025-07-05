"use client"

import { useState } from "react"
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react"
import { Layout } from "./components/layout"
import { LandingPage } from "./components/landing-page"
import { Dashboard } from "./components/dashboard"
import { CreateChallenge } from "./components/create-challenge"
import { ChallengeDetail } from "./components/challenge-detail"
import { Leaderboard } from "./components/leaderboard"
import { SuccessModal } from "./components/success-modal"
import { BottomNav, type Page } from "./components/bottom-nav"
import { wallets } from "./lib/aptos-wallet"

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage />
      case "dashboard":
        return <Dashboard />
      case "create":
        return <CreateChallenge />
      case "challenge":
        return <ChallengeDetail />
      case "leaderboard":
        return <Leaderboard />
      default:
        return <LandingPage />
    }
  }

  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      onError={(error) => {
        console.error("Wallet adapter error:", error)
      }}
    >
      <div className="font-sans">
        <Layout>{renderPage()}</Layout>

        {/* Bottom Navigation */}
        <BottomNav currentPage={currentPage} onPageChange={setCurrentPage} />

        {/* Success Modal */}
        <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />

        {/* Demo Success Button - Remove in production */}
        <button
          onClick={() => setShowSuccessModal(true)}
          className="fixed top-4 right-4 z-40 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
        >
          🎉 Test Success
        </button>
      </div>
    </AptosWalletAdapterProvider>
  )
}
