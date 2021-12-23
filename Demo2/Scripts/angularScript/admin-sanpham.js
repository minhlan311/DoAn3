app.controller("AdminSanPhamCtrl", function ($scope, $http, $window) {
    /*================== Danh sách các biến =================================== */
    $scope.listSP = [];

    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
    $scope.total = 0;

    $scope.Item;
    /*=================== Thao tác dữ liệu =========================    =========== */
    $scope.LoadDanhSach = function (page, limit) {
        $http({
            method: 'GET',
            url: 'http://localhost:51668/Admin/GetDanhSach/?page=' + page + '&limit=' + limit,
        }).then(function (response) {
            if (response.data != null) {
                $scope.listSP = response.data.list;
                $scope.total = response.data.total;
            } else {
                window.location.replace("/Admin/Login");
            }
        });
    };
    $scope.$watch('currentPage + numPerPage', function () {
        $scope.listSP = $scope.LoadDanhSach($scope.currentPage, $scope.numPerPage);
    });

    $scope.AjaxAddSanPham = function () {
        var action = $('#btnSubmit').find('span').html();
        let sp = {};
        
        sp.TenSP = $('#TenSP').val();
        sp.Gia = $('#Gia').val();
        var file = document.getElementById('file').files[0];

        if (action === "Thêm mới") {

            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                $http({
                    method: 'POST',
                    headers: {
                        'Content-Type': undefined
                    },
                    data: formData,
                    url: 'http://localhost:51668/Admin/Upload',
                }).then(function (res) {
                    sp.Anh = res.data;
                    $http({
                        method: 'POST',
                        url: 'http://localhost:51668/Admin/AjaxAddSanPham',
                        datatype: 'json',
                        data: JSON.stringify(sp)
                    }).then(function (response) {
                        if (response.data == 1) {
                            alert('Thêm thành công');
                            location.reload();
                        }
                        else {
                            alert('Có lỗi');
                        }
                    });
                });
            } else {
                $http({
                    method: 'POST',
                    url: 'http://localhost:51668/Admin/AjaxAddSanPham',
                    datatype: 'json',
                    data: JSON.stringify(sp)
                }).then(function (response) {
                    if (response.data.ok == 1) {
                        alert('Thêm thành công');
                        location.reload();
                    }
                    else {
                        alert('Có lỗi');
                    }
                });
            }
        } else {
            sp.MaSP = $scope.Item.MaSP;
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                $http({
                    method: 'POST',
                    headers: {
                        'Content-Type': undefined
                    },
                    data: formData,
                    url: 'http://localhost:51668/Admin/Upload',
                }).then(function (res) {
                    sp.Anh = res.data;
                    $http({
                        method: 'POST',
                        url: 'http://localhost:51668/Admin/AjaxUpdateSanPham',
                        datatype: 'json',
                        data: JSON.stringify(sp)
                    }).then(function (response) {
                        if (response.data == 1) {
                            alert('Cập nhật thành công');
                            location.reload();
                        }
                        else {
                            alert('Có lỗi');
                        }
                    });
                });
            } else {
                sp.Anh = $scope.Item.Anh;
                $http({
                    method: 'POST',
                    url: 'http://localhost:51668/Admin/AjaxUpdateSanPham',
                    datatype: 'json',
                    data: JSON.stringify(sp)
                }).then(function (response) {
                    if (response.data == 1) {
                        alert('Cập nhật thành công');
                        location.reload();
                    }
                    else {
                        alert('Có lỗi');
                    }
                });
            }
        }

    };

    $scope.Sua = function (item) {
        $scope.Item = item;
        $('#TenSP').val(item.TenSP);
        $('#Gia').val(item.Gia);
        $('#btnSubmit').find('span').html('Lưu lại');
    };
    $scope.Xoa = function (item) {
        $http({
            method: 'POST',
            url: 'http://localhost:51668/Admin/AjaxXoaSanPham',
            datatype: 'json',
            data: JSON.stringify(item)
        }).then(function (response) {
            if (response.data == 1) {
                alert('Xóa thành công');
                location.reload();
            }
            else {
                alert('Có lỗi');
            }
        });
    };
    $scope.Reset = function () {
        $('#btnSubmit').find('span').html('Thêm mới');
    }

});





