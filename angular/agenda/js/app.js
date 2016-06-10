app = angular.module('agenda', ['ngRoute', 'ngAnimate']);

app.run(function($rootScope) {
    $rootScope.pages = [
        { name: "Home", url: "#/" },
        { name: "Contact", url: "#/contact" },
        { name: "Form Test", url: "#/form-test" }
    ];
});