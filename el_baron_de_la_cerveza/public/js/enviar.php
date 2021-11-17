<?php

if(isset($_POST['send'])){
	if (!empty($_POST['name']) && !empty($_POST['asunto']) && !empty($_POST['mail']) && !empty($_POST['msg'])) {
		$name = $_POST['name'];
		$asunto = $_POST['asunto'];
		$email = $_POST['mail'];
		$message = $_POST['msg'];
		
		$header = 'From:'. $email . "\r\n";
		$header.= "Reply-To:". $email . "\r\n";
		$header.= "X-Mailer: PHP/". phpversion();
		
		$para = "yonatanpalac@gmail.com";
		mail($para,$asunto,$message,$header);

		echo"<script> setTimeout(\"location.href='/about'\",2000)</script>";
	}
}
?>