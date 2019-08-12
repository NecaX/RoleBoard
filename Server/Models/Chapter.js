const mongoose = require('mongoose')

const ChapterSchema = {
    title: String,
}

const ChapterModel = mongoose.model('Chapter', ChapterSchema)

module.exports = {ChapterModel, ChapterSchema}