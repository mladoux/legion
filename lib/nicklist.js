// Default channel permissions
var defaults = {
    voice: false,
    hop: false,
    op: false,
    sop: false,
    owner: false
};

var channels = {};

var getNames = function(channel) {
    return Object.keys(channels[channel]);
};

var getVoice = function(channel, nick) {
    return channels[channel][nick].voice;
};

var setVoice = function(channel, nick, state) {
    channels[channel][nick].voice = state;
};

var getHop = function(channel, nick) {
    return channels[channel][nick].hop;
};

var setHop = function(channel, nick, state) {
    channels[channel][nick].hop = state;
};

var getOp = function(channel, nick) {
    return channels[channel][nick].op;
};

var setOp = function(channel, nick, state) {
    channels[channel][nick].op = state;
};

var getSop = function(channel, nick) {
    return channels[channel][nick].sop;
};

var setSop = function(channel, nick, state) {
    channels[channel][nick].sop = state;
};

var getOwner = function(channel, nick) {
    return channels[channel][nick].owner;
};

var setOwner = function(channel, nick, state) {
    channels[channel][nick].owner = state;
};

var parseNames = function (config, channel, nicks) {

    channels[channel] = {}
    
    Object.keys(nicks).forEach(nick => {

        if(nick != config.botName) {
        
            channels[channel][nick] = defaults;

            // This section doesn't work, commenting out until I find a better
            // way to implement it. It works fine until I run tests to decide on
            // permissions.
            var perm = nicks[nick];

            switch(perm) {
                case '+':
                    channels[channel][nick] = {
                        voice: true,
                        hop: false,
                        op: false,
                        sop: false,
                        owner: false
                    };
                break;
                case '%':
                    channels[channel][nick] = {
                        voice: false,
                        hop: true,
                        op: false,
                        sop: false,
                        owner: false
                    };
                break;
                case '@':
                    channels[channel][nick] = {
                        voice: false,
                        hop: false,
                        op: true,
                        sop: false,
                        owner: false
                    };
                break;
                case '&':
                    channels[channel][nick] = {
                        voice: false,
                        hop: false,
                        op: false,
                        sop: true,
                        owner: false
                    };
                break;
                case '~':
                    channels[channel][nick] = {
                        voice: false,
                        hop: false,
                        op: false,
                        sop: false,
                        owner: true
                    };
                break;
                default:
                    channels[channel][nick] = defaults;
                break;
            }
        }

    });

};

module.exports.getNames   = getNames;
module.exports.getVoice   = getVoice;
module.exports.setVoice   = setVoice;
module.exports.getHop     = getHop;
module.exports.setHop     = setHop;
module.exports.getOp      = getOp;
module.exports.setOp      = setOp;
module.exports.getSop     = getSop;
module.exports.setSop     = setSop;
module.exports.getOwner   = getOwner;
module.exports.setOwner   = setOwner;
module.exports.parseNames = parseNames;
