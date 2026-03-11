import PageShell from '../../components/PageShell';

const sourcePath = 'templates/CreditClaims/export_data_to_pdf.php';
const rawHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hospital Insurance Claims Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.4;
            margin: 0;
            padding: 10px;
            color: #333;
            font-size: 10pt;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #ddd;
        }
        .logo {
            max-width: 120px;
            margin-bottom: 5px;
        }
        h1 {
            color: #2a5885;
            margin: 0;
            font-size: 16pt;
        }
        .form-section {
            margin-bottom: 15px;
        }
        .form-group {
            margin-bottom: 8px;
        }
        label {
            display: block;
            font-weight: bold;
            margin-bottom: 3px;
            font-size: 9pt;
        }
        input, select, textarea {
            width: 100%;
            padding: 6px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 9pt;
        }
        .row {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -5px;
        }
        .col {
            flex: 1;
            padding: 0 5px;
            min-width: 150px;
        }
        .submit-btn {
            background-color: #2a5885;
            color: white;
            border: none;
            padding: 8px 15px;
            font-size: 11pt;
            cursor: pointer;
            border-radius: 4px;
        }
        .submit-btn:hover {
            background-color: #1e3f5a;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
            font-size: 8pt;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 3px;
            text-align: left;
            vertical-align: top;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
            white-space: nowrap;
            font-size: 7.5pt;
        }
        .total-row {
            font-weight: bold;
            background-color: #f5f5f5;
        }
        .action-col {
            width: 80px;
            text-align: center;
        }
        .action-buttons {
            margin-top: 20px;
            text-align: right;
        }
        @media print {
            @page {
                size: A4 landscape;
                margin: 0.5cm;
            }
            body {
                background: none;
                font-size: 8pt;
            }

			input {
				border: none
			}
			textarea {
				border: none
			}
            
            .container {
                box-shadow: none;
                margin: 0;
                max-width: 100%;
            }
            
            .action-buttons {
                display: none;
            }
            
            table {
                page-break-inside: auto;
            }
            
            tr {
                page-break-inside: avoid;
                page-break-after: auto;
            }
            
            .header {
                margin-bottom: 10px;
                padding-bottom: 5px;
            }
            
            h1 {
                font-size: 14pt;
            }
            
            h2 {
                font-size: 11pt;
                margin-top: 8px;
                margin-bottom: 4px;
            }
            
            th, td {
                padding: 2px;
            }
            
            .text-cell {
                max-width: 80px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            
            .number-cell {
                text-align: right;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <!-- php: = $this->Html->image("../", ['class' => "login-img", 'style' => 'width: 120px; height: auto', "id" => "logo-img" ]) -->
            <h1>Insurance Claims Submission Form</h1>
            <p>Claims for <span id="current-month"><!-- php: = date('F Y') --></span></p>
        </div>

        <div class="form-section">
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="hospital-name">Hospital Name:</label>
                        <!-- php: = h($facility->institution) -->
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="hospital-code">Hospital Code:</label>
                        <input type="text" id="hospital-code" name="hospital_code" required>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="submission-date">Submission Date:</label>
                        <input type="date" id="submission-date" name="submission_date" value="<!-- php: = date('Y-m-d') -->" required>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="contact-person">Contact:</label>
                        <input type="text" id="contact-person" name="contact_person" value="<!-- php: = $facility->phone1 -->" required>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="contact-phone">Contact:</label>
                        <input type="tel" id="contact-phone" name="contact_phone" value="<!-- php: = $facility->phone2 -->" required>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="contact-email">Contact Email:</label>
                        <input type="email" id="contact-email" name="contact_email" value="<!-- php: = $facility->email1 -->" required>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-section">
            <h2>Patient Claims</h2>
            
            <table id="claims-table">
                <thead>
                    <tr>
                        <!-- <th>S/N</th> -->
                        <th>Surname</th>
                        <th>Other Name</th>
                        <th>Attend Date</th>
                        <th>Disch Date</th>
                        <th>Age</th>
                        <th>Sex</th>
                        <th>Folder</th>
                        <th>Insurance ID</th>
                        <th class="text-cell">Diagnoses</th>
                        <th>ICD10</th>
                        <th>G-DRG</th>
                        <th class="text-cell">Procedure</th>
                        <th>Specialty</th>
                        <th class="number-cell">Consult(GH¢)</th>
                        <th class="number-cell">Invest(GH¢)</th>
                        <th class="number-cell">Med(GH¢)</th>
                        <th class="number-cell">Proc(GH¢)</th>
                        <th class="number-cell">Total(GH¢)</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- php: foreach ($results as $index => $result): -->
                    <tr>
                        <!-- <td><!-- php: // h($result['S/N']) --></td> -->
                        <td><!-- php: = h($result['Surname']) --></td>
                        <td><!-- php: = h($result['Other Name']) --></td>
                        <td><!-- php: = h($result['Attendance Date']) --></td>
                        <td><!-- php: = h($result['Disch Date']) --></td>
                        <td><!-- php: = h($result['Age']) --></td>
                        <td><!-- php: = h($result['Sex']) --></td>
                        <td><!-- php: = h($result['Folder No']) --></td>
                        <td><!-- php: = h($result['NHIS ID no']) --></td>
                        <td class="text-cell" title="<!-- php: = h($result['Diagnoses']) -->">
                            <!-- php: = h(($result['Diagnoses'])) -->
                        </td>
                        <td class="text-cell" title="<!-- php: = h($result['ICD10']) -->">
                            <!-- php: = h(($result['ICD10'])) -->
                        </td>
                        <td class="text-cell" title="<!-- php: = h($result['G-DRG']) -->">
                            <!-- php: = h(($result['G-DRG'])) -->
                        </td>
                        <td class="text-cell" title="<!-- php: = h($result['Procedure']) -->">
                            <!-- php: = h(($result['Procedure'])) -->
                        </td>
                        <td class="text-cell" title="<!-- php: = h($result['specialty']) -->">
                            <!-- php: = h(($result['specialty'])) -->
                        </td>
                        <td class="number-cell"><!-- php: = h($result['Consultations Price (GH¢)']) --></td>
                        <td class="number-cell"><!-- php: = h($result['Investigations Price (GH¢)']) --></td>
                        <td class="number-cell"><!-- php: = h($result['Medicines (GH¢)']) --></td>
                        <td class="number-cell"><!-- php: = h($result['Procedures Price (GH¢)']) --></td>
                        <td class="number-cell"><!-- php: = h($result['Total (GH¢)']) --></td>
                    </tr>
                    <!-- php: endforeach; -->
                </tbody>
                <tfoot>
                    <tr class="total-row">
                        <td colspan="13" align="right">Grand Total:</td>
                        <td class="number-cell"><!-- php: = $this->Number->precision(array_sum(array_column($results, 'Consultations Price (GH¢)')), 2) --></td>
                        <td class="number-cell"><!-- php: = $this->Number->precision(array_sum(array_column($results, 'Investigations Price (GH¢)')), 2) --></td>
                        <td class="number-cell"><!-- php: = $this->Number->precision(array_sum(array_column($results, 'Medicines (GH¢)')), 2) --></td>
                        <td class="number-cell"><!-- php: = $this->Number->precision(array_sum(array_column($results, 'Procedures Price (GH¢)')), 2) --></td>
                        <td class="number-cell"><!-- php: = $this->Number->precision(array_sum(array_column($results, 'Total (GH¢)')), 2) --></td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="form-section">
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="prepared-by">Prepared By:</label>
                        <input type="text" id="prepared-by" name="prepared_by" value="<!-- php: = $this->request->getSession()->read()['Auth']['User']['first_name'] --> <!-- php: = $this->request->getSession()->read()['Auth']['User']['last_name'] -->" required>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="signature">Signature:</label>
                        <input type="text" id="signature" name="signature" required>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="notes">Additional Notes:</label>
                <textarea id="notes" name="notes" rows="2"></textarea>
            </div>
            
            <div class="action-buttons">
                <a href="#" class="submit-btn" onclick="window.print()">Print Invoice</a>
                <!-- <a href="#" class="btn">Download PDF</a> -->
            </div>
        </div>
    </div>
</body>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        getLogo();
    });

    function getLogo() {
        current_url = window.location.href
        split = current_url.split("/");
        uri_captured = split[3]
        split.splice(3);

        split.push(\`assets/img/\${uri_captured}.png\`);

        
        var full_uri = split.join("/");
        

        let logoImg = document.getElementById("logo-img");
        if (logoImg) {
            logoImg.src = full_uri;
        }
    }
</script>
</html>
`;

export default function CreditClaimsExportDataToPdfPage() {
  return (
    <PageShell title="CreditClaims/export_data_to_pdf.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
