const EncryptMessage = require( "./encrypt-message" )

test( "Encrypt a message", () => {
    expect.assertions( 2 )

    EncryptMessage.execute( "superlongpasswordfun", "foobar" ).then( ( encryptedMessage ) => {
        expect( encryptedMessage ).not.toBe( "foobar" )
        expect( encryptedMessage ).toBe( "1eae373b678501a5549ccbb3c4fcce65" )
    } ).catch( ( err ) => {
        console.log( err )
        expect( err ).toBeNull()
    } )
} )
