const crypto = require( "crypto" ),
    algorithm = "aes192"

module.exports = class EncryptMessage {
    static execute( password, message ) {
        //console.log( `Encrypting message: ${JSON.stringify( message )} with password: ${password}` )

        return new Promise( ( resolve, reject ) => {
            let cipher = crypto.createCipher( algorithm, password )

            if ( !cipher ) {
                return reject( "There was an issue creating the cipher" )
            }

            //@todo use base64 vs hex
            let crypted = cipher.update( message, "utf8", "hex" )

            crypted += cipher.final( "hex" )

            resolve( crypted )
        } )
    }
}
