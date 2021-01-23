import {
  CommandPropsInterface,
} from './'
export interface ChatInterface {
  /**
   * Optional Regex to recieve message
   */
  regex?: RegExp
  /**
   * Optional strip all space from string before doing regex check
   */
  stripSpacesBeforeRegex?: boolean
  /**
   * Optional channel type (Not Yet Implemented)
   */
  channelType?: "dm" | "text"
  /**
   * Where code go to make beeps and boops
   * @param props Props given to command
   */
  callback (props?: CommandPropsInterface): Promise<void> | void
}
