const prompt = require( "prompt" ),
    passwordSchema = require( "../schema/password" ),
    appParams = require( "../models/app-params" ).get()

class RequestSafePasswords {
    static execute() {
        //console.log( `Requesting safe passwords with params: ${JSON.stringify( appParams )}` )
        return new Promise( ( resolve, reject ) => {
            prompt.override = appParams

            if ( prompt.override.password ) {
                resolve( prompt.override.password + "" )
            } else {
                prompt.start()
                prompt.get( passwordSchema, ( err, results ) => {
                    if ( err ) {
                        reject( err )
                        return
                    }

                    resolve( results.password )
                } )
            }
        } )
    }
}

module.exports = RequestSafePasswords
