'use strict'

const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const axios = require('axios')
const co = require('co')
const Progress = require('progress')

function getUrl(target) {
  const { name, version, path } = target
  const protocol = 'https'
  const url = target.source === 'npm' ?
    `npmcdn.com/${name}@${version}/${path}` :
    `raw.githubusercontent.com/${name}/${version}/${path}`
  return `${protocol}://${url}`
 }

function download(target, root, progress) {
  const url = getUrl(target)
  return axios.get(url, {
    responseType: 'stream',
  }).then(res => {
    const maxLength = res.headers['content-length']
    const filename = path.join(root, target.filename)
    mkdirp.sync(path.join(filename, '..'))

    return new Promise(resolve => {
      res.data.on('data', chunk => {
        const ratio = chunk.length / maxLength
        progress.tick(ratio * 10)
      })

      res.data.on('end', () => {
        resolve()
      })

      res.data.pipe(fs.createWriteStream(filename))
    })
  }).catch(err => {
    console.error(`\n Download ${target.name} failed`)
    console.error(err.message)
  })
}

module.exports = (targets, root) => {
  const targetLen = targets.length
  const progress = new Progress('Downloading [:bar] :percent :elapseds', {
    total: targetLen * 10,
    width: 50,
  })
  co(function* () {
    for (let i = 0; i < targetLen; i++) {
      yield download(targets[i], root, progress)
    }
  }).then(() => {
    console.log('Install Complete')
  }).catch(err => {
    console.error('Install Failed', err)
  })
}

