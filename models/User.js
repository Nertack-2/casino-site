var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 10.2: Создание модели данных User
var userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 1000 }
});

module.exports = mongoose.model('User', userSchema);