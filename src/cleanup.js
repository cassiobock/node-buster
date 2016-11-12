const fs = require('fs')
const path = require('path')

const getFiles = (directory) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => err ? reject(err) : resolve(files))
  })
}

const isDirectory = (itemPath) => {
  return new Promise((resolve, reject) => {
    fs.lstat(itemPath, (err, stats) => err ? reject(err) : resolve(stats.isDirectory()))
  })
}

const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => err ? reject(err) : resolve())
  })
}

const deleteDirectory = (directory) => {
  return new Promise((reject, resolve) => {
    fs.rmdir(directory, err => err ? reject(err) : resolve())
  })
}

const cleanDirectory = (directory) => {
  return new Promise((resolve, reject) => {
    getFiles(directory)
      .then(files => {
        if (!files.length) {
          return resolve()
        }

        const directories = []

        const deletePromises = files.map(file => {
          const currentPath = path.join(directory, file)

          return new Promise((resolve, reject) => {
            isDirectory(currentPath)
              .then(isDirectory => {
                if (isDirectory) {
                  directories.push(currentPath)

                  cleanDirectory(currentPath)
                    .then(() => resolve())
                    .catch(reject)

                  return
                }

                deleteFile(currentPath)
                  .then(() => resolve())
                  .catch(reject)
              })
              .catch(reject)
          })
        })

        return Promise.all(deletePromises)
          .then(() => Promise.all(directories.map(deleteDirectory)))
          .catch(reject)
      })
      .catch(reject)
  })
}

module.exports = cleanDirectory
