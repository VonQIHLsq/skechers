require(["require.config"],function(){
	require(["jquery","Swiper","template","header","footer","backtop"],function($,Swiper,template){
		class Index{
			constructor (){
				this.swiper();
				this.ajax();
			}
			
			/*轮播图swiper*/
			swiper(){
				new Swiper ('.swiper-container', {
				    //direction: 'vertical', // 垂直切换选项
				    loop: true, // 循环模式选项
				    autoplay: true,
				    
				    // 如果需要分页器
				    pagination: {
				      el: '.swiper-pagination',
				      clickable: true
				    },
				    
				    // 如果需要前进后退按钮
				    navigation: {
				      nextEl: '.swiper-button-next',
				      prevEl: '.swiper-button-prev'
				    }
				})
			}
			
			
			ajax(){
				
				$.ajax({
				 	url : "http://localhost/php/gettype.php",
				 	method : "GET",
				 	dataType: "json",
				 	success : function (res) {
				 		if(res.res_code === 1){
				 			let type = res.res_type.data;
				 			var html = template("catyList", { type });
				 			//console.log(html);
				 			$("#catyListContainer").html(html);
				 			//console.log(type);
				 			var $aLi=$("#catyListContainer").children();
				 			//console.log($aLi)
				 			for(let i=0;i<$aLi.length;i++){
				 				$aLi[i].style.backgroundImage="url("+type[i].src+")";
				 			}
				 		}
						
				 	}
				})
				
				$.ajax({
				 	url : "http://localhost/php/gettype2.php",
				 	method : "GET",
				 	dataType: "json",
				 	success : function (res) {
				 		if(res.res_code === 1){
				 			let type = res.res_type.data;
				 			/*var html = template("catyList", { type });
				 			//console.log(html);
				 			$("#catyListContainer").html(html);
				 			//console.log(type);*/
				 			var $aLi=$("#nason-container").children();
				 			var $aA=$aLi.children();
				 			for(let i=0;i<$aLi.length;i++){
				 				$aLi[i].style.backgroundImage="url("+type[i].src+")";
				 				$aA[i].href="/html/list.html?type="+type[i].type+"&title="+type[i].title;
				 			}
				 		}
						
				 	}
				})
				
				$.ajax({
				 	url : "http://localhost/php/getlist1.php",
				 	method : "GET",
				 	dataType: "json",
				 	success : (res)=> {
				 		if(res.res_code === 1){
				 			let list = res.res_list.data;
				 			let arrList=[];
				 			arrList=list.reduce((res,item)=>{
				 				if(item.new=="new")  res.push(item);
				 				return res;
				 			},[])
				 			var html = template("xqList", { list:arrList });
				 			$("#newList").html(html);
				 			
				 			var $aA=$("#newList").children().children();
				 			
				 			for(let i=0;i<$aA.length;i++){
				 				$aA[i].style.backgroundImage="url("+arrList[i].src+")";
				 				$aA[i].href="/html/detail.html?id="+arrList[i].id;
				 			}
				 			
				 			
				 			let hotArr=list.reduce((res,item)=>{
				 				if(item.hot=="hot")  res.push(item);
				 				return res;
				 			},[])
				 			
				 			$("#hotList").html(template("HotList", { list:hotArr }));
				 			var $aA=$("#hotList").children().children();
				 			
				 			for(let i=0;i<$aA.length;i++){
				 				$aA[i].style.backgroundImage="url("+hotArr[i].src+")";
				 				$aA[i].href="/html/detail.html?id="+hotArr[i].id;
				 			}
				 		}
						
				 	}
				})
				
			}
		}
		
		new Index();
	})
})
