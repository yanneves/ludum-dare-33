pc.script.create('ui', function (context) {

    var html = "<style>                                                          \
        #instructions {                                                          \
            color: #444;                                                         \
            font-size: 'xx-large';                                               \
            text-align: center;                                                  \
            text-shadow: 1px 1px #000;                                           \
            width: 400px;                                                        \
            height: 200px;                                                       \
            background: rgba(255, 255, 255, 0.2);                                \
            position: absolute;                                                  \
            right: 0; bottom: 0;                                                 \
        }                                                                        \
    </style>                                                                     \
                                                                                 \
    <h1>Controls</h1>                                                            \
    <p><strong>SPACE</strong> to Thrust</p>                                      \
    <p><strong>WASD</strong> or <strong>ARROW KEYS</strong> to Move</p>          \
    <p><strong>ENTER</strong> to Reset</p>"

    var UI = function (entity) {
        // self-reference
        this.entity = entity
    }

    UI.prototype = {
        initialize: function () {
             // create a div centred inside the main canvas
            var div = document.createElement('div')
            // set id on div to #instructions
            div.setAttribute('id', 'instructions')
            // inject html
            div.innerHTML = html

            // add the div to the DOM as a child of the document's body element
            document.body.appendChild(div)

            this.div = div;
        },

        update: function (dt) {
            // do nothing
        }
    }

    return UI
})
