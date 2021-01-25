import {
  PropsInterface,
} from "../@types"

const ready = (props: PropsInterface) => (): void => {

  const {
    client,
    log,
    constants,
    config,
  } = props
  // Updates constants. TBH this could honestly be yeeted for an easier system but like eh
  log.warn("Updating constants real time")

  for (const [key, value] of Object.entries(constants.colors)) {
    if (typeof value === 'string') {
      constants.colors[key] = parseInt(value.replace("#", "0x"))
    }
  }
  if (config.prefixes) {
    constants.prefixes = config.prefixes
  }
  if (config.allowBotToBeMentionedAsPrefix || !config.prefixes) {
    constants.prefixes = [
      ...constants.prefixes,
      `<@${client.user?.id}>`,
      `<@!${client.user?.id}>`,
    ]
  }

  log.debug("New constants created: ")
  console.log(constants)

  log.info(`Logged in as ${client.user?.username}#${client.user?.discriminator}`)

  client.user?.setPresence({
    activity: {
      name: "Nobu Develop Me :3",
      type: 'WATCHING',
    },
    status: 'online',
  })
  
}
export {
  ready,
}
