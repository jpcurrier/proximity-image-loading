# Proximity Image Loading

A lightweight jQuery plugin to load images only when they are within a set proximity of the user's scroll. Requires jQuery 1.7+.

Tested support: Chrome, Firefox, Safari

## Setup

Include jQuery (1.7+) and the Proximity Image Loading plugin files.

```html
<!-- Proximity Image Loading jQuery Plugin -->
<script src="proximity-image-loading/proximity-image-loading.js"></script>
```

Write `data-load` attributes for every element whose image should load only when the user is within a set proximity of that element. The value of this `data-load` attribute should be a link to the image to load.

```html
<img class="pload" data-load="http://image-1.jpg">
<div class="pload" data-load="http://image-2.jpg"></div>
```

Call the plugin on these elements with jQuery.

```javascript
// simple
$( '.pload' ).proximityLoad();

// custom settings
$( '.pload' ).proximityLoad({
  proximity: '-50%',
  start: startCallback,
  complete: completeCallback,
  success: successCallback,
  fail: failCallback
});
function startCallback( $item ){
  $item.addClass( 'loading-started' );
}
function completeCallback( $item ){
  $item.addClass( 'loading-complete' );
}
function successCallback( $item ){
  $item.addClass( 'loading-successful' );
}
function failCallback( $item ){
  $item.addClass( 'loading-failed' );
}
```

## Settings

Setting | Type | Default | Description
--- | --- | --- | ---
proximity | integer or string | 0 | Number of pixels (integer value) or percentage of the window height (string value) above (negative value) or below (positive value) the top of an element when the image should be loaded.
start | function | null | Callback function to run when image loading begins on an element. An argument is passed to this function with the loading element as a jQuery object.
complete | function | null | Callback function to run after an image has either loaded or failed to load. An argument is passed to this function with the loading element as a jQuery object.
success | function | null | Callback function to run after an image has successfully loaded. An argument is passed to this function with the loading element as a jQuery object.
fail | function | null | Callback function to run when an image has failed to download. An argument is passed to this function with the loading element as a jQuery object.