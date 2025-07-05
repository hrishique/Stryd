"use client"

import { useState, useEffect } from "react"

// Strava OAuth configuration
const STRAVA_CLIENT_ID = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID || "your_strava_client_id"
const STRAVA_REDIRECT_URI = process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI || "http://localhost:3000/auth/strava"
const STRAVA_SCOPE = "read,activity:read_all"

export interface StravaAthlete {
  id: number
  username: string
  firstname: string
  lastname: string
  profile_medium: string
  profile: string
  city: string
  state: string
  country: string
}

export interface StravaTokens {
  access_token: string
  refresh_token: string
  expires_at: number
  athlete: StravaAthlete
}

export function useStravaAuth() {
  const [isConnected, setIsConnected] = useState(false)
  const [athlete, setAthlete] = useState<StravaAthlete | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [tokens, setTokens] = useState<StravaTokens | null>(null)

  useEffect(() => {
    // Check if user is already connected
    const savedTokens = localStorage.getItem("strava_tokens")
    if (savedTokens) {
      try {
        const parsedTokens = JSON.parse(savedTokens) as StravaTokens
        if (parsedTokens.expires_at > Date.now() / 1000) {
          setTokens(parsedTokens)
          setAthlete(parsedTokens.athlete)
          setIsConnected(true)
        } else {
          // Token expired, try to refresh
          refreshToken(parsedTokens.refresh_token)
        }
      } catch (error) {
        console.error("Error parsing saved tokens:", error)
        localStorage.removeItem("strava_tokens")
      }
    }
  }, [])

  const connectStrava = () => {
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(STRAVA_REDIRECT_URI)}&approval_prompt=force&scope=${STRAVA_SCOPE}`

    // Open Strava auth in a popup window
    const popup = window.open(authUrl, "strava-auth", "width=600,height=700,scrollbars=yes,resizable=yes")

    // Listen for the popup to close or send a message
    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed)
        // Check if authentication was successful
        checkAuthStatus()
      }
    }, 1000)

    // Listen for messages from the popup
    const messageListener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return

      if (event.data.type === "STRAVA_AUTH_SUCCESS") {
        clearInterval(checkClosed)
        popup?.close()
        handleAuthCode(event.data.code)
        window.removeEventListener("message", messageListener)
      }
    }

    window.addEventListener("message", messageListener)
  }

  const handleAuthCode = async (code: string) => {
    setIsLoading(true)
    try {
      // Exchange code for tokens
      const response = await fetch("/api/strava/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        throw new Error("Failed to exchange code for tokens")
      }

      const tokenData: StravaTokens = await response.json()

      // Save tokens
      localStorage.setItem("strava_tokens", JSON.stringify(tokenData))
      setTokens(tokenData)
      setAthlete(tokenData.athlete)
      setIsConnected(true)
    } catch (error) {
      console.error("Error handling auth code:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshToken = async (refreshToken: string) => {
    try {
      const response = await fetch("/api/strava/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })

      if (!response.ok) {
        throw new Error("Failed to refresh token")
      }

      const tokenData: StravaTokens = await response.json()

      localStorage.setItem("strava_tokens", JSON.stringify(tokenData))
      setTokens(tokenData)
      setAthlete(tokenData.athlete)
      setIsConnected(true)
    } catch (error) {
      console.error("Error refreshing token:", error)
      disconnectStrava()
    }
  }

  const disconnectStrava = () => {
    localStorage.removeItem("strava_tokens")
    setTokens(null)
    setAthlete(null)
    setIsConnected(false)
  }

  const checkAuthStatus = () => {
    const savedTokens = localStorage.getItem("strava_tokens")
    if (savedTokens) {
      try {
        const parsedTokens = JSON.parse(savedTokens) as StravaTokens
        if (parsedTokens.expires_at > Date.now() / 1000) {
          setTokens(parsedTokens)
          setAthlete(parsedTokens.athlete)
          setIsConnected(true)
        }
      } catch (error) {
        console.error("Error checking auth status:", error)
      }
    }
  }

  const getActivities = async (page = 1, perPage = 30) => {
    if (!tokens?.access_token) {
      throw new Error("Not authenticated with Strava")
    }

    try {
      const response = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error("Failed to fetch activities")
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching activities:", error)
      throw error
    }
  }

  return {
    isConnected,
    athlete,
    isLoading,
    connectStrava,
    disconnectStrava,
    getActivities,
    tokens,
  }
}
