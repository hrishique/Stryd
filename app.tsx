"use client"

import { useState } from "react"
import { Layout } from "./components/layout"
import { LandingPage } from "./components/landing-page"
import { Dashboard } from "./components/dashboard"
import { CreateChallenge } from "./components/create-challenge"
import { ChallengeDetail } from "./components/challenge-detail"
import { Leaderboard } from "./components/leaderboard"
import { SuccessModal } from "./components/success-modal"
import { BottomNav, type Page } from "./components/bottom-nav"
import { ThemeProvider } from "./lib/theme-context"
import { motion, AnimatePresence } from "framer-motion"

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const pageVariants = {
    initial: { opacity: 0, x: -20, scale: 0.95 },
    in: { opacity: 1, x: 0, scale: 1 },
    out: { opacity: 0, x: 20, scale: 0.95 },
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  }

  const handlePageChange = (page: Page) => {
    console.log(`Navigating to: ${page}`)
    setCurrentPage(page)
  }

  const renderPage = () => {
    const pageProps = {
      initial: "initial",
      animate: "in",
      exit: "out",
      variants: pageVariants,
      transition: pageTransition,
    }

    switch (currentPage) {
      case "landing":
        return (
          <motion.div key="landing" {...pageProps}>
            <LandingPage />
          </motion.div>
        )
      case "dashboard":
        return (
          <motion.div key="dashboard" {...pageProps}>
            <Dashboard />
          </motion.div>
        )
      case "create":
        return (
          <motion.div key="create" {...pageProps}>
            <CreateChallenge />
          </motion.div>
        )
      case "challenge":
        return (
          <motion.div key="challenge" {...pageProps}>
            <ChallengeDetail />
          </motion.div>
        )
      case "leaderboard":
        return (
          <motion.div key="leaderboard" {...pageProps}>
            <Leaderboard />
          </motion.div>
        )
      default:
        return (
          <motion.div key="landing" {...pageProps}>
            <LandingPage />
          </motion.div>
        )
    }
  }

  return (
    <ThemeProvider>
      <div className="font-sans">
        <Layout>
          <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>
        </Layout>

        {/* Bottom Navigation */}
        <BottomNav currentPage={currentPage} onPageChange={handlePageChange} />

        {/* Success Modal */}
        <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />

        {/* Demo Success Button */}
        <motion.button
          onClick={() => setShowSuccessModal(true)}
          className="fixed top-4 right-4 z-40 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors shadow-lg"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
        >
          🎉 Test Success
        </motion.button>
      </div>
    </ThemeProvider>
  )
}
