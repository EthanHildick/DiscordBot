
const Discord = require('discord.js');
const token = "fuck you";
const bot = new Discord.Client();
const ms = require("ms");
console.log("on");
prefix = "s!";
bot.on("message", (message) => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const time = args.slice(1)[0];
  
  if(message.author.bot) return;
  //EMBEDS
  if (message.channel.id == "407881634151661569") {
    var channel = bot.channels.get("407985815726325780");
    var Attachment = (message.attachments).array();
    //if it has an attachment
    if (Attachment[0] != undefined) {
      //if it has text
      if (message.content[0] != undefined) {
        var url = Attachment[0].url;
        channel.send({embed: {
          color: 6214750,
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
      //if it doesnt have text
      else {
        var url = Attachment[0].url;
        channel.send({embed: {
          color: 6214750,
          author: {
            name: `${message.author.username} (${message.author.id})`,
            icon_url: message.author.avatarURL
          },
          fields: [{
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
    }
    //if it doesnt have an attachment
    else {
      channel.send({embed: {
        color: 6214750,
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
    //array of guilds the bot is in
      var guildlist = (bot.guilds).array();
      const guildsearch = args.join(" ");

      //if s!channels has arguments
      if (guildsearch[0] != undefined) {
        for (let i = 0; i < guildlist.length; i++) {
          if (guildlist[i].name == guildsearch) {
            //output guild name in bold (**)
            message.channel.send("**"+guildlist[i].name+"** \n"+
            //filter all the channels the bot is in by text
              bot.channels.filter(c => c.type == "text")
              //filter by guild currently in loop
              .filter(c => c.guild == guildlist[i])
              //output into "name `id`"
              .map(c => c.name+" `"+c.id+"`")
                .join("\n"));
              }
              else {
            var aaaaaaaaaaaaaaa = "do nothing";
          }
        }
      }
      //if it doesnt
      else {
        for (let i = 0; i < guildlist.length; i++) {
          //output guild name in bold (**)
          message.channel.send("**"+guildlist[i].name+"** \n"+
          //filter all the channels the bot is in by text
          bot.channels.filter(c => c.type == "text")
          //filter by guild currently in loop
          .filter(c => c.guild == guildlist[i])
          //output into "name `id`"
              .map(c => c.name+" `"+c.id+"`")
              .join("\n"));
            }
          }
        }
  ////////////////////////////////////////////////////
  if (command === "mute") {
    let role = message.guild.roles.find("name", "Muted");
    if(!role) return message.channel.reply("You don't have a role by the name of 'Muted'");
    let member = message.mentions.members.first();
    if(!member) return message.reply("You didn't mention anyone.");
    
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

bot.on("messageUpdate", (oldM, newM) => {
  //so it doesnt fire whenever a message is sent
  if (!newM) return 0;
  if (newM.content === oldM.content) return 0;

  var channel = bot.channels.get("407985815726325780");
  channel.send({embed: {
    color: 4909558,
    author: {
      name: `${oldM.author.username} (${oldM.author.id})`,
      icon_url: oldM.author.avatarURL
    },
    fields: [{
        name: "Old message",
        value: oldM.content
      },
      {
        name: "New message",
        value: newM.content
      }],
    title: `#${oldM.channel.name} (${oldM.channel.id})`,
      timestamp: new Date()
    }
  });
});
    
bot.on("messageDelete", (message) => {
  if(message.author.bot) return;
  //EMBEDS
  if (message.channel.id == "407881634151661569") {
    var channel = bot.channels.get("407985815726325780");
    var Attachment = (message.attachments).array();
    //if it has an attachment
    if (Attachment[0] != undefined) {
      //if it has text
      if (message.content[0] != undefined) {
        var url = Attachment[0].url;
        channel.send({embed: {
          color: 16718876,
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
      //if it doesnt have text
      else {
        var url = Attachment[0].url;
        channel.send({embed: {
          color: 16718876,
          author: {
            name: `${message.author.username} (${message.author.id})`,
            icon_url: message.author.avatarURL
          },
          fields: [{
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
    }
    //if it doesnt have an attachment
    else {
      channel.send({embed: {
        color: 16718876,
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
});

bot.login(token);
