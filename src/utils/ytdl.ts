import path from 'path'
import { execFile } from 'child_process'

export default (args?: string[]): Promise<string> => new Promise(
  (res, rej) => {
    execFile(
      path.join(
        __dirname,
        process.platform === `win32` ? '../../bin/youtube-dl.exe' : '../../bin/youtube-dl',
      ),
      args,
      (error, stdout, stderr) => {
        error || stderr
          ? rej(error || stderr)
          : res(stdout)
      },
    )
  },
)
