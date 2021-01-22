import dotenv from 'dotenv'
dotenv.config()
import { 
  Client,
} from 'discord.js'
import {
  ready,
  message,
} from './events'
import {
  EventPropsInterface,
} from './@types'
import {
  Constants,
} from './utils'
import {
  connection,
} from './database'
import * as log from './logs'
import config from './config'
connection
  .then(() => log.success(`Mongo DB connection established`))
  .catch((err) => {
    log.error(`Mongo DB connection failed, throwing error`)
    throw err
  })
const client = new Client()

log.warn("Updating constants real time")

for (const [key, value] of Object.entries(Constants.colors)) {
  if (typeof value === 'string') {
    Constants.colors[key] = parseInt(value.replace("#", "0x"))
  }
}
if (config.prefixes) {
  Constants.prefixes = config.prefixes
}
if (config.allowBotToBeMentionedAsPrefix || !config.prefixes) {
  Constants.prefixes = [
    ...Constants.prefixes,
    `<@${client.user?.id}>`,
    `<@!${client.user?.id}>`,
  ]
}

log.debug("New constants created: ")
console.log(Constants.colors)

const props: EventPropsInterface = {
  client,
  log,
  constants: Constants,
}

client.on('ready', ready(props))
client.on('message', message(props))

client.login(process.env.TOKEN)
