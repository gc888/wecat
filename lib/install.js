'use strict'

const path = require('path')
const fs = require('fs')
const local = require('./local')
const fetcher = require('./fetcher')
const workdir = process.cwd()

module.exports = () => {
  const localData = local.read()
  const targets = localData.target
  fetcher(targets)
}

