const { Permissions, MessageEmbed, MessageCollector, MessageButton, InteractionCollector, MessageActionRow, } = require('discord.js');
const commandeFormat = 'config-wellcome';
const ALIAS = ['config-wlc', 'config-hello', 'config-wcm', 'welcome'];
const wlc_db = require('../../dbs/wellcome.json');
const fs = require('fs');
const COLOR = require('../../dbs/color-embeds.json');
const embeds = require('../../functions-handler/embeds');
let etat = ''
module.exports.check = (args) => {
	return (commandeFormat.split(' ')[0] == args[0] || ALIAS.includes(args[0]));
};

/**
     *
     * @param {Discord.Message} msg
     */

module.exports.action = async (msg, args, client) => {
	if (commandeFormat.split(' ').length <= args.length) {
		const AUTHORID = msg.author.id;
		// executer le code
		
		if (!msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			return embeds.error(msg, `Vous n'avez pas la permissionsd'utiliser cette commande !`)
		}

		const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
        // interaction Collector for buttons

        const question = new MessageEmbed()
            .setColor(colorC)
            .setTitle('Voullez-vous activer ou désactiver le message de bienvenue ?')
            .setDescription('**Activer** : ✅\n**Désactiver** : ❌')
        ;

        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('activate')
					.setLabel('✅ Activer')
					.setStyle('SUCCESS'),
		    )
            .addComponents(
				new MessageButton()
					.setCustomId('desactivate')
					.setLabel('❌ Désativer')
					.setStyle('DANGER'),
		    )
            .addComponents(
				new MessageButton()
					.setCustomId('cancel')
					.setLabel('❌ Annuler')
					.setStyle('SECONDARY'),
		    )
        ;
        const send_question = await msg.channel.send( { embeds: [question], components: [row] })
			.catch(console.error())
        ;



			// utilisation du collector !
        //const collector = new InteractionCollector(msg, m => m.author.id === AUTHORID, { time: 60000 });
        const collector = new InteractionCollector(client, m => m.author.id === AUTHORID, { time: 60000 });
        collector.on('collect', async (m) => {
			let etat = ''

            if (m.customId === 'activate') {
                etat = 'on';
                const embed_on = new MessageEmbed()
                    .setColor(colorC)
                    .setTitle('Vous avez activé le message de bienvenue !')
                    .setFooter('Vous pouvez désactiver le message de bienvenue avec la commande `config-welcome`')
                ;
                const validation = await m.channel.send({ embeds: [embed_on] })
                // créer un salon pour le message de bienvenue
                if( msg.member.guild.channels.cache.find(channel => channel.name === 'arrivés')){
                    const channel = msg.member.guild.channels.cache.find(channel => channel.name === 'arrivés');
                    channel.delete();
                }
                send_question.delete();
                const chan = await msg.guild.channels.create('Arrivés', {
                        type: 'text',
                        permissionOverwrites: [
                            {
                                id: msg.guild.id,
                                deny: ['SEND_MESSAGES'],
                                allow: ['VIEW_CHANNEL'],
                            },
                        ],
                    })
                setTimeout(() => {
                    validation.delete();
                } , 5000);
            } else if (m.customId === 'desactivate') {
                etat = 'off';
                const embed_off = new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('Vous avez désactivé le message de bienvenue !')
                    .setFooter('Vous pouvez activer le message de bienvenue avec la commande `config-welcome`')
                ;
                if (wlc_db['status'][msg.guild.id]) {
                    delete (wlc_db['status'][msg.guild.id]);
                }
                send_question.delete();
                const validation = await m.channel.send({ embeds: [embed_off] })
                setTimeout(() => {
                    validation.delete();
                } , 5000);
            } else if (m.customId === 'cancel') {
                const embed_cancel = new MessageEmbed()
                    .setColor(colorC)
                    .setTitle('Commande annulée !')
                    .setFooter('Vous pouvez activer ou désactiver le message de bienvenue avec la commande `config-welcome`')
                ;
                msg.delete();
                send_question.delete();

                const validation = await msg.channel.send({ embeds: [embed_cancel] })
                setTimeout(() => {
                    validation.delete();
                } , 5000);
                return collector.stop('cancel');
            }
			
            if (wlc_db['status'][msg.guild.id]) {
                delete (wlc_db['status'][msg.guild.id]);

                wlc_db['status'][msg.guild.id] = {};
                wlc_db['status'][msg.guild.id] = {
                    etat,
                };
            }
            else {
                wlc_db['status'][msg.guild.id] = {};
                wlc_db['status'][msg.guild.id] = {
                    etat,
                };
            }
            fs.writeFileSync('./dbs/wellcome.json', JSON.stringify(wlc_db));
            msg.delete();
            collector.stop();
        });
	}

	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**')
			.catch(console.error());
	}
};