////////////////////////////
app.controller("ChiTietCtrl", function ($scope, $http, $window, $timeout) {
    /*================== Danh sách các biến =================================== */
    $scope.SanPham = {};
    /*=================== Thao tác dữ liệu ==================================== */ 
    $scope.LoadSP = function (MaSP) {
        $http({
            method: 'GET',
            url: 'http://localhost:51668/SanPham/GetChiTiet/?MaSP=' + MaSP,
        }).then(function (response) {
            $scope.SanPham = response.data;

            $timeout(function () {
                $('.hiraola-product_slider-3').slick({
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
            }, 100);
           
         }); 
    };
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
 
 



