const nodemailer = require("nodemailer");

exports.sendsuccessemail = async (req, res) => {
    try {
        const { Toemail } = req.body;

        if (!Toemail) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });

        // Email content
        const mailOptions = {
            from: `"Job Application Portal" <${process.env.EMAIL_USER}>`,
            to: Toemail,
            subject: "Application Submitted Successfully",
            html: `
                <p>Dear Candidate,</p>

                <p>Thank you for registering through our Job Application Portal.</p>

                <p>Your profile has been <strong>successfully submitted</strong>.</p>

                <p>Our recruitment team will review your application and contact you if your profile matches our requirements.</p>

                <br/>

                <p>Best Regards,</p>
                <p><strong>HR Team</strong><br/>
                Job Application Portal</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            status: 200,
            message: "Success email sent"
        });

    } catch (error) {
        console.error("Email sending error:", error);
        return res.status(500).json({
            status: 500,
            message: "Failed to send success email"
        });
    }
};
