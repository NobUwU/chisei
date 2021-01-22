import {
  ConstantsInterface,
} from "src/@types"

const ClientID = "743518504740716704"

export const Constants: ConstantsInterface = {
  clientId: ClientID,
  colors: {
    default: "#ff69b4",
    orange: "#ffa869",
    red: "#ff6969",
    green: "#82ff69",
    blueLight: "#69e6ff",
    blueDark: "#6982ff",
    purple: "#a069ff",
  },
  defaultPrefixes: [
    "chisei",
    `<@${ClientID}>`,
    `<@!${ClientID}>`,
    "c-",
  ],
}
