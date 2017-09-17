/* eslint no-console: 0 */

const RequestSafePasswordCommand = require( "./request-safe-password" ),
    UpdateKeychainPasswordCommand = require( "./update-keychain-password" )

/**
 * Initialize a personal log file
 * This is accomplished by requesting a password from the user
 * and forcing a new file to be created with a single message: "genesis"
 * This is done so that way we can verify a password properly decrypts the
 * messages and we don't have a scenario of multiple passwords being used
 * through out the log file
 */
class InitLogFile {
    static execute() {
        return new Promise( ( resolve, reject ) => {
            let returnMessage = ""

            returnMessage += "Requesting a safe password ... \n"

            RequestSafePasswordCommand.execute().then( ( password ) => {
                UpdateKeychainPasswordCommand.execute( password ).then( ( message ) => {
                    returnMessage += `${message}\n`
                    resolve( returnMessage )
                } ).catch( ( error ) => {
                    reject( error )
                } )
            } ).catch( ( error ) => {
                reject( error )
            } )
        } )
    }
}

module.exports = InitLogFile
