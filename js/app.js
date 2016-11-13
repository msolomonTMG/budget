/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('tutorialWebApp', [
  'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
    .when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
    .when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    .when("/envelopes", {templateUrl: "partials/envelopes.html", controller: "PageCtrl"})
    // Account
    .when("/login", {templateUrl: "partials/login.html", controller: "LoginCtrl"})
    .when("/logout", {templateUrl: "partials/logout.html", controller: "LogoutCtrl"})
    // Blog
    .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
});

/**
 * Controls the Login page
 */
app.controller('LoginCtrl', function (/* $scope, $location, $http */) {
  console.log("Login Controller reporting for duty.");

});

/**
 * Controls the Logout page
 */
app.controller('LogoutCtrl', function ($scope, $location, $http) {
  console.log("Logout Controller reporting for duty.");
  //async
  Stamplay.User.logout(true, function(err, res){
    $location.url('/login')
  })
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ( $scope, $location, $http ) {
  console.log("Page Controller reporting for duty.");
  Stamplay.User.currentUser()
  .then(function(res) {
    // success
    if(!res.user) {
      $location.url( "/login" )
      $scope.$apply()
    }
  }, function(err) {
    // error
    $location.path( "/login" );
  })

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});
