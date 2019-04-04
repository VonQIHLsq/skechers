<?php
	header("Access-Control-Allow-Origin: *");
	
	include("db.php");
	
	$sql = "select * from type limit 0,4";
	$res = mysql_query($sql);
   	if(mysql_num_rows($res)>= 1){
       $arr =array();
        while($row = mysql_fetch_assoc($res)){
            array_push($arr,$row);
        }
   	    echo json_encode(array('res_code' => 1, 'res_type' => array('data' => $arr)));
  	}else{
       echo json_encode(array('res_code' => 0, 'res_message' => "暂无数据"));
  	}

?>