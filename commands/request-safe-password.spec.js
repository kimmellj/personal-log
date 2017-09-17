

beforeAll( () => {
    process.argv = [
        "someapp",
        "somefile",
        "--config",
        `${__dirname}/../test_data/personal-log.json`
    ]
} )

test( "Request a safe password", () => {
    expect.assertions( 1 )

    const RequestSafePassword = require( "./request-safe-password" )
    RequestSafePassword.execute().then( ( password ) => {
        expect( password ).toBe( "thisisasuperlongpassword" )
    } ).catch( ( err ) => {
        expect( err ).not.toBeNull()
    } )
} )
