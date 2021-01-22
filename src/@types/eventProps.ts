import {
  Client,
} from "discord.js"
import {
  LogsInterface,
  ConstantsInterface,
} from "./"

export interface EventPropsInterface {
  client: Client
  log: LogsInterface
  constants: ConstantsInterface
}
