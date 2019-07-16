/**
 * @name proj:Arrows
 * @description Interpreter for Arrows
 * @author PMH Studio / PMH
 * @license MIT
 * @see https://github.com/PMHStudio/arrows#readme
 */

'use strict'

const version = require('./package.json').version

// Flag check
if (process.argv.includes('-v') || process.argv.includes('--version')) {
  console.log(`Arrows v${version}`)
  process.exit(0)
}

const targetFile = process.argv[2]

if (!targetFile || process.argv.includes('-h') || process.argv.includes('--help')) {
  // Command Help Message Here
  console.log(`Arrows Interpreter v${version}

Usage: arrows [Options] filename

Options:
-h, --help      Print This Message
-v, --version   Show Version of Arrows`)
  process.exit(0)
}

console.log('-----------\n')
let returnCode = require('./modules/arrowsInt').interpret(targetFile)
console.log('\n-----------\nProcess Ended with code ' + returnCode)
