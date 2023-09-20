<?php

header('Content-Type: application/json');
$output=[];
include 'db.php';
$conn=new mysqli('localhost',$username,$password,'apps');
$time=time();
$timeDelta=($time+28800)%86400;
$time=$time-$timeDelta+28800;

$sql="SELECT * FROM shootManager WHERE eventBegin>$time";
$result=$conn->query($sql);
if($result->num_rows>0){
    while($row=$result->fetch_assoc()){
        $output[]=$row;
    }
}
else{
}


print json_encode($output);
?>