<?php
error_reporting(E_ALL ^E_NOTICE ^E_WARNING);
date_default_timezone_set('Asia/Kolkata');

function post($key, $default = '') {
    return isset($_POST[$key]) ? trim($_POST[$key]) : $default;
}

$fullname = post('fullname');
$phone    = post('phone');
$email    = post('email');
$city     = post('city');
$message  = post('message');

if ($fullname === '') { exit('Invalid name.'); }
if (!preg_match('/^[0-9]{10}$/', $phone)) { exit('Invalid phone.'); }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { exit('Invalid email.'); }

$remark = "City: {$city} | Message: {$message}";

$params = [
    'UID'      => 'fourqt',
    'PWD'      => 'wn9mxO76f34=',
    'Channel'  => 'MSFS',
    'Src'      => 'FilesieWeb',
    'Mob'      => $phone,
    'Email'    => $email,
    'name'     => $fullname,
    'City'     => $city,
    'Location' => '',
    'Project'  => 'Abbham',
    'Remark'   => $remark,
    'url'      => isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '',
    'UniqueId' => '0',
];

$apiUrl = 'https://shangrilainfra05.remserp.com/WebCreate.aspx?' . http_build_query($params);

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => $apiUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_TIMEOUT => 20,
]);
$response = curl_exec($curl);
$curlErr  = curl_error($curl);
curl_close($curl);

$to = 'admin@filesie.com';
$subject = 'Enquiry Form | Shangrila Infra';
$body = "New enquiry received:\n\n"
      . "Name: {$fullname}\n"
      . "Phone: {$phone}\n"
      . "Email: {$email}\n"
      . "City: {$city}\n"
      . "Message: {$message}\n\n"
      . "Submitted At: " . date('Y-m-d H:i:s') . " IST\n\n"
      . "CRM URL:\n{$apiUrl}\n\n"
      . "CRM Response:\n" . ($curlErr ? "Error: $curlErr" : $response);

$headers = "From: no-reply@filesie.com\r\n"
         . "Reply-To: {$email}\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n";

@mail($to, $subject, $body, $headers);

header("Location: https://shangrilainfra.com/thankyou/");
exit;
?>
