import {
  MessageEmbed,
} from 'discord.js'
import {
  CommandInterface,
  CommandPropsInterface,
} from '../../@types'
import mongoose from 'mongoose'
const ping: CommandInterface = {
  name: "ping",
  aliases: [
    "pong",
  ],
  callback(props: CommandPropsInterface): void {
    const {
      client,
      createdTimestamp,
      constants,
      send,
    } = props
    const {
      colors,
    } = constants
    const dateThenBeforeDB = Date.now()
    const ws = client.ws.ping
    mongoose.connection.db.admin().ping(function () {
      const dateThenAfterDB = Date.now()
      send(
        {
          embed: {
            color: colors.orange,
            description: "Pinging...",
          } as MessageEmbed,
        },
      )
        .then(m => {
          m.edit(
            {
              embed: {
                color: colors.green,
                description: `\`\`\`nim
Discord Websocket Latency - ${ws}ms
Discord API Latency - ${Date.now() - dateThenAfterDB}ms
Bot Response Time - ${m.createdTimestamp - createdTimestamp - ws}ms
Database - ${Date.now() - dateThenBeforeDB}ms\`\`\``,
              },
            },
          )
        })
    })
  },
}
export default ping
