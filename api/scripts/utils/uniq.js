const  crypto = require('crypto')

const generateFileName = (bytes = 8) =>{return crypto.randomBytes(bytes).toString('hex')}
module.exports={generateFileName};