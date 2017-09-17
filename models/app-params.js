class AppParams {
    static get() {
        const argv = require( "optimist" ).argv

        let userConfig

        if ( argv.config ) {
            userConfig = require( argv.config )
        } else {
            userConfig = require( `${process.env.HOME}/.personal-log.json` )
        }

        let appParams = Object.assign( userConfig, argv )
        if ( appParams.password ) {
            appParams.password = "" + appParams.password
        }

        return appParams
    }
}

module.exports = AppParams
