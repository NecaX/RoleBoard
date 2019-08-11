const mongoose = require('mongoose')
const SkillInfoSchema = new mongoose.Schema({
    info: String, //To Be Defined
})
/**
 * Esquema ampliable de los campos que tendra el Skill
 * para guardarlo en la bbdd
 */

const SkillSchema = {
    name: String,
    char: String,
    extra: SkillInfoSchema,
}

const SkillModel = mongoose.model('Skill', SkillSchema)

module.exports = SkillModel