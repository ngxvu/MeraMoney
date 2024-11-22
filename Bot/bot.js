// src/bot.js
const { Telegraf } = require('telegraf');

const bot = new Telegraf('7859726614:AAGCsnSWkxs3wj-s7e-bYJ00bPeF_n3QoaI');

bot.start((ctx) => ctx.reply('Welcome!'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));

bot.launch();

console.log('Bot is running');