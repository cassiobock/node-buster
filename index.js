#!/usr/bin/env node

const chalk = require('chalk')
const cleanup = require('./src/cleanup')
const ghpagesdeploy = require('./src/gh-pages-deploy')
const path = require('path')
const program = require('commander')
const replacer = require('./src/replacer')
const scraper = require('./src/scraper')

program
  .version('0.0.4')
  .option('-g, --ghost-url [url]', 'configure the Ghost local URL. Default: http://localhost:2368')
  .option('-r, --github-repo <repo>', 'configure the GitHub repository')
  .option('-b, --branch [branch]', 'configure the GitHub branch. Default: `gh-pages`')
  .option('-u, --site-url <siteurl>', 'configure the site URL that will used for the links')
  .option('-d, --path [path]', `configure the static path. Default: ${path.join(__dirname, 'static')}`)
  .parse(process.argv)

if (!program.githubRepo) {
  console.error(`Missing ${chalk.red.bold('GitHub repository')} parameter, use ${chalk.yellow('`-r`')} or ${chalk.yellow('`--github-repo`')}`)
  process.exit(1)
} else if (!program.siteUrl) {
  console.error(`Missing site ${chalk.red.bold('url')} parameter, use ${chalk.yellow('`-u`')} or ${chalk.yellow('`--site-url`')}`)
  process.exit(1)
}

const ghostUrl = program.ghostUrl || 'http://localhost:2368'
const branch = program.branch || 'gh-pages'
const staticPath = program.path || path.join(__dirname, 'static')

scraper.createStaticFiles(ghostUrl, staticPath)
  .then(() => replacer.correctUrls(ghostUrl, program.siteUrl, staticPath))
  .then(() => ghpagesdeploy.publish(staticPath, program.githubRepo, branch))
  .then(() => cleanup(staticPath))
  .then(() => console.log(chalk.green(`Static Ghost published to ${chalk.bold(program.siteUrl)}`)))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
