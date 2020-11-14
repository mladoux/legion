var canSpeak = false;

var parse = function (bot, config, state, from, to, text, message){

    // Quick fix, just in case to is not a channel
    try {
        canSpeak = state.canSpeak(to);
    } catch (error) {
        canSpeak = false;
    }

    args = text.split(' ');

    msg = '';

    // One-line reaction triggers
    switch (args[0]) {
        case 'hugs':
            msg = 'hugs ' + from + '!';
        break;
    }

    if (msg != '') {
        if (canSpeak) {
            bot.action(to, msg);
        } else {
            bot.action(from, msg);
        }
    }
};

module.exports.parse = parse;
