/* eslint-disable camelcase */
import {
  Message,
  MessageEmbed,
} from "discord.js"
import {
  PropsInterface,
  MessagePropsInterface,
  QueueInterface,
  SearchInterface,
} from "../@types"
import {
  parseCommand,
} from '../commands'

import music from './handlers/music'

// Change this later and split it into multiple functions
// One for handling dm commands and another for guild commands
// For the time being this *Should* work
const message = (props: PropsInterface) => (message: Message): void => {

  const {
    log,
    constants,
    config,
    queues,
    searches,
  } = props
  const {
    colors,
  } = constants
  const {
    guild,
    author,
  } = message

  log.debug("Discord Chat Event: " + message.content)

  const send = (content: string | { embed: MessageEmbed }): Promise<Message> => {
    return message.channel.send(content)
  }

  const embed = (options: MessageEmbed): Promise<Message> => {
    const embed = {
      author: { 
        icon_url: message.author.avatarURL(), 
        name: message.author.username,
      },
      // timestamp: new Date(),
      color: colors.pink,
      ...options,
    } as MessageEmbed

    return send({ embed })
  }

  const quickEmbed = (title?: string, description?: string, color?: string): Promise<Message> => {
    return embed({
      title,
      description,
      color: color || colors.pink,
    } as { color: number | string } as MessageEmbed)
  }

  let queue: QueueInterface | undefined
  let search: SearchInterface | undefined

  if (guild) {

    queues[guild.id] = queues[guild.id] || {
      connection: null,
      channel: null,
      dispatcher: null,
      currentlyPlaying: null,
      tracks: [],
    }

    queue = props.queues[guild.id]

    if (!searches[guild.id]) searches[guild.id] = {}

    if (!searches[guild.id][author.id]) searches[guild.id][author.id] = {
      tracks: [],
      date: 0,
    }

    search = searches[guild.id][author.id]

  }

  const partialMessageProps = Object.assign(
    message,
    {
      args: [],
      constants,
      send,
      embed,
      quickEmbed,
      log,
      config,
      search,
      queue,
      music: undefined,
    },
  )

  const messageProps: MessagePropsInterface = Object.assign(
    partialMessageProps,
    {
      music: music(partialMessageProps),
    },
  )

  parseCommand(messageProps).catch(log.error)
}
export {
  message,
}
