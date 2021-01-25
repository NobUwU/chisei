import {
  MessageEmbed,
} from 'discord.js'
import {
  CommandInterface,
  MessagePropsInterface,
} from '../@types'
import {
  execute,
} from '../chat'
import utils from './utils'
import music from './music'

export const commands: CommandInterface[] = [
  ...utils,
  ...music,
]

export const parseCommand = async (props: MessagePropsInterface): Promise<void> => {
  
  const {
    client,
    config,
    send,
    constants,
    content,
    author,
    log,
  } = props
  
  if (author.bot) return notCommand(props)

  if (constants.prefixes.includes(content.replace(/\s+/g, ""))) {
    send(config.defaultMessage.replace(/{client.ping}/g, `<@!${client.user?.id}>`))

    return
  }
  
  props.args = content.split(" ")
    .filter(i => i.length > 0)
  
  if (!props.args[0]) return notCommand(props)
  if (!constants.prefixes.includes(props.args[0].toLowerCase())) return notCommand(props)
  props.args.shift()

  if (!props.args[0]) return notCommand(props)
  const command: CommandInterface | undefined = commands.find(cmd => cmd.aliases?.includes(props.args[0].toLowerCase()) || cmd.name === props.args[0].toLowerCase())
  if (!command) return notCommand(props)
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

function notCommand(props: MessagePropsInterface): void {
  execute(props)

  return
}
