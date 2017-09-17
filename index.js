#!/usr/bin/env node

const argv = require( "optimist" ).argv,
    Router = require( './router' )

Router.route( argv )
