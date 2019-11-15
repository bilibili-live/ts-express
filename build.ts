#!/usr/bin/env ts-node
import shell from 'shelljs'
import fs from 'fs'
import path, { dirname } from 'path'

const exec = process.argv[2]
const isClear: boolean = exec == 'clear'
const isRelease: boolean = exec == 'release'

const clear = (): void => {
  shell.rm('-rf', 'dist')
}

const build = (isRelease: boolean = false): void => {
  if (isRelease) {
    shell.rm('-rf', 'dist')
    shell.exec('tsc')
  }
  try {
    const current : string = path.join(__dirname, 'dist')
    fs.statSync(current).isDirectory()
  } catch {
    shell.mkdir('dist')
  }
  shell.cp('-rf', 'src/public', 'dist')
  shell.cp('-rf', 'src/type', 'dist')
  shell.cp('-rf', 'src/views', 'dist')
}

if (isClear) {
  clear()
} else {
  build(isRelease)
}