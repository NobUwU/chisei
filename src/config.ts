import {
  ConfigInterface,
} from './@types'

const config: ConfigInterface = {
  allowBotToBeMentionedAsPrefix: true,
  // Note that since I am lazy commands won't work unless there is a space between command and prefix
  // If you are using this as a template take up the challange and figure it out ;/
  prefixes: [
    "chi",
    "chisei",
  ],
  // {client.ping} will replace with the bots @mention
  defaultMessage: "Teitoku, I am Chisei you can utilize me via one of my following prefixs: `chisei `, `chi `, {client.ping}. Use `chisei help` to see all my capabilities",
}

export default config
