import {
  Client,
} from "discord.js"
import {
  LogsInterface,
  ConstantsInterface,
  ConfigInterface,
} from "./"

export interface EventPropsInterface {
  /**
   * Discord.js Client class
   */
  client: Client
  /**
   * Access to custom logging methods
   */
  log: LogsInterface
  /**
   * Constants for thy bot
   */
  constants: ConstantsInterface
  /**
   * Config file
   */
  config: ConfigInterface
}
