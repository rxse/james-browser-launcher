var plist = require( 'plist' ),
	path = require( 'path' ),
	util = require( './util' ),
	currentPath;

function getPath( callback ) {
	if ( currentPath ) {
		return callback( null, currentPath );
	}

	util.find( 'com.operasoftware.Opera', function( err, p ) {
		currentPath = p;
		callback( err, currentPath );
	} );
}

function getVersion( callback ) {
	getPath( function( err, p ) {
		var pl = path.join( p, 'Contents', 'Info.plist' );

		util.exists( pl, function( y ) {
			if ( y ) {
				plist.parseFile( pl, function( err, data ) {
					callback( err, data[ 0 ].CFBundleVersion );
				} );
			} else {
				callback( 'not installed', null );
			}
		} );
	} );
}

exports.path = getPath;
exports.version = getVersion;