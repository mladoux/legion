// 3rd Party
const { stat } = require('fs');
var irc = require('irc');

// Configuration
var config = require('./config.json');

// Objects
var state    = require('./lib/state');
var notify   = require('./lib/notify');
var interact = require('./lib/interact');
var ctcp     = require('./lib/ctcp');

// Start the bot
var bot = new irc.Client(config.server, config.botName, config.options);

// Connection complete
bot.addListener('registered', function(message){
    console.log('[STATE] connected');
});

// Message of The Day
bot.addListener('motd', function(motd){});

// Users in channel
bot.addListener('names', function(channel, nicks){});

// Channel Topic
bot.addListener('topic', function(channel, topic){});

// User joined channel
bot.addListener('join', function(channel, nick, message){
    if(nick == config.botName) {
        state.addChannel(channel);
    } else if (state.canVoice(channel)) {
        bot.send('MODE', channel, '+v', nick);
    }
});

// User left channel
bot.addListener('part', function(channel, nick, reason, message){});

// User quit server
bot.addListener('quit', function(nick, reason, channels, message){});

// User kicked from channel
bot.addListener('kick', function(channel, nick, by, reason, message){

    // rejoin on kick
    if(nick == config.botName) {
        console.log('[STATE] kicked from ', channel, 'by', by);
        bot.join(channel);
    }

});

// User killed from server
bot.addListener('kill', function(nick, reason, channels, message){});

// Message recieved
bot.addListener('message', function(nick, to, text, message){});

// Notice recieved
bot.addListener('notice', function(nick, to, text, message){
    notify.parse(bot, config, state, nick, to, text);
});

// Ping recieved
bot.addListener('ping', function(server){});

// CTCP request recieved
bot.addListener('ctcp', function(from, to, type, message){
    ctcp.parse(bot, config, state, from, to, type, message);
});

// Nick changed
bot.addListener('nick', function(oldnick, newnick, channels, message){

    // Recognize when bots handle has been changed
    if(oldnick == config.botName) {
        config.botName = newnick;
    }
});

// Channel invitation
bot.addListener('invite', function(channel, from, message){});

// Mode added
bot.addListener('+mode', function(channel, by, mode, argument, message){

    // Update channel state
    if(argument == config.botName) {
        state.addMode(bot, config, channel, mode, by);
    }

});

// Mode removed
bot.addListener('-mode', function(channel, by, mode, argument, message){

    // update channel state
    state.remMode(bot, config, channel, mode, by);

});

// User information
bot.addListener('whois', function(info){});

// Raw message
bot.addListener('raw', function(message){});

// Error recieved
bot.addListener('error', function(message){});

// User performed action
bot.addListener('action', function(from, to, text, message){
    interact.parse(bot, config, state, from, to, text);
});
