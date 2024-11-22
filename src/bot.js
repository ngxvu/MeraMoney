// src/bot.js
const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('YOUR_BOT_TOKEN_HERE');

const handleLogin = async (ctx, username, password) => {
    try {
        const response = await axios.post('http://143.198.193.9:8989/login', {
            user_name: username,
            password: password,
        });

        const { access_token, refresh_token } = response.data;

        ctx.reply(`Login successful! Access Token: ${access_token}`);
    } catch (error) {
        ctx.reply('Login failed. Please check your username and password.');
    }
};

bot.start((ctx) => ctx.reply('Welcome! Please use /login <username> <password> to log in.'));
bot.help((ctx) => ctx.reply('Send me a sticker or use /login <username> <password> to log in.'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears(/\/login (.+) (.+)/, (ctx) => {
    const [username, password] = ctx.match.slice(1);
    handleLogin(ctx, username, password);
});

bot.launch();

console.log('Bot is running');