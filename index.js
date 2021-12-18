const { ShardingManager, WebhookClient, MessageEmbed } = require('discord.js');

const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/921055065979109408/L3UPiBAJKp_sMxSoT3L2RBjgrnkZyaQJochRKvXU-vrOgvgQLnKypOMenX1bAM_wVhVn' });

const BOT = process.env.BOT
const TEST = process.env.TEST
const TOKEN = BOT

const start_emb = new MessageEmbed()
	.setTitle(`Début du démarage du bot !`)
	.setColor('BLUE')
	.setDescription(`Le bot est en train de se lancer !`)
;

if (TOKEN === BOT) {}
webhookClient.send({
    username: 'Shards',
    avatarURL: 'https://cdn.discordapp.com/attachments/909467674021605428/916664103630692433/Logo_Code_Industry.png',
    embeds: [start_emb],
});


require('dotenv').config();

const manager = new ShardingManager('./bot.js', { shardList: 'auto', totalShards: 2, token: `OTAyMjkzOTcyMDkxODAxNjIw.YXcUvg.SLGIIiNqRmjh9jOPxkI-pygEmic` });

manager.on('shardCreate', shard => {
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
manager.spawn();