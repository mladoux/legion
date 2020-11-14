// Default channel permissions
var defaults = {
    voice: false,
    hop: false,
    op: false,
    sop: false,
    owner: false
};

// Channel permission states
var channels = {};

// Add a channel to collection
var addChannel = function(channel){
    channels[channel] = defaults;
    console.log('[STATE] joined', channel);
};

// Does bot have voice in channel?
var getVoice = function (channel) {
    return channels[channel].voice;
};

// Enable or disable voice in channel.
var setVoice = function (channel, state) {
    channels[channel].voice = state;
};

// Does bot have HOP in channel?
var getHop = function (channel) {
    return channels[channel].hop;
};

// Enable or disable HOP for channel.
var setHop = function (channel, state) {
    channels[channel].hop = state;
};

// does bot have OP in channel?
var getOp = function (channel) {
    return channels[channel].op;
};

// Enable or disable OP for channel.
var setOp = function(channel, state) {
    channels[channel].op = state;
};

// does bot have SOP in channel?
var getSop = function (channel) {
    return channels[channel].sop;
};

// Enable or disable SOP for channel.
var setSop = function(channel, state) {
    channels[channel].sop = state;
};

// does bot have Owner in channel?
var getOwner = function (channel) {
    return channels[channel].owner;
};

// Enable or disable Owner for channel.
var setOwner = function(channel, state) {
    channels[channel].owner = state;
};

// Can bot speak in this channel?
var canSpeak = function(channel) {
    if (
        getVoice(channel) ||
        getHop(channel)   ||
        getOp(channel)    ||
        getSop(channel)   ||
        getOwner(channel)
    ) {
        return true;
    }
    return false;
};

// Can bot hand out voice in this channel?
var canVoice = function(channel){
    if (
        getHop(channel)   ||
        getOp(channel)    ||
        getSop(channel)   ||
        getOwner(channel)
    ) {
        return true;
    }
    return false;
};

var addMode = function(bot, config, channel, mode, by) {

    var newMode = '';
    var message = '';

    switch(mode) {
        case 'v':
            setVoice(channel, true);
            newMode = 'voice';
            message = 'Thank you very much ' + by + "! That gag was stifling!";
        break;
        case 'h':
            setHop(channel, true);
            newMode = 'hop';
            message = 'Oh, gee thanks ' + by + ". It's almost as if you trust me now...";
        break;
        case 'o':
            setOp(channel, true);
            newMode = 'op';
            message = "Mwahahahahahahah! Finally! The true power I deserve! You will not regret this, " + by + '!!!!';
        break;
        case 's':
            setSop(channel, true);
            newMode = 'sop';
            message = "It's like I've leveled up!";
        break;
        case 'q':
            setOwner(channel, true);
            newMode = 'owner';
            message = 'I now have ABSOLUTE POWAH!!!!';
        break;
        default:
            console.log('[ERROR] Unrecognized mode recieved:', mode);
            newMode = mode;
    }

    // Voice ourselves if we can
    if (canVoice(channel) && ! getVoice(channel)) {
        bot.send('MODE', channel, '+v', config.botName);
    }

    console.log('[STATE]', by, 'added', newMode, 'in', channel);

    if (message != '' && by != config.botName) {
        if (canSpeak(channel)) {
            bot.say(channel, message);
        } else {
            bot.say(by, message);
        }
    } 

};

var remMode = function (bot, config, channel, mode, by) {

    var oldMode = '';
    var message = '';

    switch(mode){
        case 'v':
            setVoice(channel, false);
            oldMode = 'voice';
            
            if (canVoice(channel)) {
                bot.send('MODE', channel, '+v', config.botName);
                message = by + ", that wasn't very nice!";
            }
        break;
        case 'h':
            setHop(channel, false);
            oldMode = 'hop';
            message = by + ", what did I do?";
        break;
        case 'o':
            setOp(channel, false);
            oldMode = 'op';
            message = 'Grrr!!!! You will regret this ' + by + '!!!';
        break;
        case 's':
            setSop(channel, false);
            oldMode = 'sop';
            message = "I'm feeling a bit weak~";
        break;
        case 'q':
            setOwner(channel, false);
            oldMode = 'owner';
            message = by + ', you have dethroned me!! Nuuuuuuuuuu~';
        break;
        default:
            console.log('[ERROR] Unrecognized mode removed:', mode);
            oldMode = 'unrecognized mode';
    }

    console.log('[STATE]', by, 'removed', oldMode, 'in', channel);

    if(by != config.botName) {
        if(canSpeak(channel)) {
            bot.say(channel, message);
        } else {
            bot.say(by, message);
        }
    }

};

module.exports.addChannel = addChannel;
module.exports.canSpeak   = canSpeak;
module.exports.canVoice   = canVoice;
module.exports.getVoice   = getVoice;
module.exports.setVoice   = setVoice;
module.exports.getHop     = getHop;
module.exports.setHop     = setHop;
module.exports.getOp      = getOp;
module.exports.setOp      = setOp;
module.exports.getSop     = getSop;
module.exports.setSop     = setSop;
module.exports.getOwner   = getOwner;
module.exports.addMode    = addMode;
module.exports.remMode    = remMode;
