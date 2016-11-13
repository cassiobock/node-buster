const fs = require('fs')
const path = require('path')

const cleanDirectory = (dir) => {
  return new Promise((resolve, reject) => {
    try {
      const files = fs.readdirSync(dir)

      files.forEach(file => {
        const filepath = path.join(dir, file)
        const stat = fs.statSync(filepath)

        if (stat.isDirectory()) {
          return cleanDirectory(filepath)
        }

        fs.unlinkSync(filepath)
      })

      fs.rmdirSync(dir)

      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

module.exports = cleanDirectory
