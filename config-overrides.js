const { override, addBabelPlugins  } = require('customize-cra')
const rewireYAML = require('react-app-rewire-yaml')

function addYaml(config, env) {
  return rewireYAML(config, env)
}

module.exports = override(
  rewireYAML,
  ...addBabelPlugins(
    '@babel/plugin-proposal-logical-assignment-operators'
  )
)