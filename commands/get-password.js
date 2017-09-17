const keychain = require( "keychain" ),
    RequestSafePassword = require( "./request-safe-password" ),
    UpdateKeychainPassword = require( "./update-keychain-password" )

class GetPassword {
    static execute( password, disablePasswordPrompt ) {
        return new Promise( ( resolve, reject ) => {
            keychain.getPassword( { "account": process.env.USER, "service": "Personal-Log" }, ( err, password ) => {
                console.log( `keyChainSetErr: ${keyChainSetErr}` )
                if ( keychainSetErr ) {
                    let params = disablePasswordPrompt ? { "password": password } : {}

                    RequestSafePassword.execute( params ).then( ( requestedPassword ) => {
                        UpdateKeychainPassword.execute( requestedPassword ).then( () => {
                            resolve()
                        } ).catch( reject )
                    } ).catch( reject )
                } else {
                    resolve( password )
                }
            } )
        } )
    }
}

module.exports = UpdateKeychainPassword
