const fecha = require( "fecha" ),
    chrono = require( "chrono-node" )

module.exports = {
    "properties": {
        "message": {
            "description": "Enter your message you would like to be logged",
            "type": "string",
            "required": true
        },
        "date": {
            "description": "Date of this entry",
            "type": "string",
            "required": false,
            "default": fecha.format( new Date(), "YYYY-MM-DD" ),
            "before": function ( value ) {
                let parsedDate = chrono.parseDate( value )

                if ( parsedDate === null ) {
                    parsedDate = new Date()
                }

                return fecha.format( parsedDate, "YYYY-MM-DD" )
            }
        },
        "time": {
            "description": "Time of this entry",
            "type": "string",
            "required": false,
            "default": fecha.format( new Date(), "HH:mm:ss" ),
            "before": function ( value ) {
                let parsedDate = chrono.parse( value ).pop().start.date()

                if ( parsedDate === null ) {
                    parsedDate = new Date()
                }

                return fecha.format( parsedDate, "HH:mm:ss" )
            }
        }
    }
}
