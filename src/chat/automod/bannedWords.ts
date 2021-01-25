import {
  ChatInterface,
  MessagePropsInterface,
} from '../../@types'

const bannedWords: ChatInterface = {
  regex: /(nigger|nibba|nigga|beaner)/ig,
  stripSpacesBeforeRegex: true,
  callback(props: MessagePropsInterface): void {
    
    const {
      send,
      deletable,
      author,
      content,
      constants,
    } = props

    const {
      colors,
    } = constants
    
    const termsUsed = [...new Set(content.match(new RegExp(bannedWords.regex?.source as string, bannedWords.regex?.flags)))]

    if (deletable) props.delete()
    send(`${author} please avoid use of vulgar terms!`)
    author.send({
      embed: {
        title: "Use of Vulgar Terms Detected",
        description: `I have analyzed what you have sent in chat and ultimately decided to label it as vulgar! If you believe there was a mistake please send a screenshot of this to an admin or higher`,
        color: colors.red,
        fields: [
          {
            name: "Message",
            value: `\`\`\`${content}\`\`\``,
          },
          {
            name: "Vulgar Terms Detected",
            value: `\`\`\`${termsUsed?.join(", ")}\`\`\``,
          },
        ],
      },
    })
  },
}

export default bannedWords
