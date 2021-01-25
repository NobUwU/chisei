import { User } from "discord.js"

export interface TrackInterface {
  title: string
  description: string
  duration: string
  rawDuration: number
  thumbnail: string | null
  url: string
  author: User
}
