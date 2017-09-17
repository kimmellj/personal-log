const EncryptMessage = require( "./encrypt-message" )

test( "Encrypt a message", () => {
    expect.assertions( 2 )

    EncryptMessage.execute( "superlongpasswordfun", "foobar" ).then( ( encryptedMessage ) => {
        expect( encryptedMessage ).not.toBe( "foobar" )
        expect( encryptedMessage ).toBe( "d8c6502267b4" )
    } ).catch( ( err ) => {
        console.log( err )
        expect( err ).toBeNull()
    } )
} )
