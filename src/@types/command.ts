import {
  MessagePropsInterface,
} from './'
export interface CommandInterface {
  /**
   * Main name command is referred by
   */
  name: string
  /**
   * Optional description for help command
   */
  description?: string
  /**
   * Optional usage for help command
   */
  usage?: string
  /**
   * Optional other names the command should respond to
   */
  aliases?: string[]
  /**
   * Optional channel type (Not Yet Implemented)
   */
  channelType?: "dm" | "text"
  /**
   * Where code go to make beeps and boops
   * @param props Props given to command
   */
  callback (props?: MessagePropsInterface): Promise<void> | void
}
