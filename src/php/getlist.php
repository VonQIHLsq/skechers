<?php
	header("Access-Control-Allow-Origin:*");
	include("db.php");
	$type = $_GET["type"];
	
	$sumdata = "select * from shop where type = $type";
	$sumdata1 = mysql_query($sumdata);
	//	echo $sumdata;
   if(mysql_num_rows($sumdata1)>= 1){
       $arr =array();
            while($row = mysql_fetch_assoc($sumdata1)){
               array_push($arr,$row);
            }
   	        echo json_encode(array('res_code' => 1, 'res_list' => array('data' => $arr)));
  	}else{
       echo json_encode(array('res_code' => 0, 'res_message' => "暂无数据"));
  	}
?>