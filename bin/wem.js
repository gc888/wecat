#!/usr/bin/env node

const yargs = require('yargs')
const pkg = require('../package.json')
const local = require('../lib/local')
const install = require('../lib/install')

console.log()

function createHandler(args) {
  if (!local.checkExist()) {
    console.log('No wem.json file') 
    return
  }
  const entry = args._[0]
  switch (entry) {
    case 'install':
      install()
      break;
    case 'init':
      break;
  }
}

yargs
  .usage('wem [command] [options]')
  .command(['init'], 'Initalize', () => {}, createHandler)
  .command(['install'], 'Install', () => {}, createHandler)
  .version(pkg.version)
  .alias('version', 'V')
  .alias('help', 'H')
  .help()
  .argv

