const replace = require('replace')

module.exports = {
  correctUrls: (originalUrl, newUrl, path) => {
    return new Promise((resolve, reject) => {
      try {
        replace({
          regex: originalUrl,
          replacement: newUrl,
          paths: [path],
          recursive: true,
          silent: true
        })

        return resolve()
      } catch (e) {
        return reject(e)
      }
    })
  }
}
