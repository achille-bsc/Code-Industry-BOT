const { Schema, model } = require('mongoose');

const guildSchema = new Schema({
    id: String,
    prefix: {
        type: String,
        default: '-'
    }
})

module.exports = {
    Guild: model('Guild', guildSchema)
}