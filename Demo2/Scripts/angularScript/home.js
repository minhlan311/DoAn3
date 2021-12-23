app.controller("HomeCtrl", function ($scope, $http, $window, $timeout) {
    /*================== Danh sách các biến =================================== */
    $scope.listSPMoi = {};
    $scope.listLoaiSP = {};
    $scope.listXemNhieu = {};
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.LoadLoaiSP = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:51668/Home/GetLoaiSP',
        }).then(function (response) {
            $scope.listLoaiSP = response.data;
        });
    }; 

    $scope.LoadSPMoi = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:51668/Home/GetSPMoi',
        }).then(function (response) {
            $scope.listSPMoi = response.data;

            $timeout(function () {
                $('.hiraola-product-tab_slider-2').slick({
                    infinite: true,
                    arrows: true,
                    dots: false,
                    speed: 2000,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
                    nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
                    responsive: [{
                        breakpoint: 1501,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 575,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                    ]
                });
            }, 0);



          

        });
    };
    $scope.LoadXemNhieu = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:51668/Home/GetSPXem',
        }).then(function (response) {
            $scope.listXemNhieu = response.data;

            $timeout(function () {
                $('.hiraola-product_slider').slick({
                    infinite: true,
                    arrows: true,
                    dots: false,
                    speed: 2000,
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
                    nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
                    responsive: [{
                        breakpoint: 1501,
                        settings: {
                            slidesToShow: 5
                        }
                    },
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 4
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 575,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                    ]
                });
            }, 0);


        });
    };
    $scope.appliedClass = function (item) {
        if (item.SLCon == 0) {
            return "";
        } else {
            return "right-menu";
        }
    }
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

app.filter('LoaiSPCha', function () {
    return function (items) {
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.MaLoaiCha == null) {
                filtered.push(item);
            }
        }
        return filtered;
    };
});
app.filter('LoaiSPCon', function () {
    return function (items, tmp) {
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.MaLoaiCha == tmp.MaLoai) {
                filtered.push(item);
            }
        }
        return filtered;
    };
});



