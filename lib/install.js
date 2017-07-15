'use strict'

const path = require('path')
const fs = require('fs')
const Progress = require('progress')
const local = require('./local')
const fetcher = require('./fetcher')
const workdir = process.cwd()

module.exports = () => {
  const localData = local.read()
  const targets = localData.target
  const progress = new Progress(':bar', { total: 100 })
  targets.forEach(target => {
  
  })
}

