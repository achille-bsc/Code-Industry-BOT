const { MessageEmbed, Permissions, MessageButton, MessageActionRow, InteractionCollector, Channel, ChannelManager, MessageSelectMenu } = require('discord.js');
const { error } = require('../../functions-handler/embeds');
const commandeFormat = 'apps';
const COLOR = require('../../dbs/color-embeds.json');

const ALIAS = ['apps', 'applications', 'applications-discord'];

const emebds = require('../../functions-handler/embeds');
const mess = require('../../functions-handler/messages')

//apps
const { DiscordTogether } = require('discord-together');

module.exports.check = (args) => {
	return (commandeFormat.split(' ')[0] == args[0] || ALIAS.includes(args[0]));
};

/**
 *
 * @param {Discord.Message} msg
 */
module.exports.action = async (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
        const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		// executer le code
		const embed = new MessageEmbed()
            .setTitle('Applications Discord')
            .setDescription(`Quelles applications discord voullez-vous lancer ?`)
        ;
        if(msg.member.voice.channel) {
            console.log('is in voice channel !');
            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('apps')
                        .setPlaceholder('Aucune séléction')
                        .addOptions([
                            {
                                label: 'YouTube Together',
                                description: 'Lance l\'application YouTube Together directement depuis Discord',
                                value: 'discord_tgther',
                            },
                            {
                                label: '',
                                description: 'This is also a description',
                                value: 'second_option',
                            },
                        ]),
                )
            ;
        
        }
		
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};