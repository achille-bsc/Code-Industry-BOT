const { MessageEmbed, Permissions } = require('discord.js');

module.exports.check = (embeds, msg, args, message) => {
	return (message.content.toLocaleLowerCase() === 'message');
};

/**
 *
 * @param {Discord.Message} msg
 */

module.exports.action = async (embeds, msg, args, question, collector, message) => {



    question.delete();
    collector.stop();
    await message.channel.bulkDelete(1);
    const question_title = new MessageEmbed()
        .setTitle('Configuration Ticket')
        .setDescription('Quelle titre voullez-vous donner au message permetant l\'ouverture des tickets ?')
        .addField('> \`cancel\`', 'Annuler la commande')
        .setFooter('Commande de configuration des tickets')
        .setColor(colorC)
    ;
    const send_question_title = await msg.channel.send( { embeds: [question_title] } )

    let Title_Message = ''
    const collector1 = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
    collector1.on('collect', async message1 => {
        if( message1.author.bot ) return
        if(message1.content === 'cancel') {
            embeds.cancel(msg);
            collector1.stop();
            send_question_title.delete();
        }
        if(message1.content.length > 250) {
            embeds.erreur(message1, 'Votre message est trop long. Un titre ne peut pas contenir plus de 250 caractères !')
            return;
        }
    });


    
};