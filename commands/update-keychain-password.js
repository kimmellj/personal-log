const keychain = require( "keychain" )

class UpdateKeychainPassword {
    static execute( password ) {
        return new Promise( ( resolve, reject ) => {
            keychain.setPassword( { "account": process.env.USER, "service": "Personal-Log", "password": password }, ( keychainSetErr ) => {
                if ( keychainSetErr ) {
                    reject( keychainSetErr )
                } else {
                    resolve( "Password saved to Keychain successfull!" )
                }
            } )
        } )
    }
}

module.exports = UpdateKeychainPassword
