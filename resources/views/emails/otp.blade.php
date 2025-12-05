<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Password Reset OTP</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background:#f9fafb;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; padding:30px; box-shadow:0 2px 4px rgba(0,0,0,0.1);">

                    <tr>
                        <td align="center">
                            <img src="{{ asset('assets/logo.png') }}" alt="Insiders Index" style="width:120px; margin-bottom:20px;">
                        </td>
                    </tr>

                    <tr>
                        <td style="font-size:20px; font-weight:bold; text-align:center;">
                            Password Reset OTP
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 15px 0; text-align:center; font-size:15px; color:#555;">
                            Use the OTP below to reset your password:
                        </td>
                    </tr>

                    <tr>
                        <td align="center">
                            <div style="display:inline-block; font-size:32px; font-weight:bold; letter-spacing:5px; background:#f3f4f6; padding:15px 25px; border-radius:8px; color:#111;">
                                {{ $otp }}
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-top:20px; font-size:14px; text-align:center; color:#777;">
                            This OTP will expire in <strong>10 minutes</strong>.
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-top:30px; text-align:center; color:#aaa; font-size:12px;">
                            If you did not request this, please ignore this email.
                        </td>
                    </tr>

                </table>

                <p style="margin-top:20px; font-size:12px; color:#999;">
                    © {{ date('Y') }} Insiders Index. All rights reserved.
                </p>
            </td>
        </tr>
    </table>

</body>
</html>