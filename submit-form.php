<?php
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get form values
    $fname  = $_POST['first_name'];
    $lname  = $_POST['last_name'];
    $email  = $_POST['email'];
    $phone  = $_POST['phone'];
    $current_patient = $_POST['current_patient'] ?? '';

    $best_time = isset($_POST['best_time']) ? implode(", ", $_POST['best_time']) : '';
    $preferred_days = isset($_POST['preferred_days']) ? implode(", ", $_POST['preferred_days']) : '';
    $weekend = $_POST['weekend_appointment'] ?? '';
    $appt_time = isset($_POST['appointment_time']) ? implode(", ", $_POST['appointment_time']) : '';

    // Insert into DB
    $stmt = $conn->prepare("INSERT INTO contact_form 
    (first_name, last_name, email, phone, current_patient, best_time, preferred_days, weekend_appointment, appointment_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->bind_param("sssssssss", $fname, $lname, $email, $phone, $current_patient, $best_time, $preferred_days, $weekend, $appt_time);
    $stmt->execute();
    $stmt->close();

    // Email settings
    $admin_email = "admin@filesie.com, info@millionsmilesdental.com.au";
 // change this to admin email
    $subject_admin = "New Appointment Request";
    $subject_user = "Thank You for Contacting Us";

    // Admin Email
    $message_admin = "
    New Form Submission:

    Name: $fname $lname
    Email: $email
    Phone: $phone
    Current Patient: $current_patient
    Best Time to Call: $best_time
    Preferred Days: $preferred_days
    Weekend Appointment: $weekend
    Appointment Time: $appt_time
    ";

    // User Email
    $message_user = "
    Hi $fname,

    Thank you for contacting us. We received your appointment request.
    Our team will contact you soon.

    Regards,
    Million Smiles Dental, Altona Meadows.
    ";

    $headers = "From: Million Smiles Dental Altona Meadows <info@millionsmilesdental.com.au>\r\n";

    // Send Emails
    mail($admin_email, $subject_admin, $message_admin, $headers);
    mail($email, $subject_user, $message_user, $headers);

    // Redirect to Thank You Page
    header("Location: thankyou.html");
    exit();
}
?>
