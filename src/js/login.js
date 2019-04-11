require(["require.config"],function(){
	require(["jquery","header","footer","backtop"],function($){
		function Login(){
			this.init();
		}
		
		$.extend(Login.prototype, {
			init(){
				this.register=$("#register");
				this.login=$("#login");
				var register=localStorage.getItem("register");
				if(register) {
					register = JSON.parse(register);
					$("#username").val(register.username);
					$("#password").val(register.password);
				}
				this.click();
			},
			
			click(){
				this.login.on("click",()=>{
					let username=$("#username").val();
					let password=$("#password").val();
					$.ajax({
						type: "GET",
						url: "http://localhost/php/login.php",
						data: "username="+username+"&password="+password,
						success: function(res){
							res = JSON.parse(res);
							if(res.res_code==1){
								if(confirm("登录成功，即将跳转首页")){
									var loginObj={
										username,
										password
									};
									localStorage.setItem("login",JSON.stringify(loginObj));
									localStorage.removeItem("register");
									location.href="/index.html";
								}
							}else {
								alert(res.res_message);
							}
						}
					});
					return false;
				});
			}
		});
		
		new Login();
	})
})