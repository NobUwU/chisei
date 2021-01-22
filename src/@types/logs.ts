export interface LogsInterface {
  success(...content: Array<string>): void
  log(...content: Array<string>): void
  info(...content: Array<string>): void
  warn(...content: Array<string>): void
  error(...content: Array<string>): void
  debug(...content: Array<string>): void
}
