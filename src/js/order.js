require(["require.config"], () => {
	require(["jquery", "template", "header", "footer","backtop"], ($,template) => {
		class Order{
			constructor(){
				this.render();
			}
			render(){
				this.localStorage = localStorage.getItem("pay");
				//console.log(this.localStorage)
				var html = template("xqOrder", {
					order: JSON.parse(this.localStorage)
				});
				$("#orderContainer").html(html);
				this.init();
			}
			
			init(){
				let money=location.search.slice(7);
				$("#allMoneyBox").html("￥" + money + ".00");
				$("#payMoneyBox").html("￥" + money + ".00");
			}
		}
		return new Order();
	})
})