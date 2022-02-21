const { override, addBabelPlugins  } = require('customize-cra')

module.exports = override(
  ...addBabelPlugins(
    '@babel/plugin-proposal-logical-assignment-operators',
    '@babel/plugin-proposal-optional-chaining'
  )
)
