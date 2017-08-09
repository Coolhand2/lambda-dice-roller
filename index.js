'use strict';

exports.handler = (event, context, callback) => {
    var die = event.pathParameters.dice.split(',');
    var total = 0;
    die.forEach((_dice) => {
        var _array = /(\d+)d(\d+)(([\+\-])(\d+))?/g.exec(_dice);
        console.log(_array);
        var _count = parseInt(_array[1]);
        var _sides = parseInt(_array[2]);
        var _mod = _array[3];
        var sum = 0;
        for(var i = 0; i < _count; i++) {
            var _roll = Math.floor(Math.random() * _sides) + 1;
            sum += _roll;
        }
        if(_mod !== null) {
            var _char = _array[4];
            var _num = parseInt(_array[5]);
            switch(_char) {
                case '+':
                    sum += _num;
                    break;
                case '-':
                    sum -= _num;
                    break;
            }
        }
        total += sum;
    })
    var response = {
        'body': JSON.stringify({'total': total})
    }
    callback(null, response);
};
