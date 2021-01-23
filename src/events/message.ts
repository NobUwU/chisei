import {
  Message,
  MessageEmbed,
} from "discord.js"
import {
  CommandPropsInterface,
  EventPropsInterface,
} from "../@types"
import {
  parseCommand,
} from '../commands'

const message = (props: EventPropsInterface) => (message: Message): void => {

  const {
    log,
    constants,
    config,
  } = props
  
  log.debug("Discord Chat Event: " + message.content)

  const send = (content: string | { embed: MessageEmbed }): Promise<Message> => {
    return message.channel.send(content)
  }

  const commandProps: CommandPropsInterface = Object.assign(message, {
    args: [],
    constants,
    send,
    log,
    config,
  })

  parseCommand(commandProps)
  
}
export {
  message,
}
