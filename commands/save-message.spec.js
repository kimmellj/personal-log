
process.argv = [
    "someapp",
    "somefile",
    "--config",
    `${__dirname}/../test_data/personal-log.json`
]

const SaveMessage = require( "./save-message" ),
    DecryptMessageCommand = require( "./decrypt-message" ),
    InitLogFile = require( "./init-log-file" ),
    fileSystemDriver = require( "../drivers/file-system" ),
    appParams = require( "../models/app-params" ).get(),
    async = require( "async" )

beforeAll( () => {
    return new Promise( async ( resolve ) => {
        const messages = await fileSystemDriver.loadAll()
        expect( messages ).toHaveLength( 0 )
        resolve()
    } )
} )

afterAll( () => {
    return new Promise( async ( resolve ) => {
        const destroyResult = await fileSystemDriver.destroy()
        expect( destroyResult ).toBeTruthy()
        resolve()
    } )
} )

test( "Save message", async () => {
    //async await in node 8
    const sampleMessage = { "foo": "bar" }
    expect.assertions( 7 ) // one extra for the before all


    try {
        const initMessage = await InitLogFile.execute()
        expect( initMessage.length ).toBeGreaterThan( 0 )

        const allMessages = await fileSystemDriver.loadAll()
        expect( allMessages.length ).toBe( 1 )

        const encryptedMessage = await SaveMessage.execute( sampleMessage )
        expect( encryptedMessage ).not.toBe( JSON.stringify( sampleMessage ) )

        const decyptedMessage = await DecryptMessageCommand.execute( appParams.password, encryptedMessage )
        expect( decyptedMessage ).toBe( JSON.stringify( sampleMessage ) )

        const updatedMessages = await fileSystemDriver.loadAll()
        expect( updatedMessages.length ).toBeGreaterThan( 0 )

        const lastMessage = updatedMessages.pop()
        expect( lastMessage.foo ).toBe( sampleMessage.foo )
    } catch ( err ) {
        throw ( err )
    }
} )
