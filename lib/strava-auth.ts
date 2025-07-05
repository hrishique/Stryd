"use client"

import { useState, useCallback, useEffect } from "react"

export interface StravaAthlete {
  id: number
  firstname: string
  lastname: string
  profile: string
  city: string
  state: string
  country: string
}

export function useStravaAuth() {
  const [isConnected, setIsConnected] = useState(false)
  const [athlete, setAthlete] = useState<StravaAthlete | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if already connected
    const savedAthlete = localStorage.getItem("strava-athlete")
    if (savedAthlete) {
      setAthlete(JSON.parse(savedAthlete))
      setIsConnected(true)
    }
  }, [])

  const connectStrava = useCallback(async () => {
    setIsLoading(true)
    try {
      // Mock Strava connection
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockAthlete: StravaAthlete = {
        id: 12345,
        firstname: "John",
        lastname: "Runner",
        profile: "/placeholder-user.jpg",
        city: "San Francisco",
        state: "CA",
        country: "USA",
      }

      setAthlete(mockAthlete)
      setIsConnected(true)
      localStorage.setItem("strava-athlete", JSON.stringify(mockAthlete))
    } catch (error) {
      console.error("Failed to connect to Strava:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const disconnectStrava = useCallback(async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setAthlete(null)
      setIsConnected(false)
      localStorage.removeItem("strava-athlete")
    } catch (error) {
      console.error("Failed to disconnect from Strava:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isConnected,
    athlete,
    isLoading,
    connectStrava,
    disconnectStrava,
  }
}
