import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitDoctorNotes/edit.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PatientVisitDoctorNote $patientVisitDoctorNote */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Form->postLink( __('Delete'), ['action' => 'delete', $patientVisitDoctorNote->id], ['confirm' => __('Are you sure you want to delete # {0}?', $patientVisitDoctorNote->id)] ) --></li>
        <li><!-- php: = $this->Html->link(__('List Patient Visit Doctor Notes'), ['action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) --></li>
        <li><!-- php: = $this->Html->link(__('List Patient Visits'), ['controller' => 'PatientVisits', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New Patient Visit'), ['controller' => 'PatientVisits', 'action' => 'add']) --></li>
    </ul>
</nav>
<div class="patientVisitDoctorNotes form large-9 medium-8 columns content">
    <!-- php: = $this->Form->create($patientVisitDoctorNote) -->
    <fieldset>
        <legend><!-- php: = __('Edit Patient Visit Doctor Note') --></legend>
        <!-- php: echo $this->Form->control('user_id', ['options' => $users]); echo $this->Form->control('patient_visit_id', ['options' => $patientVisits]); echo $this->Form->control('chief_complaint'); echo $this->Form->control('history_of_presenting_illnes... -->
    </fieldset>
    <!-- php: = $this->Form->button(__('Submit')) -->
    <!-- php: = $this->Form->end() -->
</div>

`;

export default function PatientVisitDoctorNotesEditPage() {
  return (
    <PageShell title="PatientVisitDoctorNotes/edit.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
