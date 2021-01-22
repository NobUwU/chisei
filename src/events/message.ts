import {
  Message,
  MessageEmbed,
} from "discord.js"
import {
  CommandPropsInterface,
  EventPropsInterface,
} from "src/@types"
import {
  parseCommand,
} from '../commands'
const message = (props: EventPropsInterface) => (message: Message): void => {

  const {
    log,
    constants,
  } = props

  log.debug(message.content)

  const send = (content: string | { embed: MessageEmbed }): Promise<Message> => {
    return message.channel.send(content)
  }

  const commandProps: CommandPropsInterface = Object.assign(message, {
    args: [],
    constants,
    send,
    log,
  })

  parseCommand(commandProps)
  
}
export {
  message,
}
