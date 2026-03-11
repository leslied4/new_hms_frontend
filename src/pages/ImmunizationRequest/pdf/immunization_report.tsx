import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/ImmunizationRequest/pdf/immunization_report.php';
const rawHtml = `
<style>
    .pv-header {
        color: #000;
    }

    .pv-sub {
        color: #000;
    }

    .pv-sub h4 {
        padding-bottom: 0px;
        margin-bottom: 0px;
        color: #000;

    }

    .pv-header h4 {
        padding-bottom: 0px;
        margin-bottom: 0px;
        color: #e7505a;
        font-weight: bold !important;
    }

    .pv-sub hr {
        background-color: #e7505a !important;
        margin-top: 0px !important;
        height: 0.5px;
        border-top: solid 0.5px #e7505a;
         !important;
    }

    .pv-header hr {
        background-color: #e7505a !important;
        margin-top: 0px !important;
        height: 2px;
        border-top: solid 1px #e7505a;
         !important;
    }

    .pdf table.table-bordered {
        border: 1px solid black !important;
        margin-top: 20px;
    }

    .pdf table.table-bordered>thead>tr>th {
        border: 1px solid black !important;
    }

    .pdf table.table-bordered>tbody>tr>td {
        border: 1px solid black !important;
    }

    body {
        -webkit-print-color-adjust: exact !important;
    }

    .list-bordered .list-group-item,
    .list-bordered .list-group {
        border: 1px solid #000 !important;
    }

    .pdf th {
        border: 1px solid #000 !important;
    }

    .unbold {
        font-weight: normal !important;
    }

    .details-table td,
    .details-table th {
        border: none;
    }

    .bold-header {
        background-color: #e7505a !important;
    }

</style>
<div>
    <!-- new header -->
    <table class="table details-table">
        <tr>
            <td>
                <div>
                    <!-- php: = $this->Html->image("../assets/img/hos_logo.png", ['class' => "login-img", 'style' => 'width: auto; height: 80px;', 'fullBase' => true]) --><br />
                    <small>
                        <!-- php: = $inst_name->address -->
                    </small><br />
                    <small>
                        Phones: <!-- php: = $inst_name->phone1 --> , <!-- php: = $inst_name->phone2 --> <br> Email:
                        <!-- php: = $inst_name->email1 --> <br> Alternate Email: <!-- php: = $inst_name->email2 -->
                    </small>
                </div>
            </td>
            <td>
                <!-- php: echo $pic = $immunizationRequest->patient->has('image') && $immunizationRequest->patient->image->file_path != null ? $immunizationRequest->patient->image->file_path : (($immunizationRequest->patient->gender_id ==2) ? 'dp2.jpg' : 'dp3-.jpg')... -->
            </td>
        </tr>
    </table>
    <!-- end new header -->
    <div class="row d-none">
        <div class="col-md-12">
            <center>
                <!-- php: = $this->Html->image("../assets/img/hos_logo.png", ['class' => "login-img", 'style' => 'width: auto; height: 80px', 'fullBase' => true]) -->
            </center>
        </div>
    </div>
    <div class="row d-none">
        <div class="col-md-12">
            <div class="pull-left" style="float: left">
                <address>
                    <p class="text-muted m-l-5">
                        <!-- php: = $this->Text->autoParagraph($inst_name->address) -->
                    </p>
                </address>
            </div>
            <div class="pull-right text-right">
                <address>
                    <p class="text-muted m-l-30">
                        Phones: <!-- php: = $inst_name->phone1 --> , <!-- php: = $inst_name->phone2 --> <br> Email:
                        <!-- php: = $inst_name->email1 --> <br> Alternate Email: <!-- php: = $inst_name->email2 -->
                    </p>
                </address>
            </div>
        </div>
    </div>
    <div style="clear: both"></div>
    <hr style="height: 5px; margin-top: 20px; margin-bottom: 2px">
    <div class="row">
        <div class="col-md-12">
            <div class="d-none" style="float: left; width 140px; padding: 5px 10px 10px 0; margin-right: 10px">
                <!-- php: $pic = $immunizationRequest->patient->has('image') && $immunizationRequest->patient->image->file_path != null ? $immunizationRequest->patient->image->file_path : (($immunizationRequest->patient->gender_id ==2) ? 'dp2.jpg' : 'dp3-.jpg'); ech... -->
            </div>
            <div class="bold-header" class="container my-3">
                <h4 class="my-0 pb-0">Summary</h4>
            </div>
            <table class="details-table table">
                <tr>
                    <td>
                        <h5 class="bold">Name:&nbsp;
                            <span class="unbold"><!-- php: = $immunizationRequest->patient->first_name.' '. $immunizationRequest->patient->last_name --></span></h5>
                    </td>
                    <td>
                        <h5 class="bold">Age:&nbsp;
                            <span
                                class="unbold"><!-- php: = isset($immunizationRequest->patient->date_of_birth) ? $immunizationRequest->patient->age . ' Years' : 'N/A' --></span>
                        </h5>
                    </td>
                    <td>
                        <h5 class="bold">Folder Number:&nbsp;
                            <span class="unbold"><!-- php: = $immunizationRequest->patient->folder_number --></span></h5>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h5 class="bold">Address:&nbsp;
                            <span class="unbold"><!-- php: = $immunizationRequest->patient->home_address --></span></h5>
                    </td>
                    <td>
                        <h5 class="bold">Gender:&nbsp;
                            <span class="unbold"><!-- php: = $immunizationRequest->patient->gender->name --></span></h5>
                    </td>
                    <td>
                        <h5 class="bold">Date:&nbsp;
                            <span class="unbold"><!-- php: = $immunizationRequest->dor->nice() --></span></h5>
                    </td>

                </tr>
                <tr>
                    <td>
                        <h5 class="bold">Type of Visit:&nbsp;
                            <span
                                class="unbold">Maternal</span>
                        </h5>
                    </td>
                    <td>
                        <h5 class="bold">Contact Number:&nbsp;
                            <span class="unbold"><!-- php: = $immunizationRequest->patient->phone --></span></h5>
                    </td>
                    <td>
                        <h5 class="bold">Vaccinator:&nbsp;
                            <span class="unbold"><!-- php: = $immunizationRequest->user->first_name --></span></h5>
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <div class="bold-header" class="container my-3">
        <h4 class="my-0 pb-0">Details</h4>
    </div>
    <div class="row">
        <div class="col-md-12 pdf">
            <table class="table-bordered table">
                <tbody>
                <tr>
                    <th>Date</th>
                    <th>Vaccine</th>
                    <th>Route</th>
                    <th>Doses(Taken/Count)</th>
                    <th>Adverse Reactions</th>
                </tr>
                <tr class="odd gradeX">
                    <td class="center" style="vertical-align: top"><!-- php: = $immunizationRequest->dor->nice() --></td>
                    <td class="left" style="vertical-align: top"><!-- php: = $immunizationRequest->drug_stock->drug->full_name --></td>
                    <td class="left" style="vertical-align: top"><!-- php: = $immunizationRequest->dosage_form->name --></td>
                    <td class="left" style="vertical-align: top"><!-- php: = $immunizationRequest->doses_taken -->/<!-- php: = $immunizationRequest->dosage_count --></td>
                    <td class="left" style="vertical-align: top">
                        <!-- php: if($immunizationRequest->immunization_aefis){ -->
                            <!-- php: $ij = 0 -->
                            <!-- php: foreach($immunizationRequest->immunization_aefis as $aefi): -->
                                <!-- php: $ij++; -->
                                <!-- php: = $ij -->.<!-- php: = $aefi->aefi_category->category_name --></span><br>
                            <!-- php: endforeach; -->
                        <!-- php: } -->          
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

`;

export default function ImmunizationRequestPdfImmunizationReportPage() {
  return (
    <PageShell title="ImmunizationRequest/pdf/immunization_report.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
