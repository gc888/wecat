'use strict'

const path = require('path')
const fs = require('fs')
const config = require('./config')
const fileName = config.localfile.name
const localFile = path.join(config.workdir, fileName)
const fileTpl = {
  root: './',
  target: [],
  link: {},
}
let localData
let fileExist

function checkExist() {
  return fileExist === undefined ?
    fileExist = fs.existsSync(localFile) :
    fileExist 
}

function init() {
  fs.writeFileSync(localFile, JSON.stringify(fileTpl, null, 2))
}

function read() {
  if (!localData && checkExist()) {
    localData = JSON.parse(fs.readFileSync(localFile, {encoding: 'utf8'}))
  } 
  return localData
}

function setConfig() {
  if (read()) {
    config.root = localData.root || './'
  }
}

module.exports = {
  checkExist,
  init,
  read,
  setConfig,
}

