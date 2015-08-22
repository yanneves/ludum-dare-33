pc.script.attribute('PLAYER_START_X', 'number', 0)
pc.script.attribute('PLAYER_START_Y', 'number', 10)
pc.script.attribute('PLAYER_START_Z', 'number', 0)

pc.script.attribute('thrust', 'number', 350)
pc.script.attribute('torque', 'number', 40)

pc.script.create('player', function (context) {

    var Player = function (entity) {
        // self-reference
        this.entity = entity

        // vectors
        this.thrustVec = new pc.Vec3()

        // state
        this.thrusting = false

        // entities
        this.light = null
    }

    Player.prototype = {
        initialize: function () {
            // start at reset position
            this.reset()

            // register entities
            this.light = this.entity.findByName('Light')
        },

        update: function (dt) {
            var KEY_A_PRESSED = context.keyboard.isPressed(pc.input.KEY_A)
            var KEY_D_PRESSED = context.keyboard.isPressed(pc.input.KEY_D)
            var KEY_SPACE_PRESSED = context.keyboard.isPressed(pc.input.KEY_SPACE)
            var KEY_ENTER_PRESSED = context.keyboard.isPressed(pc.input.KEY_ENTER)

            // rotation control
            if (KEY_A_PRESSED || KEY_D_PRESSED)
                this.entity.rigidbody.applyTorqueImpulse(0, 0, (KEY_A_PRESSED ? +1 : -1) * this.torque)

            // thrust control
            this[(KEY_SPACE_PRESSED ? 'start' : 'stop') + 'Thrust']()

            // player rest
            if (KEY_ENTER_PRESSED) this.reset()
        },

        reset: function () {
            this.entity.setPosition(this.PLAYER_START_X, this.PLAYER_START_Y, this.PLAYER_START_Z)
            this.entity.setEulerAngles(0, 0, 0)

            this.entity.rigidbody.syncEntityToBody()
            this.entity.rigidbody.linearVelocity = pc.Vec3.ZERO
            this.entity.rigidbody.angularVelocity = pc.Vec3.ZERO
        },

        startThrust: function () {
            this.thrustVec.copy(this.entity.up).scale(this.thrust)
            this.entity.rigidbody.applyImpulse(this.thrustVec)

            if (!this.thrusting) {
                this.thrusting = true
                this.light.enabled = true
            }
        },

        stopThrust: function () {
            if (this.thrusting) {
                this.thrusting = false
                this.light.enabled = false
            }
        }
    }

    return Player
})
