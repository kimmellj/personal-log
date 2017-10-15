/* eslint no-console: 0 */

const RequestSafePasswordCommand = require( "./request-safe-password" ),
    fileSystemDriver = require( "../drivers/file-system" ),
    userConfig = require( `${process.env.HOME}/.personal-log.json` )


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

            returnMessage += "Starting new log file ... \n"

            let message = {
                "timestamp": Date.now(),
                "user": process.env.USER,
                "message": "genesis"
            }

            RequestSafePasswordCommand.execute().then( ( password ) => {
                fileSystemDriver.setPassword( password )
                fileSystemDriver.destroy().then( () => {
                    returnMessage += "Log file has been destroyed... \n"

                    fileSystemDriver.saveOne( message ).then( () => {
                        returnMessage += "File has been initialized! \n"
                        resolve( returnMessage )
                    } ).catch( ( error ) => {
                        reject( error )
                    } )
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
