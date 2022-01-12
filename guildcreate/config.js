/*const { MessageEmbed, Permissions, MessageButton, MessageActionRow, InteractionCollector, Channel, ChannelManager, MessageSelectMenu } = require('discord.js');
const COLOR = require('../dbs/color-embeds.json');

const emebds = require('../functions-handler/embeds');
const mess = require('../functions-handler/messages')

const { Guild } = require('../structures/models')

/**
 *
 * @param {Discord.Message} msg
 */
/*module.exports.action = async (guild) => {
        const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		// executer le code
        await Guild.create({ id: guild.id }, err => {
            if (err) return console.log("Une erreur s'est produite !");
            console.log(`Nouveau serveur => ${guild.name} (${guild.id})`);
        })
	
};*/