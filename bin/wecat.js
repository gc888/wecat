#!/usr/bin/env node

const yargs = require('yargs')
const co = require('co')
const pkg = require('../package.json')
const local = require('../lib/local')
const linker = require('../lib/linker')
const fetcher = require('../lib/fetcher')

function createHandler(args) {
  if (!local.checkExist()) {
    console.log('No wecat.json file') 
    return
  }
  local.setConfig()
  const entry = args._[0]
  switch (entry) {
    case 'i':
    case 'install':
      co(function* () {
        yield fetcher()
        yield linker()
      })
      break
    case 'link':
      linker()
      break
    case 'download':
      fetcher()
      break
  }
}

yargs
  .usage('wecat [command] [options]')
  .command(['init'], 'Initalize', () => {}, () => {
    if (!local.checkExist()) {
      local.init()
      console.log('Done!')
    } else {
      console.log('You have done!') 
    }
  })
  .command(['install', 'i'], 'Install', () => {}, createHandler)
  .command(['link'], 'Link', () => {}, createHandler)
  .command(['download'], 'Download', () => {}, createHandler)
  .version(pkg.version)
  .alias('version', 'V')
  .alias('help', 'H')
  .help()
  .argv

if (!yargs.argv._[0]) {
  yargs.showHelp()
}

