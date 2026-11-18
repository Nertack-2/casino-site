var mongoose = require('mongoose');
var Game = require('../models/Game');
var Bonus = require('../models/Bonus'); // Подключаем новую модель
require('dotenv').config();

var games = [
    { slug: 'blackjack', title_en: 'Blackjack', title_ru: 'Блэкджек', description_en: 'Classic card game to reach 21.', description_ru: 'Классическая карточная игра до 21 очка.', image: 'https://via.placeholder.com/300x200?text=Blackjack', rtp: 99.5 },
    { slug: 'roulette', title_en: 'Roulette', title_ru: 'Рулетка', description_en: 'Spin the wheel and guess the number.', description_ru: 'Крутите колесо и угадывайте число.', image: 'https://via.placeholder.com/300x200?text=Roulette', rtp: 97.3 },
    { slug: 'slots', title_en: 'Slots', title_ru: 'Слоты', description_en: 'Classic slot machines with big wins.', description_ru: 'Классические игровые автоматы с большими выигрышами.', image: 'https://via.placeholder.com/300x200?text=Slots', rtp: 96.0 },
    { slug: 'poker', title_en: 'Poker', title_ru: 'Покер', description_en: 'The most popular card game in the world.', description_ru: 'Самая популярная карточная игра в мире.', image: 'https://via.placeholder.com/300x200?text=Poker', rtp: 98.0 },
    { slug: 'baccarat', title_en: 'Baccarat', title_ru: 'Баккара', description_en: 'Elegant card game for high rollers.', description_ru: 'Элегантная карточная игра для хайроллеров.', image: 'https://via.placeholder.com/300x200?text=Baccarat', rtp: 98.9 }
];

var bonuses = [
    { title_en: 'Welcome Bonus', title_ru: 'Приветственный бонус', description_en: 'Get 100% on your first deposit up to $500.', description_ru: 'Получите 100% на первый депозит до $500.', amount: '100% up to $500' },
    { title_en: 'Free Spins', title_ru: 'Бесплатные вращения', description_en: '50 free spins on your favorite slots.', description_ru: '50 бесплатных вращений на любимых слотах.', amount: '50 FS' },
    { title_en: 'Cashback', title_ru: 'Кэшбэк', description_en: 'Get 10% cashback every week.', description_ru: 'Получайте 10% кэшбэка каждую неделю.', amount: '10%' }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('✅ MongoDB connected for seeding');

        await Game.deleteMany({});
        await Bonus.deleteMany({});
        console.log('🗑️ Old data cleared');

        await Game.insertMany(games);
        await Bonus.insertMany(bonuses);
        console.log('🎰 Games and 🎁 Bonuses successfully added to database!');

        mongoose.connection.close();
    })
    .catch(err => {
        console.error('❌ Seeding error:', err);
        mongoose.connection.close();
    });