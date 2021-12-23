app.controller("CheckOutCtrl", function ($scope, $http, $window, $timeout) {
    $scope.listSP = [];
    $scope.total = 0;
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.LoadCart = function () {
        $scope.listSP = JSON.parse(localStorage.getItem('cart'));
        $scope.listSP.forEach(function (item, i) {
            $scope.total += item.quantity * item.Gia;
        }); 
    };
    $scope.LoadCart();

    $scope.CreateHoaDon = function () {
        let HoaDon = {};
        HoaDon.HoTen = $('#HoTen').val();
        HoaDon.DiaChi = $('#DiaChi').val();
        HoaDon.CongTy = $('#CongTy').val();
        HoaDon.ChiTietHoaDons = [];
        $scope.listSP.forEach(function (item, i) {
            HoaDon.ChiTietHoaDons.push({ MaSP: item.MaSP, SoLuong: item.quantity });
        });
        $http({
            method: 'POST',
            url: 'http://localhost:51668/Shopping/CreateHoaDon',
            datatype: 'json',
            data: JSON.stringify(HoaDon)
        }).then(function (response) {
            if (response.data.ok == 1) {
                alert('Thêm thành công');
            }
            else {
                alert('Có lỗi');
            }
        });
    };

    
});
 
 



