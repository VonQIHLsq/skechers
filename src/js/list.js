require(["require.config"], () => {
	require(["jquery", "template", "header", "footer", "backtop"], ($, template) => {
		class List {
			constructor() {
				this.init();
			}

			init() {
				this.type = location.search.slice(6, 7);
				this.title = decodeURI(location.search.slice(14));
				$.ajax({
					url: "http://localhost/php/getlist.php?type=" + this.type + "&title=" + this.title,
					method: "GET",
					dataType: "json",
					success: (res) => {
						//console.log(res)
						if (res.res_code === 1) {
							let list = res.res_list.data;
							$("#listTitle").html(this.title);
							
							this.render(list);
						}

					}
				})
			}
			
			render(list){
				this.html = template("catyList", {
					list
				});
				$("#catyListContainer").html(this.html);
				
				this.priceDesc(list);
				this.priceAsce(list);
			}
			
			priceDesc(list){
				$("#priceDown").on("click", () => {
					list = list.sort((a, b) => {
						return b.price - a.price;
					})
					this.render(list);
				})
			}
			
			priceAsce(list){
				$("#priceUp").on("click", () => {
					list = list.sort((a, b) => {
						return a.price - b.price;
					})
					this.render(list);
				})
			}
		}

		new List();
	})
})