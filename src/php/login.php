<?php
	header("Access-Control-Allow-Origin:*");
	
	include("db.php");
	
	$username = $_POST["username"];
	$password = $_POST["password"];
	
	$sql = "select * from users where username='$username' and password='$password'";
	//echo $sql;
	$res = mysql_query($sql);
	
	$count = mysql_num_rows($res); // 得到资源的行数
	
	if($count > 0){
		$arr = array("res_code" => 1, "res_message" => "登录成功");
		echo json_encode($arr);
	}else{
		$arr = array("res_code" => 0, "res_message" => "登录失败");
		echo json_encode($arr);
	}
	
	
	
?>