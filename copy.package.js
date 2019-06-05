const copydir = require('copy-dir')
const whiteNames = require('./package.json').jfkWxPackages
const fs = require('fs-extra')
const buildIgnore = ['@jfkued', 'jfk-tab']
const path = require('path')

const sourceDir = path.normalize('../common/wx_package')
const targetDir = path.normalize('./dist/packages')
const targetDir2 = path.normalize('./src/packages')
const getCopyDir = function (filepath, filename) {
  let _filename = filepath.replace(sourceDir + path.sep, '').replace(path.sep + 'dist', '')
  if (buildIgnore.indexOf(_filename) > -1) {
    return false
  }
  if (whiteNames && whiteNames.indexOf(_filename) === -1) {
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
