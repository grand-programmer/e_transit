<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$response=array(
  ['label'=>"Sardor Co.Ltd", 'value'=>"1"],
  ['label'=>"Union Co.Ltd", 'value'=>"2"],
  ['label'=>"Frsh Co.Ltd", 'value'=>"3"],
  ['label'=>"Comp Co.Ltd", 'value'=>"4"],
);
echo json_encode($response);
exit;
