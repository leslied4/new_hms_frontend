import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Pdf/claim.php';
const rawHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="./bootstrap-utilities.css"> -->
    <title>Document</title>
    <!-- php: = $this->Html->css('bootstrap-utilities', ['fullBase' => true]) -->
    <style>
        body{
            font-family: Arial, Helvetica, sans-serif;
        }
        .divider{
            border-top:3px solid black;
        }
        .border-black{
            border: 3px solid black;
        }
        .border-red{
            border: 3px solid #ff0040;
        }
        .border-l-black{
            border-left: 3px solid black;
        }
        .content-section{
            border: 3px solid black;
            position: relative;
        }
        .w-half{
            width: 45%;
        }
        .content-section .cs-label{
            position: absolute;
            top: -15px;
            left: 10px;
            margin: 0;
            height: 20px;
            z-index: 1;
            padding: 0px 6px;
            background: green;
            white-space: nowrap;
        }
        .content-section .cs-label::after{
            content: "";
            height: 3px;
            position: absolute;
            top: 12px;
            background: white !important;
            width: 100%;
            left: 0;
            z-index: -1;
        }
        .x-checkbox{
            width: 50px; height: 30px;
            min-width: 40px; min-height: 23px;
            border: 3px solid black;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
        .space-box{
            /* width: 200px;  */
            /* height: 23px; */
            height: 40px;
        }
        /* .border-table td, .border-table th{ */
        .border-table{
            border-style: solid;
            border-collapse: collapse;
            border: 3px solid black;
        }
        .border-table td, .border-table th{
            border-top: 3px solid black;
            border-right: 3px solid black;
            padding: 6px;
        }
        .d-flex{
            display: -webkit-box;
            display: -webkit-flex;
            -webkit-flex-wrap: wrap;
            position: static;
            display: flex;
            /* overflow:hidden; */
        }
        .flex-wrap > div {
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
        }
        .flex-wrap{
            flex-wrap: wrap;
            overflow: hidden;
        }
        h1, h2, h3, h4{
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="d-flex flex-column p-4">
        <h2 class="m-0 text-center">NATIONAL HEALTH INSURANCE SCHEME</h2>
        <h3 class="m-0 text-center">CITY HOSPITAL</h3>
        <div class="d-flex flex-row flex-nowrap align-items-end justify-content-between mt-4">
            <div class="mr-3">
                <h4 class="mb-0 mt-0"><i style="text-decoration: underline">Claim Form</i></h4>
                <p class="m-0">(Regulation 62)</p>
            </div>
            <table><tbody>
                <tr class=""><td class=""><b class="mr-2">Scheme Name</b></td> <td><!-- php: = $patientProvider->provider->name --> <!-- php: = $patientProvider->provider_policy? $patientProvider->provider_policy->name: '' --></td></tr>
                <tr class=""><td class=""><b class="mr-2">Scheme Code</b></td> <td><!-- php: = $patientProvider->provider->code --></td></tr>
                <tr class=""><td class=""><b class="mr-2">Health Facility Code</b></td> <td>NHIA-00100</td></tr>
            </tbody></table>
            <table><tbody>
                <tr class=""><td class=""><b class="mr-2">Form No</b></td> <td>6</td></tr>
                <tr class=""><td class=""><b class="mr-2">Date Of Claim</b></td> <td><!-- php: = date('d/m/Y') --></td></tr>
            </tbody></table>
            <table class="mb-3"><tbody>
                <tr class=""><td class=""><b class="mr-2">Batch No</b></td> <td>1706</td></tr>
            </tbody></table>
    
        </div>
        <div class="divider"></div>

        <!-- SECTION 2 LIENT INFORMATION -->
        <div class="d-flex flex-row flex-nowrap align-items-end justify-content-between mt-4">
            <div class="mr-3">
                <h4 class="mb-1 mt-0">CLIENT INFORMATION</h4>
                <table><tbody>
                    <tr><td><b class="mr-2">Surname</b></td> <td><!-- php: = $patient->last_name --></td></tr>
                    <tr><td><b class="mr-2">Other Names</b></td> <td><!-- php: = $patient->first_name --></td></tr>
                    <tr><td><b class="mr-2">Date of Birth</b></td> <td><!-- php: = $patient->date_of_birth --></td></tr>
                </tbody></table>
            </div>
            
            <table><tbody>
                <tr><td><b class="mr-2">Card Serial Number</b></td> <td><!-- php: = $patientProvider->code --></td></tr>
                <tr><td><b class="mr-2">Member Number</b></td> <td><!-- php: = $patientProvider->insurance_number --></td></tr>
                <tr><td><b class="mr-2">Age</b></td> <td><!-- php: = $patient->date_of_birth->age --></td></tr>
                <tr><td><b class="mr-2">Hospital Record No</b></td> <td><!-- php: = $patient->folder_number --></td></tr>
            </tbody></table>
            <div class="content-section p-2">
                <label  class="cs-label">Gender</label>
                <div class="d-flex align-items-center">
                    <div class="x-checkbox mr-3"><b><!-- php: = $patient->gender_id==1? 'X' : '' --></b></div>
                    <span>Male</span>
                </div>
                <div class="d-flex align-items-center mt-2">
                    <div class="x-checkbox mr-3"><b><!-- php: = $patient->gender_id==1? '' : 'X' --></b></div>
                    <span>Female</span>
                </div>
            </div>
        </div>

        <!-- SECTION 3 SERVICES PROVIDED  -->
        <div class=" mt-4"><b>SERVICES PROVIDED</b> <span>( to be filled in by all health care providers)</span></div>
        <div class="d-flex justify-content-between mt-2">
            <div class="w-50 d-flex flex-column">
                <div class="content-section ">
                    <label  class="cs-label">Type Of Services</label>
                    <div class="w-100 d-flex">
                        <span class="mt-2 ml-1 mr-1">(b.)</span>
                        <table class="flex-fill">
                            <tr>
                                <td colspan="2">
                                    <div class="d-flex align-items-center mr-3 mt-2">
                                        <div class="x-checkbox mr-2"><b><!-- php: = sizeof($admissions)==0? 'X' : '' --></b></div>
                                        <span>Out-Patient</span>
                                    </div>
                                </td>
                                <td class="border-l-black">
                                    <div class="d-flex align-items-center m-2">
                                        <div class="x-checkbox mr-2"><!-- php: = sizeof($medicines)>0? 'X' : '' --></b></div>
                                        <span>Pharmacy</span>
                                    </div>
                                </td>
                        
                            </tr>
                            <tr>
                                <td>
                                    <div class="d-flex align-items-center mr-3 mt-2 mb-2">
                                        <div class="x-checkbox mr-2" ><b><!-- php: = sizeof($diagnoses)>0? 'X' : '' --></b></div>
                                        <span>Diagnostic</span>
                                    </div>
                                </td>
                        
                                <td>
                                    <div class="d-flex align-items-center mr-3 mt-2 mb-2">
                                        <div class="x-checkbox mr-3"><b><!-- php: = sizeof($admissions)>0? 'X' : '' --></b></div>
                                        <span>In-Patient</span>
                                    </div>
                                </td>
                                <td class="border-l-black"></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="content-section d-flex" style="margin-top: -3px;">
                    <span class="mt-2 ml-1">(b.)</span>
                    <div class="d-flex flex-wrap px-2 pb-2 pt-0">
                        <div class="d-flex align-items-center mr-3 mt-2">
                            <div class="x-checkbox mr-2" ></div>
                            <span>All Inclusive</span>
                        </div>
                        <div class="d-flex align-items-center mr-3 mt-2">
                            <div class="x-checkbox mr-3"><b>x</b></div>
                            <span>Unbundled</span>
                        </div>
                    </div>
                </div>
                <div class="content-section  mt-3">
                    <label  class="cs-label">Outcome</label>
                    <table class="flex-fill">
                        <tr>
                            <td>
                                <div class="d-flex align-items-center mr-3 mt-2 ml-2">
                                    <div class="x-checkbox mr-3"><!-- php: = $patientVisit->visit_outcome_id==1? 'X' : '' --></b></div>
                                    <span>Discharged</span>
                                </div>
                            </td>
                            <td>
                                <div class="d-flex align-items-center mr-3 mt-2">
                                    <div class="x-checkbox mr-2" ><!-- php: = $patientVisit->visit_outcome_id==3? 'X' : '' --></b></div>
                                    <span>Died</span>
                                </div>
                            </td>
                            <td>
                                <div class="d-flex align-items-center mr-3 mt-2">
                                    <div class="x-checkbox mr-2" ><!-- php: = $patientVisit->visit_outcome_id==2? 'X' : '' --></b></div>
                                    <span>Transferred Out</span>
                                </div>
                            </td>
                            
                        </tr>
                        <tr>
                            <td>
                                <div class="d-flex align-items-center mr-3 mt-2 mb-2 ml-2">
                                    <div class="x-checkbox mr-2" ><!-- php: = $patientVisit->visit_outcome_id==5? 'X' : '' --></b></div>
                                    <span>Absconded</span>
                                </div>
                            </td>
                            
                            <td colspan="2">
                                <div class="d-flex align-items-center mr-3 mt-2 mb-2">
                                    <div class="x-checkbox mr-2" ><!-- php: = $patientVisit->visit_outcome_id==4? 'X' : '' --></b></div>
                                    <span>Discharge Against Medical Advice</span>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            
            <div class="content-section p-2 w-half">
                <label  class="cs-label">Date(s) of service provision</label>
                <div class="d-flex flex-column align-items-center">
                <table>
                    <!-- php: foreach($ccVisits as $index=>$pVisit): -->
                        <tr><td class="pr-4 text-nowrap text-right"><!-- php: =ordinal($index+1)." Visit/".($pVisit->patient_visit_purpose? $pVisit->patient_visit_purpose->name: '') --> </td><td class="text-left"><!-- php: =date("d/m/Y", strtotime($pVisit->date_visited) ) --></td></tr>
                    <!-- php: endforeach; -->
                    <tr><td class="pt-3 pr-4 text-nowrap text-right">Length of Duration (Days)</td><td class="pt-3"><!-- php: =$daysOfCCVisits --></td></tr>
                </table>
                </div>
            </div>
        </div>
        <div class="content-section p2 mt-3">
            <label  class="cs-label">Type Of Attendance</label>
            <div class="d-flex flex-wrap px-2 pb-2 pt-0 justify-content-between">
                <div class="d-flex align-items-center mr-3 mt-2">
                    <div class="x-checkbox mr-2" ><b><!-- php: = $patientVisit->patient_visit_purpose_id==2? 'X' : '' --></b></div>
                    <span class="text-nowrap">Chronic Follow-Up</span>
                </div>
                <div class="d-flex align-items-center mr-3 mt-2">
                    <div class="x-checkbox mr-2" ><!-- php: = $patientVisit->patient_visit_purpose_id==4? 'X' : '' --></b></div>
                    <span>Emergency</span>
                </div>
                <div class="d-flex align-items-center mr-3 mt-2">
                    <div class="x-checkbox mr-3"><!-- php: = $patientVisit->patient_visit_purpose_id==1? 'X' : '' --></b></div>
                    <span class="text-nowrap">Acute episode</span>
                </div>
                
                <div class="d-flex-inline align-items-center mr-3 mt-2">
                    <b class=" mr-2 text-nowrap" >Speciality Code:</b>
                    <span>PAED</span>
                </div>
            </div>
        </div>
        <div class="content-section p2 mt-3">
            <div class="d-flex flex-wrap px-2 pb-2 pt-0 justify-content-between">
                <div class="d-flex-inline flex-nowrap align-items-center mr-3 mt-2">
                    <b class=" mr-2" > Physician / Clinician Name:</b>
                    <span class="text-nowrap"><!-- php: =$physician->full_name --></span>
                </div>
                <div class="d-flex-inline align-items-center mr-3 mt-2">
                    <b class=" mr-2" > Physician / Clinician ID:</b>
                    <span class="text-nowrap"><!-- php: =$physician->id --></span>
                </div>
            </div>
        </div>

        <!-- SECTION 4 DIAGNOSIS(ES) -->
        <div class=" mt-5"><b class="font-italic">DIAGNOSIS(ES)</b> <span>(to be filled-in by healthcare providers who have provided out or in-patient services)</span></div>
        <table class="border-table w-100">
            <tr> <th></th> <th>Description</th> <th>ICD-10</th> <th>G-DRG</th></tr>
            <!-- php: foreach($diagnoses as $index=>$diag): -->
            <tr> <td><!-- php: =$index+1 --></td> <td><!-- php: =$diag->diagnosis->name --></td> <td><!-- php: =$diag->diagnosis->code --></td> <td><!-- php: ='- --' --></td></tr>
            <!-- php: endforeach; -->
        </table>
        <div class=" mt-2"><b class="font-italic">INVESTIGATIONS</b> <span>(to be filled-in by health care providers providing diagnostics services only)</span></div>
        <table class="border-table w-100">
            <tr> <th></th> <th>Description</th> <th>Unit Price</th> <th>Date</th> <th>G-DRG</th> </tr>
            <!-- php: foreach($investigations as $index=>$reqItem): -->
            <tr> <td><!-- php: =$index+1 --></td> <td><!-- php: =$reqItem->providerInvoiceItem->item_name --></td> <td><!-- php: =$reqItem->providerInvoiceItem->final_amount --></td> <td><!-- php: =$reqItem->providerInvoiceItem->date_added->i18nFormat('d/m/Y') --></td> <td>---</td> </tr>
            <!-- php: endforeach; -->
        </table>
        <div class=" mt-2"><b class="font-italic">MEDICINES</b> <span>(to be filled-in by health care providers providing dispensed medicines only)</span></div>
        <table class="border-table w-100">
            <tr> <th></th> <th>Description</th> <th>Unit Price</th> <th>Qty</th> <th>Total Cost</th> <th>Date</th> <th>Code</th> </tr>
            <!-- php: foreach($medicines as $index=>$reqItem): -->
            <tr> <td><!-- php: =$index+1 --></td> <td><!-- php: =$reqItem->providerInvoiceItem->item_name --></td> <td><!-- php: =$reqItem->providerInvoiceItem->unit_cost --></td> <td><!-- php: =$reqItem->providerInvoiceItem->quantity --></td> <td><!-- php: =$reqItem->providerInvoiceItem->final_amount --></td> <td><!-- php: =$reqItem->providerInvoiceItem->date_added->i18nFormat('d/m/Y') --></td> <td>---</td> </tr>
            <!-- php: endforeach; -->
        </table>

        <!-- SECTION 5 CLIENT CLAIM SUMMARY -->
        <div class=" mt-5"><b>CLIENT CLAIM SUMMARY</b> </div>
        <div class="d-flex justify-content-between">
            <table class="border-table w-half">
                <tr> <th>Type of Service</th> <th>G-DRG/Code</th> <th>Tarrif Amount</th> </tr>
                <tr> <td>Out-Patient</td> <td></td> <td class="text-right"><!-- php: =$claimSummary['out-patient']['tarrifAmount'] --></td> </tr>
                <tr> <td>In-Patient</td> <td><!-- php: =$claimSummary['in-patient']['gdrg'] --></td> <td class="text-right"><!-- php: =$claimSummary['in-patient']['tarrifAmount'] --></td> </tr>
                <tr> <td>Investigations</td> <td></td> <td class="text-right"><!-- php: =$claimSummary['investigations']['tarrifAmount'] --></td> </tr>
                <tr> <td>Pharmacy</td> <td></td> <td class="text-right"><!-- php: =$claimSummary['pharmacy']['tarrifAmount'] --></td> </tr>
                <tr> <td colspan="2" > <b>Total</b> </td> <td class="text-right font-weight-bold"><!-- php: =$claimSummary['total']['tarrifAmount'] --></td> </tr>
            </table>

            <div class="d-flex flex-column" style="width: 35%">
                <h4 class="m-0 text-center">Name</h4>
                <h3 class="m-0 text-center font-weight-light border-black py-1"> <!-- php: =$userName --></h3>
                <h4 class="m-0 mt-2 text-center">Signature</h4>
                <div class="border-red" style="height: 80px;"></div>
                <i class="mt-2 text-center">(Health Facility Insurance Officer )</i>
            </div>
        </div>
        <div class=" mt-3"><b>Scheme use only</b> </div>
        <div class="d-flex justify-content-between border-black p-2">
            <div class="d-flex flex-column flex-fill mr-3">
                <div class="d-flex align-items-center">
                    <span class="mr-2 text-nowrap">Date Received</span> <div class="space-box flex-fill border-black"></div>
                </div>
                <div class="d-flex align-items-center justify-content-between mt-1">
                    <span class="mr-2">Signed<span class="invisible">spaceR</span></span> <div class="space-box flex-fill border-red"></div>
                </div>
            </div> 
            <div class="d-flex flex-column flex-fill mr-3">
                <div class="d-flex align-items-center">
                    <span class="mr-2">Action 1</span> <div class="space-box flex-fill border-black"></div>
                </div>
                <div class="d-flex align-items-center justify-content-between mt-1">
                    <span class="mr-2">Action 2</span> <div class="space-box flex-fill border-black"></div>
                </div>
            </div> 
            <div class="d-flex flex-column flex-fill mr-3">
                <div class="d-flex align-items-center">
                    <span class="mr-2">Date</span> <div class="space-box flex-fill border-black"></div>
                </div>
                <div class="d-flex align-items-center justify-content-between mt-1">
                    <span class="mr-2">Date</span> <div class="space-box flex-fill border-black"></div>
                </div>
            </div> 
            <div class="d-flex flex-column flex-fill">
                <div class="d-flex align-items-center">
                    <span class="mr-2">Signed</span> <div class="space-box flex-fill border-red"></div>
                </div>
                <div class="d-flex align-items-center justify-content-between mt-1">
                    <span class="mr-2">Signed</span> <div class="space-box flex-fill border-red"></div>
                </div>
            </div> 
        </div>
    </div>
    <!-- main flex end -->
    
    
</body>
</html>
`;

export default function PdfClaimPage() {
  return (
    <PageShell title="Pdf/claim.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
