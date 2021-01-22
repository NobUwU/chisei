import {
  Message,
  MessageEmbed,
} from "discord.js"
import {
  ConstantsInterface,
} from "./"
import { LogsInterface } from "./logs"

export interface CommandPropsInterface extends Message {
  args: string[]
  constants: ConstantsInterface
  send (content: string | { embed: MessageEmbed }): Promise<Message>
  botRecievedTime?: number
  log: LogsInterface
}
