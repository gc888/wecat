'use strict'

const path = require('path')
const fs = require('fs')
const co = require('co')
const local = require('./local')
const fetcher = require('./fetcher')
const linker = require('./linker')
const workdir = process.cwd()

module.exports = () => {
  const localData = local.read()
  co(function* () {
    yield fetcher(localData.target || [])
    yield linker(localData.link || {})
  })
}

