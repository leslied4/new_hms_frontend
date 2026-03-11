import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitMedicationTasks/add.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PatientVisitMedicationTask $patientVisitMedicationTask */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('List Patient Visit Medication Tasks'), ['action' => 'index']) --></li>
    </ul>
</nav>
<div class="patientVisitMedicationTasks form large-9 medium-8 columns content">
    <!-- php: = $this->Form->create($patientVisitMedicationTask) -->
    <fieldset>
        <legend><!-- php: = __('Add Patient Visit Medication Task') --></legend>
        <!-- php: echo $this->Form->control('title'); echo $this->Form->control('task_desc'); echo $this->Form->control('is_reminder_set'); echo $this->Form->control('is_completed'); echo $this->Form->control('is_paused'); echo $this->Form->control('minutes_... -->
    </fieldset>
    <!-- php: = $this->Form->button(__('Submit')) -->
    <!-- php: = $this->Form->end() -->
</div>

`;

export default function PatientVisitMedicationTasksAddPage() {
  return (
    <PageShell title="PatientVisitMedicationTasks/add.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
