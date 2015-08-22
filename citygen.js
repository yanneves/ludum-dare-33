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

        },

        update: function (dt) {
            if (context.keyboard.isPressed(pc.input.KEY_A)) {
                this.entity.rigidbody.applyTorqueImpulse(0, 0, this.torque)
            }

            if (context.keyboard.isPressed(pc.input.KEY_D)) {
                this.entity.rigidbody.applyTorqueImpulse(0, 0, -this.torque)
            }

            if (context.keyboard.isPressed(pc.input.KEY_SPACE)) {
                this.thrustVec.copy(this.entity.up).scale(this.thrust)
                this.entity.rigidbody.applyImpulse(this.thrustVec)
            }
        }
    }

    return Player
})
