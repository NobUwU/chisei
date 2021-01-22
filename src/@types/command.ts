import {
  CommandPropsInterface,
} from './'
export interface CommandInterface {
  name: string
  description?: string
  usage?: string
  aliases?: string[]
  channelType?: "dm" | "text"
  callback (props?: CommandPropsInterface): Promise<void> | void
}
