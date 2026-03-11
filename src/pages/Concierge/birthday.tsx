import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Concierge/birthday.php';
const rawHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Happy Birthday Card</title>
  <style>
    /* General reset */
    body, table, td, a {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-rspace: 0pt;
      mso-table-lspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    table {
      border-collapse: collapse !important;
    }
    body {
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
    }
    /* iOS Blue Links */
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }
    /* Media Queries */
    @media screen and (max-width: 600px) {
      h1 {
        font-size: 32px !important;
        line-height: 32px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Open Sans', sans-serif;">

  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" bgcolor="#f4f4f4">

        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 10px;">
          <tr>
            <td align="center" style="padding: 20px;">
              <img src="https://cdn.pixabay.com/photo/2020/10/06/21/54/cake-5633461__480.png" alt="birthday" width="300" style="display: block; border-radius: 10px;">
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px 20px 0px;">
              <h1 style="font-size: 36px; font-weight: bold; color: #7600bc; margin: 0;">
                Happy Birthday <!-- php: = $data['first_name'] -->
              </h1>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 30px 20px 60px; font-size: 18px; line-height: 24px; color: #555555;">
              <p style="margin: 0;">We would like to wish you a happy birthday from all of us at <!-- php: = $data['facility'] -->!</p>
            </td>
          </tr>
		  <tr>
            <td align="center" style="padding: 0 0 5px; color: #666666;">
				<table border="0" cellpadding="0" cellspacing="0" width="60%">
					<tr>
						<td align="left">
							<img src="https://app.firstline24.com/assets/img/akuaba.png" alt="logo" width="60" style="display: block; border-radius: 10px;">
						</td>
						<td align="left" style="padding: 0 10px 5px; color: #666666;">
							<div style="margin-bottom: 4px; text-wrap: wrap;">
								<!-- php: = $data['facility'] -->
							</div>
							<div style="margin-bottom: 4px">
								<!-- php: = $data['email'] != '' ? '<a href="mailto:'.$data['email'].'">'.$data['email'].'</a>' : '' -->
								<!-- php: = $data['email2'] != '' ? '<a href="mailto:'.$data['email2'].'">'.$data['email2'].'</a>' : '' -->
							</div>
							<div style="margin-bottom: 4px">
								<!-- php: = $data['phone'] != '' ? '<a href="tel:'.$data['phone'].'">'.$data['phone'].'</a>' : '' -->
								<!-- php: = $data['phone2'] != '' ? '<a href="tel:'.$data['phone2'].'">'.$data['phone2'].'</a>' : '' -->
							</div>
							<div style="margin-bottom: 4px"><!-- php: = $data['address'] --> </div>
							
						</td>
					</tr>
				</table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
  

  <div style="display: flex; align-items: center; justify-content:center">
    <a style="
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            color: white;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            text-transform: uppercase;
            transition: background-color 0.3s ease, transform 0.2s ease;
            text-decoration: none;
        "
        href="<!-- php: = $this->Url->build(['controller' => 'Concierge', 'action' => 'birthdayMessage', $patient->id]) -->"
        onmouseover="this.style.backgroundColor='#0056b3'; this.style.transform='scale(1.05)';"
        onmouseout="this.style.backgroundColor='#007bff'; this.style.transform='scale(1)';"
        onmousedown="this.style.backgroundColor='#004080';"
        onmouseup="this.style.backgroundColor='#0056b3';"
    >
        Send Email
    </a>
  </div>

</body>
</html>

`;

export default function ConciergeBirthdayPage() {
  return (
    <PageShell title="Concierge/birthday.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
