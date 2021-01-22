import {
  CommandInterface,
  CommandPropsInterface,
} from '../../@types'

const listConstants: CommandInterface = {
  name: "listconstants",
  aliases: [
    "lc",
  ],

  callback(props: CommandPropsInterface): void {

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
