app.controller('tmpCtrl', function($scope, dbData, $http, $timeout) {
    $scope.dbData = dbData;

    $scope.loadDb = function() {
        $http({
            method: "GET",
            url: "/api/person"
        }).then(function(data) {
            $scope.dbData = data;
        }, function(dataError) {
            console.log(dataError);
        })
    };

    $scope.addNewPerson = function(person) {
        $http({
            method: "POST",
            url: "/api/person",
            data: person
        }).then(function(data) {

            toastr.success("Success");
            delete $scope.person;
            $scope.formAddPerson.$setPristine();
            $scope.loadDb();
        }, function(data) {
            var tmp = [];
            for (item in data.data.errors) {
                tmp.push(data.data.errors[item].message);
            }
            toastr.error(tmp.join("<br />"));
            console.log(data);
        });
    };

    $scope.removePerson = function(person) {
        $http({
            method: "DELETE",
            url: "/api/person/" + person._id,
            data: person
        }).then(function(data) {
            toastr.success(person.name + " Removed");
            console.log(data);
            $scope.loadDb();
        }, function(data) {
            console.log(data)
        });

    };
});

app.controller("personCtrl", function($scope, $http, $routeParams) {

    $http({
        method: "GET",
        url: "/api/person/" + $routeParams.id
    }).then(function(data) {
        $scope.person = data.data;
    }, function(data) {
        return data;
    });

});