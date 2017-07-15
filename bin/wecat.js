#!/usr/bin/env node

const yargs = require('yargs')
const pkg = require('../package.json')
const local = require('../lib/local')
const install = require('../lib/install')

console.log()

function createHandler(args) {
  if (!local.checkExist()) {
    console.log('No wecat.json file') 
    return
  }
  const entry = args._[0]
  switch (entry) {
    case 'i':
    case 'install':
      install()
      break;
    case 'init':
      break;
  }
}

yargs
  .usage('wecat [command] [options]')
  .command(['init'], 'Initalize', () => {}, createHandler)
  .command(['install', 'i'], 'Install', () => {}, createHandler)
  .version(pkg.version)
  .alias('version', 'V')
  .alias('help', 'H')
  .help()
  .argv

