<?php

$hostname = 'localhost';
$username = 'root';
$password = '';
$dbname = 'myfirstdatabase';

// Make the connection to mysql
$dbc = mysqli_connect($hostname, $username, $password, $dbname) OR die('Could not connect to database. ERROR: '.mysqli_connect_error());

// set encoding
mysqli_set_charset($dbc,'utf8'); // I don't know what this does

// If connected succesfully
echo 'You are connected to the the following database: '.$dbname.'<br>';

?>