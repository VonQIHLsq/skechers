define(["jquery"], function ($) {
	class Header {
		constructor () {
			this.init().then(() => {
				this.login();
				this.click();
				this.search();
			   
			})
			
			//this.search();
		}
		init () {
			
			return new Promise((resolve, reject) => {
				// 可以在加载路径后面写上空格加选择器，只加载一部分html
				$("#header-container").load("/html/module/header.html",  () => {
					// 回调函数，指的是load加载结束以后执行的代码
					resolve();
				});
			})			
		}

		login () {
			var login=localStorage.getItem("login");
			if(login){
				login = JSON.parse(login);
				
				$("#loginUp").hide();
				$("#loginOut").show();
				
				$("#user").html(login.username);
			}
		}
		
		click(){
			var _this=this;
			$("#backlogin").on("click",function(){
				if(confirm("确定要退出吗？")){
					localStorage.removeItem("login");
					location.reload();
				}
			})
		}
		
		search(){
			let _this=this;
			this.seaContainer=$("#search-container");
			$("#search1").on("keyup",function(){
				
				$("#form").css({
					"width":"200px",
				});
				//$("#form").width(200);
				let keyword=$(this).val().trim();
				if(keyword!==""){
					$.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd="+keyword, res => {
						let list = res.s;
						let ul = $("<ul>");
						list.forEach( function(item) {
							$("<li>").html(item).appendTo(ul);
						});
						_this.seaContainer.empty().show().append(ul);
					})
				}else{
					_this.seaContainer.hide();
						$("#form").css({
						"width":"138px",
					});
				}
			})
			
			$("#search1").on("focus",function(){
				_this.seaContainer.width(200);
			})
			
			$("#search1").on("blur",function(){
				setTimeout(function(){
					_this.seaContainer.hide();
				},200);
			})
			
			this.seaContainer.on("click","li",function(){
				$("#search1").val($(this).html());
				_this.seaContainer.hide();
			})
			
		}
	}

	return new Header();
})