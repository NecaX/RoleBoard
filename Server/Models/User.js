const mongoose = require('mongoose')

/**
 * Esquema ampliable de los campos que tendra el user
 * para guardarlo en la bbdd
 */
const UserSchema = {
    id: String,
    pass: String
}

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel