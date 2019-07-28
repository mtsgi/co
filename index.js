const electron = require( 'electron' );
const app = electron.app;

let mw = null;

app.on( 'window-all-closed', function() {
    if( process.platform !== 'darwin' ) {
        app.quit();
    }
} );

app.on( 'ready', function() {
    mw = new electron.BrowserWindow( {width: 800, height: 600} );
    mw.loadURL( 'file://' + __dirname + '/index.html' );
    
    mw.on( 'closed', function() {
        mw = null;
    } );
} );