var parse = function (bot, config, state, from, to, text){
    args = text.split(' ');

    message = '';

    // One-line reaction triggers
    switch (args[0]) {
        case 'hugs':
            message = 'hugs ' + from + '!';
        break;
    }


    if (message != '') {
        if (state.canSpeak(to)) {
            bot.action(to, message);
        } else {
            bot.action(from, message);
        }
    }
};

module.exports.parse = parse;
