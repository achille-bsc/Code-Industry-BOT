const { ShardingManager, WebhookClient, MessageEmbed } = require('discord.js');

const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/916664771980456027/aP8WZUz92mRmig4zJ2ykLEzyEhZm97wGT8RPB2ELzOUODwYV3dk2HNoQY39uN_nnGviH' });

const start_emb = new MessageEmbed()
        .setTitle(`Début du démarage du bot !`)
        .setColor('BLUE');

webhookClient.send({
    username: 'Shards',
    avatarURL: 'https://cdn.discordapp.com/attachments/909467674021605428/916664103630692433/Logo_Code_Industry.png',
    embeds: [start_emb],
});


require('dotenv').config();

const manager = new ShardingManager('./bot.js', { token: process.env.TEST});

manager.on('shardCreate', shard => {
    shardID = shard.id + 1;
    console.log(`Shard ${shardID} is ready to use`);
    console.log(``);

    const shard_emb = new MessageEmbed()
        .addField(`Shard ${shardID}`, 'Démarrée avec succès !')
        .setColor('GREEN');

    webhookClient.send({
        username: 'Shards',
        avatarURL: 'https://cdn.discordapp.com/attachments/909467674021605428/916664103630692433/Logo_Code_Industry.png',
        embeds: [shard_emb],
    });
});

manager.spawn();