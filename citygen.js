pc.script.attribute('houses', 'number', 2)

pc.script.create('citygen', function (context) {

    var Citygen = function (entity) {
        // self-reference
        this.entity = entity
    }

    Citygen.prototype = {
        initialize: function () {
            console.log(this.houses)
        },

        update: function (dt) {

        }
    }

    return Citygen
})
