import chalk from 'chalk'
import moment from 'moment'
export const success = (...content: Array<string>): void => {
  console.log(`${chalk.gray(moment().format("YYYY-MM-DD HH:mm:ss"))} ${chalk.green("[SUCCESS]")} ${content}`)
}
export const log = (...content: Array<string>): void => {
  console.log(`${chalk.gray(moment().format("YYYY-MM-DD HH:mm:ss"))} ${chalk.grey("[LOG]")} ${content}`)
}
export const info = (...content: Array<string>): void => {
  console.log(`${chalk.gray(moment().format("YYYY-MM-DD HH:mm:ss"))} ${chalk.cyan("[INFO]")} ${content}`)
}
export const warn = (...content: Array<string>): void => {
  console.log(`${chalk.gray(moment().format("YYYY-MM-DD HH:mm:ss"))} ${chalk.yellow("[WARN]")} ${content}`)
}
export const error = (...content: Array<string>): void => {
  console.log(`${chalk.gray(moment().format("YYYY-MM-DD HH:mm:ss"))} ${chalk.red("[ERROR]")} ${content}`)
}
export const debug = (...content: Array<string>): void => {
  console.log(`${chalk.gray(moment().format("YYYY-MM-DD HH:mm:ss"))} ${chalk.magenta("[DEBUG]")} ${content}`)
}
