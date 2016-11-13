const cleanup = require('./src/cleanup')
const ghpagesdeploy = require('./src/gh-pages-deploy')
const path = require('path')
const replacer = require('./src/replacer')
const scraper = require('./src/scraper')

const branch = 'gh-pages'
const url = 'http://localhost:2368'
const newUrl = 'https://cassiobsilva.github.io/blog/'
const repo = 'git@github.com:cassiobsilva/blog.git'
const staticPath = path.join(__dirname, `static${new Date().getTime()}`)

scraper.createStaticFiles(url, staticPath)
  .then(() => replacer.correctUrls(url, newUrl, staticPath))
  .then(() => ghpagesdeploy.publish(staticPath, repo, branch))
  .then(() => cleanup(staticPath))
  .then(() => console.log('published'))
  .catch(console.log)
