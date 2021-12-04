const { ShardingManager } = require('discord.js');

require('dotenv').config();

const manager = new ShardingManager('./bot.js', { token: process.env.BOT });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();