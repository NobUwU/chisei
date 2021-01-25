import {
  CommandInterface,
  MessagePropsInterface,
} from '../../@types'

const test: CommandInterface = {
  name: "test",

  callback(props: MessagePropsInterface): void {

    const {
      send,
      client,
    } = props

    send(`There are ${client.users.cache.size} Users!`)
  },
}
export default test
