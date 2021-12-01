const { MessageEmbed } = require("discord.js");

//export a function to be used in other files
  
  function del(message, nbr = 1) {
    return message.channel.bulkDelete(nbr)
  };


module.exports = {del}