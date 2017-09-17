const prompt = require( "prompt" ),
    messageSchema = require( "../schema/message" ),
    appParams = require( "../models/app-params" ).get(),
    SaveMessageCommand = require( "./save-message" )

module.exports = class PromptMessage {
    static execute() {
        //console.log( `Prompting message w/ pararms: ${JSON.stringify( appParams )}` )
        return new Promise( ( resolve, reject ) => {
            prompt.override = appParams

            prompt.start()
            prompt.get( messageSchema, ( err, results ) => {
                if ( err ) {
                    reject( err )
                    return
                }

                SaveMessageCommand.execute( results ).then( ( encryptedMessage ) => {
                    resolve( `Saved message: ${encryptedMessage}` )
                } ).catch( reject )
            } )
        } )
    }
}
