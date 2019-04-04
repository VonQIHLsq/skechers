require(["require.config"],()=>{
	require(["jquery","template","header","footer"],($,template)=>{
		class List {
			constructor(){
				this.init();
			}
			
			init(){
				let type = location.search.slice(6,7);
				let title = decodeURI(location.search.slice(14));
				$.ajax({
				 	url : "http://localhost/php/getlist.php?type="+type+"&title="+title,
				 	method : "GET",
				 	dataType: "json",
				 	success : function (res) {
				 		//console.log(res)
				 		if(res.res_code === 1){
				 			let list = res.res_list.data;
				 			var html = template("catyList", { list });
				 			//console.log(html);
				 			$("#catyListContainer").html(html);
				 			$("#listTitle").html(title);
				 		}
						
				 	}
				})
			}
		}
		
		new List();
	})
})

