const { config } = require('dotenv')
config()


module.exports ={
    PORT : 8000,
    CLIENT_URL : process.env.CLIENT_URL,
    SERVER_URL : process.env.SERVER_URL,
    SECRET : process.env.SECRET,
}