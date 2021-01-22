import {
  Message,
  MessageEmbed,
} from "discord.js"
import {
  ConstantsInterface,
  ConfigInterface,
} from "./"
import { LogsInterface } from "./logs"

export interface CommandPropsInterface extends Message {
  /**
   * Strring arguments once message has been parsed
   */
  args: string[]
  /**
   * Bots constants
   */
  constants: ConstantsInterface
  /**
   * Shortcut send function
   * @param content Content to send
   */
  send (content: string | { embed: MessageEmbed }): Promise<Message>
  /**
   * Direct access to custom logs
   */
  log: LogsInterface
  /**
   * Config file
   */
  config: ConfigInterface
}
