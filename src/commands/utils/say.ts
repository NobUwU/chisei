import bannedWords from '../../chat/automod/bannedWords'
import {
  CommandInterface,
  MessagePropsInterface,
} from '../../@types'

const say: CommandInterface = {
  name: "say",

  callback(props: MessagePropsInterface): void {

    const {
      send,
      content,
    } = props
    const sayContent = content.replace(/^.*say\s+/i, "")
    if (bannedWords.regex?.test(sayContent)) return
    send(content.replace(/^.*say\s+/i, ""))
    
    return
  },
}
export default say
