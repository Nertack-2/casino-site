var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bonusSchema = new Schema({
    title_en: { type: String, required: true },
    title_ru: { type: String, required: true },
    description_en: { type: String },
    description_ru: { type: String },
    amount: { type: String },
    is_active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Bonus', bonusSchema);