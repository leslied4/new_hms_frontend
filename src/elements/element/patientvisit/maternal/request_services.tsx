const rawHtml = `
<div class="borderBox light bordered col-md-12">
    <div class="borderBox-title tabbable-line">
        <div class="caption"><span class="caption-subject font-dark bold uppercase">Request Services</span></div>
        <ul class="nav nav-tabs">
            <li class="nav-item"><a href="#investigations" data-toggle="tab">Investigations</a></li>
            <li class="nav-item"><a href="#prescription" data-toggle="tab">Prescription</a></li>
            <!-- <li class="nav-item"><a href="#immunizations" data-toggle="tab">Immunizations Requests</a></li> -->
            <li class="nav-item"><a href="#procedures" data-toggle="tab">Procedure</a></li>
        </ul>
    </div>
    <div class="tab-content">
    <div class="tab-pane" id="investigations">
        <div class="col-md-12">
            <div class="card-head legend-head">
                <header>Investigations</header>
            </div>

            <div class="card card-box" id="maternal_investigation_div">
                <div class="card-body" id="bar-investigations-parent">

                    <!-- php: = $this->element('patientvisit/requestlabservices', ['hidePreviousLabs' => true]) -->
                </div>
            </div>
        </div>
    </div>
    <div class="tab-pane" id="prescription">
        <div class="col-md-12">
            <div class="card-head legend-head">
                <header><!-- php: = Cake\Core\Configure::read('LABELS.Medications', 'Medications') --></header>
            </div>

            <div class="card card-box" id="maternal_prescription_div">
                <div class="card-body" id="bar-prescription-parent">

                    <!-- php: = $this->element('patientvisit/requestmedicationservices', ['hidePreviousLabs' => true]) -->
                </div>
            </div>
        </div>
    </div>
    <div class="tab-pane" id="procedures">
        <div class="col-md-12">
            <div class="card-head legend-head">
                <header>Procedures</header>
            </div>
            <div class="card card-box" id="maternal_procedure_div">
                <div class="card-body" id="bar-procedure-parent">
                    <!-- php: =$this->element('patientvisit/requestprocedureservices', ['hidePreviousProcedures'=> true]) -->
                </div>
            </div>
        </div>
    </div>
</div>
</div>
`;

export default function ElementElementPatientvisitMaternalRequestServices() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
