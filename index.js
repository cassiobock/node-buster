const cleanup = require('./src/cleanup')
const ghpagesdeploy = require('./src/gh-pages-deploy')
const path = require('path')
const replacer = require('./src/replacer')
const scraper = require('./src/scraper')


scraper.createStaticFiles(url, staticPath)
  .then(() => replacer.correctUrls(url, newUrl, staticPath))
  .then(() => ghpagesdeploy.publish(staticPath, repo, branch))
  .then(() => console.log('published'))
  .catch(console.log)
