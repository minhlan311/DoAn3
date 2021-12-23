app.controller("DanhSachCtrl", function ($scope, $http, $window) {
    /*================== Danh sách các biến =================================== */
    $scope.listSP = [];

    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
    $scope.total = 0;
    /*=================== Thao tác dữ liệu ==================================== */ 
    $scope.LoadDanhSach = function (MaLoai, page, limit) {
        $http({
            method: 'GET',
            url: 'http://localhost:51668/SanPham/GetDanhSach/?MaLoai=' + MaLoai + "&page=" + page + "&limit=" + limit,
        }).then(function (response) { 
            $scope.listSP = response.data.list;
            $scope.total = response.data.total;
         }); 
    };
    $scope.$watch('currentPage + numPerPage', function () {
        $scope.listSP = $scope.LoadDanhSach($('#MaLoai').val(), $scope.currentPage, $scope.numPerPage);
    });
    $scope.addToCart = function (sp) {
        let item = {};
        item.MaSP = sp.MaSP;
        item.TenSP = sp.TenSP;
        item.Anh = sp.Anh;
        item.Gia = sp.Gia;
        item.quantity = 1;
        var list;
        if (localStorage.getItem('cart') == null) {
            list = [item];
        } else {
            list = JSON.parse(localStorage.getItem('cart')) || [];
            let ok = true;
            for (let x of list) {
                if (x.MaSP == item.MaSP) {
                    x.quantity += 1;
                    ok = false;
                    break;
                }
            }
            if (ok) {
                list.push(item);
            }
        }
        localStorage.setItem('cart', JSON.stringify(list));
        alert("Đã thêm giở hàng thành công");
    }
});
 
 



