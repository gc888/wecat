'use strict'

const path = require('path')
const fs = require('fs')
const config = require('./config')
const workdir = process.cwd()
const fileName = config.localfile.name
const localFile = path.join(workdir, fileName)
const fileTpl = {
  target: [],
}
let localData
let fileExist

function checkExist() {
  return fileExist === undefined ?
    fileExist = fs.existsSync(localFile) :
    fileExist 
}

function initFile() {
  return fs.writeFileSync(localFile, JSON.stringify(fileTpl), null, 2)
}

function readLocal() {
  if (!localData && checkExist()) {
    localData = JSON.parse(fs.readFileSync(localFile, { encoding: 'utf8' }))
  } 
  return localData
}

function setConfig() {
  if (readLocal()) {
    config.root = localData.root || './'
  }
}

module.exports = {
  checkExist: checkExist,
  initFile: initFile, 
  read: readLocal,
  setConfig: setConfig,
}

