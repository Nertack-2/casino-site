var mongoose = require('mongoose');
var Game = require('../models/Game'); // Подключаем нашу модель
require('dotenv').config();           // Подключаем переменные окружения

// Данные для заполнения (Игры казино)
var games = [
    {
        slug: 'blackjack',
        title_en: 'Blackjack', title_ru: 'Блэкджек',
        description_en: 'Classic card game to reach 21.', description_ru: 'Классическая карточная игра до 21 очка.',
        image: 'https://via.placeholder.com/300x200?text=Blackjack', rtp: 99.5
    },
    {
        slug: 'roulette',
        title_en: 'Roulette', title_ru: 'Рулетка',
        description_en: 'Spin the wheel and guess the number.', description_ru: 'Крутите колесо и угадывайте число.',
        image: 'https://via.placeholder.com/300x200?text=Roulette', rtp: 97.3
    },
    {
        slug: 'slots',
        title_en: 'Slots', title_ru: 'Слоты',
        description_en: 'Classic slot machines with big wins.', description_ru: 'Классические игровые автоматы с большими выигрышами.',
        image: 'https://via.placeholder.com/300x200?text=Slots', rtp: 96.0
    },
    {
        slug: 'poker',
        title_en: 'Poker', title_ru: 'Покер',
        description_en: 'The most popular card game in the world.', description_ru: 'Самая популярная карточная игра в мире.',
        image: 'https://via.placeholder.com/300x200?text=Poker', rtp: 98.0
    },
    {
        slug: 'baccarat',
        title_en: 'Baccarat', title_ru: 'Баккара',
        description_en: 'Elegant card game for high rollers.', description_ru: 'Элегантная карточная игра для хайроллеров.',
        image: 'https://via.placeholder.com/300x200?text=Baccarat', rtp: 98.9
    }
];

// Подключение к базе и запуск посева
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('✅ MongoDB connected for seeding');

        // Очищаем старые данные (чтобы не было дублей при повторном запуске)
        await Game.deleteMany({});
        console.log('🗑️ Old games cleared');

        // Вставляем новые данные
        await Game.insertMany(games);
        console.log('🎰 Games successfully added to database!');

        // Закрываем соединение
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('❌ Seeding error:', err);
        mongoose.connection.close();
    });