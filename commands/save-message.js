const fileSystemDriver = require( "../drivers/file-system" ),
    RequestSafePasswordCommand = require( "./request-safe-password" )

class SaveMessage {
    static execute( message ) {
        //console.log( `Saving message: ${JSON.stringify( message )}` )
        return new Promise( ( resolve, reject ) => {
            RequestSafePasswordCommand.execute().then( ( password ) => {
                //console.log( `Password: ${password}` )
                fileSystemDriver.setPassword( password )
                fileSystemDriver.saveOne( message ).then( resolve ).catch( reject )
            } ).catch( reject )
        } )
    }
}

module.exports = SaveMessage
