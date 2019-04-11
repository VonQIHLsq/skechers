require(["require.config"], () => {
	require(["jquery", "template", "header", "footer", "zoom", "fly", "backtop"], ($, template, header) => {
		class Detail {
			constructor() {
				this.zoom();
				this.init();
				this.groom();
			}
			zoom() {
				// 放大镜插件
				$(".zoom-img").elevateZoom({
					gallery: 'gal1',
					cursor: 'pointer',
					galleryActiveClass: 'current',
					borderSize: '1',
					borderColor: '#c5c5c5'
				});
			}

			/*渲染详情页功能*/
			init() {
				this.id = location.search.slice(4);
				//console.log(id)
				$.ajax({
					url: "http://localhost/php/getid.php?id=" + this.id,
					method: "GET",
					dataType: "json",
					success: (res) => {
						if (res.res_code === 1) {
							let xq = res.res_xq.data;
							var html = template("catyList", {
								xq
							});
							this.xq = res.res_xq.data[0];
							$("#catyListContainer").html(html);
							this.sAddFun();
							this.addCart();
							this.pay();
						}

					}
				})
			}

			/*选择鞋子尺码的功能 以及商品详情数量的加减*/
			sAddFun() {
				$("#size").on("click", () => {
					setTimeout(function() {
						$("#sizeShow").slideToggle();
					}, 200);
					$("#sizeShow ul").children().on("click", function() {
						$("#sizeShoes").html($(this).html());
						$("#size").css("borderColor", "#c5c5c5");
					})
				})

				$("#add").on("click", () => {

					$("#cartNumb").val(Number($("#cartNumb").val()) + 1);
				})

				$("#sub").on("click", () => {
					let num = Number($("#cartNumb").val());
					if (--num <= 1) {
						num = 1;
					}
					$("#cartNumb").val(num);
				})

				$("#xqSize").on("click", () => {
					$("#sizeOffer").show();
					$("#mask").show();
					$("#close").on("click", () => {
						$("#sizeOffer").hide();
						$("#mask").hide();
					})
				})
			}

			/*加入购物车功能*/
			addCart() {
				var _this = this;
				$("#addShopcart").on("click", (e) => {
					/*点击加入购物车之前必须选择鞋子的尺码*/
					let size = $("#sizeShoes").html();
					if (size !== "尺码") {
						/*得到input框里面的数值*/
						let value = $("#cartNumb").val();

						let cart = localStorage.getItem("cart");

						/*加入购物车飞入效果*/
						$(`<div style="width:25px;font-size:20px;height:25px;background-color:red;border-radius: 50%;color: #fff;text-align:center;line-height:25px;">${value}</div>`).fly({
							start: {
								left: e.clientX, //开始位置（必填）#fly元素会被设置成position: fixed
								top: e.clientY, //开始位置（必填）
							},
							end: {
								left: $("#cartNum").offset().left, //结束位置（必填）
								top: $("#cartNum").offset().top //结束位置（必填）

							},
							autoPlay: true, //是否直接运动,默认true
							speed: 1.3, //越大越快，默认1.2
							vertex_Rtop: 20, //运动轨迹最高点top值，默认20
							onEnd: function() {

									this.destroy(); // 把运动的小方块销毁

									/*等购物车飞入效果完成以后再判断相关的情况*/
									if (cart) {
										cart = JSON.parse(cart);
										let i;
										if (cart.some((item, index) => {
												i = index;
												return item.id == _this.id;
											})) {
											cart[i].num = +cart[i].num + +value;
										} else {
											cart.push({..._this.xq,
												num: value,
												size: size,
												checked: true
											});
										}
									} else {
										cart = [{..._this.xq,
												num: value,
												size: size,
												checked: true
											}]
											//console.log(cart,value)
									}

									_this.alertCart(size);
									/*执行完后将这个cart存入localStorage*/
									localStorage.setItem("cart", JSON.stringify(cart));
									$("#yourCart").html(header.calcCartNum());

								} //结束回调
						})

					} else {
						$("#size").css("borderColor", "red");
					}
				})
			}

			alertCart(size) {
				$("#detailCart").slideDown(1000);

				$("#engName").html(this.xq.engname);
				$("#detailName").html(this.xq.name);
				$("#detailColor").html(this.xq.color);
				$("#detailSize").html(size);
				$("#detailMoney").html(this.xq.price);

				/*五秒之后显示出来的购物车详细信息隐藏*/
				setTimeout(function() {
					$("#detailCart").slideUp(1000);
				}, 5000);
				this.cacl();
			}

			/*立即购买功能*/
			pay() {
				$("#payFor").on("click", () => {
					this.size = $("#sizeShoes").html();
					if (this.size !== "尺码") {
						this.code();
					} else {
						$("#size").css("borderColor", "red");
					}
				})
			}

			/*加入购物车后,弹框里的结算功能*/
			cacl() {
				$("#caclM").on("click",()=>{
					this.code();
				})
			}

			/*立即购买功能和结算功能的核心重复代码*/

			code() {
				let value = $("#cartNumb").val();
				let pay = localStorage.getItem("pay");
				pay = [{...this.xq,
					num: value,
					size: this.size,
					checked: true
				}];
				localStorage.setItem("pay", JSON.stringify(pay));

				let money = this.xq.price * value;

				location.href = "/html/order.html?money=" + money;
			}

			groom() {
				$.ajax({
					url: "http://localhost/php/getlist1.php",
					method: "GET",
					dataType: "json",
					success: (res) => {
						if (res.res_code === 1) {
							let list = res.res_list.data;
							let arrList = [];
							arrList = list.reduce((res, item) => {
								if (item.like == "like") res.push(item);
								return res;
							}, [])
							var html = template("groomList", {
								groom: arrList
							});
							$("#recommond").html(html);
						}
					}
				})
			}

		}
		new Detail();
	})
})