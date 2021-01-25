import {
  CommandInterface,
  MessagePropsInterface,
} from '../../@types'

const listConstants: CommandInterface = {
  name: "listconstants",
  aliases: [
    "lc",
  ],

  callback(props: MessagePropsInterface): void {

    const {
      constants,
      send,
    } = props

    send(`\`\`\`json
${JSON.stringify(constants)}
\`\`\``)
  },
}
export default listConstants
