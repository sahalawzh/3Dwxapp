const copydir = require('copy-dir')
const fs = require('fs-extra')
const buildIgnore = ['@jfkued', 'jfk-elip', 'jfk-package_help']
const path = require('path')

const sourceDir = path.normalize('../blbl_wxapp/packages/dist/packages')
const targetDir = path.normalize('./dist/blbl/packages/@jfkued')
const targetDir2 = path.normalize('./src/blbl/packages/@jfkued')
const getCopyDir = function (filepath, filename) {
  let _filename = filepath.replace(sourceDir + path.sep, '').replace(path.sep + 'dist', '')
  if (buildIgnore.indexOf(_filename) > -1) {
    return false
  }
  return true
}
fs.emptyDir(targetDir, err => {
  if (err) {
    return console.error(err)
  }
  copydir.sync(sourceDir, targetDir, function (stat, filepath, filename) {
    if (stat === 'directory') {
      return getCopyDir(filepath)
    }
    return true
  })
})
fs.emptyDir(targetDir2, err => {
  if (err) {
    return console.error(err)
  }
  copydir.sync(sourceDir, targetDir2, function (stat, filepath, filename) {
    if (stat === 'directory') {
      return getCopyDir(filepath)
    }
    return true
  })
})
