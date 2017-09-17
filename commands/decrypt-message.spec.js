const DecryptMessage = require( "./decrypt-message" )

test( "Decrypt a message", () => {
    "use strict"

    expect.assertions( 2 )

    DecryptMessage.execute( "superlongpasswordfun", "1858e54ed833" ).then( ( decryptedMessage ) => {
        expect( decryptedMessage ).toBe( "foobar" )
        expect( decryptedMessage ).not.toBe( "1858e54ed833" )
    } ).catch( ( err ) => {
        expect( err ).toBeNull()
    } )
} )
