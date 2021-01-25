import {
  VoiceConnection, 
  VoiceChannel, 
  StreamDispatcher, 
} from 'discord.js'

import {
  TrackInterface,
} from './'

export interface QueueInterface {
  connection?: VoiceConnection
  channel?: VoiceChannel
  dispatcher?: StreamDispatcher
  currentlyPlaying: TrackInterface | null
  tracks: TrackInterface[]
}
