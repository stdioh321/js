// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    material: true,

    domCache: true,
    dynamicNavbar: true
});



$$(document).on('pageInit pageReinit', function(e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        // myApp.alert('Here comes About page');
        // console.log(myApp);
    }
    if (page.name === 'detalhes') {
        // initMap();
    }
});

$$('.popup-about').on('open', function() {
    initMap();
    
});
$$('.popup-about').on('close', function() {
    removeBusInterval(busInterval);
    
});

myApp.onPageBack("detalhes", function(page) {
    closeAccordions();
});

function closeAccordions() {
    myApp.accordionClose(".accordion-item");
}