process.argv = [
    "someapp",
    "somefile",
    "--config",
    `${__dirname}/../test_data/personal-log.json`
]

const appParams = require( "../models/app-params" ).get(),
    fileSystemDriver = require( "./file-system" )


beforeAll( () => {
    expect.assertions( 1 )
    return fileSystemDriver.loadAll().then( ( data ) => {
        expect( data ).toHaveLength( 0 )
    } ).catch( ( err ) => {
        console.log( `Error: ${err.stack}` )
    } )
} )

afterAll( () => {
    expect.assertions( 1 )
    return fileSystemDriver.destroy().then( ( operationComplete ) => {
        expect( operationComplete ).toBe( true )
    } ).catch( ( err ) => {
        console.log( `Error: ${err.stack}` )
    } )
} )

test( "Save new entry", () => {
    expect.assertions( 4 )
    const sampleMessage = { "foo": "bar" }

    return fileSystemDriver.saveOne( sampleMessage ).then( ( encryptedMessage ) => {
        expect( encryptedMessage ).not.toBe( JSON.stringify( sampleMessage ) )

        return fileSystemDriver.loadAll().then( ( data ) => {
            expect( data.length ).toBeGreaterThan( 0 )
            let message = data.pop()

            expect( message.foo ).toBe( sampleMessage.foo )
        } )
    } ).catch( ( err ) => {
        console.log( `Error: ${err.stack}` )
    } )
} )

test( "Save all / load all entries", () => {
    expect.assertions( 5 )
    const sampleMessages = [
        { "foo": "bar" },
        { "Captain": "Kirk" },
        { "baTman": "roBin" }
    ]

    return fileSystemDriver.saveAll( sampleMessages ).then( ( mesageSaved ) => {
        expect( mesageSaved ).toBe( true )

        return fileSystemDriver.loadAll().then( ( data ) => {
            expect( data ).toHaveLength( sampleMessages.length )

            let message = data.pop()

            expect( message.baTman ).toBe( sampleMessages[2].baTman )

            message = data.pop()
            expect( message.Captain ).toBe( sampleMessages[1].Captain )

            message = data.pop()
            expect( message.foo ).toBe( sampleMessages[0].foo )
        } )
    } ).catch( ( err ) => {
        console.log( `fileSystemDriver.saveAll : ${err.stack}` )
        expect( err ).toBeNull()
    } )
} )
