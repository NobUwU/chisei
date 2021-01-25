import {
  VoiceState,
} from 'discord.js'
import {
  PropsInterface,
} from '../@types'

const voiceStateEvent = (props: PropsInterface) => async (voiceState: VoiceState): Promise<void> => {
  const {
    queues,
  } = props
  const guildId = voiceState.guild.id

  if (queues[guildId] && queues[guildId].connection) {
    const queue = queues[guildId]

    if (queue.channel?.members.size === undefined) {
      await queue.connection?.disconnect()

      return
    }
    if (queue.channel?.members.size <= 1) {
      await queue.connection?.disconnect()

      return
    }
  }
}

export {
  voiceStateEvent,
}
