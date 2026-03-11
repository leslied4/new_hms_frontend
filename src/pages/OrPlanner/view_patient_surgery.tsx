import PageShell from '../../components/PageShell';

const sourcePath = 'templates/OrPlanner/view_patient_surgery.php';
const rawHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- php: = $this->Html->css('../assets/plugins/bootstrap/css/bootstrap.min.css') -->
    <title>Patient Surgery Information</title>
    <style>
        body {
            font-family: Arial, sans-serif;

        }
        .container {
            width: 80%;
            margin: auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
        }
        .header h1 {
            margin: 0;
        }
        .info-box {
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #ccc;
            border-radius: 8px;
        }
        .info-box h2 {
            margin-top: 0;
            font-size: 1.2em;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;

        }
        .info-box p {
            margin: 5px 0;
        }
    </style>
</head>
<body class="m-1 mt-5 mt-md-5 m-md-5">
    <div class="container">
        <div class="d-flex justify-content-center mt-2">
            <!-- php: = $this->Html->image("../", ['class' => "login-img", 'style' => 'width: auto; height: 80px', 'fullBase' => true, "id" => "logo-img" ]) -->
        </div>
        <p class="m-0 text-center h-2 h-md-3" style="font-weight: bold;"><!-- php: = ($inst_name != null) ? $inst_name->institution : Cake\Core\Configure::read('FacilityName') --> - Patient Surgery Information</p>
        <p class="m-0 text-center"><!-- php: = ($inst_name != null) ? $inst_name->email1 : '' --></p>
        <p class="m-0 text-center"><!-- php: = ($inst_name != null) ? $inst_name->phone1 : '' --></p>
        <!-- <div class="header">
            <h3>Patient Surgery Information</h3>
        </div> -->
        <div class="row justify-content-around">
            <div class="info-box col-md-5 p-3 m-3">
                <h2>Patient Details</h2>
                <div class="" style="min-height: 150px">
                    <p><strong>Name:</strong> John Doe</p>
                    <p><strong>Age:</strong> 45</p>
                    <p><strong>Gender:</strong> Male</p>
                    <p><strong>Patient ID:</strong> 123456</p>
                </div>
            </div>
            <div class="info-box col-md-5 p-3 m-3">
                <h2>Surgery Details</h2>
                <div class="" style="min-height: 150px">
                    <p><strong>Surgery Type:</strong> Knee Replacement</p>
                    <p><strong>Date:</strong> July 15, 2024</p>
                    <p><strong>Time:</strong> 10:00 AM</p>
                    <p><strong>Surgeon:</strong> Dr. Jane Smith</p>
                </div>
            </div>
            <div class="info-box col-md-5 p-3 m-3">
                <h2>Pre-Surgery Instructions</h2>
                <div class="" style="min-height: 150px">
                    <p><strong>Fasting Required:</strong> Yes, from midnight before the surgery</p>
                    <p><strong>Medications to Avoid:</strong> Blood thinners, aspirin</p>
                    <p><strong>Arrival Time:</strong> 8:00 AM</p>
                </div>
                </div>
            <div class="info-box col-md-5 p-3 m-3">
                <h2>Contact Information</h2>
                <div class="" style="min-height: 150px">
                    <p><strong>Hospital:</strong> ABC Medical Center</p>
                    <p><strong>Address:</strong> 123 Main Street, City, State, ZIP</p>
                    <p><strong>Phone:</strong> (123) 456-7890</p>
                </div>
                </div>
        </div>
    </div>

    <script>

		function getFacilityLogo() {
			current_url = window.location.href
			split = current_url.split("/");
			uri_captured = split[3]
			split.splice(4, 1);

			split[split.length - 2] = \`assets/img/\${uri_captured}.png\`;

			split.pop()
			// split.shift()
			
			var full_uri = split.join("/");

			console.log(split, full_uri);
			
			document.getElementById('logo-img').src = full_uri
			
		}

        document.addEventListener('DOMContentLoaded', function() {
            getFacilityLogo();
        });
    </script>
</body>
</html>

`;

export default function OrPlannerViewPatientSurgeryPage() {
  return (
    <PageShell title="OrPlanner/view_patient_surgery.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
