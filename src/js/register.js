require(["require.config"],function(){
	require(["jquery","header","footer","backtop"],function($){
		function Register(){
			this.init();
		}
		$.extend(Register.prototype, {
			init(){
				this.repassword=$("#repassword");
				this.register=$("#register");
				this.login=$("#login");
				this.click();
			},
			
			click(){
				this.register.on("click",()=>{
					let username=$("#username").val();
					let password=$("#password").val();
					$.ajax({
						type: "GET",
						url: "http://localhost/php/register.php",
						data: "username="+username+"&password="+password,
						success: function(res){
							res = JSON.parse(res);
							if(res.res_code==1){
								if(confirm("注册成功，即将跳转登录页面")){
									var registerObj={
										username,
										password
									};
									localStorage.setItem("register",JSON.stringify(registerObj));
									location.href="/html/login.html";
								}
							}else {
								alert(res.res_message);
							}
						}
					});
					return false;
				}),
				
				this.login.on("click",()=>{
					location.href="/html/login.html";
				})
			}
		});
		
		new Register();
	})
})