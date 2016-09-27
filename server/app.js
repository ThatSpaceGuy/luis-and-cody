// Setup express, app and path
const express = require( 'express' );
const app = express();
const path = require( 'path' );

const port = process.env.PORT || 3000;

// Get Angular in localhost/vendors
app.use( '/vendors/angular', express.static( path.resolve( 'node_modules/angular' ) ) );

app.use( express.static( path.resolve( 'public' ) ) );

// Setup Body Parser
const bodyParser = require( 'body-parser' );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );

app.listen( 3000, () => {

	console.log( 'App listening on http://localhost:', port );

});

app.get( '/', ( req, res ) => {

	console.log( 'GET /' );

	res.sendFile( path.resolve( './public/index.html' ) );

} );