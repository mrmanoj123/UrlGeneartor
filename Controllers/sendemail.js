const nodemailer = require("nodemailer");
require("dotenv").config();

// Create transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

// Function to send OTP email
exports.sendOtpEmail = async function (
    req, res
) {
    const { toEmail, otp } = req.body
    try {
        const mailOptions = {
            from: `"Job Application Portal" <${process.env.GMAIL_USER}>`,
            to: toEmail,
            subject: "From your job application portal – Please verify",
            text: `Dear Candidate,

Thank you for applying through our Job Application Portal.

Your One-Time Password (OTP) for verification is: ${otp}

This OTP is valid for 10 minutes.
Please do not share this OTP with anyone.

If you did not initiate this request, please ignore this email.

Regards,
Job Application Portal Team
`,
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Job Application Portal</h2>
          <p>Dear Candidate,</p>

          <p>
            Thank you for applying through our <strong>Job Application Portal</strong>.
          </p>

          <p>
            Please use the following <strong>One-Time Password (OTP)</strong> to verify your email address:
          </p>

          <h1 style="letter-spacing: 3px;">${otp}</h1>

          <p>
            This OTP is valid for <strong>10 minutes</strong>.
            <br />
            <strong>Do not share this OTP with anyone.</strong>
          </p>

          <p>
            If you did not initiate this request, you can safely ignore this email.
          </p>

          <p>
            Regards,<br />
            <strong>Job Application Portal Team</strong>
          </p>
        </div>
      `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("OTP email sent successfully:", info.messageId);

        return res.status(200).json({
            status: 200,
            message: "Mail Sent Successfully"
        })

    } catch (error) {
        console.error("Error sending OTP email:", error);
        return false;
    }
}

// Example usage

