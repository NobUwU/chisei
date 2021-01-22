import {
  Message,
} from "discord.js"
import {
  PropsInterface,
} from "src/@types"

const message = (props: PropsInterface) => (message: Message): void => {
  const {
    client,
    log,
  } = props
  log.debug(message.content)
  if (message.author.bot) return
  if (message.content === `<@!${client.user?.id}>`) {
    message.channel.send(`Teitoku, I am ${client.user?.username} you can utilize me via one of my following prefixs: \`chisei\`, \`c-\`, <@!${client.user?.id}>. Use \`chisei help\` to see all my capabilities`)

    return
  }

}
export {
  message,
}
