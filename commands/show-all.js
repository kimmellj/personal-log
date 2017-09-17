const fileSystemDriver = require( '../drivers/file-system' ),
    RequestSafePasswordCommand = require( './request-safe-password' )
module.exports = class ShowAll {
    static execute() {
        return new Promise( ( resolve, reject ) => {
            RequestSafePasswordCommand.execute().then( ( password ) => {
                fileSystemDriver.setPassword( password )
                fileSystemDriver.loadAll().then( ( results ) => {
                    let prettyLines = results.map( ( value ) => {
                        let message = ""
                        for ( let key in value ) {
                            message = `${message} \n ${key} ${value[key]}`
                        }
                        return message
                    } )
                    resolve( prettyLines.join( "\n ================ \n" ) )
                } ).catch( reject )
            } )
        } )
    }
}
