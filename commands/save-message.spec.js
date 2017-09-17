
process.argv = [
    "someapp",
    "somefile",
    "--config",
    `${__dirname}/../test_data/personal-log.json`
]

const SaveMessage = require( "./save-message" ),
    DecryptMessageCommand = require( "./decrypt-message" ),
    fileSystemDriver = require( "../drivers/file-system" ),
    appParams = require( "../models/app-params" ).get(),
    async = require( "async" )

test( "Save message", () => {
    expect.assertions( 5 )

    const sampleMessage = { "foo": "bar" }

    async.waterfall( [
        ( callback ) => {
            fileSystemDriver.loadAll().then( ( data ) => {
                callback( null, data );
            } )

        },
        ( initialData, callback ) => {
            SaveMessage.execute( sampleMessage ).then( ( encryptedMessage ) => {
                callback( null, initialData, encryptedMessage )
            } )
        },
        ( initialData, encryptedMessage, callback ) => {
            DecryptMessageCommand.execute( appParams.password, encryptedMessage ).then( ( decyptedMessage ) => {
                callback( null, initialData, encryptedMessage, decyptedMessage )
            } )
        },
        ( initialData, encryptedMessage, decyptedMessage, callback ) => {
            fileSystemDriver.loadAll().then( ( postData ) => {
                callback( null, initialData, encryptedMessage, decyptedMessage, postData )
            } )
        },
        ( initialData, encryptedMessage, decyptedMessage, postData, callback ) => {
            fileSystemDriver.destroy().then( ( operationComplete ) => {
                callback( null, initialData, encryptedMessage, decyptedMessage, postData, operationComplete )
            } )
        },
        (
            initialData,
            encryptedMessage,
            decyptedMessage,
            postData,
            operationComplete,
            callback
        ) => {
            // arg1 now equals 'three'
            callback( null, {
                "initialData": initialData,
                "encryptedMessage": encryptedMessage,
                "decyptedMessage": decyptedMessage,
                "postData": postData,
                "operationComplete": operationComplete
            } );
        }
    ], ( err, result ) => {
        console.log( result )
        expect( result.initialData ).toHaveLength( 0 )
        expect( result.encryptedMessage ).toBe( 'c2a918292bd285408dc4a9a023' )
        expect( result.decyptedMessage ).toBe( "{\"foo\":\"bar\"}" )
        expect( result.postData ).toHaveLength( 1 )
        expect( result.postData[0].foo ).toHaveLength( "bar" )
        // result now equals 'done'
    } );
} )
