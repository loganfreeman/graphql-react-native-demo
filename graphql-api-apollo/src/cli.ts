#! /usr/bin/env node
import fs from 'fs'
import path from 'path'
import Command from './cli/command'
import getContext from './cli/context'

const arg = process.argv.slice(2)[0]

async function start () {
  try {
    const context = await getContext()

    const commandsPath = path.resolve(__dirname, 'cli/commands')

    const commandFilenames = fs.readdirSync(commandsPath)

    const commands = []

    for (const commandFilename of commandFilenames) {
      const { default: CommandClass } = require(path.resolve(commandsPath, commandFilename))

      const commandInstance: Command = new CommandClass(context)
      commands.push(commandInstance.name)

      if (commandInstance.name === arg) {
        const code = await commandInstance.run()
        process.exit(code || 0)
        break
      }
    }

    if (arg === 'list') {
      console.log('Available commands : \n\n' + commands.join('\n'))
    } else {
      console.error(`Command ${arg} does not exists.`)
    }

    process.exit(1)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

start()
