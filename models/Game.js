var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Схема для игры в казино (двуязычная)
var gameSchema = new Schema({
    slug: { type: String, required: true, unique: true }, // Уникальный ID (например, 'blackjack')
    title_en: { type: String, required: true },           // Название на английском
    title_ru: { type: String, required: true },           // Название на русском
    description_en: { type: String },                     // Описание на английском
    description_ru: { type: String },                     // Описание на русском
    image: { type: String },                              // Ссылка на картинку
    rtp: { type: Number }                                 // Процент возврата (Return to Player)
});

module.exports = mongoose.model('Game', gameSchema);