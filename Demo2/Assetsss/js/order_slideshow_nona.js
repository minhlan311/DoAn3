


//Khi Ấn Thêm sản phẩm rỏ hàng hiển thị tăng theo số lần thêm,
//sản phầm thrrm trực tiếp từ trang index vào rỏ hàng,


$(document).ready(function () {
    var amount =  JSON.parse("["+sessionStorage.getItem("orders")+"]").length;
    $(".cart-amount").text(amount);
    $(".product .btn-buy").click(function () { 
        var product =  $( this ).parent();
        var imgLink = product.find('.product-img').attr('src');
        var name = product.find('.product-name').text();
        var price = product.find('.product-price').text();
        var order = {
            "img_link": imgLink,
            "name": name,
            "price": price
        };
        var currentProduct = window.sessionStorage.getItem("orders");
        var newOrders = "";
        if(currentProduct!=null)
           newOrders =  currentProduct+","+JSON.stringify(order);
        else
            newOrders = JSON.stringify(order);
        window.sessionStorage.setItem("orders", newOrders);
        
        var curent = Number($(".cart-amount").text());
        curent += 1;
        $(".cart-amount").text(curent);
    });
});

//slideshow index
$(document).ready(function(){
    var stt = 0;
    starImg = $("img.slide:first").attr("stt");
    endImg = $("img.slide:last").attr("stt");
    $("img.slide").each(function(){
        if($(this).is(':visible'))
            stt = $(this).attr("stt");
    });
    $("#next").click(function(){
        if(stt == endImg){
            stt = -1;
        }
        next = ++stt;
        $("img.slide").hide();
        $("img.slide").eq(next).show();
    });
    $("#prev").click(function(){
        if(stt == 0){
            stt = endImg;
            prev = stt++;
        }
        prev = --stt;
        $("img.slide").hide();
        $("img.slide").eq(prev).show();
    });
     setInterval(function(){
         $("#next").click()
        },5000);

}); 

