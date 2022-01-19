const { ShardingManager, WebhookClient, MessageEmbed } = require('discord.js');

const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/930517796251648041/C6nvbUxn_11KL0-vBKb7vlRlryue-bs2qgXE-lWLml5t3pyPq3oM--2rKkviCbyvF3YH' });

const BOT = process.env.BOT
const TEST = process.env.TEST
const TOKEN = TEST

const start_emb = new MessageEmbed()
	.setTitle(`Début du démarage du bot !`)
	.setColor('BLUE')
	.setDescription(`Le bot est en train de se lancer !`)
;

if (TOKEN === BOT) {
    webhookClient.send({
    username: 'Shards',
    avatarURL: 'https://imgur.com/a/oIcwCqj',
    embeds: [start_emb],
});
}



require('dotenv').config();

const manager = new ShardingManager('./starting/commands_starter.js', { shardList: 'auto', totalShards: 2, token: TOKEN });
let shardsCounter = 0;
manager.on('shardCreate', shard => {
    shardsCounter = shardsCounter + 1; 
    if (TOKEN === BOT) {
        let shardID = shard.id + 1;
        const shard_emb = new MessageEmbed()
            .addField(`Shard ${shardID}`, 'Démarrée avec succès !')
            .setColor('GREEN');

        webhookClient.send({
            username: 'Shards',
            avatarURL: 'https://cdn.discordapp.com/attachments/909467674021605428/916664103630692433/Logo_Code_Industry.png',
            embeds: [shard_emb],
		});
	}
});
if(shardsCounter === 2) {
    console.log('Toutes les shards ont étés créées avec succès !');
}