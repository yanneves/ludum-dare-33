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
    }

    Player.prototype = {
        initialize: function () {
            // start at reset position
            // this.reset()
        },

        update: function (dt) {
            // rotation control
            if (context.keyboard.isPressed(pc.input.KEY_A)) {
                this.entity.rigidbody.applyTorqueImpulse(0, 0, this.torque)
            }

            if (context.keyboard.isPressed(pc.input.KEY_D)) {
                this.entity.rigidbody.applyTorqueImpulse(0, 0, -this.torque)
            }

            // thrust control
            if (context.keyboard.isPressed(pc.input.KEY_SPACE)) {
                this.thrustVec.copy(this.entity.up).scale(this.thrust)
                this.entity.rigidbody.applyImpulse(this.thrustVec)
            }

            // player rest
            if (context.keyboard.isPressed(pc.input.KEY_ENTER)) {
                this.reset()
            }
        },

        reset: function () {
            this.entity.setPosition(this.PLAYER_START_X, this.PLAYER_START_Y, this.PLAYER_START_Z)
            this.entity.setEulerAngles(0, 0, 0)

            this.entity.rigidbody.syncEntityToBody()
            this.entity.rigidbody.linearVelocity = pc.Vec3.ZERO
            this.entity.rigidbody.angularVelocity = pc.Vec3.ZERO
        }
    }

    return Player
})
