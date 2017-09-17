const fs = require( "fs" ),
    EncryptMessageCommand = require( "../commands/encrypt-message" ),
    DecryptMessageCommand = require( "../commands/decrypt-message" ),
    appParams = require( "../models/app-params" ).get(),
    async = require( "async" )

/** A class representing file system storage for messages */
class FileSystem {

    /**
     * Open the file path, creates it if needed,
     * to ensure that this script has write access.
     * File should only be ready by the user running
     * this script. In addition, set the parameters
     * passed to attributes.
     *
     * @constructor
     * @param {String} filePath
     * @param {String} encryptionPassword
     * @throws {Error} Throws an error if the file is not writable
     */
    constructor( filePath, encryptionPassword ) {
        if ( !filePath ) {
            throw Error( "filePath is required for FileSystem module!" )
        }

        let fd = fs.openSync( filePath, 'a', 0o600 );
        fs.closeSync( fd )

        this.filePath = filePath
        this.encryptionPassword = encryptionPassword
    }

    setPassword( password ) {
        this.encryptionPassword = password
    }

    /**
     * Read File
     *
     * @return {Promise} A promise that resolves with an array of
     * messages saved in the permenant file location
     */
    readFile() {
        return new Promise( ( resolve, reject ) => {
            //console.log( `Reading File: ${this.filePath}` )
            let stringData = "" + fs.readFileSync( this.filePath, "utf8" )
            //console.log( "String Data: " + stringData )
            resolve( stringData.split( "\n" ) )
        } )
    }

    /**
     * Load All
     * Load all messages stored in the permanent file storage.
     * readFile will return an array of encrypted messages, we
     * map the messages to their decrypted form through an array
     * of promises.
     *
     * return {Promise} A promise that resolves with an array of clear
     * text messages.
     *
     * @todo get the first entry and ensure the encryption is correct
     */
    loadAll() {
        return new Promise( ( resolve, reject ) => {
            this.readFile().then( ( entries ) => {
                // console.log( `entries : ${JSON.stringify( entries )}` )
                entries = entries.filter( ( value ) => {
                    return value.length > 0
                } )

                //console.log( `entries: ${JSON.stringify( entries )}` )
                let promises = entries.map( ( entry ) => {
                    if ( entry.length <= 0 ) {
                        return ""
                    } else {
                        return DecryptMessageCommand.execute( this.encryptionPassword, entry ).then( ( descryptedMessage ) => {
                            return descryptedMessage.length > 0 ? JSON.parse( descryptedMessage ) : descryptedMessage
                        } ).catch( reject )
                    }
                } )

                Promise.all( promises ).then( ( results ) => {
                    resolve( results )
                } )
            } ).catch( reject )
        } )
    }

    /**
     * Destroy
     * Truncate the permanent file storage and
     * then unlink the file from the file system
     *
     * @return {Promise} A promise that resolves with true when the file
     * has safely removed.
     */
    destroy() {
        return new Promise( ( resolve, reject ) => {
            const fd = fs.openSync( this.filePath, "r+" )

            fs.ftruncate( fd, 0, ( err ) => {
                if ( err ) {
                    return reject( err )
                }

                fs.unlink( this.filePath, ( err ) => {
                    if ( err ) {
                        return reject( err )
                    }
                    return resolve( true )
                } )
            } )
        } )
    }

    /**
     * Save One
     * Encrypt and save a single message to permanent storage.
     *
     * @param {Object} message
     * @return {Promise} A promise that resolves true when the message
     * has been encrypted and saved to permanent storage.
     */
    saveOne( message ) {
        return new Promise( ( resolve, reject ) => {
            /**
             * Stringify, encrypt and the push the new message to the
             * array of messages.
             */
            EncryptMessageCommand.execute( this.encryptionPassword, JSON.stringify( message ) ).then( ( encryptedMessage ) => {
                fs.open( this.filePath, 'a', 0o600, ( err, fd ) => {
                    if ( err ) reject( err )
                    fs.write( fd, `${encryptedMessage}\n`, ( err, bytesWritten, buffer ) => {
                        if ( err ) reject( err )
                        resolve( encryptedMessage )
                        fs.close( fd )
                    } )
                } )
            } ).catch( reject )
        } )
    }

    /**
     * Save All
     * Encrypt and save a single message to permanent storage.
     *
     * @param {Array} messages
     * @return {Promise} A promise that resolves true when the messages
     * have been encrypted and saved to permanent storage.
     */
    saveAll( messages ) {
        return new Promise( ( resolve, reject ) => {
            /**
             * Map each message object to an encrypted string
             */
            let promises = messages.map( ( entry, index ) => {
                return EncryptMessageCommand.execute( this.encryptionPassword, JSON.stringify( entry ) ).then( ( encryptedMessage ) => {
                    return encryptedMessage
                } )
            } )

            /**
             * Write the string form of the messages to permanent storage
             */
            Promise.all( promises ).then( ( encryptedEntries ) => {
                fs.writeFile( this.filePath, encryptedEntries.join( "\n" ), ( err ) => {
                    if ( err ) {
                        reject( err )
                    }

                    resolve( true )
                } )
            } )
        } )
    }
}

module.exports = new FileSystem( appParams.persistantFile, appParams.password )
