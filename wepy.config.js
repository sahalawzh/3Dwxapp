const path = require('path')
const postcssImport = require('postcss-import')
const postcssAtRulesVariables = require('postcss-at-rules-variables')
const postcssMixins = require('postcss-mixins')
const postcssCustomProperties = require('postcss-custom-properties')
const postcssEach = require('postcss-each')
const postcssFor = require('postcss-for')
const postcssConditionals = require('postcss-conditionals')
const postcssNestedProps = require('postcss-nested-props')
const postcssNesting = require('postcss-nesting')
const postcssNested = require('postcss-nested')
const postcssAtRoot = require('postcss-atroot')
const postcssExtend = require('postcss-extend')
const postcssCssVariables = require('postcss-css-variables')
const postcssFunctions = require('postcss-functions')
const postcssColorFunction = require('postcss-color-function')
const postcssCalc = require('@jfkued/postcss-calc')
const autoprefixer = require('autoprefixer')
const postcssImportPart = require('postcss-import-part').default
const postcssCsso = require('postcss-csso')
let packageVersion = require('./package.json').version
var prod = process.env.NODE_ENV === 'production'
var isProApp = prod && process.env.TARGET_APP === 'proapp'
// 生产环境打上当前的年月日天时，如果是大于55分钟，则打个下一个小时
let d = new Date()
let h = d.getHours()
let m = d.getMinutes()
if (m > 55) {
  d.setHours(h + 1)
}
d.setMinutes(0, 0, 0)
let str2 = function (n) {
  return (n < 10 ? '0' : '') + n
}
packageVersion += '.' + d.getFullYear() + str2(d.getMonth() + 1) + str2(d.getDate()) + str2(d.getHours())

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy'],
    modules: ['node_modules']
  },
  compilers: {
    /* less: {
      compress: prod
    },
    */
    postcss: {
      plugins: [
        postcssImport({
          filter: (_url) => {
            return path.extname(_url) === '.postcss'
          }
        }),
        postcssImportPart(),
        postcssAtRulesVariables(),
        postcssMixins(),
        postcssEach(),
        postcssFor(),
        postcssConditionals(),
        postcssAtRulesVariables(),
        postcssNestedProps(),
        postcssNesting(),
        postcssNested(),
        postcssAtRoot(),
        postcssExtend(),
        postcssCssVariables(),
        postcssFunctions({
          glob: path.join(__dirname, '../common/wxapp/postcss/functions', '*.js')
        }),
        postcssColorFunction(),
        postcssCalc(),
        autoprefixer({
          browsers: ['iOS 9', 'Android 4.4']
        })
      ]
    },
    /* sass: {
      outputStyle: 'compressed'
    },
    */
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions'
      ]
    }
  },
  plugins: {
    replace: [
      {
        filter: /\.js$/,
        config: {
          find: /process.env.NODE_ENV/g,
          replace: prod ? "'production'" : "'development'"
        }
      },
      {
        filter: /\.js$/,
        config: {
          find: /process.env.TARGET_APP/g,
          replace: isProApp ? "'proapp'" : "'testapp'"
        }
      },
      {
        filter: /\.js$/,
        config: {
          find: /MINI__PACKAGE__VERSION/g,
          replace: packageVersion
        }
      }
    ]
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {
  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}
  module.exports.compilers.postcss.plugins.push(postcssCsso())
  var uglifyjsConf
  if (isProApp) {
    uglifyjsConf = {
      filter: /\.js$/,
      config: {
        output: {
          beautify: false
        },
        compress: {
          warnings: true,
          drop_console: true
        },
        sourceMap: false
      }
    }
  } else {
    uglifyjsConf = {
      filter: /\.js$/,
      config: {
        compress: {
          warnings: true
        },
        sourceMap: true
      }
    }
  }
  // 压缩js
  module.exports.plugins = {
    replace: [
      {
        filter: /\.js$/,
        config: {
          find: /process.env.NODE_ENV/g,
          replace: prod ? "'production'" : "'development'"
        }
      },
      {
        filter: /\.js$/,
        config: {
          find: /process.env.TARGET_APP/g,
          replace: isProApp ? "'proapp'" : "'testapp'"
        }
      },
      {
        filter: /\.js$/,
        config: {
          find: /MINI__PACKAGE__VERSION/g,
          replace: packageVersion
        }
      }
    ],
    uglifyjs: uglifyjsConf,
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    },
    filemin: {
      filter: /\.(json|wxml|xml|wxss)$/
    }
  }
}
