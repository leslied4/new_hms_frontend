import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/InsuranceProfiles/index.php';
const rawHtml = `

<div class="row">
  <style>
    .ptr {
      width: 100%;
      height: auto;

    }

    .container {
      width: 973px;
      height: 568px;
      border-radius: 20px;
      margin: 0 auto;
    }

    .container .inclusive {
      width: 853px;
      height: 447px;
      position: absolute;


    }

    .head {
      width: auto;
      margin-bottom: 20px;
    }

    .head h1 {
      font-size: 30px;
      font-weight: bold;
      font-family: Segoe UI;
    }

    .text {
      margin-bottom: 48px;
    }

    .text p {
      font-size: 20px;
      font-family: Segoe UI;
    }

    .container .item-container {
      width: 860;
      height: 286px;
      margin: 0 auto;

      display: flex;
      gap: 20px;
      row-gap: 9px;
      flex-wrap: wrap;
    }

    .item-container .item-box {
      width: 412px;
      height: 130px;

      border-radius: 7px;
      border: 2px solid rgb(219, 219, 219);

      display: flex;
      justify-content: center;
      align-items: center;

      box-shadow: 2px 2px 7px #dadada;
    }

    .item-box .item-box-ctn {
      width: 325px;
      height: 75px;
      display: flex;
      align-items: center;
    }

    .item-box-ctn .image-wrapper {
      width: 75px;
      height: 75px;
    }

    .image-wrapper img {
      width: 75px;
      height: 75px;
    }

    .item-box-texts {
      margin-left: 8px;
      margin-bottom: 22px;
    }

    .item-box-texts .item-box-head h3 {
      font-size: 20px;
      font-family: Segoe UI;
    }

    .item-box-texts .item-box-p {
      font-size: 18px;
      font-family: Segoe UI;
    }

    .insurance-card:hover {
      transition: all 0.2s ease-in-out;
      box-shadow: 15px 15px 15px #999;
      top: -5px;
      border: 1px solid #cccccc;
      background-color: white;
    }


    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    body {
      background-color: #f7f7f7;
      margin: 2rem 0;
    }



    .dropzone {
      border: 0.0625rem solid #c6ccd6;
      border-radius: 0.5rem;
      background-color: #f9f9fb;
      display: block;
    }

    .dropzone .dropzone-container {
      padding: 2rem 0;
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #8c96a8;
      z-index: 20;
    }

    .dropzone .dropzone-container .dropzone-title {
      padding-top: 1.5rem;
    }

    .dropzone .dropzone-container .browse {
      text-decoration: underline;
      color: #007bff;
    }

    .dropzone .file-input {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      visibility: hidden;
      cursor: pointer;
    }

    .file-icon {
      /* Need position to allow stacking of pseudo-elements */
      position: relative;
      width: 4rem;
      height: 5.25rem;
      /* Padding for demo purposes */
      padding: 0.625rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 2rem;
      color: #007bff;
      /* Second sheet of paper */
    }

    .file-icon,
    .file-icon:before,
    .file-icon:after {
      background-color: #fff;
      border-radius: 0.25rem;
      border: 0.125rem solid #b8bec9;
    }

    .file-icon:before,
    .file-icon:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      border: 0.125rem solid #ccd0d8;
    }

    .file-icon:before {
      left: -0.625rem;
      top: 0.5rem;
      z-index: -1;
    }

    .file-icon:after {
      top: -0.25rem;
      right: -0.25rem;
      left: auto;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 0.25rem;
      border-width: 0.625rem;
      border-style: solid;
      border-color: #f9f9fb #f9f9fb #b8bec9 #b8bec9;
    }

    .drop-zone {
      max-width: 600px;
      height: 200px;
      padding: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: "Quicksand", sans-serif;
      font-weight: 500;
      font-size: 20px;
      cursor: pointer;
      color: #cccccc;
      border: 4px dashed grey;
      border-radius: 10px;
    }

    .drop-zone--over {
      border-style: solid;
    }

    .drop-zone__input {
      display: none;
    }

    .drop-zone__thumb {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;
      background-color: #cccccc;
      background-size: cover;
      position: relative;
    }

    .drop-zone__thumb::after {
      content: attr(data-label);
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 5px 0;
      color: #ffffff;
      background: rgba(0, 0, 0, 0.75);
      font-size: 14px;
      text-align: center;
    }
  </style>


  <div class="col-md-12">
    <div class="card card-topline-<!-- php: = $theme1 -->">

      <div class="card  card-box">
        <div class="card-head">
          <header>Insurance</header>
        </div>
        <div class="card-body ">
          <div class="row">
            <div class="col-md-12">
              <div class="ptr ">
                <div class="container">
                  <div class="inclusive">
                    <div class="head">
                      <h1>Create Profile</h1>
                    </div>
                    <div class="text">
                      <p>Select category below to create an insurance profile.
                      </p>
                    </div>
                    <div class="item-container d-flex justify-content-center flex-wrap">
                      <div class="item-box card insurance-card bg-primary" data-toggle="modal" data-target="#publicModal" style="cursor:pointer">
                        <div class="item-box-ctn">
                          <div class="image-wrapper">
                            <img src="https://cdn-icons-png.flaticon.com/512/639/639364.png" alt="">
                          </div>
                          <div class="item-box-texts">
                            <div class="pl-3">
                              <h3>Public</h3>
                              <p>Profiles for public insurance companies.</p>
                            </div>

                          </div>
                        </div>
                      </div>

                      <div class="item-box card insurance-card bg-primary" data-toggle="modal" data-target="#privateModal" style="cursor:pointer">
                        <div class="item-box-ctn">
                          <div class="image-wrapper">
                            <img src="https://cdn-icons-png.flaticon.com/512/639/639364.png" alt="">
                          </div>
                          <div class="item-box-texts">
                            <div class="pl-3">
                              <h3>Private</h3>
                              <p>Profiles for private insurance companies.</p>
                            </div>

                          </div>
                        </div>
                      </div>

                      <div class="item-box card insurance-card bg-primary" data-target="#companyModal" data-toggle="modal" style="cursor:pointer">
                        <div class="item-box-ctn">
                          <div class="image-wrapper">
                            <img src="https://cdn-icons-png.flaticon.com/512/639/639364.png" alt="">
                          </div>
                          <div class="item-box-texts">
                            <div class="pl-3">
                              <h3>Company/Credit </h3>
                              <p>Profiles for health care patnership with individual companies.</p>
                            </div>

                          </div>
                        </div>
                      </div>

                      <div class="item-box card insurance-card bg-primary d-none" style="cursor:pointer">
                        <div class="item-box-ctn">
                          <div class="image-wrapper">
                            <img src="https://cdn-icons-png.flaticon.com/512/639/639364.png" alt="">
                          </div>
                          <div class="item-box-texts">
                            <div class="pl-3">
                              <h3>Non-Resident</h3>
                              <p>Profiles for Non-Residents.</p>
                            </div>

                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>

          <div style="clear: both"></div>
          <div class="row">
            <div class="col-md-6">
              <span class="label label-md label-<!-- php: = $theme2 -->"><strong><!-- php: = $this->Paginator->counter(__('Total Records: {{count}}')) --></strong></span> - <span><!-- php: = $this->Paginator->counter(__('Page {{page}} of {{pages}}')) --></span>
            </div>
          </div>

          <div class="table-scrollable">
            <table class="table table-hover table-striped order-column full-width">
              <thead>
                <tr>
                  <th> Name </th>
                  <th>Type</th>
                  <th> Region </th>
                  <th> Directorate</th>
                  <th> Accreditation No. </th>
                  <th> Co-Pay </th>
                  <th> Reg Date </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- php: foreach ($insuranceProfiles as $value): -->
                  <tr class="odd gradeX">
                    <td class="left"><!-- php: = $value->name --></td>
                    <td class="left"><!-- php: = $value->insurance_profile_type->name --></td>
                    <td class="left"><!-- php: = $value->region --></td>
                    <td class="left"><!-- php: = $value->directorate --></td>
                    <td class="left"><!-- php: = $value->accreditation_no ? $value->accreditation_no : 'N/A' --></td>
                    <td class="left"><!-- php: = $value->copay ? '<span class="badge badge-primary">Co Pay</span>' : '' --></td>
                    <td class="left"><!-- php: = $value->date_created->nice() --></td>
                    <td class="left">
                      <!-- php: if ($value->insurance_profile_type_id == 2): -->
                        <a data-toggle="modal" data-target="#editInsuranceProfile<!-- php: = $value->id -->" href="javascript:" class="btn  btn-xs">
                          Edit
                        </a>
                      <!-- php: elseif ($value->insurance_profile_type_id == 1): -->
                        <a data-toggle="modal" data-target="#editInsuranceProfile<!-- php: = $value->id -->" href="javascript:" class="btn  btn-xs">
                          Edit
                        </a>
                      <!-- php: elseif ($value->insurance_profile_type_id == 3): -->
                        <a data-toggle="modal" data-target="#editPartnerComapny<!-- php: = $value->id -->" href="javascript:" class="btn  btn-xs">
                          Edit
                        </a>
                      <!-- php: endif -->
                      <!-- php: if ($value->insurance_profile_type_id == 2): -->
                        <a data-toggle="modal" data-target="#veiwInsuranceDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn btn-info btn-xs">
                          View
                        </a>
                      <!-- php: elseif ($value->insurance_profile_type_id == 1): -->
                        <a data-toggle="modal" data-target="#veiwInsuranceDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn btn-info btn-xs">
                          View
                        </a>
                      <!-- php: elseif ($value->insurance_profile_type_id == 3): -->
                        <a data-toggle="modal" data-target="#veiwCompanyinsuranceDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn btn-info btn-xs">
                          View
                        </a>
                      <!-- php: endif -->

                    </td>
                  </tr>
                <!-- php: endforeach -->

              </tbody>
            </table>
          </div>

          <div class="row">
            <div class="col-md-6">
              <span><!-- php: = $this->Paginator->counter(__('Page {{page}} of {{pages}}, showing {{current}} record(s) out of {{count}} total')) --></span>
            </div>

            <div class="col-md-6">
              <div class="dataTables_paginate paging_simple_numbers" style="float: right;">
                <ul class="pagination">
                  <!-- php: = $this->Paginator->prev(__('previous')) -->
                  <!-- php: = $this->Paginator->numbers() -->
                  <!-- php: = $this->Paginator->next(__('next')) -->
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>




  <div class="modal fade" id="publicModal" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Create Insurance Profile - Public </h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <div class="row">
            <div class="col-md-12 col-sm-12">
              <div>
                <div class="card-body">
                  <form id="publicForm">
                    <div class="form-body">


                      <div class="form-group row d-none">
                        <label class="control-label col-md-4">Insurance Type
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <input type="text" value="1" name="insurance_profile_type_id" class="form-control" required>
                        </div>
                      </div>





                      <div class="form-group row">
                        <label class="control-label col-md-4">Region
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">

                          <SearchableSelectField class="form-control input-height next-one" name="region" id="public_region" required>
                            <option value="">Select Region</option>
                            <!-- php: $countries = ['Ghana', 'Togo', 'Benin', 'Nigeria']; foreach ($countries as $key => $country) { -->
                              <option <!-- php: = $country == 'Ghana' ? 'selected' : '' --> value="<!-- php: = $country -->"><!-- php: = $country --></option>
                            <!-- php: } -->
                          </SearchableSelectField>
                        </div>
                      </div>




                      <div class="form-group row">
                        <label class="control-label col-md-4">Directorate
                          <span class="required"> * </span>
                        </label>

                        <div class="col-md-5">
                          <input type="text" value="" name="directorate" id="public_directorate" class="form-control next-one" placeholder="Type Text Here..." required>
                        </div>
                      </div>




                      <div class="form-group row">
                        <label class="control-label col-md-4">Insurance Name
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <input type="text" value="NHIS" name="name" id="public_insurance_name" class="form-control next-one" placeholder="Type Text Here..." required>
                        </div>
                      </div>




                      <div class="form-group row">
                        <label class="control-label col-md-4">Accreditation Number
                          <span class="required"> </span>
                        </label>
                        <div class="col-md-5">
                          <input type="text" value="" name="accreditation_no" id="public_accreditation_no" class="form-control next-one" placeholder="Type Number Here..." required>
                        </div>
                      </div>



                      <div class="form-group row">
                        <label class="control-label col-md-4">eClaim Authorization Number
                          <span class="required"> </span>
                        </label>
                        <div class="col-md-5">
                          <input type="text" value="" name="eclaim_auth_number" id="eclaim_auth_number" class="form-control next-one" placeholder="eClaim Authorisation number..." required>
                        </div>
                      </div>



                      <div class="form-group row">
                        <label class="control-label col-md-4">NHIS Payer ID
                          <span class="required"> </span>
                        </label>
                        <div class="col-md-5">
                          <input type="text" value="" name="nhis_payer_id" id="nhis_payer_id" class="form-control next-one" placeholder="NHIS payer ID..." required>
                        </div>
                      </div>



                      <div class="form-group row">
                        <label class="control-label col-md-4">Health Care Provider Level
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <SearchableSelectField class="form-control input-height next-one" name="health_care_provider_level" id="health_care_provider_level" required>
                            <option value="">Select Provider Level</option>
                            <!-- php: $levels = [ 'Level - 1', 'Level - 2', 'Level - 3', 'Level - 4', 'Level - 5', 'Level - 6', 'Level - 7', 'Level - 8', 'Level - 9', 'Level - 10' ]; foreach ($levels as $key => $value) { -->
                              <option value="<!-- php: = $key -->"><!-- php: = $value --></option>
                            <!-- php: } -->
                          </SearchableSelectField>
                        </div>
                      </div>



                      <div class="form-group row">
                        <label class="control-label col-md-4">Health Care prescription Level
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <SearchableSelectField class="form-control input-height next-one" name="health_care_prescription_level" id="public_health_care_prescription_level" required>
                            <option value="">Select Provider Level</option>
                            <!-- php: $levels = ['Level - 1', 'Level - 2', 'Level - 3']; foreach ($levels as $key => $level) { -->
                              <option value="<!-- php: = $key -->"><!-- php: = $level --></option>
                            <!-- php: } -->
                          </SearchableSelectField>
                        </div>
                      </div>




                      <div class="form-group row">
                        <label class="control-label col-md-4">Drug Formulary
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <SearchableSelectField class="form-control input-height next-one" name="drug_formulary" id="drug_formulary" required>
                            <option value="">Select Status</option>
                            <!-- php: $statuses = ['Inactive', 'Active']; foreach ($statuses as $key => $status) { -->
                              <option <!-- php: = $status == 'Active' ? 'Selected' : '' --> value="<!-- php: = $key -->"><!-- php: = $status --></option>
                            <!-- php: } -->
                          </SearchableSelectField>
                        </div>
                      </div>




                      <div class="form-group row">
                        <label class="control-label col-md-4">Co-Pay
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <SearchableSelectField class="form-control input-height next-one" name="copay" id="public_copay" required>
                            <option value="">Select Status</option>
                            <!-- php: $statuses = ['Disable', 'Enable']; foreach ($statuses as $key => $status) { -->
                              <option <!-- php: = $status == 'Enable' ? 'Selected' : '' --> value="<!-- php: = $key -->"><!-- php: = $status --></option>
                            <!-- php: } -->
                          </SearchableSelectField>
                        </div>
                      </div>


                    </div>

                    <div class="form-actions">
                      <div class="row">
                        <div class="offset-md-3 col-md-9">
                          <button type="submit" class="btn btn-info">Submit</button>
                          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </form>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>




  <div class="modal fade" id="privateModal" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Create Insurance Profile - Private </h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <div class="row">
            <div class="col-md-12 col-sm-12">
              <div>
                <div class="card-body" id="bar-parent">
                  <form id="privateForm">
                    <div class="form-body">


                      <div class="form-group row d-none">
                        <label class="control-label col-md-4">Insurance Type
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <input type="text" value="2" name="insurance_profile_type_id" id="" class="form-control next-one" required>
                        </div>
                      </div>





                      <div class="form-group row">
                        <label class="control-label col-md-4">Region
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">

                          <SearchableSelectField class="form-control input-height next-one" id="privateRegion" required>
                            <option value="">Select Region</option>
                            <!-- php: $countries = ['Ghana', 'Togo', 'Benin', 'Nigeria']; foreach ($countries as $country) { -->
                              <option <!-- php: = $country == 'Ghana' ? 'selected' : '' --> value="<!-- php: = $country -->"><!-- php: = $country --></option>
                            <!-- php: } -->
                          </SearchableSelectField>
                        </div>
                      </div>




                      <div class="form-group row">
                        <label class="control-label col-md-4">Directorate
                          <span class="required"> * </span>
                        </label>

                        <div class="col-md-5">
                          <input type="text" value="" name="privateDirectorate" id="privateDirectorate" class="form-control next-one" placeholder="Type Text Here..." required>
                        </div>

                      </div>




                      <div class="form-group row">
                        <label class="control-label col-md-4">Insurance Name
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <input type="text" value="" id="privateInsuranceName" class="form-control next-one" placeholder="Type Text Here..." required>
                        </div>
                      </div>




                      <div class="form-group row">
                        <label class="control-label col-md-4">Accreditation Number
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <input type="text" value="" id="privateAccreditationNo" class="form-control next-one" placeholder="Type Number Here..." required>
                        </div>
                      </div>




                      <div class="form-group row">
                        <label class="control-label col-md-4">Policies Offered
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <SearchableSelectField class="form-control input-height next-one" id="policyOffered" required>
                            <option value="">Select Number of Policies</option>
                            <!-- php: $policies = ['1', '2', '3', '4', '5']; foreach ($policies as $key => $policy) { -->
                              <option value="<!-- php: = $policy -->"><!-- php: = $policy --></option>
                            <!-- php: } -->
                          </SearchableSelectField>
                        </div>
                      </div>





                      <div class="form-group row  d-none" id="policyOneDiv">
                        <label class="control-label col-md-4">Policy Title 1
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <SearchableSelectField class="form-control input-height mb-2 next-one" id="policyOne" required>
                            <option value="">Select Policy Title</option>
                            <!-- php: $policies = ['Silver', 'Gold', 'Platinum', 'Custom']; foreach ($policies as $key => $policy) { -->
                              <option value="<!-- php: = $policy -->"><!-- php: = $policy --></option>
                            <!-- php: } -->
                          </SearchableSelectField>

                          <input type="text" value="" class="form-control d-none next-one" id="policyOneCustom" placeholder="Custom Field...">


                        </div>
                      </div>







                      <div class="form-group row  d-none" id="policyTwoDiv">
                        <label class="control-label col-md-4">Policy Title 2
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <SearchableSelectField class="form-control input-height mb-2 next-one" id="policyTwo" required>
                            <option value="">Select Policy Title</option>
                            <!-- php: $policies = ['Silver', 'Gold', 'Platinum', 'Custom']; foreach ($policies as $key => $policy) { -->
                              <option value="<!-- php: = $policy -->"><!-- php: = $policy --></option>
                            <!-- php: } -->
                          </SearchableSelectField>

                          <input type="text" value="" class="form-control d-none  next-one" id="policyTwoCustom" placeholder="Custom Field...">


                        </div>
                      </div>






                      <div class="form-group row d-none" id="policyThreeDiv">
                        <label class="control-label col-md-4">Policy Title 3
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <SearchableSelectField class="form-control input-height mb-2 next-one" id="policyThree" required>
                            <option value="">Select Policy Title</option>
                            <!-- php: $policies = ['Silver', 'Gold', 'Platinum', 'Custom']; foreach ($policies as $key => $policy) { -->
                              <option value="<!-- php: = $policy -->"><!-- php: = $policy --></option>
                            <!-- php: } -->
                          </SearchableSelectField>

                          <input type="text" value="" class="form-control d-none  next-one" id="policyThreeCustom" placeholder="Custom Field...">


                        </div>
                      </div>




                      <div class="form-group row d-none" id="policyFourDiv">
                        <label class="control-label col-md-4">Policy Title 4
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <SearchableSelectField class="form-control input-height mb-2 next-one" id="policyFour" required>
                            <option value="">Select Policy Title</option>
                            <!-- php: $policies = ['Silver', 'Gold', 'Platinum', 'Custom']; foreach ($policies as $key => $policy) { -->
                              <option value="<!-- php: = $policy -->"><!-- php: = $policy --></option>
                            <!-- php: } -->
                          </SearchableSelectField>

                          <input type="text" value="" class="form-control d-none  next-one" id="policyFourCustom" placeholder="Custom Field...">


                        </div>
                      </div>



                      <div class="form-group row d-none" id="policyFiveDiv">
                        <label class="control-label col-md-4">Policy Title 5
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <SearchableSelectField class="form-control input-height mb-2 next-one" id="policyFive" required>
                            <option value="">Select Policy Title</option>
                            <!-- php: $policies = ['Silver', 'Gold', 'Platinum', 'Custom']; foreach ($policies as $key => $policy) { -->
                              <option value="<!-- php: = $policy -->"><!-- php: = $policy --></option>
                            <!-- php: } -->
                          </SearchableSelectField>

                          <input type="text" value="" class="form-control d-none  next-one" id="policyFiveCustom" placeholder="Custom Field...">


                        </div>
                      </div>





                      <div class="form-group row">
                        <label class="control-label col-md-4">Health Care Provider Level
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <SearchableSelectField class="form-control input-height next-one" id="privateHC_provider" required>
                            <option value="">Select Provider Level</option>
                            <!-- php: $levels = ['Level - 1', 'Level - 2', 'Level - 3']; foreach ($levels as $key => $value) { -->
                              <option value="<!-- php: = $key -->"><!-- php: = $value --></option>
                            <!-- php: } -->
                          </SearchableSelectField>
                        </div>
                      </div>



                      <div class="form-group row">
                        <label class="control-label col-md-4">Health Care Prescription Level
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <SearchableSelectField class="form-control input-height next-one" id="privateHC_prescription" required>
                            <option value="">Select Provider Level</option>
                            <!-- php: $levels = ['Level - 1', 'Level - 2', 'Level - 3']; foreach ($levels as $key => $level) { -->
                              <option value="<!-- php: = $key -->"><!-- php: = $level --></option>
                            <!-- php: } -->
                          </SearchableSelectField>
                        </div>
                      </div>




                      <div class="form-group row">
                        <label class="control-label col-md-4">Drug Formulary
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <SearchableSelectField class="form-control input-height next-one" id="privateDrug_formulary" required>
                            <option value="">Select Status</option>
                            <!-- php: $statuses = ['Inactive', 'Active']; foreach ($statuses as $key => $status) { -->
                              <option <!-- php: = $status == 'Active' ? 'Selected' : '' --> value="<!-- php: = $key -->"><!-- php: = $status --></option>
                            <!-- php: } -->
                          </SearchableSelectField>
                        </div>
                      </div>




                      <div class="form-group row">
                        <label class="control-label col-md-4">Co-Pay
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <SearchableSelectField class="form-control input-height next-one" id="privateCoPay" required>
                            <option value="">Select Status</option>
                            <!-- php: $statuses = ['Disable', 'Enable']; foreach ($statuses as $key => $status) { -->
                              <option <!-- php: = $status == 'Enable' ? 'Selected' : '' --> value="<!-- php: = $key -->"><!-- php: = $status --></option>
                            <!-- php: } -->
                          </SearchableSelectField>
                        </div>
                      </div>


                    </div>

                    <div class="form-actions">
                      <div class="row">
                        <div class="offset-md-3 col-md-9">
                          <button type="button" id="submitPrivateForm" class="btn btn-info">Submit</button>
                          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </form>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>




  <div class="modal fade" id="companyModal" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-fluid" style="max-width: 70%;" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="editProviderDialogueTitle">Create Insurance Profile - Company/Credit </h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <div class="row">
            <div class="col-md-12 col-sm-12">
              <div>
                <div class="card-body" id="bar-parent">
                  <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'InsuranceProfilePolicies', 'action' => 'addCompanyInsurance']]); -->

                  <div class="form-body">





                    <div class="form-group row">
                      <label class="control-label col-md-4">Name of Company
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        <input type="text" name="companyName" value="" class="form-control next-one" id="companyName" placeholder="Company Name" required>
                      </div>
                    </div>



                    <div class="form-group row">
                      <label class="control-label col-md-4">Tin Number
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        <input type="text" name="tinNo" value="" class="form-control next-one" id="tinNo" placeholder="Tin Number" required>

                      </div>
                    </div>




                    <div class="form-group row">
                      <label class="control-label col-md-4">Roles/Tiers
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        <SearchableSelectField name="tiers" class="form-control input-height next-one" id="tiers" required>
                          <option value="">Select Number of Tiers</option>
                          <!-- php: $numbers = ['1', '2', '3', '4', '5']; foreach ($numbers as $key => $number) { -->
                            <option value="<!-- php: = $number -->"><!-- php: = $number --></option>
                          <!-- php: } -->
                        </SearchableSelectField>
                      </div>
                    </div>





                    <div class="form-group row">
                      <label class="control-label col-md-4">Type of Business
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">

                        <SearchableSelectField name="business_type" class="form-control input-height next-one" id="busineesType" required>
                          <option value="">Select Business Type</option>
                          <!-- php: $types = ['Sole Proprietorship', 'Partnership', 'Corporation', 'Limited Liability Company']; foreach ($types as $type) { -->
                            <option value="<!-- php: = $type -->"><!-- php: = $type --></option>
                          <!-- php: } -->
                        </SearchableSelectField>
                      </div>
                    </div>




                    <div class="form-group row">
                      <label class="control-label col-md-4">Business Contact Details
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">

                        <input name="business_email" type="text" value="" id="business_email" class="form-control mb-2 next-one" placeholder="Enter Email..." required>
                        <input name="business_tele" type="text" value="" id="business_tele" class="form-control mb-2 next-one" placeholder="Enter Telephone Number..." required>
                        <input name="business_mobile" type="text" value="" id="business_mobile" class="form-control mb-2 next-one" placeholder="Enter Mobile Number..." required>

                      </div>
                    </div>




                    <div class="form-group row">
                      <label class="control-label col-md-4">Location
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">

                        <SearchableSelectField name="country" class="form-control input-height mb-2 next-one" id="companyCountry" required>
                          <option value="">Select Country</option>
                          <!-- php: $countries = ['Ghana', 'Togo', 'Benin', 'Nigeria']; foreach ($countries as $country) { -->
                            <option value="<!-- php: = $country -->"><!-- php: = $country --></option>
                          <!-- php: } -->
                        </SearchableSelectField>


                        <SearchableSelectField name="region" class="form-control input-height mb-2 next-one" id="companyRegion" required>
                          <option value="">Select Region</option>
                          <!-- php: $countries = ['Greater Accra', 'Cape Caost', 'Ashanti', 'Western']; foreach ($countries as $country) { -->
                            <option value="<!-- php: = $country -->"><!-- php: = $country --></option>
                          <!-- php: } -->
                        </SearchableSelectField>


                        <input name="gps" type="text" value="" class="form-control mb-2 next-one" id="companyGPS" placeholder="Enter GPS..." required>
                        <textarea name="business_address" class="form-control next-one" id="companyAddress" placeholder="Enter Address"></textarea>

                      </div>
                    </div>







                    <div class="form-group row">
                      <label class="control-label col-md-4">Number of Directors
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        <SearchableSelectField name="number_of_directors" class="form-control input-height next-one" id="directorNumber" required>
                          <option value="">Select Number of Directors</option>
                          <!-- php: $numbers = ['1', '2', '3', '4', '5']; foreach ($numbers as $key => $number) { -->
                            <option value="<!-- php: = $number -->"><!-- php: = $number --></option>
                          <!-- php: } -->
                        </SearchableSelectField>
                      </div>
                    </div>





                    <div class="form-group row d-none" id="directorOneDiv">
                      <label class="control-label col-md-4">Director 1
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">

                        <input name="director_name[]" type="text" value="" class="form-control mb-2" id="directorOne_name" placeholder="Director Name...">
                        <input name="director_email[]" type="text" value="" class="form-control mb-2" id="directorOne_email" placeholder="Director Email..." required>
                        <input name="director_mobile[]" type="text" value="" class="form-control mb-2" id="directorOne_mobile" placeholder="Director Mobile Number..." required>


                      </div>
                    </div>





                    <div class="form-group row  d-none" id="directorTwoDiv">
                      <label class="control-label col-md-4">Director 2
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        <input name="director_name[]" type="text" value="" class="form-control mb-2 " id="directorTwo_name" placeholder="Director Name...">
                        <input name="director_email[]" type="text" value="" class="form-control mb-2 " id="directorTwo_email" placeholder="Director Email...">
                        <input name="director_mobile[]" type="text" value="" class="form-control mb-2 " id="directorTwo_mobile" placeholder="Director Mobile Number...">



                      </div>
                    </div>






                    <div class="form-group row d-none" id="directorThreeDiv">
                      <label class="control-label col-md-4">Director 3
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        <input name="director_name[]" type="text" value="" class="form-control mb-2 " id="directorThree_name" placeholder="Director Name...">
                        <input name="director_email[]" type="text" value="" class="form-control mb-2 " id="directorThree_email" placeholder="Director Email...">
                        <input name="director_mobile[]" type="text" value="" class="form-control mb-2 " id="directorThree_mobile" placeholder="Director Mobile Number...">



                      </div>
                    </div>




                    <div class="form-group row d-none" id="directorFourDiv">
                      <label class="control-label col-md-4">Director 4
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        <input name="director_name[]" type="text" value="" id="directorFour_name" class="form-control mb-2 " placeholder="Director Name...">
                        <input name="director_email[]" type="text" value="" id="directorFour_email" class="form-control mb-2 " placeholder="Director Email...">
                        <input name="director_mobile[]" type="text" value="" id="directorFour_mobile" class="form-control mb-2 " placeholder="Director Mobile Number...">



                      </div>
                    </div>



                    <div class="form-group row d-none" id="directorFiveDiv">
                      <label class="control-label col-md-4">Director 5
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        <input name="director_name[]" type="text" value="" id="directorFive_name" class="form-control mb-2 " placeholder="Director Name...">
                        <input name="director_email[]" type="text" value="" id="directorFive_email" class="form-control mb-2 " placeholder="Director Email...">
                        <input name="director_mobile[]" type="text" value="" id="directorFive_mobile" class="form-control mb-2 " placeholder="Director Mobile Number...">



                      </div>
                    </div>




                    <div class="form-group row">
                      <label class="control-label col-md-4">Relationship Manager
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        <input name="relationship_manager_name" type="text" value="" class="form-control mb-2 next-one" id="rm_name" placeholder=" Name...">
                        <input name="relationship_manager_email" type="text" value="" class="form-control mb-2 next-one" id="rm_email" placeholder=" Email..." required>
                        <input name="relationship_manager_mobile" type="text" value="" class="form-control mb-2 next-one" id="rm_mobile" placeholder=" Mobile Number..." required>
                      </div>
                    </div>




                    <div class="form-group row">
                      <label class="control-label col-md-4">Upload Business Certificate
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">

                        <div class="drop-zone">
                          <span class="drop-zone__prompt">Drop file here or click to upload</span>
                          <input type="file" name="myFileCert" id="bus_cert" class="drop-zone__input">
                        </div>
                      </div>
                    </div>
                  </div>



                  <div class="form-group row">
                    <label class="control-label col-md-4">Upload Cover Letter
                      <span class="required"> * </span>
                    </label>
                    <div class="col-md-5">


                      <div class="drop-zone">
                        <span class="drop-zone__prompt">Drop file here or click to upload</span>
                        <input type="file" name="myFileCover" id="cover_letter" class="drop-zone__input">
                      </div>
                    </div>
                  </div>
                </div>


              </div>

              <div class="form-actions">
                <div class="row">
                  <div class="offset-md-3 col-md-9">
                    <button type="submit" id="submitCompanyForm" class="btn btn-info">Submit</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                  </div>
                </div>
              </div>

              <!-- php: = $this->Form->end(); -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>


<!-- php: foreach ($insuranceProfiles as $value): -->
  <!-- php: if ($value->insurance_profile_type_id == 3) { -->

    <div class="modal fade" id="veiwCompanyinsuranceDialogue_<!-- php: = $value->id -->" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="viewFloatDialogueTitle">View: <!-- php: = $value->partner_company?->company_name --> Company Insurance</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="">
            <div class="card  card-box">
              <div class="card-body">
                <div class="form-group row">
                  <label class="control-label col-md-4">Name
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">
                    <input type="text" value="<!-- php: = $value->name -->" class="form-control" name="insurance_name" id="" placeholder="Type Text Here..." required disabled>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="control-label col-md-4">Country
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">
                    <SearchableSelectField class="form-control input-height" name="country" required disabled>
                      <option value="<!-- php: = $value->region -->"><!-- php: = $value->region --></option>
                      <!-- php: $types = ['Ghana', 'Togo', 'Senegal']; foreach ($types as $type) { -->
                        <option value="<!-- php: = $type -->"><!-- php: = $type --></option>
                      <!-- php: } -->
                    </SearchableSelectField>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="control-label col-md-4">Region
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">

                    <SearchableSelectField class="form-control input-height" name="region" required disabled>
                      <option value="<!-- php: = $value->directorate -->"><!-- php: = $value->directorate --></option>
                      <!-- php: $types = ['Greater Accra', 'Cape Caost', 'Ashanti', 'Western']; foreach ($types as $type) { -->
                        <option value="<!-- php: = $type -->"><!-- php: = $type --></option>
                      <!-- php: } -->
                    </SearchableSelectField>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="control-label col-md-4">Business
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">

                    <SearchableSelectField class="form-control input-height" name="business_type" required disabled>
                      <option value="<!-- php: = $value->partner_company?->business_type -->"><!-- php: = $value->partner_company?->business_type --></option>
                      <!-- php: $types = ['Sole Proprietorship', 'Partnership', 'Corporation', 'Limited Liability Company']; foreach ($types as $type) { -->
                        <option value="<!-- php: = $type -->"><!-- php: = $type --></option>
                      <!-- php: } -->
                    </SearchableSelectField>
                    <input type="text" value="<!-- php: = $value->partner_company?->business_email -->" class="form-control" name="business_email" id="" placeholder="Business Email" required disabled>
                    <input type="text" value="<!-- php: = $value->partner_company?->business_tele -->" class="form-control" name="business_tele" id="" placeholder="Business Tele" required disabled>
                    <input type="text" value="<!-- php: = $value->partner_company?->business_mobile -->" class="form-control" name="business_mobile" id="" placeholder="Business Mobile" required disabled>
                    <input type="text" value="<!-- php: = $value->partner_company?->business_address -->" class="form-control" name="companyAddress" id="" placeholder="Business Address" required disabled>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="control-label col-md-4">Tin Number
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">
                    <input type="text" value="<!-- php: = $value->partner_company?->tin_number -->" class="form-control" name="tin_number" id="" placeholder="Type Text Here..." required disabled>
                  </div>
                </div>
                <!-- php: if (sizeof($value?->partner_company?->company_directors ?? []) > 0) { -->
                  <!-- php: foreach ($value->partner_company?->company_directors as $keyD => $director): -->
                    <div class="form-group row">
                      <label class="control-label col-md-4">Director <!-- php: = $keyD + 1 -->
                      </label>
                      <div class="col-md-5" id="">
                        <input type="text" value="<!-- php: = $director->name -->" class="form-control" name="director_name[]" id="" placeholder="Director Name" required disabled>
                        <input type="text" value="<!-- php: = $director->email -->" class="form-control" name="director_email[]" id="" placeholder="Director Email" required disabled>
                        <input type="text" value="<!-- php: = $director->phone_number -->" class="form-control" name="director_mobile[]" id="" placeholder="Director Mobile" required disabled>
                      </div>
                    </div>
                  <!-- php: endforeach -->
                <!-- php: } else { -->
                  <div class="form-group row">
                    <label class="control-label col-md-4">Director
                    </label>
                    <div class="col-md-5">
                      No Directors Available.
                    </div>
                  </div>
                <!-- php: } -->
                <div class="form-group row">
                  <label class="control-label col-md-4">GPS
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">
                    <input type="text" value="<!-- php: = $value->partner_company?->gps -->" class="form-control" name="gps" id="" placeholder="GPS address" required disabled>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- php: } -->

  <div class="modal fade" id="veiwInsuranceDialogue_<!-- php: = $value->id -->" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="">View: <!-- php: = $value->name --> Insurance</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="">
          <div class="card  card-box">
            <div class="card-body">
              <div class="form-body">


                <div class="form-group row">
                  <label class="control-label col-md-4">Region
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">

                    <SearchableSelectField class="form-control input-height" name="region" required disabled>
                      <option value="<!-- php: = $value->region -->"><!-- php: = $value->region --></option>
                      <!-- php: $countries = ['Ghana', 'Togo', 'Benin', 'Nigeria']; foreach ($countries as $key => $country) { -->
                        <option value="<!-- php: = $country -->"><!-- php: = $country --></option>
                      <!-- php: } -->
                    </SearchableSelectField>
                  </div>
                </div>




                <div class="form-group row">
                  <label class="control-label col-md-4">Directorate
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">

                    <SearchableSelectField class="form-control input-height" name="directorate" id="directorate" required disabled>
                      <option value="<!-- php: = $value->directorate -->"><!-- php: = $value->directorate --></option>
                      <!-- php: $places = ['Spintex', 'Tema', 'Accra']; foreach ($places as $place) { -->
                        <option value="<!-- php: = $place -->"><!-- php: = $place --></option>
                      <!-- php: } -->
                    </SearchableSelectField>
                  </div>
                </div>




                <div class="form-group row">
                  <label class="control-label col-md-4">Insurance Name
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">
                    <input type="text" value="<!-- php: = $value->name -->" name="insurance_name" class="form-control" placeholder="Insurance Name" required disabled>
                  </div>
                </div>




                <div class="form-group row">
                  <label class="control-label col-md-4">Accreditation Number
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">
                    <input type="text" value="<!-- php: = $value->accreditation_no -->" name="accreditation_no" class="form-control" placeholder="Accreditation Number" required disabled>
                  </div>
                </div>



                <div class="form-group row">
                  <label class="control-label col-md-4">Health Care Provider Level
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">
                    <!-- php: $levels = ['Level - 1', 'Level - 2', 'Level - 3'] -->
                    <SearchableSelectField class="form-control input-height" name="health_care_provider_level" required disabled>
                      <option value="<!-- php: = $value->health_care_provider_level -->"><!-- php: = $levels[(int)$value->health_care_provider_level] --></option>
                      <!-- php: foreach ($levels as $key => $level) { -->
                        <option value="<!-- php: = $key -->"><!-- php: = $level --></option>
                      <!-- php: } -->
                    </SearchableSelectField>
                  </div>
                </div>



                <div class="form-group row">
                  <label class="control-label col-md-4">Health Care prescription Level
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">
                    <!-- php: $levels = ['Level - 1', 'Level - 2', 'Level - 3']; -->
                    <SearchableSelectField class="form-control input-height" name="health_care_prescription_level" required disabled>
                      <option value="<!-- php: = $value->health_care_prescription_level -->"><!-- php: = $levels[(int)$value->health_care_prescription_level] --></option>
                      <!-- php: foreach ($levels as $key => $level) { -->
                        <option value="<!-- php: = $key -->"><!-- php: = $level --></option>
                      <!-- php: } -->
                    </SearchableSelectField>
                  </div>
                </div>




                <div class="form-group row">
                  <label class="control-label col-md-4">Drug Formulary
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">
                    <!-- php: $statuses = ['Inactive', 'Active']; -->
                    <SearchableSelectField class="form-control input-height" name="drug_formulary" required disabled>
                      <option value="<!-- php: = $value->drug_formulary -->"><!-- php: = $statuses[$value->drug_formulary] --></option>
                      <!-- php: foreach ($statuses as $key => $status) { -->
                        <option value="<!-- php: = $key -->"><!-- php: = $status --></option>
                      <!-- php: } -->
                    </SearchableSelectField>
                  </div>
                </div>




                <div class="form-group row">
                  <label class="control-label col-md-4">Co-Pay
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">
                    <SearchableSelectField class="form-control input-height" name="copay" required disabled>
                      <!-- php: $statuses = ['Inactive', 'Active']; -->
                      <!-- php: foreach ($statuses as $key => $status) { -->
                        <option value="<!-- php: = $key -->" <!-- php: = ($key == $value->copay) ? "selected=selected" : '' -->><!-- php: = $status --></option>
                      <!-- php: } -->
                    </SearchableSelectField>
                  </div>
                </div>


              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="editPartnerComapny<!-- php: = $value->id -->" role="dialog">
    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'InsuranceProfilePolicies', 'action' => 'editCompanyProfile', $value->partner_company?->id], 'id' => 'companyedit_' . $value->id]) -->
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="editFloatDialogueTitle">Edit: <!-- php: = $value->partner_company?->company_name --> Company Insurance</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="">
          <div class="card  card-box">
            <div class="card-body">
              <div class="form-group row">
                <label class="control-label col-md-4">Name
                  <span class="required"> * </span>
                </label>
                <div class="col-md-5">
                  <input type="text" value="<!-- php: = $value->name -->" class="form-control" name="insurance_name" id="insurance_name" placeholder="Type Text Here..." required>
                </div>
              </div>

              <div class="form-group row">
                <label class="control-label col-md-4">Country
                  <span class="required"> * </span>
                </label>
                <div class="col-md-5">
                  <SearchableSelectField class="form-control input-height" name="country" required>
                    <option value="<!-- php: = $value->region -->"><!-- php: = $value->region --></option>
                    <!-- php: $types = ['Ghana', 'Togo', 'Senegal']; foreach ($types as $type) { -->
                      <option value="<!-- php: = $type -->"><!-- php: = $type --></option>
                    <!-- php: } -->
                  </SearchableSelectField>
                </div>
              </div>

              <div class="form-group row">
                <label class="control-label col-md-4">Region
                  <span class="required"> * </span>
                </label>
                <div class="col-md-5">

                  <SearchableSelectField class="form-control input-height" name="region" required>
                    <option value="<!-- php: = $value->directorate -->"><!-- php: = $value->directorate --></option>
                    <!-- php: $types = ['Greater Accra', 'Cape Caost', 'Ashanti', 'Western']; foreach ($types as $type) { -->
                      <option value="<!-- php: = $type -->"><!-- php: = $type --></option>
                    <!-- php: } -->
                  </SearchableSelectField>
                </div>
              </div>
              <div class="form-group row">
                <label class="control-label col-md-4">Business
                  <span class="required"> * </span>
                </label>
                <div class="col-md-5">

                  <SearchableSelectField class="form-control input-height" name="business_type" required>
                    <option value="<!-- php: = $value->partner_company?->business_type -->"><!-- php: = $value->partner_company?->business_type --></option>
                    <!-- php: $types = ['Sole Proprietorship', 'Partnership', 'Corporation', 'Limited Liability Company']; foreach ($types as $type) { -->
                      <option value="<!-- php: = $type -->"><!-- php: = $type --></option>
                    <!-- php: } -->
                  </SearchableSelectField>
                  <input type="text" value="<!-- php: = $value->partner_company?->business_email -->" class="form-control" name="business_email" id="" placeholder="Business Email" required>
                  <input type="text" value="<!-- php: = $value->partner_company?->business_tele -->" class="form-control" name="business_tele" id="" placeholder="Business Tele" required>
                  <input type="text" value="<!-- php: = $value->partner_company?->business_mobile -->" class="form-control" name="business_mobile" id="" placeholder="Business Mobile" required>
                  <input type="text" value="<!-- php: = $value->partner_company?->business_address -->" class="form-control" name="companyAddress" id="" placeholder="Business Address" required>
                </div>
              </div>

              <div class="form-group row">
                <label class="control-label col-md-4">Tin Number
                  <span class="required"> * </span>
                </label>
                <div class="col-md-5">
                  <input type="text" value="<!-- php: = $value->partner_company?->tin_number -->" class="form-control" name="tin_number" id="" placeholder="Type Text Here..." required>
                </div>
              </div>
              <!-- php: if ($value?->partner_company?->company_directors && sizeof($value?->partner_company?->company_directors ?? []) > 0) { -->
                <div class="form-group row">
                  <label class="control-label col-md-4">
                    Directors <span class="btn btn-xs btn-primary" onclick="addMoreDirector(<!-- php: = $value->id -->)">ADD <i class="fa fa-plus"></i> </span>
                    <br>
                  </label>
                  <div class="col-md-5" id="director_section<!-- php: = $value->id -->">
                    <!-- php: foreach ($value->partner_company?->company_directors as $keyD => $director): -->
                      <input type="text" value="<!-- php: = $director->name -->" class="form-control " name="director_name[]" id="d_name<!-- php: = $value->id --><!-- php: = $director->id -->" placeholder="Director Name" required>
                      <input type="text" value="<!-- php: = $director->email -->" class="form-control" name="director_email[]" id="d_email<!-- php: = $value->id --><!-- php: = $director->id -->" placeholder="Director Email" required>
                      <input type="text" value="<!-- php: = $director->phone_number -->" class="form-control" name="director_mobile[]" id="d_mobile<!-- php: = $value->id --><!-- php: = $director->id -->" placeholder="Director Mobile" required>
                      <a style="color:red" href="javascript:void(0);" onclick="removeExtraFields(<!-- php: = $value->id --><!-- php: = $director->id -->)" id="remove_more_button<!-- php: = $value->id --><!-- php: = $director->id -->">Remove</a>
                    <!-- php: endforeach -->
                  </div>
                </div>
              <!-- php: } else { -->
                <div class="form-group row">
                  <label class="control-label col-md-4">Director <div class="btn btn-xs btn-primary" onclick="addMoreDirector(<!-- php: = $value->id -->)">ADD <i class="fa fa-plus"></i> </div>
                  </label>
                  <div class="col-md-5" id="director_section<!-- php: = $value->id -->">
                  </div>
                </div>
              <!-- php: } -->
              <div class="form-group row">
                <label class="control-label col-md-4">GPS
                  <span class="required"> * </span>
                </label>
                <div class="col-md-5">
                  <input type="text" value="<!-- php: = $value->partner_company?->gps -->" class="form-control" name="gps" id="" placeholder="GPS address" required>
                </div>
              </div>

              <div class="form-actions">
                <div class="row">
                  <div class="offset-md-3 col-md-9">
                    <button type="submit" id="editCompany_<!-- php: = $value->id -->" class="btn btn-info">Submit</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- php: = $this->Form->end() -->
  </div>

  <div class="modal fade" id="editInsuranceProfile<!-- php: = $value->id -->" role="dialog">
    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'InsuranceProfilePolicies', 'action' => 'editInsuranceProfile', $value->id], 'id' => 'editInsuranceProfile_' . $value->id]) -->
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="editFloatDialogueTitle">Edit: <!-- php: = $value->name --> Insurance</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="">
          <div class="card  card-box">
            <div class="card-body">
              <div class="form-body">


                <div class="form-group row">
                  <label class="control-label col-md-4">Region
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">

                    <SearchableSelectField class="form-control input-height" name="region" required>
                      <option value="<!-- php: = $value->region -->"><!-- php: = $value->region --></option>
                      <!-- php: $countries = ['Ghana', 'Togo', 'Benin', 'Nigeria']; foreach ($countries as $key => $country) { -->
                        <option value="<!-- php: = $country -->"><!-- php: = $country --></option>
                      <!-- php: } -->
                    </SearchableSelectField>
                  </div>
                </div>




                <div class="form-group row">
                  <label class="control-label col-md-4">Directorate
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">

                    <SearchableSelectField class="form-control input-height" name="directorate" id="directorate" required>
                      <option value="<!-- php: = $value->directorate -->"><!-- php: = $value->directorate --></option>
                      <!-- php: $places = ['Spintex', 'Tema', 'Accra']; foreach ($places as $place) { -->
                        <option value="<!-- php: = $place -->"><!-- php: = $place --></option>
                      <!-- php: } -->
                    </SearchableSelectField>
                  </div>
                </div>




                <div class="form-group row">
                  <label class="control-label col-md-4">Insurance Name
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">
                    <input type="text" value="<!-- php: = $value->name -->" name="name" class="form-control" placeholder="Insurance Name" required>
                  </div>
                </div>




                <div class="form-group row">
                  <label class="control-label col-md-4">Accreditation Number
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">
                    <input type="text" value="<!-- php: = $value->accreditation_no -->" name="accreditation_no" class="form-control" placeholder="Accreditation Number" required>
                  </div>
                </div>



                <!-- php: if ($value->insurance_profile_type_id == 1): -->
                  <div class="form-group row">
                    <label class="control-label col-md-4">eClaim Authorization Number
                      <span class="required"> </span>
                    </label>
                    <div class="col-md-5">
                      <input type="text" value="<!-- php: = $value->eclaim_auth_number -->" name="eclaim_auth_number" id="eclaim_auth_number" class="form-control next-one" placeholder="eClaim Authorisation number..." required>
                    </div>
                  </div>
                <!-- php: endif; -->



                <!-- php: if ($value->insurance_profile_type_id == 1): -->
                  <div class="form-group row">
                    <label class="control-label col-md-4">NHIS Payer ID
                      <span class="required"> </span>
                    </label>
                    <div class="col-md-5">
                      <input type="text" value="<!-- php: = $value->nhis_payer_id -->" name="nhis_payer_id" id="nhis_payer_id" class="form-control next-one" placeholder="Payer ID..." required>
                    </div>
                  </div>
                <!-- php: endif; -->




                <div class="form-group row">
                  <label class="control-label col-md-4">Health Care Provider Level
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">
                    <SearchableSelectField class="form-control input-height" name="health_care_provider_level" required>
                      <!-- php: $levels = ['Level - 1', 'Level - 2', 'Level - 3']; foreach ($levels as $key => $level) { -->
                        <option value="<!-- php: = $key -->" <!-- php: = $value->health_care_provider_level == $key ? 'selected="selected"' : '' -->><!-- php: = $level --></option>
                      <!-- php: } -->
                    </SearchableSelectField>
                  </div>
                </div>



                <div class="form-group row">
                  <label class="control-label col-md-4">Health Care prescription Level
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">
                    <SearchableSelectField class="form-control input-height" name="health_care_prescription_level" required>
                      <!-- php: $levels = ['Level - 1', 'Level - 2', 'Level - 3']; foreach ($levels as $key => $level) { -->
                        <option value="<!-- php: = $key -->" <!-- php: = $value->health_care_prescription_level == $key ? 'selected="selected"' : '' -->><!-- php: = $level --></option>
                      <!-- php: } -->
                    </SearchableSelectField>
                  </div>
                </div>




                <div class="form-group row">
                  <label class="control-label col-md-4">Drug Formulary
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">
                    <SearchableSelectField class="form-control input-height" name="drug_formulary" required>
                      <!-- php: $statuses = ['Inactive', 'Active']; foreach ($statuses as $key => $status) { -->
                        <option value="<!-- php: = $key -->" <!-- php: = $value->drug_formulary == $key ? 'selected="selected"' : '' -->><!-- php: = $status --></option>
                      <!-- php: } -->
                    </SearchableSelectField>
                  </div>
                </div>




                <div class="form-group row">
                  <label class="control-label col-md-4">Co-Pay
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-5">
                    <SearchableSelectField class="form-control input-height" name="copay" required>
                      <!-- php: $statuses = ['Inactive', 'Active']; foreach ($statuses as $key => $status) { -->
                        <option value="<!-- php: = $key -->" <!-- php: = ($key == $value->copay) ? "selected=selected" : '' -->><!-- php: = $status --></option>
                      <!-- php: } -->
                    </SearchableSelectField>
                  </div>
                </div>


              </div>

              <div class="form-actions">
                <div class="row">
                  <div class="offset-md-3 col-md-9">
                    <button type="submit" class="btn btn-info">Submit</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- php: = $this->Form->end() -->
  </div>
<!-- php: endforeach -->

<script>
  counter = 0;

  function addMoreDirector(id) {
    counter++;
    $(\`
      <input type="text" value="" class="form-control director" name="director_name[]" id="d_name\${counter}" placeholder="Director Name" required>
      <input type="text" value="" class="form-control" name="director_email[]" id="d_email\${counter}" placeholder="Director Email" required>
      <input type="text" value="" class="form-control" name="director_mobile[]" id="d_mobile\${counter}" placeholder="Director Mobile" required>
      <a style="color:red" href="javascript:void(0);" onclick="removeExtraFields(\${counter})" id="remove_more_button\${counter}">Remove</a>
      \`).appendTo("#director_section" + id);
  }

  function removeExtraFields(counter) {
    $('#d_name' + counter).remove();
    $('#d_email' + counter).remove();
    $('#d_mobile' + counter).remove();
    $('#remove_more_button' + counter).remove();
  }
</script>

<script>
  $(document).ready(function() {
    /**********************GLOBAL********************/


    function showSection(id) {
      //check if has class d-none 
      if ($(\`#\${id}\`).hasClass('d-none')) {
        //show policy title - by removing d-none
        $(\`#\${id}\`).removeClass('d-none')
      }
    }


    function hideSection(id) {
      //check if does not have class d-none 
      if (!$(\`#\${id}\`).hasClass('d-none')) {
        //hide policy title - by adding d-none 
        $(\`#\${id}\`).addClass('d-none')
      }
    }








    /**********************TRIGGERS********************/

    //Policy Offered - show policy title 
    //Check for value of select 
    $('#policyOffered').change(function() {
      //get value of select
      const value = $(this).find(':selected').val();

      //check value 
      if (value == 1) {
        //hide policy titles 
        hideSection('policyOneDiv')
        hideSection('policyTwoDiv')
        hideSection('policyThreeDiv')
        hideSection('policyFourDiv')
        hideSection('policyFiveDiv')


      } else if (value == 2) {
        //show policy title  
        showSection('policyOneDiv');
        showSection('policyTwoDiv');
        hideSection('policyThreeDiv')
        hideSection('policyFourDiv')
        hideSection('policyFiveDiv')


      } else if (value == 3) {
        showSection('policyOneDiv');
        showSection('policyTwoDiv');
        showSection('policyThreeDiv')
        hideSection('policyFourDiv')
        hideSection('policyFiveDiv')


      } else if (value == 4) {
        showSection('policyOneDiv');
        showSection('policyTwoDiv');
        showSection('policyThreeDiv')
        showSection('policyFourDiv')
        hideSection('policyFiveDiv')

      } else if (value == 5) {
        showSection('policyOneDiv');
        showSection('policyTwoDiv');
        showSection('policyThreeDiv')
        showSection('policyFourDiv')
        showSection('policyFiveDiv')
      }

    })

    //Policy 1 custom field
    //Display when custom is selected 
    $('#policyOne').change(function() {
      //value of policy select 
      const value = $(this).find(':selected').val()

      //if value = custom show custom field 
      if (value === 'Custom') {

        $('#policyOneCustom').removeClass('d-none');
      } else {
        //check if custom field is displayed 
        if (!$('#policyOneCustom').hasClass('d-none')) {
          $('#policyOneCustom').addClass('d-none');

        }
      }
    })


    //Policy 2 custom field
    //Display when custom is selected 
    $('#policyTwo').change(function() {
      //value of policy select 
      const value = $(this).find(':selected').val()

      //if value = custom show custom field 
      if (value === 'Custom') {

        $('#policyTwoCustom').removeClass('d-none');
      } else {
        //check if custom field is displayed 
        if (!$('#policyTwoCustom').hasClass('d-none')) {
          $('#policyTwoCustom').addClass('d-none');

        }
      }
    })



    //Policy 3 custom field
    //Display when custom is selected 
    $('#policyThree').change(function() {
      //value of policy select 
      const value = $(this).find(':selected').val()

      //if value = custom show custom field 
      if (value === 'Custom') {

        $('#policyThreeCustom').removeClass('d-none');
      } else {
        //check if custom field is displayed 
        if (!$('#policyThreeCustom').hasClass('d-none')) {
          $('#policyThreeCustom').addClass('d-none');

        }
      }
    })


    //Policy 4 custom field
    //Display when custom is selected 
    $('#policyFour').change(function() {
      //value of policy select 
      const value = $(this).find(':selected').val()

      //if value = custom show custom field 
      if (value === 'Custom') {

        $('#policyFourCustom').removeClass('d-none');
      } else {
        //check if custom field is displayed 
        if (!$('#policyFourCustom').hasClass('d-none')) {
          $('#policyFourCustom').addClass('d-none');

        }
      }
    })





    //Policy 5 custom field
    //Display when custom is selected 
    $('#policyFive').change(function() {
      //value of policy select 
      const value = $(this).find(':selected').val()

      //if value = custom show custom field 
      if (value === 'Custom') {

        $('#policyFiveCustom').removeClass('d-none');
      } else {
        //check if custom field is displayed 
        if (!$('#policyFiveCustom').hasClass('d-none')) {
          $('#policyFiveCustom').addClass('d-none');

        }
      }
    })



    //Director Number - show Director Section
    //Check for value of select 
    $('#directorNumber').change(function() {
      //get value of select
      const value = $(this).find(':selected').val();

      console.log('selected value:' + value)

      //check value 
      if (value == 1) {
        showSection('directorOneDiv')
        hideSection('directorTwoDiv');
        hideSection('directorThreeDiv')
        hideSection('directorFourDiv')
        hideSection('directorFiveDiv')

      } else if (value == 2) {
        showSection('directorOneDiv')
        showSection('directorTwoDiv');
        hideSection('directorThreeDiv')
        hideSection('directorFourDiv')
        hideSection('directorFiveDiv')

      } else if (value == 3) {
        showSection('directorOneDiv')
        showSection('directorTwoDiv');
        showSection('directorThreeDiv')
        hideSection('directorFourDiv')
        hideSection('directorFiveDiv')
      } else if (value == 4) {
        showSection('directorOneDiv')
        showSection('directorTwoDiv');
        showSection('directorThreeDiv')
        showSection('directorFourDiv')
        hideSection('directorFiveDiv')
      } else if (value == 5) {
        showSection('directorOneDiv')
        showSection('directorTwoDiv');
        showSection('directorThreeDiv')
        showSection('directorFourDiv')
        showSection('directorFiveDiv')
      }

    })



    //Submit - for public insurance 
    $(".next-one").click(function() {
      publicIsValid = true;
      $('#public_region, #public_directorate, #public_insurance_name, #public_accreditation_no, #health_care_provider_level, #public_health_care_prescription_level, #drug_formulary, #public_copay').each(function() {
        if ($.trim($(this).val()) == '') {
          publicIsValid = false;
          $(this).css({
            "border": "1px solid red",
            "background": ""
          });
        } else {
          $(this).css({
            "border": "1px solid green",
            "background": ""
          });
        }
      });
      if (publicIsValid == true) {
        $(".two").addClass("active");
        $("#step_one").attr("hidden", "hidden");
        $("#step_two").removeAttr("hidden");
      }
    });
    $('#publicForm').submit(function(e) {
      //Stop refresh 
      e.preventDefault();

      console.log($(this).serialize())


      if (typeof publicIsValid == 'undefined' || publicIsValid == false) {
        alert('Please Fill the form where required.');
        return false;
      }
      $.ajax({
        type: 'POST',
        data: $(this).serialize(),
        // url: '</?= $this->Url->build(['controller' => 'InsuranceProfilePolicies', 'action' => 'addPublicInsurance']) ?>'
        url: '<!-- php: = $this->Url->build(['controller' => 'InsuranceProfilePolicies', 'action' => 'addPublicInsuranceNew']) -->'

      }).done((data) => {
        //logs
        console.log('/add insurance profile  done')
        console.log(data)
        //reload page 
        location.reload();
      }).fail((data) => {
        //logs
        console.log('/add insurance profile  done')
        // console.log(data)
        location.reload();
      })




    })

    $(".next-one").click(function() {
      privateIsValid = true;
      $('#privateRegion, #privateDirectorate, #privateInsuranceName, #privateAccreditationNo, #privateHC_provider, #privateHC_prescription, #privateDrug_formulary, #privateCoPay').each(function() {
        if ($.trim($(this).val()) == '') {
          privateIsValid = false;
          $(this).css({
            "border": "1px solid red",
            "background": ""
          });
        } else {
          $(this).css({
            "border": "1px solid green",
            "background": ""
          });
        }
      });
      if (privateIsValid == true) {
        $(".two").addClass("active");
        $("#step_one").attr("hidden", "hidden");
        $("#step_two").removeAttr("hidden");
      }
    });

    //submit - for private insurance 
    $('#submitPrivateForm').on('click', function() {
      if (typeof privateIsValid == 'undefined' || privateIsValid == false) {
        alert('Please Fill the form where required.');
        return false;
      }
      //create json obj
      let data = {
        'region': $('#privateRegion').find(':selected').val(),
        'directorate': $('#privateDirectorate').val(),
        'name': $('#privateInsuranceName').val(),
        'accred_no': $('#privateAccreditationNo').val(),
        'hc_provider': $('#privateHC_provider').find(':selected').val(),
        'hc_prescription': $('#privateHC_prescription').find(':selected').val(),
        'drug_formulary': $('#privateDrug_formulary').find(':selected').val(),
        'co_pay': $('#privateCoPay').find(':selected').val(),
        'policyTitle': []

      }


      //create json array for policy 
      let policy_array
      const policyOfferedNum = $('#policyOffered').find(':selected').val()
      //check policy offered
      //create array for every possible scenario
      if (policyOfferedNum == 1) {

        policy_array = ['Premium']
      } else if (policyOfferedNum == 2) {
        //check if custom is choosen
        let policy_one, policy_two
        const value_policy_one_select = $('#policyOne').find(':selected').val();
        const value_policy_two_select = $('#policyTwo').find(':selected').val();


        //check custom for policy one title
        if (value_policy_one_select == 'Custom') {
          policy_one = $('#policyOneCustom').val();
        } else {
          policy_one = value_policy_one_select
        }

        //check custom for policy two title 
        if (value_policy_two_select == 'Custom') {
          policy_two = $('#policyTwoCustom').val();
        } else {
          policy_two = value_policy_two_select
        }

        //add to json array 
        policy_array = [policy_one, policy_two]
      } else if (policyOfferedNum == 3) {
        //check if custom is choosen
        let policy_one, policy_two, policy_three
        const value_policy_one_select = $('#policyOne').find(':selected').val();
        const value_policy_two_select = $('#policyTwo').find(':selected').val();
        const value_policy_three_select = $('#policyThree').find(':selected').val();


        //check custom for policy one title
        if (value_policy_one_select == 'Custom') {
          policy_one = $('#policyOneCustom').val();
        } else {
          policy_one = value_policy_one_select
        }

        //check custom for policy two title 
        if (value_policy_two_select == 'Custom') {
          policy_two = $('#policyTwoCustom').val();
        } else {
          policy_two = value_policy_two_select
        }


        //check custom for policy three title 
        if (value_policy_three_select == 'Custom') {
          policy_three = $('#policyThreeCustom').val();
        } else {
          policy_three = value_policy_three_select
        }

        //add to json array 
        policy_array = [policy_one, policy_two, policy_three]

      } else if (policyOfferedNum == 4) {
        //check if custom is choosen
        let policy_one, policy_two, policy_three, policy_four
        const value_policy_one_select = $('#policyOne').find(':selected').val();
        const value_policy_two_select = $('#policyTwo').find(':selected').val();
        const value_policy_three_select = $('#policyThree').find(':selected').val();
        const value_policy_four_select = $('#policyFour').find(':selected').val();


        //check custom for policy one title
        if (value_policy_one_select == 'Custom') {
          policy_one = $('#policyOneCustom').val();
        } else {
          policy_one = value_policy_one_select
        }

        //check custom for policy two title 
        if (value_policy_two_select == 'Custom') {
          policy_two = $('#policyTwoCustom').val();
        } else {
          policy_two = value_policy_two_select
        }


        //check custom for policy three title 
        if (value_policy_three_select == 'Custom') {
          policy_three = $('#policyThreeCustom').val();
        } else {
          policy_three = value_policy_three_select
        }


        //check custom for policy four title 
        if (value_policy_four_select == 'Custom') {
          policy_four = $('#policyFourCustom').val();
        } else {
          policy_four = value_policy_four_select
        }

        //add to json array 
        policy_array = [policy_one, policy_two, policy_three, policy_four]

      } else if (policyOfferedNum == 5) {

        //check if custom is choosen
        let policy_one, policy_two, policy_three, policy_four, policy_five
        const value_policy_one_select = $('#policyOne').find(':selected').val();
        const value_policy_two_select = $('#policyTwo').find(':selected').val();
        const value_policy_three_select = $('#policyThree').find(':selected').val();
        const value_policy_four_select = $('#policyFour').find(':selected').val();
        const value_policy_five_select = $('#policyFive').find(':selected').val();


        //check custom for policy one title
        if (value_policy_one_select == 'Custom') {
          policy_one = $('#policyOneCustom').val();
        } else {
          policy_one = value_policy_one_select
        }

        //check custom for policy two title 
        if (value_policy_two_select == 'Custom') {
          policy_two = $('#policyTwoCustom').val();
        } else {
          policy_two = value_policy_two_select
        }


        //check custom for policy three title 
        if (value_policy_three_select == 'Custom') {
          policy_three = $('#policyThreeCustom').val();
        } else {
          policy_three = value_policy_three_select
        }


        //check custom for policy four title 
        if (value_policy_four_select == 'Custom') {
          policy_four = $('#policyFourCustom').val();
        } else {
          policy_four = value_policy_four_select
        }

        //check custom for policy five title 
        if (value_policy_five_select == 'Custom') {
          policy_five = $('#policyFiveCustom').val();
        } else {
          policy_five = value_policy_five_select
        }

        //add to json array 
        policy_array = [policy_one, policy_two, policy_three, policy_four, policy_five]



      }


      //add policy Title as array to exisiting object 
      data.policyTitle.push(policy_array);

      console.log(data);

      //Ajax
      $.ajax({
        type: 'POST',
        data: data,
        url: '<!-- php: = $this->Url->build(['controller' => 'InsuranceProfilePolicies', 'action' => 'addPrivateInsurance']) -->'
      }).done((data) => {
        //logs
        console.log('/add private insurance done');
        console.log(data)
        location.reload();
      }).fail((data) => {
        //logs
        console.log('/add private insurance fail');
        console.log(data);
        // location.reload();
      })









    })

    // "#directorTwo_name, #directorTwo_email, #directorTwo_mobile, #directorThree_name, #directorThree_email, #directorThree_mobile, #directorFour_name, #directorFour_email, #directorFour_mobile, #directorFive_name, #directorFive_email, #directorFive_mobile,"
    $(".next-one").click(function() {
      companyIsValid = true;
      $('#companyName, #tinNo, #busineesType, #business_email, #business_tele, #business_mobile, #companyCountry, #companyRegion, #companyGPS, #companyAddress, #directorNumber, #directorOne_name, #directorOne_email, #directorOne_mobile,  #rm_name, #rm_email, #rm_mobile, #tiers').each(function() {
        if ($.trim($(this).val()) == '') {
          companyIsValid = false;
          $(this).css({
            "border": "1px solid red",
            "background": ""
          });
        } else {
          $(this).css({
            "border": "1px solid green",
            "background": ""
          });
        }
      });
      if (companyIsValid == true) {
        $(".two").addClass("active");
        $("#step_one").attr("hidden", "hidden");
        $("#step_two").removeAttr("hidden");
      }
    });

    //submit - for company insurance 
    $('#submitCompanyForm').on('click', function() {
      if (typeof companyIsValid == 'undefined' || companyIsValid == false) {
        alert('Please Fill the form where required.');
        return false;
      }
    })




  })

  function editSubmission(link, data) {
    $.ajax({
      type: 'POST',
      data: data,
      url: link
    }).done((data) => {
      //logs
      console.log('/Edited Successfully done');
      console.log(data)
      location.reload();
    }).fail((data) => {
      //logs
      console.log('/there was an issue');
      // console.log(data);
      location.reload();
    })
  }
</script>

<script>
  <!-- php: foreach ($insuranceProfiles as $value): -->
    $("#companyedit_<!-- php: = $value->id -->").submit(function(e) {
      e.preventDefault();
      form = document.getElementById('companyedit_<!-- php: = $value->id -->')
      var data = $('#companyedit_<!-- php: = $value->id -->').serializeArray();
      var action = form.action
      editSubmission(action, data);
    });
  <!-- php: endforeach -->
  <!-- php: foreach ($insuranceProfiles as $value): -->
    $("#editInsuranceProfile_<!-- php: = $value->id -->").submit(function(e) {
      e.preventDefault();
      form = document.getElementById('editInsuranceProfile_<!-- php: = $value->id -->')
      var data = $('#editInsuranceProfile_<!-- php: = $value->id -->').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
      }, {});
      var action = form.action
      console.log(action)
      console.log(data)
      editSubmission(action, data);
    });
  <!-- php: endforeach -->
</script>

<script>
  document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });

    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });

    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();

      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }

      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        thumbnailElement.style.backgroundImage = \`url('\${reader.result}')\`;
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }
</script>
`;

export default function InsuranceProfilesIndexPage() {
  return (
    <PageShell title="InsuranceProfiles/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
