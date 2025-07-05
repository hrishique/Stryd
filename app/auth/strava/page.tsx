"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function StravaCallback() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get("code")
    const error = searchParams.get("error")

    if (code) {
      // Send the code to the parent window
      if (window.opener) {
        window.opener.postMessage(
          {
            type: "STRAVA_AUTH_SUCCESS",
            code: code,
          },
          window.location.origin,
        )
        window.close()
      }
    } else if (error) {
      console.error("Strava auth error:", error)
      if (window.opener) {
        window.opener.postMessage(
          {
            type: "STRAVA_AUTH_ERROR",
            error: error,
          },
          window.location.origin,
        )
        window.close()
      }
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light-grey to-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-vibrant-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-dark-blue font-semibold">Connecting to Strava...</p>
      </div>
    </div>
  )
}
