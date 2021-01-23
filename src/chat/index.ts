import {
  ChatInterface,
  CommandPropsInterface,
} from "../@types"
import automod from './automod'

export const chatListeners: ChatInterface[] = [
  ...automod,
]

export const execute = async (props: CommandPropsInterface): Promise<void> => {
  await chatListeners.forEach(listener => {
    if (!listener.regex) {
      listener.callback(props)

      return
    }
    let contentCheck = props.content
    if (listener.stripSpacesBeforeRegex) contentCheck = contentCheck.replace(/\s/g, "")
    if (listener.regex.test(contentCheck)) {
      listener.callback(props)
      
      return
    }
  })
}
