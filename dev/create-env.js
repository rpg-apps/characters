const fs = require('fs')
const path = `./.env`
const vars = `
 REALM_APP_ID=${process.env.REALM_APP_ID}
`
fs.writeFileSync(path, vars)
