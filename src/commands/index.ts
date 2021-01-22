import {
  MessageEmbed,
} from 'discord.js'
import {
  CommandInterface,
  CommandPropsInterface,
} from 'src/@types'
import utils from './utils'

export const commands: CommandInterface[] = [
  ...utils,
]

export const parseCommand = async (props: CommandPropsInterface): Promise<void> => {
  const {
    client,
    send,
    constants,
    content,
    author,
    log,
  } = props
  if (author.bot) return

  if (constants.prefixes.includes(content.replace(/\s+/g, ""))) {
    send(`Teitoku, I am ${client.user?.username} you can utilize me via one of my following prefixs: \`chisei\`, \`c-\`, <@!${client.user?.id}>. Use \`chisei help\` to see all my capabilities`)

    return
  }
  props.args = content.split(" ")
    .filter(i => i.length > 0)
  
  if (!constants.prefixes.includes(props.args[0].toLowerCase())) return
  props.args.shift()

  const command: CommandInterface | undefined = commands.find(cmd => cmd.aliases?.includes(props.args[0].toLowerCase()) || cmd.name === props.args[0].toLowerCase())
  if (!command) return
  props.args.shift()

  try {
    await command.callback(props)

    return
  } catch (err) {
    log.debug(`Error Occurred`)
    log.error(err)
    send(
      {
        embed: {
          color: constants.colors.red,
          title: "An Error Occured",
          description: `\`\`\`${err}\`\`\``,
        } as MessageEmbed,
      },
    )

    return
  }

} 
