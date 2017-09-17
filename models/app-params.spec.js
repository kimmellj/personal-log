beforeAll( () => {
    process.argv = [
        "someapp",
        "somefile",
        "--config",
        `${__dirname}/../test_data/personal-log.json`,
        "--message",
        "foobar"
    ]
} )

test( "App Parameters", () => {
    "use strict"

    const AppParamsModel = require( './app-params' )
    const params = AppParamsModel.get()

    expect( params.persistantFile ).toBe( "./test-persistant.json" )
    expect( params.config ).toBe( "/Users/jamie/Projects/personal-log/models/../test_data/personal-log.json" )
    expect( params.message ).toBe( "foobar" )
} )
