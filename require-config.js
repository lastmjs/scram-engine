import path     from 'path'
import electron from 'electron'

const filename = electron.remote.getCurrentWindow().getFilename()
const appNodeModulesRoot = path.resolve(__dirname, '../../', 'node_modules')

require('module').globalPaths.push(appNodeModulesRoot)

const oldRequire = require

global.require = name => {
  const modifiedName = name => {
    if (name.startsWith('.')) {
      const modifiedName = path.resolve(__dirname, '../../', filename.split('/').slice(0, -1).join('/'), name)
      return modifiedName
    }
    return name
  }
  return oldRequire(modifiedName(name))
}

