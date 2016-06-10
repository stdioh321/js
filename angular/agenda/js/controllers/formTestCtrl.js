app.controller('formTestCtrl', function($scope) {
    $scope.title = "Hello Form Test Ctrl";
    $scope.obj = [
        { id: 1, name: "Mario", email: "mario@nintendo.com" },
        { id: 2, name: "Jessica", email: "jessica@gmail.com" },
        { id: 3, name: "Charlie", email: "charlie@yahoo.com" }

    ];

    $scope.remove = function(tmp) {
        self = this;
        tmpObj = $scope.obj.filter(function(el) {
            if (el.id === self.item.id) {
                return false;
            } else {

                return true;
            }

        });


        $scope.obj = tmpObj;
    };

    $scope.addnew = function(newObj) {
        tmpObj = angular.copy(newObj)
        tmpObj.id = Math.round(Math.random() * 1000);
        $scope.obj.push(tmpObj);

        delete $scope.newObj;
        $scope.formAddNew.$setPristine();
        $("#successAddNew").removeClass('hidden').fadeIn().html("Success").delay(2000).fadeOut();
        return false;
    }


    $scope.editShow = function() {
        $scope.editObj = angular.copy(this.item);
        $scope.editObjTmp = angular.copy($scope.editObj);

    };
    $scope.editVal = function(val) {
        $scope.obj = $scope.obj.map(function(el) {
            if (val.id == el.id) {
                return val;
            } else {
                return el;
            }
        });
    };
    $scope.orderField = "name";
    $scope.orderDirection = true;
    $scope.orderFields = function(field) {

        $scope.orderField = field;
        $scope.orderDirection = !$scope.orderDirection;
    }

    
});