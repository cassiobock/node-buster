const scraper = require('website-scraper')

module.exports = {
  createStaticFiles: (url, path) => {
    const options = {
      urls: [url],
      recursive: true,
      prettifyUrls: true,
      directory: path,
      filenameGenerator: 'bySiteStructure',
      urlFilter: siteUrl => siteUrl.indexOf(url) === 0
    }

    return scraper.scrape(options)
  }
}
