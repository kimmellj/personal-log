const DecryptMessage = require( "./decrypt-message" )

test( "Decrypt a message", () => {
    "use strict"

    expect.assertions( 2 )

    DecryptMessage.execute( "superlongpasswordfun", "1eae373b678501a5549ccbb3c4fcce65" ).then( ( decryptedMessage ) => {
        expect( decryptedMessage ).toBe( "foobar" )
        expect( decryptedMessage ).not.toBe( "1eae373b678501a5549ccbb3c4fcce65" )
    } ).catch( ( err ) => {
        expect( err ).toBeNull()
    } )
} )
