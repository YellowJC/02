function fire () {
    if (pins.analogReadPin(AnalogPin.P1) < 500) {
        for (let index = 0; index < 4; index++) {
            basic.showLeds(`
                # . # . #
                # . # . #
                # . # . #
                . . . . .
                # . # . #
                `)
            pins.digitalWritePin(DigitalPin.P8, 1)
            basic.pause(100)
            basic.showLeds(`
                . # . # .
                . # . # .
                . # . # .
                . . . . .
                . # . # .
                `)
            pins.digitalWritePin(DigitalPin.P8, 0)
            basic.pause(100)
        }
    } else {
        basic.clearScreen()
        pins.digitalWritePin(DigitalPin.P3, 0)
    }
}
radio.setGroup(188)
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P1) < 500) {
        radio.sendValue("fire2", 1)
    } else {
        radio.sendValue("fire2", 0)
    }
    basic.pause(2000)
    radio.sendValue("temp2", input.temperature())
    basic.pause(2000)
    radio.sendValue("wet2", sensors.get_DHT11_value(
    DigitalPin.P0,
    sensors.Dht11Result.humidity
    ))
    basic.pause(2000)
})
basic.forever(function () {
    fire()
})
