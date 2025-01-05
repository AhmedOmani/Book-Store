const mongoos = require('mongoose')

const connection = async() => {

    try {
        await mongoos.connect('mongodb+srv://AhmedOmani:12345ahmedsaber@cluster0.v2cje.mongodb.net/')
        console.log('MongoDB is connected successfully')
    } catch (error) {
        console.error(error) ;
        process.exit(1) ;
    }

}

module.exports = connection 