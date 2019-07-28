const electron = require( 'electron' );
const app = electron.app;

let mw = null;

app.on( 'window-all-closed', function() {
    if( process.platform !== 'darwin' ) {
        app.quit();
    }
} );

app.on( 'ready', function() {
    mw = new electron.BrowserWindow( {width: 720, height: 480, transparent: true, frame: false, 'node-integration': false} );
    mw.loadURL( 'file://' + __dirname + '/index.html' );

    mw.on( 'closed', function() {
        mw = null;
    } );
} );