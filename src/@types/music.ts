import {
  TrackInterface,
} from '.'

import {
  Message, 
  VoiceConnection, 
} from "discord.js"

export interface MusicInterface {
  connect (): Promise<VoiceConnection | undefined>
  playNext (): Promise<void>
  addTrack (track: TrackInterface): Promise<Message | undefined>
}
