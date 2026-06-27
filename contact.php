<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "spiritual_site";

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    header('Location: contact.html?status=error&message=' . urlencode('Please complete all fields.'));
    exit;
}

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    header('Location: contact.html?status=error&message=' . urlencode('Database connection failed.'));
    exit;
}

$stmt = $conn->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $subject, $message);

if ($stmt->execute()) {
    $to = 'contact@supracharvibhag.org';
    $mailSubject = 'New Contact Form: ' . $subject;
    $mailBody = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email\r\nReply-To: $email\r\n";
    mail($to, $mailSubject, $mailBody, $headers);

    header('Location: contact.html?status=success&message=' . urlencode('Thank you! Your message has been received.'));
} else {
    header('Location: contact.html?status=error&message=' . urlencode('Could not save your message. Please try again.'));
}

$stmt->close();
$conn->close();
?>
