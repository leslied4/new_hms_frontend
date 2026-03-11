import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitDoctorNotes/view.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PatientVisitDoctorNote $patientVisitDoctorNote */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('Edit Patient Visit Doctor Note'), ['action' => 'edit', $patientVisitDoctorNote->id]) --> </li>
        <li><!-- php: = $this->Form->postLink(__('Delete Patient Visit Doctor Note'), ['action' => 'delete', $patientVisitDoctorNote->id], ['confirm' => __('Are you sure you want to delete # {0}?', $patientVisitDoctorNote->id)]) --> </li>
        <li><!-- php: = $this->Html->link(__('List Patient Visit Doctor Notes'), ['action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New Patient Visit Doctor Note'), ['action' => 'add']) --> </li>
        <li><!-- php: = $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) --> </li>
        <li><!-- php: = $this->Html->link(__('List Patient Visits'), ['controller' => 'PatientVisits', 'action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New Patient Visit'), ['controller' => 'PatientVisits', 'action' => 'add']) --> </li>
    </ul>
</nav>
<div class="patientVisitDoctorNotes view large-9 medium-8 columns content">
    <h3><!-- php: = h($patientVisitDoctorNote->title) --></h3>
    <table class="vertical-table">
        <tr>
            <th scope="row"><!-- php: = __('User') --></th>
            <td><!-- php: = $patientVisitDoctorNote->has('user') ? $this->Html->link($patientVisitDoctorNote->user->full_name, ['controller' => 'Users', 'action' => 'view', $patientVisitDoctorNote->user->id]) : '' --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Patient Visit') --></th>
            <td><!-- php: = $patientVisitDoctorNote->has('patient_visit') ? $this->Html->link($patientVisitDoctorNote->patient_visit->id, ['controller' => 'PatientVisits', 'action' => 'view', $patientVisitDoctorNote->patient_visit->id]) : '' --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Id') --></th>
            <td><!-- php: = $this->Number->format($patientVisitDoctorNote->id) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Date Created') --></th>
            <td><!-- php: = h($patientVisitDoctorNote->date_created) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Date Modified') --></th>
            <td><!-- php: = h($patientVisitDoctorNote->date_modified) --></td>
        </tr>
    </table>
    <div class="row">
        <h4><!-- php: = __('Chief Complaint') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->chief_complaint)); -->
    </div>
    <div class="row">
        <h4><!-- php: = __('History Of Presenting Illness') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->history_of_presenting_illness)); -->
    </div>
    <div class="row">
        <h4><!-- php: = __('On Direct Questioning') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->on_direct_questioning)); -->
    </div>
    <div class="row">
        <h4><!-- php: = __('Past Medical History') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->past_medical_history)); -->
    </div>
    <div class="row">
        <h4><!-- php: = __('Allergy') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->allergy)); -->
    </div>
    <div class="row">
        <h4><!-- php: = __('Medication History') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->medication_history)); -->
    </div>
    <div class="row">
        <h4><!-- php: = __('Surgical History') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->surgical_history)); -->
    </div>
    <div class="row">
        <h4><!-- php: = __('Childhood Illness') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->childhood_illness)); -->
    </div>
    <div class="row">
        <h4><!-- php: = __('Immunization History') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->immunization_history)); -->
    </div>
    <div class="row">
        <h4><!-- php: = __('Family History') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->family_history)); -->
    </div>
    <div class="row">
        <h4><!-- php: = __('Personal Social History') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->personal_social_history)); -->
    </div>
    <div class="row">
        <h4><!-- php: = __('Illicit Substance Use') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->illicit_substance_use)); -->
    </div>
    <div class="row">
        <h4><!-- php: = __('Contraception History') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->contraception_history)); -->
    </div>
    <div class="row">
        <h4><!-- php: = __('Pregnancy History') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->pregnancy_history)); -->
    </div>
    <div class="row">
        <h4><!-- php: = __('Gynaecological History') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->Gynaecological_history)); -->
    </div>
    <div class="row">
        <h4><!-- php: = __('Obstetric History') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->obstetric_history)); -->
    </div>
    <div class="row">
        <h4><!-- php: = __('Examinations') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->examinations)); -->
    </div>
    <div class="row">
        <h4><!-- php: = __('Remarks') --></h4>
        <!-- php: = $this->Text->autoParagraph(h($patientVisitDoctorNote->remarks)); -->
    </div>
</div>

`;

export default function PatientVisitDoctorNotesViewPage() {
  return (
    <PageShell title="PatientVisitDoctorNotes/view.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
