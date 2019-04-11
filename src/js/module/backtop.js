define(["jquery"], function($) {
	class Backtop{
		constructor(){
			this.init();
			this.click();
		}
		init(){
			$(window).scroll(()=>{
				$("#topback").show();
				if($(document).scrollTop()==0){
					$("#topback").hide();
				}
			})
		}
		click(){
			$("#topback").on("click",()=>{
				$('html,body').animate({scrollTop:0},500);
			})
		}
	}
	return new Backtop();
})