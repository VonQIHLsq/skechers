require(["require.config"],()=>{
	require(["jquery","template","header","footer","zoom"],($,template)=>{
		class Detail{
			constructor(){
				this.zoom();
				this.init();
			}
			zoom () {
		        // 放大镜插件
		        $(".zoom-img").elevateZoom({
		            gallery:'gal1',
		            cursor: 'pointer',
		            galleryActiveClass: 'current',
		            borderSize:'1',    
		            borderColor:'#c5c5c5'
		        });
		    }
			init(){
				let id = location.search.slice(4);
				console.log(id)
				$.ajax({
				 	url : "http://localhost/php/getid.php?id="+id,
				 	method : "GET",
				 	dataType: "json",
				 	success : function (res) {
				 		//console.log(res)
				 		if(res.res_code === 1){
				 			let xq = res.res_xq.data;
				 			var html = template("catyList", { xq });
				 			//console.log(html);
				 			$("#catyListContainer").html(html);
				 		}
						
				 	}
				})
			}
		}
		new Detail();
	})
})

