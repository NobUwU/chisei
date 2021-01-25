import {
  TrackInterface,
} from "./"
import {
  Message,
} from "discord.js"

export interface SearchInterface {
  tracks: TrackInterface[]
  date: number
  message?: Message
}
