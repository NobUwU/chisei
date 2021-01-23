import {
  CommandInterface,
  CommandPropsInterface,
} from '../../@types'

import {
  MessageEmbed,
} from 'discord.js'

import bannedWords from '../../chat/automod/bannedWords'

const bannedwords: CommandInterface = {
  name: "bannedwords",
  aliases: [
    "bw",
  ],
  callback(props: CommandPropsInterface): void {

    const {
      args,
      send,
      constants,
    } = props

    const {
      colors,
    } = constants
    
    if (!args[0]) {
      send({
        embed: {
          title: "Current BannedWords RegEXP",
          description: `**Source**\`\`\`${bannedWords.regex?.source}\`\`\`\n**Flags**\`\`\`${bannedWords.regex?.flags}\`\`\``,
          color: colors.red,
        } as MessageEmbed,
      })

      return
    }
    try {
      if (!args[1]) {
        const regexNewFlags = new RegExp(bannedWords.regex as RegExp, args[0])
        bannedWords.regex = regexNewFlags
      } else {
        const flags = args[0]
        args.shift()
        const regex = new RegExp(args.join(" "), flags)
        bannedWords.regex = regex
      }

      send({
        embed: {
          description: `Successfully updated banned words RegEXP`,
          footer: {
            text: "WARN: this is a temporary feature. It will reset on bot restart",
          },
          color: colors.green,
        } as MessageEmbed,
      })

    } catch (err) {
      send({
        embed: {
          description: `**Error Ocurred When Trying To Create RegEXP**\n\`\`\`${err}\`\`\``,
          color: colors.red,
        } as MessageEmbed,
      })

      return
    }

  },
}
export default bannedwords
