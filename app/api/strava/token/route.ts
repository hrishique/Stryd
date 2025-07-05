import { type NextRequest, NextResponse } from "next/server"

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ error: "Authorization code is required" }, { status: 400 })
    }

    const response = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to exchange code for tokens")
    }

    const tokenData = await response.json()
    return NextResponse.json(tokenData)
  } catch (error) {
    console.error("Error in token exchange:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
