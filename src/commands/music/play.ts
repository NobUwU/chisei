import {
  CommandInterface,
  MessagePropsInterface,
  TrackInterface,
} from '../../@types'
import {
  durationFromSeconds,
} from '../../utils'
import ytdl from '../../utils/ytdl'

const play: CommandInterface = {
  name: 'play',
  aliases: [
    "p",
  ],
  async callback(props: MessagePropsInterface): Promise<void> {
    const [
      url,
      urlType,
    ] = props.args

    if (!props.music) {
      props.quickEmbed('An Error Occured', "`props.music` is undefined... Ask Nobu to check the logs", props.constants.colors.red)

      return
    }

    const connection = await props.music.connect()

    if (!connection) {
      props.quickEmbed('An Error Occured', "I failed ot connect to the VC... Ask Nobu to check logs...\n*I Possibly do not have the correct perms to join vc*", props.constants.colors.red)

      return
    }

    if (!url) {
      props.quickEmbed(undefined, "You need to specify a URL that I can play", props.constants.colors.orange)

      return
    }

    if (/\.(mp3|ogg|wav|aiff|m4a)$/.test(url) || /raw|file/.test(urlType)) {
      let title: RegExpExecArray | string | null = /[^\/]+((?=\#|\?)|$)/.exec(url)
      if (title) {
        title = title[0]
      } else {
        title = "Unknown"
      }
      const track: TrackInterface = {
        title: title.replace(/(\?|\#).+/, ''),
        duration: '00:00',
        rawDuration: 0,
        description: '',
        author: props.author,
        url,
        thumbnail: null,
      }

      await props.music.addTrack(track)

      return
    }

    const result: string = await ytdl(['-J', '-q', '-s', '-f', 'bestaudio', url])

    const {
      title,
      description,
      duration: rawDuration,
      thumbnails,
      formats,
    }: {
      title: string

      description: string

      duration: number

      thumbnails: [{
        url: string
      }]

      formats: [{
        ext: string
        url: string
        acodec: string
        format: string
      }]
    } = JSON.parse(result)

    const isYT = /youtube\.com|youtu\.be/.test(url)

    const source = isYT ? url : formats.find(({ format }) => /audio only/.test(format))?.url

    //source?.includes('open.spotify') ? source = source.replace('/embed', "") : null

    const duration = durationFromSeconds(rawDuration)

    const track: TrackInterface = {
      title,
      duration,
      rawDuration,
      description,
      author: props.author,
      url: source || "Unknown",
      thumbnail: thumbnails && thumbnails.reverse()[0].url,
    }

    await props.music.addTrack(track)
  },
}

export default play
