require(["require.config"], () => {
	require(["jquery", "template", "header", "footer","backtop"], ($, template, header) => {
		class Cart {
			constructor() {
				this.localStorage = localStorage.getItem("cart");
				this.cartNone = $("#cartNone");
				this.cartShoes = $("#cartShoes");
				this.allMoney = 0;
				this.n = 0;
				this.init();
			}

			init() {
				if (this.localStorage == null || (JSON.parse(this.localStorage).length===0) ) {
					this.cartNone.show();
					this.cartShoes.hide();
				} else {
					this.cartNone.hide();
					this.cartShoes.show();
					this.render();
				}
			}

			render() {
				this.localStorage = localStorage.getItem("cart");
				//console.log(this.localStorage)
				var html = template("cartContainer", {
					cart: JSON.parse(this.localStorage)
				});
				this.cartShoes.html(html);
				$("#yourCart").html(header.calcCartNum());
				this.check = Array.from(document.querySelectorAll(".checkbox"));
				this.allCheck = document.querySelector(".allCheck");
				this.click();
				this.checkFun();
				this.allCk();
				this.checkB();
			}

			click() {
				this.shopNum = $(".shopNum");
				this.cartShoes.off('click');
				var _this = this;
				/*设置一个开关,当我们点击其中一个商品编辑时,让其他的商品不能编辑*/
				let flag = true;
				this.cartShoes.on("click", (e) => {
					let $target = $(e.target);
					_this.localStorage = localStorage.getItem("cart");
					_this.localStorage = JSON.parse(_this.localStorage);

					if (e.target.className == "edit") {
						if (flag) {
							$target.parent().parent().hide().siblings().show();
							let vl = $target.parent().prev().children();
							$(".shopColor option[value=" + vl.eq(0).html() + "]").attr("selected", true);
							$(".shopSize option[value=" + vl.eq(1).html() * 10 + "]").attr("selected", true);
							//$(".shopSize").find("option:contains("+vl.eq(1).html()+")").attr("selected",true);
							//console.log(vl.eq(1).html());
							//$(".shopSize").attr("value",vl.eq(1).html());
							_this.shopNum.html(vl.eq(2).html());
							flag = false;
						}
					}
					if (e.target.className == "nextAdd") {
						let num = Number(_this.shopNum.html());
						num++;
						_this.shopNum.html(num);
					}

					if (e.target.className == "prevSub") {
						let num = Number(_this.shopNum.html());
						if (--num < 1) {
							num = 1;
							return;
						}
						_this.shopNum.html(num);
					}

					if (e.target.className == "shopSave") {

						/*点击保存修改后的商品信息后,得到当前的修改商品的id*/
						let cartId = e.target.parentNode.getAttribute("cartId");
						let vl1 = $target.prev().children();
						$target.parent().hide().siblings().show();

						var i = 0;
						if (_this.localStorage.some(function(item, index) {
								i = index;
								return item.id == cartId;
							})) {

							_this.localStorage[i].color = vl1.eq(0).val();
							_this.localStorage[i].size = vl1.eq(1).val() / 10;
							_this.localStorage[i].num = vl1.eq(2).children().eq(1).html();

							localStorage.setItem("cart", JSON.stringify(_this.localStorage));
							_this.caclMoney();
							_this.render();
						}
						flag = true;
					}

					if (e.target.className == "del") {
						
						let cartId = e.target.parentNode.parentNode.getAttribute("cartId");
						if (confirm("确定删除购物车的此商品吗？")) {
							
							var i = 0;
							if (_this.localStorage.some(function(item, index) {
									i = index;
									return item.id == cartId;
								})) {
								//console.log(_this.localStorage)
								_this.localStorage.splice(i, 1);
								
								//let nowCheck = $target.parent().parent().prev().children("input");
								/*加入删除的商品是选中状态,那么需要让n减掉1*/
								//if (nowCheck.checked) _this.n--;
								
								/*减掉1之后重新获取当前的所有的复选按钮*/
								//_this.check = Array.from(document.querySelectorAll(".checkbox"));
								
								//$target.parent().parent().parent().remove();
								
								localStorage.setItem("cart", JSON.stringify(_this.localStorage));
								_this.render();
								_this.caclMoney();
							}
						}

					}
				})
				
				$("#offerOrder").on("click",()=>{
					let login=localStorage.getItem("login"),
						cart=JSON.parse(localStorage.getItem("cart")),
						pay=[],
						obj={};
					if(login){
						pay=cart.reduce((res,item)=>{
							if(item.checked)  res.push(item);
							return res;
						},[])
						localStorage.setItem("pay", JSON.stringify(pay));
						//console.log(pay);
						location.href="/html/order.html?money="+_this.allMoney;
					}else{
						if(confirm("请先登录")){
							location.href="/html/login.html";
						}
					}
					
				})
			}
			
			checkFun(){
				this.localStorage = localStorage.getItem("cart");
				this.localStorage = JSON.parse(this.localStorage);
				this.check = Array.from(document.querySelectorAll(".checkbox"));
				this.check.forEach(check => {
					check.checked = this.allCheck.checked;
				});
				this.n = this.allCheck.checked ? this.check.length : 0;
				
				//console.log(this.localStorage)
				for(var i=0;i<this.localStorage.length;i++){
					if(this.allCheck.checked){
						this.localStorage[i].checked=true;
					}else{
						this.localStorage[i].checked=false;
					}
				}
				localStorage.setItem("cart", JSON.stringify(this.localStorage));
				this.caclMoney();
			}

			
			allCk() {
				this.allCheck.onchange = () => {
					this.checkFun();
				}
			}
			

			checkB() {
				this.check = Array.from(document.querySelectorAll(".checkbox"));
				this.localStorage = localStorage.getItem("cart");
				this.localStorage = JSON.parse(this.localStorage);
				this.check.forEach(check => {
					check.onchange= () => {
						let cid=check.parentNode.nextElementSibling.getAttribute("cartId")
						this.n += check.checked ? 1 : -1;
						this.allCheck.checked = this.n === this.check.length;
						//console.log(_this.n);
						let i=0;
						if (this.localStorage.some((item, index)=> {
								i = index;
								return item.id == cid;
							})) {
								if(!check.checked){
									this.localStorage[i].checked=false;
								}else{
									this.localStorage[i].checked=true;
								}
							localStorage.setItem("cart", JSON.stringify(this.localStorage));
						}
						this.caclMoney();
					}
				})
			}

			caclMoney() {
				var _this = this;
				this.allMoney = 0;
				this.check.forEach(function(check) {
					if (check.checked) {
						var price = check.parentNode.nextElementSibling.children[0].children[0].children[0].innerHTML;
						var num = check.parentNode.nextElementSibling.children[2].children[2].innerHTML;
						//console.log(price,num)
						_this.allMoney += price * num;
					}
				});
				this.appendMoney();
			}

			appendMoney() {
				$("#allMoneyBox").html("￥" + this.allMoney + ".00");
				$("#payMoneyBox").html("￥" + this.allMoney + ".00");

				if (this.allMoney <= 0) {
					$("#fareMoney").html("-");
				} else {
					$("#fareMoney").html("免邮");
				}

			}
		}

		new Cart();
	})
})