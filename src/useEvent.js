const eventEmit = require('./myEvent');

const event = new eventEmit();

event.once('event', function(i) {
    console.log(11111, i);
});


event.emit('event', 2);

event.off('event', function(i) {
    console.log(11111, i);
});

event.emit('event', 3);