import {
  Client,
} from "discord.js"
import {
  LogsInterface,
  ConstantsInterface,
} from "./"

export interface PropsInterface {
  client: Client
  log: LogsInterface
  constants: ConstantsInterface
}
