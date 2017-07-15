'use strict'

const fs = require('fs')
const mkdirp = require('mkdirp')
const axios = require('axios')

function download(target) {
  return axios.get('', {
    responseType: 'stream' 
  }).then(res => {
    res.data.pipe(fs.createWriteStream('')) 
  })
}

module.exports = target => {
  
}

