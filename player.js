pc.script.attribute('PLAYER_START_X', 'number', 0)
pc.script.attribute('PLAYER_START_Y', 'number', 10)
pc.script.attribute('PLAYER_START_Z', 'number', 0)

pc.script.attribute('thrust', 'number', 350, { min: 10, max: 1000 })
pc.script.attribute('torque', 'number', 40, { min: 10, max: 100 })

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
            var CMD_FORE_PRESSED =
                context.keyboard.isPressed(pc.input.KEY_W) ||
                context.keyboard.isPressed(pc.input.KEY_UP)
            var CMD_LEFT_PRESSED =
                context.keyboard.isPressed(pc.input.KEY_A) ||
                context.keyboard.isPressed(pc.input.KEY_LEFT)
            var CMD_BACK_PRESSED =
                context.keyboard.isPressed(pc.input.KEY_S) ||
                context.keyboard.isPressed(pc.input.KEY_DOWN)
            var CMD_RIGHT_PRESSED =
                context.keyboard.isPressed(pc.input.KEY_D) ||
                context.keyboard.isPressed(pc.input.KEY_RIGHT)
            var CMD_CLOCKWISE_PRESSED = context.keyboard.isPressed(pc.input.KEY_E)
            var CMD_COUNTER_CLOCKWISE_PRESSED = context.keyboard.isPressed(pc.input.KEY_Q)
            var CMD_THRUST_PRESSED = context.keyboard.isPressed(pc.input.KEY_SPACE)
            var CMD_RESET_PRESSED = context.keyboard.isPressed(pc.input.KEY_ENTER)

            // rotation control
            if (CMD_FORE_PRESSED || CMD_BACK_PRESSED)
                this.entity.rigidbody.applyTorqueImpulse((CMD_FORE_PRESSED ? -1 : +1) * this.torque, 0, 0)

            if (CMD_LEFT_PRESSED || CMD_RIGHT_PRESSED)
                this.entity.rigidbody.applyTorqueImpulse(0, 0, (CMD_RIGHT_PRESSED ? -1 : +1) * this.torque)

            if (CMD_CLOCKWISE_PRESSED || CMD_COUNTER_CLOCKWISE_PRESSED)
                this.entity.rigidbody.applyTorqueImpulse(0, (CMD_CLOCKWISE_PRESSED ? -2 : +2) * this.torque, 0)

            // thrust control
            this[(CMD_THRUST_PRESSED ? 'start' : 'stop') + 'Thrust']()

            // player rest
            if (CMD_RESET_PRESSED) this.reset()
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
                if (this.light) this.light.enabled = true
            }
        },

        stopThrust: function () {
            if (this.thrusting) {
                this.thrusting = false
                if (this.light) this.light.enabled = false
            }
        }
    }

    return Player
})
