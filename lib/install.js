'use strict'

const path = require('path')
const fs = require('fs')
const local = require('./local')
const workdir = process.cwd()

module.exports = () => {
  const localData = local.read()
}

