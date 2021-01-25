import {
  Client,
  Message,
  MessageEmbed,
} from "discord.js"
import {
  ConstantsInterface,
  ConfigInterface,
  QueueInterface,
  MusicInterface,
  SearchInterface,
} from "."
import { LogsInterface } from "./logs"

export interface MessagePropsInterface extends Message {
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
   * Embed helper function
   * @param options MessageEmbed stuff
   */
  embed (options: MessageEmbed): Promise<Message>
  /**
   * Quick embed helper function
   * @param title Embed Title
   * @param description Embed Description
   * @param color Embed Color
   */
  quickEmbed (title?: string, description?: string, color?: string): Promise<Message>
  /**
   * Direct access to custom logs
   */
  log: LogsInterface
  /**
   * Config file
   */
  config: ConfigInterface
  /**
   * Discord Client
   */
  client: Client
  /**
   * Current Music Queue
   */
  queue: QueueInterface | undefined
  /**
   * Searchs
   */
  search: SearchInterface | undefined
  /**
   * Music Helper Functions
   */
  music: MusicInterface | undefined
}
