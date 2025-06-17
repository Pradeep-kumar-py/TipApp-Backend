export const EmailHtml = (title, content, otp, deepLink) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #2c3e50;
      background: #f0f4f8;
      padding: 20px;
    }

    .email-wrapper {
      max-width: 650px;
      margin: auto;
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .header {
      background: linear-gradient(135deg, #4f46e5, #06b6d4);
      color: #fff;
      text-align: center;
      padding: 30px 20px;
    }


    .content {
      padding: 30px 20px;
    }

    .content h2 {
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
    }

    .content p {
      font-size: 16px;
      color: #4b5563;
      text-align: center;
      margin-bottom: 20px;
    }

    .otp-section {
      background: #f1f5f9;
      border: 2px dashed #cbd5e1;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
      margin: 20px 0;
    }

    .otp-label {
      text-transform: uppercase;
      font-size: 14px;
      color: #64748b;
      margin-bottom: 10px;
    }

    .otp-code {
      font-family: 'Courier New', monospace;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 6px;
      color: #4f46e5;
    }

    .otp-note {
      font-size: 12px;
      color: #6b7280;
      margin-top: 10px;
    }

    .security-note {
      background: #fff8db;
      border-left: 4px solid #f59e0b;
      padding: 15px 20px;
      border-radius: 6px;
      font-size: 14px;
      color: #92400e;
      margin: 20px 0;
    }

    .activation-section {
      background: #f8fafc;
      padding: 20px;
      text-align: center;
      border-radius: 8px;
      margin: 30px 0;
    }

    .activation-button {
      background: #4f46e5;
      color: #fff;
      padding: 14px 28px;
      text-decoration: none;
      font-size: 16px;
      border-radius: 6px;
      display: inline-block;
      font-weight: bold;
      transition: background 0.3s;
    }

    .activation-button:hover {
      background: #3b36c3;
    }

    .activation-note {
      font-size: 12px;
      color: #6b7280;
      margin-top: 15px;
      word-break: break-word;
    }

    .footer {
      text-align: center;
      padding: 25px 20px;
      background: #f1f5f9;
      border-top: 1px solid #e5e7eb;
    }

    .footer p {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 10px;
    }

    .social-links a {
      display: inline-block;
      margin: 0 5px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #e5e7eb;
      color: #6b7280;
      line-height: 36px;
      font-size: 16px;
      text-align: center;
      text-decoration: none;
      transition: all 0.3s;
    }

    .social-links a:hover {
      background: #4f46e5;
      color: #fff;
    }

    @media (max-width: 600px) {
      body {
        padding: 10px;
      }

      .email-wrapper {
        border-radius: 8px;
      }

      .content h2 {
        font-size: 20px;
      }

      .otp-code {
        font-size: 24px;
        letter-spacing: 4px;
      }

      .activation-button {
        padding: 12px 20px;
        font-size: 15px;
      }

      .logo {
        width: 50px;
        height: 50px;
        font-size: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header">
      <h1>Suggest</h1>
      <p>Your Learning Companion</p>
    </div>
    <div class="content">
      <h2>${title}</h2>
      <p>${content}</p>

      ${otp ? `
      <div class="otp-section">
        <div class="otp-label">Your Verification Code</div>
        <div class="otp-code">${otp}</div>
        <div class="otp-note">This code will expire in 10 minutes</div>
      </div>
      <div class="security-note">
        <p><strong>Security Notice:</strong> Never share this code with anyone. Suggest will never ask for your verification code over email or phone.</p>
      </div>` : ''}

      ${deepLink ? `
      <div class="activation-section">
        <p>To complete your registration, activate your account by clicking below:</p>
        <a href="${deepLink}" class="activation-button">Activate Your Account</a>
        <p class="activation-note">If the button doesn’t work, paste this into your browser:<br>${deepLink}</p>
      </div>` : ''}
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Suggest. All rights reserved.</p>
      <p>Making learning accessible and engaging for everyone.</p>
      <div class="social-links">
        <a href="#" title="Facebook">f</a>
        <a href="#" title="Twitter">t</a>
        <a href="#" title="LinkedIn">in</a>
        <a href="#" title="Instagram">ig</a>
      </div>
    </div>
  </div>
</body>
</html>
`;

}