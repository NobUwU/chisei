import {
  ChatInterface,
  CommandPropsInterface,
} from '../../@types'

const bannedWords: ChatInterface = {
  regex: /(nigger|nig|nibba)/,
  stripSpacesBeforeRegex: true,
  callback(props: CommandPropsInterface): void {
    
    const {
      send,
      id,
      channel,
      guild,
    } = props

    send(`RegEXP detected banned word in message https://discord.com/channels/${guild?.id}/${channel.id}/${id}`)

  },
}

export default bannedWords
