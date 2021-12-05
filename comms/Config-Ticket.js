const { Permissions, MessageEmbed, MessageCollector, MessageActionRow, MessageButton } = require('discord.js');
const commandeFormat = 'adminticket';
const ALIAS = ['config-ticket', 'ticket-config'];
const COLOR = require('../dbs/color-embeds.json');

module.exports.check = (args) => {
    return (commandeFormat.split(' ')[0] == args[0] || ALIAS.includes(args[0]));
};

/**
     *
     * @param {Discord.Message} msg
     */

module.exports.action = async (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
        msg.delete();
		// executer le code
        const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
        const embeds = require('../functions-handler/embeds')
		const nperm = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !');
		if (!msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return embeds.erreur(msg, 'Vous n\'avez pas la permission d\'utiliser cette commande !' )
		const question = await embeds.question(msg, 'Veuillez choisir une option', `> \`message\` => Configure le message sur le quelle sera joint le boutton permettant d'ouvrire un ticket.
        > \`cancel\` => Annuler la commande`)

        const collector = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
		collector.on('collect', async message => {
            if( message.author.bot ) return
            if(message.content === 'message' || msg.content === 'cancel') {
                if(message.content === 'cancel') {
                    embeds.cancel();
                    collector.stop();
                    question.delete();
                }
                if(message.content === 'message') {
                    question.delete();
                    collector.stop();
                    await message.channel.bulkDelete(2);
                    const question_title = new MessageEmbed()
                        .setTitle('Configuration Ticket')
                        .setDescription('Quelle titre voullez-vous donner au message permetant l\'ouverture des tickets ?')
                        .addField('> \`cancel\`', 'Annuler la commande')
                        .setFooter('Commande de configuration des tickets')
                        .setColor(colorC)
                    ;
                    msg.channel.send( { embeds: [question_title] } )

                    let Title_Message = ''
                    const collector1 = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
                    collector1.on('collect', async message => {
                        if( message.author.bot ) return
                        if(message.content > 250) {
                            embeds.erreur(message, 'Votre message est trop long. Un titre ne peut pas contenir plus de 250 caractères !')
                            return;
                        } else {
                            Title_Message = message.content
                            collector1.stop();
                            await message.channel.bulkDelete(2);
                            const question_description = new MessageEmbed()
                                .setTitle('Configuration Ticket')
                                .setDescription('Quelle description voullez-vous donner au message permetant l\'ouverture des tickets ?')
                                .addField('> \`cancel\`', 'Annuler la commande')
                                .setFooter('Commande de configuration des tickets')
                                .setColor(colorC)
                            ;
                            let description_Message = ''
                            msg.channel.send( { embeds: [question_description] } )
                            const collector2 = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
                            collector2.on('collect', async message => {
                                if( message.author.bot ) return
                                if(message.content > 4096) {
                                    embeds.erreur(message, 'Votre message est trop long. Une description ne peut pas contenir plus de 250 caractères !')
                                    return;
                                } else {
                                    description_Message = message.content
                                    collector2.stop();
                                    await message.channel.bulkDelete(2);

                                    const question_button = new MessageEmbed()
                                        .setTitle('Configuration Ticket')
                                        .setDescription('Quelle message voullez-vous donner au boutton permetant l\'ouverture des tickets ?')
                                        .addField('> \`cancel\`', 'Annuler la commande')
                                        .setFooter('Commande de configuration des tickets')
                                        .setColor(colorC)
                                    ;
                                    let button_message = ''
                                    msg.channel.send( { embeds: [question_button] } )
                                    const collector3 = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
                                    collector3.on('collect', async message => {
                                        if( message.author.bot ) return
                                        if(message.content <= 10) {
                                            embeds.erreur(message, 'Votre message est trop long. Un boutton ne peut pas contenir plus de 10 caractères !')
                                            return;
                                        } else {
                                            button_message = message.content
                                            collector3.stop();
                                            await message.channel.bulkDelete(2);

                                            const embeds_message = new MessageEmbed()
                                                .setTitle(Title_Message)
                                                .setDescription(description_Message)
                                                .setColor(colorC)
                                            ;
                                            const row = new MessageActionRow()
                                                .addComponents(
                                                    new MessageButton()
                                                        .setCustomId('ticket')
                                                        .setLabel(button_message)
                                                        .setStyle('PRIMARY'),
                                                );
                                            msg.channel.send( { embeds: [embeds_message], components: [row] } )
                                        }
                                    })

                                }
                            })



                        }
                    })




                }
            }
        })


        
        

        
        
        




	}
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};