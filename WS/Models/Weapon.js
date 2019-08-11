const mongoose = require('mongoose')
const WeaponInfoSchema = new mongoose.Schema({
    info: String, //To Be Defined
})
/**
 * Esquema ampliable de los campos que tendra el Weapon
 * para guardarlo en la bbdd
 */

const WeaponSchema = {
    icon: String,
    name: String,
    cat: String,
    type: String,
    dmg: String,
    crit: String,
    extra: WeaponInfoSchema,
}

const WeaponModel = mongoose.model('Weapon', WeaponSchema)

module.exports = WeaponModel