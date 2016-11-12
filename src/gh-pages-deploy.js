const ghpages = require('gh-pages')

module.exports = {
  publish: (path, repo, branch) => {
    const config = { repo, branch }

    return new Promise((resolve, reject) => {
      ghpages.publish(path, config, err => {
        if (err) {
          return reject(err)
        }

        return resolve()
      })
    })
  }
}
