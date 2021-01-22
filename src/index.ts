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
  PropsInterface,
} from './@types'
import {
  Constants,
} from './utils'
import {
  connection,
} from './database'
import * as log from './logs'

connection
  .then(() => log.success(`Mongo DB connection established`))
  .catch((err) => {
    log.error(`Mongo DB connection failed, throwing error`)
    throw err
  })

const client = new Client()

const props: PropsInterface = {
  client,
  log,
  constants: Constants,
}
client.on('ready', ready(props))
client.on('message', message(props))

client.login(process.env.TOKEN)
