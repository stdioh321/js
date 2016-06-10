app.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
    })
        .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'contactCtrl'
    })
        .when('/form-test', {
        templateUrl: 'views/formTest.html',
        controller: 'formTestCtrl'
    });
});