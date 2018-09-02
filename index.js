let house = require('./Secrets/house.js')
let numbers = require('./Secrets/numbers.js')

let twilioAuth = require('./Secrets/twilio.js')
let twilio = new require('twilio')(twilioAuth.sid, twilioAuth.token)

let dateFormat = require('dateformat')
let now = new Date()

numbers.forEach((number) => {
    sendTo(number)
})

function sendTo(number) {
    twilio.messages.create({
        body: "Someone rang the doorbell at " + house.address + " (" + dateFormat(now, "HH:MM m/d/yy") + ")",
        to: number,
        from: twilioAuth.from
    })
}
