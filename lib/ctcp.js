var version = function(bot, from) {
    var message = 'Legion 1.0';
    bot.notice(from, message);
};

var parse = function (bot, config, state, from, to, type, message) {
    
    switch(type) {
        case 'VERSION':
            version(bot, from);
        break;
    }
};

module.exports.parse = parse;
