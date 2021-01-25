import {
  Client,
} from "discord.js"
import {
  ConstantsInterface,
  ConfigInterface,
  QueueInterface,
  SearchInterface,
} from "."
import { LogsInterface } from "./logs"

export interface PropsInterface {
  /**
   * Bots constants
   */
  constants: ConstantsInterface
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
   * Queued Songs
   */
  queues: {
    [guildId: string]: QueueInterface
  }
  /**
   * Song Searches
   */
  searches: {
    [guildId: string]: {
      [authorId: string]: SearchInterface
    }
  }
}
