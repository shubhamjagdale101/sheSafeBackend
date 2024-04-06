const generateMailBodyForOTP = (otp, expirationTime) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Email</title>
            <style>
                /* Reset CSS */
                body, html {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                }
                /* Container styling */
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                /* Header styling */
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                /* OTP styling */
                .otp {
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                    padding: 10px;
                    background-color: #fff;
                    border: 2px dashed #007bff;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                /* Button styling */
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                /* Footer styling */
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>OTP Verification</h1>
                    <p>Please use the following OTP to verify your email address:</p>
                </div>
                <div class="otp">${otp}</div> <!-- Replace {{otp}} with the actual OTP value -->
                <p>This OTP will be valid for ${expirationTime} minutes.</p> <!-- Include expiration time -->
                <p>If you didn't request this OTP, you can safely ignore this email.</p>
                <p>If you have any questions, feel free to contact us.</p>
                <div class="footer">
                    <p>This email was sent automatically. Please do not reply.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

const mailBodyGeneratorForLocationUpdate = (latitude, longitude, personName, dearPerson) => {
    const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Location Update</title>
            <style>
                /* Container styling */
                .container {
                    max-width: 400px;
                    margin: 20px auto;
                    padding: 20px;
                    border-radius: 10px;
                    background-color: #fff;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Shadow effect */
                }

                /* Header styling */
                h1 {
                    text-align: center;
                    color: #333;
                    margin-bottom: 20px;
                }

                /* Paragraph styling */
                p {
                    font-size: 16px;
                    color: #666;
                    line-height: 1.5;
                }

                /* Link styling */
                a {
                    color: #007bff;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Emergency Alert</h1>
                <p>Dear ${dearPerson},</p>
                <p>This is to inform you that ${personName} is in distress and requires your immediate attention.</p>
                <p>Their current location has been tracked. Please find the location on the map:</p>
                <a href="${googleMapsLink}">View Location on Google Maps</a>
                <p>Please take necessary actions and contact the authorities if required.</p>
                <p>Thank you.</p>
            </div>
        </body>
        </html>
    `;
};

module.exports = {generateMailBodyForOTP, mailBodyGeneratorForLocationUpdate}