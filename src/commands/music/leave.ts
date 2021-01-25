import {
  CommandInterface,
  MessagePropsInterface,
} from '../../@types'

const leave: CommandInterface = {
  name: 'leave',
  aliases: [
    "dc",
    "disconnect",
  ],

  async callback (props: MessagePropsInterface) {
    if (props.queue?.connection) await props.queue.connection.disconnect()
    if (props.queue) {
      props.queue.channel = undefined
      props.queue.connection = undefined
      props.queue.currentlyPlaying = null
      props.queue.tracks = []
      props.queue.dispatcher?.end()
    }
  },
}

export default leave
