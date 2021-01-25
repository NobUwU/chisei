import {
  MessageEmbed,
  Message,
  StreamDispatcher,
  VoiceConnection,
} from 'discord.js'

import {
  TrackInterface,
  MusicInterface,
  MessagePropsInterface,
} from '../../@types'

import {
  Constants,
} from '../../utils'

import YTDL from 'ytdl-core-discord'

import {
  durationFromSeconds,
} from '../../utils'

const {
  colors,
} = Constants

export default (
  {
    embed,
    member,
    quickEmbed,
    queue,
    log,
  }: MessagePropsInterface,
): MusicInterface => {

  const connect = async (): Promise<VoiceConnection | undefined> => {

    if (queue) {

      if (member) {

        const {
          channel,
        } = member.voice
    
        if (!channel) {
          await quickEmbed(undefined, `You must be in a voice channel`, colors.red)
    
          return
        }
  
        if (queue.channel && channel.id === queue.channel.id && queue.connection) return queue.connection
  
        const connection = await channel.join()
  
        connection.on("error", log.error)
  
        queue.connection = connection
        queue.channel = channel

        connection.on("disconnect", () => {
          queue.connection = undefined
          queue.channel = undefined
        })

        return connection
      } else {
        log.error(`Bot tried to connect to channel to play music but message had no member prop`)
  
        return
      }
      
    } else {
      log.error(`Queue is undefined and connect was called`)

      return
    }

  }

  const playNext = async (): Promise<void> => {

    if (queue) {

      if (queue.tracks.length === 0 && queue.connection) {

        Object.assign(queue, {
          dispatcher: undefined,
          currentlyPlaying: null,
        })

      } else {

        if (queue.connection) {
          const [track] = queue.tracks.splice(0, 1)

          if (queue.dispatcher) queue.dispatcher.end()

          const isYT = /youtube\.com|youtu\.be/.test(track.url)

          const bitrate = 128
          const type = isYT ? 'opus' : undefined
          const highWaterMark = 1028 * 32

          const ytdl = isYT ? await YTDL(track.url, {
            highWaterMark,
            requestOptions: {
              maxRetries: 50,
            },
          }) : null

          if (ytdl) {

            ytdl.on('error', console.error)
            ytdl.on('retry', console.error)
            ytdl.on('reconnect', console.error)
            ytdl.on('resume', console.error)
            ytdl.on('end', console.error)
            ytdl.on('close', console.error)

          }

          const source = ytdl || track.url
          
          //await new Promise(done => setTimeout(done, 5000))

          //console.log(source)

          const dispatcher: StreamDispatcher = queue.connection.play(source, {
            bitrate,
            type,
            highWaterMark,
          })
          Object.assign(queue, {
            dispatcher,
            currentlyPlaying: track,
          })
          
          const bean = setInterval(() => {
            console.log(`${durationFromSeconds(dispatcher.streamTime / 1000)} / ${track.duration}`)
          }, 2000)

          //await new Promise(done => setTimeout(done, 5000));
          dispatcher.on('error', console.error)
          dispatcher.on('finish', () => {
            playNext().catch(console.error)
            log.debug("SONG FINISH: Playing new track")
            setTimeout(() => {
              clearInterval(bean)
            }, 5000)
          })
          dispatcher.on('debug', console.log)
        } else {
          log.error(`Attempted to playNext with no channel connection`)

          return
        }

      }

    } else {
      log.error(`Queue is undefined and playNext was called`)

      return
    }

  }

  const addTrack = async (track: TrackInterface): Promise<Message | undefined> => {

    if (queue) {

      const position = queue.tracks.push(track)

      if (!queue.currentlyPlaying) {

        playNext().catch(log.error)

        return embed({
          title: `Now Playing`,
          description: `[${track.title}](${track.url})`,
          fields: [
            {
              name: 'Duration',
              value: `00:00 / ${track.duration}`,
              inline: false,
            },
          ],
          thumbnail: {
            url: track.thumbnail,
          },
        } as MessageEmbed)

      } else {

        return embed({
          title: `Added to queue`,
          description: `[${track.title}](${track.url})`,
          fields: [
            {
              name: 'Position',
              value: `${position}`,
            },
            {
              name: 'Duration',
              value: `${track.duration}`,
            },
          ],
          
          thumbnail: {
            url: track.thumbnail,
          },
        } as MessageEmbed)

      }

    } else {
      log.error(`Queue is undefined and addTrack was called`)

      return
    }

  }

  return {
    connect,
    addTrack,
    playNext,
  }

}
