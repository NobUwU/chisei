import bannedWords from '../../chat/automod/bannedWords'
import {
  CommandInterface,
  CommandPropsInterface,
} from '../../@types'

const say: CommandInterface = {
  name: "say",

  callback(props: CommandPropsInterface): void {

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
