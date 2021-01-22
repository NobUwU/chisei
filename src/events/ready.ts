import {
  PropsInterface,
} from "src/@types"

const ready = (props: PropsInterface) => (): void => {
  const {
    client,
    log,
  } = props
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
