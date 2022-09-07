const Mongoose = require('mongoose')

const ConnectDB = async () => {
    try {
        // MongoDB Connection
        const Conn = await Mongoose.connect(
            process.env.mongoConnect,
            { useNewUrlParser: true, useUnifiedTopology: true }
        )

        console.log(`MongoDB connected : ${ Conn.connection.host }`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = ConnectDB