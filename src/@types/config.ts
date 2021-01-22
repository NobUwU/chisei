export interface ConfigInterface {
  /**
   * Bot is allowed to use its mention as a prefix?
   */
  allowBotToBeMentionedAsPrefix: boolean
  /**
   * string[] of valid prefixes the bot should respond to
   */
  prefixes: string[]
  /**
   * What the bot should send when a user only sends the bots prefix with no command
   */
  defaultMessage: string
}
