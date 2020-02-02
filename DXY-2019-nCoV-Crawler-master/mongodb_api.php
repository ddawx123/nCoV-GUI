<?php
header('Content-Type: text/plain; charset=UTF-8');
$manager = new MongoDB\Driver\Manager("mongodb://localhost");
$filter = [];
$options = [];
$query = new MongoDB\Driver\Query($filter, $options);
$data = $manager->executeQuery('2019-nCoV.DXYArea', $query);
$fullData = array();
foreach ($data as $k => $result){
	$fullData[$k] = (array)$result;
}
echo json_encode($fullData, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);