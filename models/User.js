var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Пока храним в открытом виде для простоты
    balance: { type: Number, default: 1000 } // Стартовый баланс казино
});

module.exports = mongoose.model('User', userSchema);