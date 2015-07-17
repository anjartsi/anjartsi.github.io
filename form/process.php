<?php 


// Security Check. Make sure the form was submitted
if($_SERVER['REQUEST_METHOD'] == 'POST'){

	// Store the values from the form into variables
	// Using their name attribute 
	$fname = $_POST['first_name'];
	$lname = $_POST['last_name'];
	$user_password = $_POST['password'];
	$email = $_POST['email'];
	$gender = $_POST['gender'];
	$age = $_POST['age_group'];
	$comments = $_POST['comments'];

	// Make sure all the (required) fields are not empty
	if(!empty($fname) && !empty($lname) && !empty($user_password) && !empty($email) && !empty($gender) && !empty($age) ) {
		include('connect.php');

		mysqli_query($dbc, "INSERT INTO users(first_name,last_name,email,gender,age,comments,password) VALUES('$fname','$lname','$email','$gender','$age','$comments','$user_password')");
		$registered = mysqli_affected_rows($dbc);
		echo $registered.' row is affected';
	}
	else{ echo 'Please fill out the form COMPLETELY';}

}
else{ echo 'No form has been submitted';}
 ?>

