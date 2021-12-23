




/*Tìm kiếm sản phẩm theo tên*/
   
$(document).ready(function(){
    $("#btn-search").on("click", function() {
      var value = $("#txt-search").val().toLowerCase();
      var data = [];
      var content ="<h2>Sản phẩm muốn tìm</h2>";
      var s = 0; 
      var l = 11;
      for(var i =0; i<l;i++) {
        $("#"+i+"").filter(function() {
        if($("#"+i+" .product-name").text().toLowerCase().indexOf(value) > -1){
            var imglink = $("#"+i+"").find('.product-img').attr('src');
            var productName = $("#"+i+"").find('.product-name').text();
            var price = $("#"+i+"").find('.product-price').text();
            var order = {
            'imglink':imglink,
            'name':productName,
            'price':price
            }
            $(data[s] = order);
            s++;
        }
        }); 
        }
        if(data.length>0)
        {
        for(let i = 0; i < data.length; i++){
            var cartItem =`
        <div class = "col-m-3 col-s-4">
					<div id ="0" class="product">
					<div class = "anhanh">
						<img class="product-img"  src="${data[i].imglink}"/>
					</div>
					<label class="product-name">${data[i].name}</label>
					Giá cũ: <s>250.000đ</s> <br />
					Giá mới: <label class="product-price">${data[i].price}</label><br/><br/>
					<button class="btn-buy">mua</button>
					<button class="btn-view"><a href ="orderNONA.html" style ="padding: 0px;">chi tiết</a></button>
					</div>
		</div>`

        content += cartItem;
        }
    }
    else {
        content +="<h3>Không tìm thấy sản phẩm nào";
    }
        $("#search-re").html(content);
        document.getElementById("mainmain").style.display = "none";
    });
  });





  
/*sắp xếp sản phẩm theo giá bán*/
$(document).ready(function(){
    $("#btn-sort").on("click", function(){
    var s = 0; 
    var l = 8;
    var data = []; 
    var content ="";
    for(var i =0; i<l;i++) {
    $("#"+i+"").filter(function() {
        var imglink = $("#"+i+"").find('.product-img').attr('src');
        var productName = $("#"+i+"").find('.product-name').text();
        var a = $("#"+i+"").find('.product-price').text();
        var price = UpdatePrice(a);
        var order = {
            'imglink':imglink,
            'name':productName,
            'price':price
        }
        $(data[s] = order);
        s++;
        })}
    var product = data[0];
    data.sort(function(a,b){
        return a.price - b.price;
    });
    for(var i =0; i<l;i++)
    {
        var cartItem =`
            <div class = "col-m-3 col-s-4" 
				style = "background-color: #EAEAC8; min-height: 200px;float:left;margin: auto;">
					<div id ="0" class="product">
					<div class = "anhanh">
						<img class="product-img"  src="${data[i].imglink}"/>
					</div>
					<label class="product-name">${data[i].name}</label>
					Giá cũ: <s>250.000đ</s> <br />
					Giá mới: <label class="product-price">${data[i].price}</label><br/><br/>
					<button class="btn-buy">mua</button>
					<button class="btn-view"><a href ="orderNONA.html" style ="padding: 0px;">chi tiết</a></button>
					</div>
		    </div>`
        content += cartItem;
       
    } 
    $("#search-re").html(content);
    document.getElementById("mainmain").style.display = "none";
    })
});

///////////////////

function UpdatePrice(spr)
{
    var data = spr;
    data = data.replace('.','');
    data = data.replace("đ","");
    data = data.replace(" ","");
    console.log(data);
    return parseInt(data);
    $('.total-price').text(a(totalPrice.toString()));
    $('.tmp-price').text(a(totalPrice.toString()));
    console.log(a(totalPrice.toString())); 
}
function a(totalPrice)
{   
    var str = "";
    for(var i = 0;i<totalPrice.length;i++)
    {
        if(i %3==0 && i!=0)
            str +=('.'+totalPrice[i]);
        else
            str = str+totalPrice[i];
    }
    str+='đ';
    return str;
}