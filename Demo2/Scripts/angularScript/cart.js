////////////////////////////
app.controller("CartCtrl", function ($scope, $http, $window, $timeout) {
    $scope.listSP = [];
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.LoadCart = function () {
        $scope.listSP = JSON.parse(localStorage.getItem('cart'));
    };
    $scope.LoadCart();
});
 
 



