import {
  CommandInterface,
  MessagePropsInterface,
} from '../../@types'
import {
  MessageEmbed,
} from 'discord.js'

const embed: CommandInterface = {
  name: "embed",
  aliases: [
    "em",
  ],

  callback(props: MessagePropsInterface): void {

    const {
      constants,
      send,
      args,
    } = props

    const {
      colors,
    } = constants

    if (!args[0]) {
      send({
        embed: {
          description: "**No JSON was provided to embed ; - ;**",
          color: colors.red,
        } as MessageEmbed,
      })

      return
    }
    try {
      const JSONObj = JSON.parse(args.join(" "))

      send({
        embed: {
          ...JSONObj,
        } as MessageEmbed,
      })

      return
    } catch(err) {
      send({
        embed: {
          description: `**Error Ocurred When Parsing JSON**\n\`\`\`${err}\`\`\``,
          color: colors.red,
        } as MessageEmbed,
      })

      return
    }
  },
}
export default embed
