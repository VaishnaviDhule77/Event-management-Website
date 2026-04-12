<?php
session_start();
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // ============================
    // RATE LIMIT (10 sec)
    // ============================
    if (isset($_SESSION['last_submit'])) {
        if (time() - $_SESSION['last_submit'] < 10) {
            echo json_encode([
                "status" => "error",
                "message" => "Please wait before submitting again"
            ]);
            exit;
        }
    }
    $_SESSION['last_submit'] = time();


    // ============================
    // HONEYPOT CHECK
    // ============================
    if (!empty($_POST['website'])) {
        echo json_encode([
            "status" => "error",
            "message" => "Spam detected"
        ]);
        exit;
    }


    // ============================
    // RECAPTCHA FIX (NO WARNING)
    // ============================
    $response = $_POST['g-recaptcha-response'] ?? '';

    if (empty($response)) {
        echo json_encode([
            "status" => "error",
            "message" => "Please complete captcha"
        ]);
        exit;
    }

    // VERIFY CAPTCHA
    $secret = "6LcLJoYsAAAAAD58r6C12HmCVl_RJs5RfYV2UZ7X"; // 🔴 replace

    $verify = file_get_contents(
        "https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$response}&remoteip=" . $_SERVER['REMOTE_ADDR']
    );

    $captcha = json_decode($verify, true);

    if (empty($captcha['success'])) {
        echo json_encode([
            "status" => "error",
            "message" => "Captcha verification failed"
        ]);
        exit;
    }


    // ============================
    // SANITIZE INPUT
    // ============================
    function clean($data) {
        return htmlspecialchars(trim($data));
    }

    $name    = clean($_POST['name'] ?? '');
    $email   = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $phone   = clean($_POST['phone'] ?? '');
    $service = clean($_POST['service'] ?? '');
    $street  = clean($_POST['street'] ?? '');
    $city    = clean($_POST['city'] ?? '');
    $state   = clean($_POST['state'] ?? '');
    $country = clean($_POST['country'] ?? '');
    $zipcode = clean($_POST['zipcode'] ?? '');

    $date = date("Y-m-d H:i:s");


    // ============================
    // VALIDATION
    // ============================
    if (empty($name) || empty($email) || empty($street) || empty($zipcode)) {
        echo json_encode([
            "status" => "error",
            "message" => "Required fields missing"
        ]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            "status" => "error",
            "message" => "Invalid email"
        ]);
        exit;
    }


    // ============================
    // SEND EMAIL
    // ============================
    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();
        $mail->Host = 'cp1.dnspark.in';
        $mail->SMTPAuth = true;
        $mail->Username = 'support@eraservices.in';

        // 🔐 IMPORTANT: MOVE PASSWORD TO ENV
        $mail->Password = '7CZe66hudz7Ul),Q';

        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        $mail->setFrom('support@eraservices.in', 'ERA Services');
        $mail->addAddress('eraservicespune@gmail.com');

        $mail->isHTML(true);
        $mail->Subject = "New Service Inquiry";

        $mail->Body = "
        <h3>New Contact Inquiry</h3>

        <p><b>Name:</b> $name</p>
        <p><b>Email:</b> $email</p>
        <p><b>Phone:</b> $phone</p>
        <p><b>Service:</b> $service</p>

        <p><b>Address:</b><br>
        $street <br>
        $city , $state - $zipcode <br>
        $country
        </p>

        <p><b>Date:</b> $date</p>
        ";

        $mail->send();


        // ============================
        // AUTO REPLY
        // ============================
        $mail->clearAddresses();
        $mail->addAddress($email, $name);

        $mail->Subject = "Thank You for Contacting ERA Services";

        $mail->Body = "
        Dear <b>$name</b>,<br><br>

        Thank you for contacting <b>ERA Services</b>.<br>
        We received your request regarding <b>$service</b>.<br>

        Our team will contact you shortly.<br><br>

        Regards,<br>
        ERA Services Team<br>
        📞 +91 90452 97992
        ";

        $mail->send();


        echo json_encode([
            "status" => "success",
            "message" => "Message sent successfully"
        ]);

    } catch (Exception $e) {

        echo json_encode([
            "status" => "error",
            "message" => $mail->ErrorInfo
        ]);
    }
}
?>