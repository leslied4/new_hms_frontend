import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/CreditClaims/pdf/claim_pdf_backup.php';
const rawHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <style>
        .text-on-pannel {
            background: #fff none repeat scroll 0 0;
            color: #000;
            height: auto;
            margin-left: 20px;
            padding: 3px 5px;
            position: absolute;
            margin-top: -20px;
            font-size: 15px;
            /* border: 1px solid #337ab7; */
            /* border-radius: 8px; */
        }

        .panel {
            /* for text on pannel */
            /* margin-top: 27px !important; */
            border: 2px solid #000;
            width: 100%!important;
        }

        .panel-body {
            padding-top: 10px !important;
            padding-bottom: 10px !important;
        }
        .my-box{
            height: 30px;
            width: 60px;
            border: 2px solid #000;
        }
        .table-bordered {
            border: 2px solid #000;
        }
        .table-bordered th {
            border: 2px solid #000;
        }
        .table-bordered td {
            border: 2px solid #000;
        }
        .table-bordered tr {
            border: 2px solid #000;
        }


        /* @media print{
            .panel{
                width: 100%!important;
            }
        } */
        @media print {
            .claim-summary {page-break-before: always;}
        }
    </style>
</head>
<body>
    <div style="background-color: #cccccc21" class="container-fluid">
        <div class="container-fluid mt-3  d-flex">
            <!-- <div class="row"> -->
            <div class="col-md-2 d-flex justify-content-start align-items-center p-2">
                <img style="height:60px;width:auto;"
                    src="https://upload.wikimedia.org/wikipedia/commons/b/bb/National_Health_Insurance_Scheme%2C_Ghana_%28NHIS%29_logo.jpg"
                    alt="">
            </div>
            <div class="col-md-10 d-flex justify-content-start p-2">
                <div style="margin-left:20%">
                    <h3 class="font-weight-bold text-center">NATIONAL INSURANCE SCHEME</h3>
                    <h5 class="font-weight-bold text-center">CITY HOSPITAL</h5>
                </div>

            </div>
            <!-- </div> -->
        </div>
        <div style="border-bottom:2px solid #000" class="container-fluid mt-4 d-flex">
            <div class="col-md-2 p-2">
                <h6 class="font-weight-bold font-italic my-0 mt-4" style="text-decoration: underline;">Claim Form</h6>
                <small>(Regulation 62)</small>
            </div>
            <div class="col-md-2 p-2">
                <h6 class="font-weight-bold my-0">Scheme Name</h6>
                <h6 class="font-weight-bold my-1">Scheme Code</h6>
                <h6 class="font-weight-bold my-0">Health Facility Code</h6>
            </div>
            <div class="col-md-2 p-2">
                <h6 class="my-0">Ahafo Ano North</h6>
                <h6 class="my-1"> NHIA-00100</h6>
                <h6 class="my-0">NHIA-00100</h6>
            </div>
            <div class="col-md-2 p-2">
                <h6 class="font-weight-bold mt-3">Form No</h6>
                <h6 class="font-weight-bold mt-1">Date Of Claim</h6>
            </div>
            <div class="col-md-2 p-2">
                <h6 class="mt-3">6</h6>
                <h6 class="mt-1">31/01/17</h6>
            </div>
            <div class="col-md-2 d-flex justify-content-between p-2">
                <h6 class="font-weight-bold">Batch No</h6>
                <h6 class="">1706</h6>
            </div>

        </div>
        <div class="container-fluid mt-3 p-0 d-flex">
            <div class="col-md-4 p-2">
                <h6 class="font-weight-bold my-0">CLIENT INFORMATION</h6>
                <div class="d-flex p-0">
                    <div class="col-md-4 p-0">
                        <h6 class="my-1">Surname</h6>
                    </div>
                    <div class="col-md-8 p-0"><!-- php: = $invoice->patient_visit->patient->last_name --></div>
                </div>
                <div class="d-flex">
                    <div class="col-md-4 p-0">
                        <h6 class="my-1">Other Names</h6>
                    </div>
                    <div class="col-md-8 p-0"><!-- php: = $invoice->patient_visit->patient->first_name --></div>
                </div>
                <div class="d-flex">
                    <div class="col-md-4 p-0">
                        <h6 class="my-1">Date of Birth</h6>
                    </div>
                    <div class="col-md-4 p-0">05/07/2005</div>
                </div>
            </div>
            <div class="col-md-5 p-2">
                <div class="d-flex p-0">
                    <div class="col-md-6 p-0">
                        <h6 class="mt-0 mb-1">Card Serial Number</h6>
                    </div>
                    <div class="col-md-6 p-0">ASAHN032A0697</div>
                </div>
                <div class="d-flex p-0">
                    <div class="col-md-6 p-0">
                        <h6 class="my-1">Member Number</h6>
                    </div>
                    <div class="col-md-6 p-0">74456237</div>
                </div>
                <div class="d-flex p-0">
                    <div class="col-md-6 p-0">
                        <h6 class="my-1">Age</h6>
                    </div>
                    <div class="col-md-6 p-0">12</div>
                </div>
                <div class="d-flex p-0">
                    <div class="col-md-6 p-0">
                        <h6 class="my-1">Hospital Record No</h6>
                    </div>
                    <div class="col-md-6 p-0">G01997/17</div>
                </div>
            </div>
            <div class="col-md-3 p-2">
                <div class="container">
                    <div class="panel">
                        <div style="width: 100%!important;" class="panel-body">
                            <h3 class="text-on-pannel">Gender</h3>
                            <div class="d-flex mt-2">
                                <!-- <div class="col-md-6 d-flex align-items-center justify-content-center p-2"> -->
                                <div class="my-box ml-2"></div>
                                <!-- </div>
                            <div class="col-md-1 p-2 d-flex align-items-center justify-content-center"> -->
                                <h6 class="my-0 ml-4">Male</h6>
                                <!-- </div> -->
                            </div>
                            <div class="d-flex mt-2">
                                <!-- <div class="col-md-6 d-flex align-items-center justify-content-center p-2"> -->
                                <div class="my-box ml-2"></div>
                                <!-- </div>
                            <div class="col-md-1 p-2 d-flex align-items-center justify-content-center"> -->
                                <h6 class="my-0 ml-4">Female</h6>
                                <!-- </div> -->
                            </div>

                        </div>
                    </div>
                    <div>
                    </div>
                </div>

            </div>
        </div>
        <div class="container-fluid mt-3 p-0">
            <h6 class="font-weight-bold my-0">SERVICE PROVIDED (to be filled in by all health care providers)</h6>
            <div class="d-flex">
                <div class="col-md-6 p-2 pr-5">
                    <div class="panel mt-3">
                        <div style="width: 100%!important;" class="panel-body">
                            <h3 class="text-on-pannel">Type Of Services</h3>
                            <div class="d-flex align-items-center mt-3">
                                <!-- <div class="col-md-6 d-flex align-items-center justify-content-center p-2"> -->
                                <h6 class="my-0 ml-2">(a.)</h6>
                                <div class="my-box ml-2"></div>
                                <!-- </div>
                                <div class="col-md-1 p-2 d-flex align-items-center justify-content-center"> -->
                                <h6 class="my-0 ml-4">Out-Patient</h6>
                                <!-- </div> -->
                            </div>
                            <div class="d-flex align-items-center mt-3">
                                
                                <div style="margin-left:38px;" class="my-box"></div>
                                <h6 class="my-0 ml-4">Diagnostic</h6>
                                <div style="margin-left:38px;" class="my-box"></div>
                                <h6 class="my-0 ml-4">In-Patient</h6>
                                <div style="margin-left:38px;" class="my-box"></div>
                                <h6 class="my-0 ml-4">Pharmacy</h6>
                                
                                
                            </div>

                        </div>
                    </div>
                    <div class="panel mt-0 p-2">
                        <div style="width: 100%!important;" class="panel-body">
                            <div class="d-flex align-items-center mt-3">
                                <h6 class="my-0">(b.)</h6>
                                <div class="my-box ml-2"></div>
                                <h6 class="my-0 ml-4">All Inclusive</h6>
                                <div style="margin-left:28px;" class="my-box"></div>
                                <h6 class="my-0 ml-4">Unbundled</h6>
                            </div>
                        </div>
                    </div>
                    <div class="panel mt-0 p-2">
                        <div style="width: 100%!important;" class="panel-body">
                            <!-- <h3 class="text-on-pannel">Type Of Services</h3> -->
                    <div class="panel mt-2 p-2">
                        <div style="width: 100%!important;" class="panel-body">
                            <h3 class="text-on-pannel">Outcome</h3>
                            <div class="d-flex align-items-center mt-3">
                                <!-- <h6 class="my-0">(b.)</h6> -->
                                <div class="my-box ml-2"></div>
                                <h6 class="my-0 ml-4">Discharged</h6>
                                <div style="margin-left:28px;" class="my-box"></div>
                                <h6 class="my-0 ml-4">Died</h6>
                                <div style="margin-left:28px;" class="my-box"></div>
                                <h6 class="my-0 ml-4">Transferred Out</h6>
                            </div>
                            <div class="d-flex align-items-center mt-3">
                                <!-- <h6 class="my-0">(b.)</h6> -->
                                <div class="my-box ml-2"></div>
                                <h6 class="my-0 ml-4">Absconded</h6>
                                <div style="margin-left:28px;" class="my-box"></div>
                                <h6 class="my-0 ml-4">Discharge Against Medical Advice</h6>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
                <div class="col-md-6 p-2">
                    <div style="height: 387px;" class="panel mt-2 p-2">
                        <div style="width: 100%!important;" class="panel-body">
                            <h3 style="margin-top:-28px;" class="text-on-pannel">Date(s) of Service Provision</h3>
                             <!-- <p style="font-size:18px;" class="text-center">1st Visit/Admission   03/01/2017</p>
                             <p style="font-size:18px;" class="text-center">2nd Visit/Admission   03/01/2017</p>
                             <p style="font-size:18px;" class="text-center">3rd Visit   </p>
                             <p style="font-size:18px;" class="text-center">4th Visit   </p>
                             <p style="font-size:18px;" class="text-center">Length of Duration (Days)   3</p> -->
                             <div class="d-flex justify-content-center mt-3">
                                <div class="col-md-4"> 
                                    <p style="font-size:18px;" class="text-right">1st Visit/Admission</p>
                                </div>
                                <div class="col-md-4">
                                    <p style="font-size:18px;" class="text-right">03/01/2017</p>
                                </div>
                             </div>
                             <div class="d-flex justify-content-center mt-3">
                                <div class="col-md-4"> 
                                    <p style="font-size:18px;" class="text-right">2nd Visit/Admission</p>
                                </div>
                                <div class="col-md-4">
                                    <p style="font-size:18px;" class="text-right">03/01/2017</p>
                                </div>
                             </div>
                             <div class="d-flex justify-content-center mt-3">
                                <div class="col-md-4"> 
                                    <p style="font-size:18px;" class="text-right">3rd Visit</p>
                                </div>
                                <div class="col-md-4">
                                    <p style="font-size:18px;" class="text-right"></p>
                                </div>
                             </div>
                             <div class="d-flex justify-content-center mt-3">
                                <div class="col-md-4"> 
                                    <p style="font-size:18px;" class="text-right">4th Visit</p>
                                </div>
                                <div class="col-md-4">
                                    <p style="font-size:18px;" class="text-right"></p>
                                </div>
                             </div>
                             <div class="d-flex justify-content-center mt-3">
                                <div class="col-md-4"> 
                                    <p style="font-size:18px;" class="text-right">Length of Duration (Days)</p>
                                </div>
                                <div class="col-md-4">
                                    <p style="font-size:18px;" class="text-right">3</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
           <div class="container-fluid p-1">
            <div class="panel mt-3 p-2">
                <div style="width: 100%!important;" class="panel-body">
                    <h3 style="margin-top:-27px;" class="text-on-pannel">Type Of Attendance</h3>
                    <div class="d-flex align-items-center mt-3">
                        <!-- <h6 class="my-0">(b.)</h6> -->
                        <div class="my-box ml-2"></div>
                        <h6 class="my-0 ml-4">Chronic Follow-Up</h6>
                        <div class="my-box ml-5"></div>
                        <h6 class="my-0 ml-4">Emergency</h6>
                        <div class="my-box ml-5"></div>
                        <h6 class="my-0 ml-4">Acute episode</h6>
                        <h6 class="my-0 ml-5">Speciality Code:</h6>
                        <h6 class="my-0 ml-4">MEDI</h6>
                    </div>
                </div>
            </div>
            <div class="panel mt-3 p-2">
                <div style="width: 100%!important;" class="panel-body">
                    <div class="d-flex">
                        <div class="col-md-6 d-flex justify-content-start p-2">
                            <h6 class="my-0 font-weight-bold">Physical / Clinician name</h6>
                            <h6 class="my-0 ml-4">IHEKANABU KELECHI KENNETH</h6>
                        </div>
                        <div class="col-md-6 p-2">
                            <h6 class="my-0 ml-5 font-weight-bold">Physical / Clinician id</h6>
                        </div>
                    </div>
                </div>
            </div>

           </div>
        </div>
        <div class="container-fluid mt-5 p-0">
            <h6 class="my-0"><span class="font-italic font-weight-bold">DIAGNOSIS(ES)</span> (to be filled in by healthcare providers who have provided out or in-patient services)</h6>
            <table class="table table-bordered mt-2">
                <tr>
                    <th></th>
                    <th>Description</th>
                    <th>ICD-10</th>
                    <th>G-DRG</th>
                </tr>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Enteric Fever/Typhoid fever</td>
                        <td>A01.0</td>
                        <td>MED131A</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>acute gastritis</td>
                        <td></td>
                        <td>MED1261A</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Malaria</td>
                        <td>B54</td>
                        <td>MED128A</td>
                    </tr>
                </tbody>
            </table>

        </div>
        <div class="container-fluid mt-2 p-0">
            <h6 class="my-0"><span class="font-italic font-weight-bold">INVESTIGATIONS(ES)</span> (to be filled in by healthcare providers providing diagnostics services only)</h6>
            <table class="table table-bordered mt-2">
                <tr>
                    <th></th>
                    <th>Description</th>
                    <th>Unit Price</th>
                    <th>Date</th>
                    <th>G-DRG</th>
                </tr>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Full Blood Count FBC (Automation)</td>
                        <td>9.63</td>
                        <td>03/01/2017</td>
                        <td>INVE52D</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Widal Test</td>
                        <td>5.67</td>
                        <td>03/01/2017</td>
                        <td>INVE38E</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>B/F for Malaria parasites</td>
                        <td>4.48</td>
                        <td>03/01/2017</td>
                        <td>INVE09D</td>
                    </tr>
                </tbody>
            </table>

        </div>
        <div class="container-fluid mt-2 p-0">
            <h6 class="my-0"><span class="font-italic font-weight-bold">MEDICINES(ES)</span> (to be filled in by healthcare providers providing dispensed medicines only)</h6>
            <table class="table table-bordered mt-2">
                <tr>
                    <th></th>
                    <th>Description</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th>Total Cost</th>
                    <th>Date</th>
                    <th>Code</th>
                </tr>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Ceftriazone Injection 1000mg (2000.0 OD x 1)</td>
                        <td>6.75</td>
                        <td>2</td>
                        <td>13.50 </td>
                        <td>03/01/2017</td>
                        <td>CEFTRIIN3</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Ceftriazone Injection 1000mg (2000.0 OD x 1)</td>
                        <td>6.75</td>
                        <td>2</td>
                        <td>13.50 </td>
                        <td>03/01/2017</td>
                        <td>CEFTRIIN3</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Ceftriazone Injection 1000mg (2000.0 OD x 1)</td>
                        <td>6.75</td>
                        <td>2</td>
                        <td>13.50 </td>
                        <td>03/01/2017</td>
                        <td>CEFTRIIN3</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Ceftriazone Injection 1000mg (2000.0 OD x 1)</td>
                        <td>6.75</td>
                        <td>2</td>
                        <td>13.50 </td>
                        <td>03/01/2017</td>
                        <td>CEFTRIIN3</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Ceftriazone Injection 1000mg (2000.0 OD x 1)</td>
                        <td>6.75</td>
                        <td>2</td>
                        <td>13.50 </td>
                        <td>03/01/2017</td>
                        <td>CEFTRIIN3</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Ceftriazone Injection 1000mg (2000.0 OD x 1)</td>
                        <td>6.75</td>
                        <td>2</td>
                        <td>13.50 </td>
                        <td>03/01/2017</td>
                        <td>CEFTRIIN3</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>Ceftriazone Injection 1000mg (2000.0 OD x 1)</td>
                        <td>6.75</td>
                        <td>2</td>
                        <td>13.50 </td>
                        <td>03/01/2017</td>
                        <td>CEFTRIIN3</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>Ceftriazone Injection 1000mg (2000.0 OD x 1)</td>
                        <td>6.75</td>
                        <td>2</td>
                        <td>13.50 </td>
                        <td>03/01/2017</td>
                        <td>CEFTRIIN3</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>Ceftriazone Injection 1000mg (2000.0 OD x 1)</td>
                        <td>6.75</td>
                        <td>2</td>
                        <td>13.50 </td>
                        <td>03/01/2017</td>
                        <td>CEFTRIIN3</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>Ceftriazone Injection 1000mg (2000.0 OD x 1)</td>
                        <td>6.75</td>
                        <td>2</td>
                        <td>13.50 </td>
                        <td>03/01/2017</td>
                        <td>CEFTRIIN3</td>
                    </tr>
                </tbody>
            </table>

        </div>
        <div class="container-fluid claim-summary mt-5 p-0">
            <h6 class="my-0"><span class="font-weight-bold">CLIENT CLAIM SUMMARY</h6>
            <div class="d-flex">
                <div class="col-md-6 pl-0 pr-5">
                    <table class="table table-bordered">
                        <tr>
                            <th>Type of Service</th>
                            <th>G-DRG</th>
                            <th>Tariff Amount</th>
                        </tr>
                        <tbody>
                            <tr>
                                <td>Out-Patient</td>
                                <td></td>
                                <td class="text-right">0.00</td>
                            </tr>
                            <tr>
                                <td>In-Patient</td>
                                <td>MEDI31A</td>
                                <td class="text-right">185.37</td>
                            </tr>
                            <tr>
                                <td>Investigations</td>
                                <td></td>
                                <td class="text-right">0.00</td>
                            </tr>
                            <tr>
                                <td>Pharmacy</td>
                                <td></td>
                                <td class="text-right">0.00</td>
                            </tr>
                            <tr >
                                <td  colspan="3">
                                        <span class="font-weight-bold">TOTAL</span>
                                        <span class="font-weight-bold float-right">286.59</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-6 px-5">
                    <div class="d-flex justify-content-center">
                        <h6 style="margin-left:50%" class="text-center font-weight-bold">Name</h6>
                    </div>
                    <div class="d-flex justify-content-end">
                        <div style="width:50%" class="my-box">
                        <center>PAUL AMOFA</center>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center mt-3">
                        <h6 style="margin-left:50%" class="text-center font-weight-bold">Signature</h6>
                    </div>
                    <div class="d-flex justify-content-end">
                        <div style="width:50%;border:2px solid tomato!important;height:100px" class="my-box">
                        
                        </div>
                    </div>
                    <div class="d-flex justify-content-center"></div>
                        <small style="margin-left:57%; font-size:12px!important;" class="font-italic">(HEALTH FACILITY INSURANCE OFFICER)</small>
                    </div>
                    
                </div>
            </div>
        <h6 class="mt-3 font-weight-bold">Scheme use only</h6>
        <div class="container-fluid p-0">
            <div class="panel mt-3 p-2">
                <div style="width: 100%!important;" class="panel-body">
                    <div class="d-flex align-items-center mt-3">
                        <h6 class="my-0 ml-4">Date Received</h6>
                        <div style="width:200px;" class="my-box ml-3"></div>
                        <h6 class="my-0 ml-4">Action 1</h6>
                        <div style="width:200px;" class="my-box ml-3"></div>
                        <h6 class="my-0 ml-4">Date</h6>
                        <div style="width:200px;" class="my-box ml-3"></div>
                        <h6 class="my-0 ml-4">Signed</h6>
                        <div style="width:200px;border:2px solid tomato;" class="my-box ml-3"></div>
                    </div>
                    <div class="d-flex align-items-center mt-3">
                        <h6 class="my-0 ml-4">Signed</h6>
                        <div style="width:200px;border:2px solid tomato;margin-left:67px" class="my-box"></div>
                        <h6 class="my-0 ml-4">Action 1</h6>
                        <div style="width:200px;" class="my-box ml-3"></div>
                        <h6 class="my-0 ml-4">Date</h6>
                        <div style="width:200px;" class="my-box ml-3"></div>
                        <h6 class="my-0 ml-4">Signed</h6>
                        <div style="width:200px;border:2px solid tomato;" class="my-box ml-3"></div>
                    </div>
                </div>
            </div>
        </div>
        </div>
</body>
</html>
`;

export default function CreditClaimsPdfClaimPdfBackupPage() {
  return (
    <PageShell title="CreditClaims/pdf/claim_pdf_backup.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
