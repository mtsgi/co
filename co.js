$( () => {
    $( "#close" ).on( "click", () => window.close() );
    $( "#in" ).on( "keydown", ( e ) => {
        if( e.keyCode == 13 ) {
            let i = $( "#in" ).val();
            $( "main" ).append( "<aside>" + i + "</aside>" );
            let r = "";
            try {
                r = ( new Function( "\"use strict\"; return " + i ) )();
            } catch( error ) {
                r = error;
            }
            $( "main" ).append( "<article>" + r + "</article>" );
            $( "#in" ).val( "" );
        }
    } )
} );