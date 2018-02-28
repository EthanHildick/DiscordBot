//MzY0MzUxMDQ5NDYyNDQ4MTI4.DLOf_A.oX4_BySlmUGqKg6Lq9YpLmAGYow
const Discord = require('discord.js');
const token = "MzY0MzUxMDQ5NDYyNDQ4MTI4.DLOf_A.oX4_BySlmUGqKg6Lq9YpLmAGYow";
const bot = new Discord.Client();
const ms = require("ms");
console.log("on");
prefix = "s!";

bot.on("message", function(message) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const time = args.slice(1)[0];

    if(message.author.bot) return;
    if (message.channel.id == "407881634151661569") {
      var channel = bot.channels.get("407985815726325780");
      var Attachment = (message.attachments).array();
      if (Attachment[0] != undefined) {
        var url = Attachment[0].url;
        channel.send({embed: {
          color: 16216452,
          author: {
            name: `${message.author.username} (${message.author.id})`,
            icon_url: message.author.avatarURL
          },
          fields: [{
              name: `#${message.channel.name} (${message.channel.id})`,
              value: message.content
            },
            {
              name: "Attached file link",
              value: url
            }],
          image: {
            url
          },
            timestamp: new Date()
          }
        });
      }
      else {
        channel.send({embed: {
          color: 16216452,
          author: {
            name: `${message.author.username} (${message.author.id})`,
            icon_url: message.author.avatarURL
          },
          fields: [{
              name: `#${message.channel.name} (${message.channel.id})`,
              value: message.content
            },
          ],
            timestamp: new Date()
          }
        });
      }
    }
    ////////////////////////////////////////////////////
    if (command === 'channels') {
      var channels = bot.channels;
      var channel = channels.get("407985815726325780");
      channel.send(bot.channels.filter(c => c.type == "text").map(c => c.name+" ("+c.id+")").join("\n"));
    }
    ////////////////////////////////////////////////////
    if (command === "mute") {
      let role = message.guild.roles.find("name", "Muted");
      if(!role) return message.channel.reply("you don't have a role by the name of 'Muted'");
      let member = message.mentions.members.first();
      if(!member) return message.reply("you didn't mention anyone dipshit");

      member.addRole(role);
      message.channel.send(`Muted ${member.user.tag} for ${ms(ms(time), {long: true})}.`);
      setTimeout(function() {
        member.removeRole(role.id);
        message.channel.send(`${member.user.tag} has been unmuted.`)
      }, ms(time));
    }
    ////////////////////////////////////////////////////
    if (command === "unmute") {
      let role = message.guild.roles.find("name", "Muted");
      if(!role) return message.channel.reply("you don't have a role by the name of 'Muted'");
      let member = message.mentions.members.first();
      if(!member) return message.reply("you didn't mention anyone dipshit");

      member.removeRole(role);
      message.channel.send(`${member.user.tag} has been unmuted.`);
    }
    ////////////////////////////////////////////////////
    if (command === "punish") {
      let role = message.guild.roles.find("name", "Sinner");
      if(!role) return message.channel.reply("you don't have a role by the name of 'Sinner'");
      let member = message.mentions.members.first();
      if(!member) return message.reply("you didn't mention anyone dipshit");

      member.addRole(role);
      message.channel.send(`${member.user.tag} has been sent to hell for ${ms(ms(time), {long: true})}.`);
      setTimeout(function() {
        member.removeRole(role.id);
        message.channel.send(`${member.user.tag} has been unmuted.`)
      }, ms(time));
    }
    ////////////////////////////////////////////////////
    if (command === "forgive") {
      let role = message.guild.roles.find("name", "Sinner");
      if(!role) return message.channel.reply("you don't have a role by the name of 'Sinner'");
      let member = message.mentions.members.first();
      if(!member) return message.reply("you didn't mention anyone dipshit");

      member.removeRole(role);
      message.channel.send(`${member.user.tag} has been forgiven.`);
    }
});
bot.login(token);
