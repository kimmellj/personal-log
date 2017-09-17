const InitLogFile = require( "./commands/init-log-file" ),
    SaveNewPassword = require( "./commands/save-new-password" ),
    PromptMessage = require( "./commands/prompt-message" ),
    ShowAll = require( "./commands/show-all" ),
    fileSystemDriver = require( "./drivers/file-system" )

class Router {
    static route( argv ) {
        if ( argv.init === true ) {
            Router.init()
        } else if ( argv.setpass === true ) {
            Router.setNewPassword()
        } else if ( argv.show == true ) {
            Router.showAll()
        } else {
            Router.saveMessage()
        }
    }
    static init() {
        InitLogFile.execute().then( ( message ) => {
            console.log( message )
        } ).catch( ( message ) => {
            console.log( message )
        } )
    }

    static setNewPassword() {
        SaveNewPassword.execute().then( ( message ) => {
            console.log( message )
        } ).catch( ( message ) => {
            console.log( message )
        } )
    }

    static saveMessage() {
        PromptMessage.execute().then( ( message ) => {
            console.log( message )
        } ).catch( ( message ) => {
            console.log( message )
        } )
    }

    static showAll() {
        ShowAll.execute().then( ( message ) => {
            console.log( message )
        } ).catch( ( message ) => {
            console.log( message )
        } )
    }
}

module.exports = Router
