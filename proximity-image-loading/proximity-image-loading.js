/*! Proximity Image Loading 1.0.0 | MIT *
 * https://github.com/jpcurrier/proximity-image-loading !*/
( function( $ ){
	$.fn.proximityLoad = function( options ){

		// default options
		var settings = $.extend({
			proximity: 0,
			start: null,
      complete: null,
      success: null,
      fail: null
		}, options );

		var load = [];
		this.each( function(){
			load.push( $( this ).attr( 'data-load' ) );
		} );

		function loader(){
			// calculate percentage proximity
			if( typeof settings.proximity === 'string' && settings.proximity.indexOf( '%' ) > -1 ){
				var proximity = settings.proximity.replace( /%/g, '' ).trim(), // remove %
					posDecimal =
						settings.proximity.indexOf( '.' ) > -1 ?
							settings.proximity.indexOf( '.' ) - 2 :
								proximity.length - 2;
				proximity = proximity.replace( /\./g, '' ); // remove .
				if( posDecimal > -1 )
          proximity = Number( proximity.slice( 0, posDecimal ) + '.' + proximity.slice( posDecimal ) );
				else{
          if( proximity.slice( 0, 1 ) == '-' ){
            var natural = proximity.slice( 1 ),
              sign = '-';
            posDecimal -= 1;
          }
          else{
            var natural = proximity,
              sign = '';
          }
          proximity = Number( sign + '0.' + String( Math.pow( 10, ( 0 - posDecimal ) ) ).slice( 1 ) + natural );
        }
        proximity *= $( window ).height();
      }
			// integer proximity
			else
        var proximity = Number( settings.proximity );

			for( var i in load ){
				var $image = $( '[ data-load="' + load[ i ] + '" ]' );
				if(
					!$image.data( 'loaded' ) &&
					$( window ).scrollTop() >= $image.offset().top + proximity
				){
					$image.data( 'loaded', true );

					if( typeof settings.start === 'function' )
						settings.start( $image );

					$.ajax({
		        url: load[ i ],
		        element: $image,
						img: load[ i ]
		      })
						.done( function(){
							var image = this.img;

							this.element.each( function(){
								if( $( this ).is( 'img' ) )
									$( this ).attr( 'src', image );
								else
									$( this ).css( 'background-image', 'url( ' + image + ' )' );
							} );

							if( typeof settings.success === 'function' )
	              settings.success( this.element );
						} )
		        .fail( function(){
							if( typeof settings.fail === 'function' )
	              settings.fail( this.element );
		        } )
		        .always( function(){
							if( typeof settings.complete === 'function' )
	              settings.complete( this.element );
		        } );
				}
			}
		}
		loader();
		$( window ).on( 'scroll', loader );
		$( window ).on( 'resize', loader );
	};
} )( jQuery );