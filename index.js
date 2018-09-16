let house = require('./Secrets/house.js')
let numbers = require('./Secrets/numbers.js')

let twilioAuth = require('./Secrets/twilio.js')
let twilio = new require('twilio')(twilioAuth.sid, twilioAuth.token)

let dateFormat = require('dateformat')
let now = new Date()

let Gpio = require('onoff').Gpio;
let button = new Gpio(4, 'in', 'falling', {debounceTimeout: 10});
let throttle = require('lodash/throttle')
let timeout = 8 * 60 * 1000
let options = {'trailing': false}

let sendAll = (err, value) => {
    if (err) {
        throw err;
    }

    numbers.forEach((number) => {
        sendTo(number)
    })

    console.log(value)
}

button.watch(
    throttle(sendAll, timeout, options)
    )

console.log("Started doorbell watcher ...")

function sendTo(number) {
        return;


    twilio.messages.create({
        body: "Doorbell at " + house.address + " (" + dateFormat(now, "HH:MM m/d/yy") + ")",
        to: number,
        from: twilioAuth.from
    })
}

process.on('SIGINT', () => {
    button.unexport();
});
