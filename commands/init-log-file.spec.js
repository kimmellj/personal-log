
process.argv = [
    "someapp",
    "somefile",
    "--config",
    `${__dirname}/../test_data/personal-log.json`
]

const InitLogFile = require( "./init-log-file" ),
    fileSystemDriver = require( "../drivers/file-system" ),
    appParams = require( "../models/app-params" ).get(),
    async = require( "async" )

beforeAll( () => {
    expect.assertions( 1 )
    return new Promise( async ( resolve ) => {
        const messages = await fileSystemDriver.loadAll()
        expect( messages ).toHaveLength( 0 )
        resolve()
    } )
} )

afterAll( () => {
    expect.assertions( 1 )
    return new Promise( async ( resolve ) => {
        const destroyResult = await fileSystemDriver.destroy()
        expect( destroyResult ).toBeTruthy()
        resolve()
    } )
} )

test( "Save message", async () => {
    expect.assertions( 4 ) // one extra for the before all

    try {
        const initMessage = await InitLogFile.execute()
        console.log( `Init Message: ${initMessage}` )
        expect( initMessage.length ).toBeGreaterThan( 0 )

        const allMessages = await fileSystemDriver.loadAll()
        expect( allMessages.length ).toBe( 1 )

        const lastMessage = allMessages.pop()
        console.log( `Last Message: ${JSON.stringify( lastMessage )}` )
        expect( lastMessage.message ).toBe( "genesis" )

    } catch ( err ) {
        throw ( err )
    }
} )
