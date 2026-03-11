const rawHtml = `
<div class="row">
  <div class="borderBox light bordered col-md-12">
    <div class="card  card-box">
      <div class="card-body ">
        <div id="container-consent">
            <div id="consent">
                <h1>We Need Patient Consent To Proceed with Surgery</h1>
                <hr>
                <div class="legal well">
                    <p>
                      Surgery for patient <span class="font-weight-bold"><!-- php: = $patient->first_name --> <!-- php: = $patient->last_name --></span>
                    </p>
                    <p>
                      Download the consent form here
                    </p>
        
                    <button type="button" class="btn btn-primary btn-sm">
                      <!-- php: = $this->Html->link('Copy of Consent File', '/files/template.csv', ['download'=>'template.csv', 'style'=> "color:white"]); -->
                    </button>
                </div>
        
                <hr>
                <!-- php: = $this->Form->create(null, ['type' => 'file', 'url' =>['controller' => 'Patients','action'=>'addPatient'],'id'=>'patient_register_form']); -->
                  <div class="form-group row">
                    <label class="control-label col-md-4">Is Emergency
                      <span class="required"> * </span>
                    </label>
                    <div class="col-md-5">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="is_emergency" id="stat_radio" value="chronic" checked>
                        <label class="form-check-label" for="stat_radio"><span class="badge rounded-pill" style="background-color: #d63031;">NO</span></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="is_emergency" id="routine_radio" value="acute">
                        <label class="form-check-label" for="routine_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">Yes</span></label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="control-label col-md-4">Doctor (sign Here)
                      <span class="required"> * </span>
                    </label>
                    <div class="col-md-5">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="doctor_sign" id="stat_radio" value="chronic" checked>
                        <label class="form-check-label" for="stat_radio"><span class="badge rounded-pill" style="background-color: #d63031;">NO</span></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="doctor_sign" id="routine_radio" value="acute">
                        <label class="form-check-label" for="routine_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">Yes</span></label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="control-label col-md-4">Patient (sign Here)
                      <span class="required"> * </span>
                    </label>
                    <div class="col-md-5">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="patient_sign" id="stat_radio" value="chronic" checked>
                        <label class="form-check-label" for="stat_radio"><span class="badge rounded-pill" style="background-color: #d63031;">NO</span></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="patient_sign" id="routine_radio" value="acute">
                        <label class="form-check-label" for="routine_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">Yes</span></label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="control-label col-md-4">Signed Document
                    </label>
                    <div class="col-md-5">
                      <input type="file" name="image" id="image" onchange="javascript:readURL(this, 'passport-image');" class="btn btn-circle" accept=".docx,.pdf" />
                    </div>
                  </div>
                <!-- php: =$this->Form->end(); -->
        
                <!-- <div class="">
                  I <span class="">Doctor Babe </span> hereby 
                </div> -->

                <div class="form-actions">
                  <div class="row">
                    <div class="offset-md-4 col-md-9">
                      <button type="submit" onclick="javascript:checkInputFields();" class="btn btn-info">Submit</button>
                      <button type="button" onclick="javascript:clearFields();"  class="btn btn-danger">Reset</button>
                    </div>
                  </div>
                </div>
        
            </div>
        </div>
      </div>
    </div>
  </div>
</div>

`;

export default function ElementElementRequestSurgeriesConsent() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
