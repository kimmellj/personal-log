const crypto = require( "crypto" ),
    algorithm = "aes-256-ctr"

module.exports = class DecryptMessage {
    static execute( password, message ) {
        //console.log( `Decrypting message: ${JSON.stringify( message )} with password: ${password}` )
        return new Promise( ( resolve, reject ) => {
            let decipher = crypto.createDecipher( algorithm, password )

            if ( !decipher ) {
                return reject( "There was an issue creating the cipher" )
            }

            let dec = decipher.update( message, "hex", "utf8" ),
                decFinal = dec + decipher.final( "utf8" )

            resolve( decFinal )
        } )
    }
}
