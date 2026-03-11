import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitMedicationTasks/view.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PatientVisitMedicationTask $patientVisitMedicationTask */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('Edit Patient Visit Medication Task'), ['action' => 'edit', $patientVisitMedicationTask->id]) --> </li>
        <li><!-- php: = $this->Form->postLink(__('Delete Patient Visit Medication Task'), ['action' => 'delete', $patientVisitMedicationTask->id], ['confirm' => __('Are you sure you want to delete # {0}?', $patientVisitMedicationTask->id)]) --> </li>
        <li><!-- php: = $this->Html->link(__('List Patient Visit Medication Tasks'), ['action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New Patient Visit Medication Task'), ['action' => 'add']) --> </li>
    </ul>
</nav>
<div class="patientVisitMedicationTasks view large-9 medium-8 columns content">
    <h3><!-- php: = h($patientVisitMedicationTask->title) --></h3>
    <table class="vertical-table">
        <tr>
            <th scope="row"><!-- php: = __('Title') --></th>
            <td><!-- php: = h($patientVisitMedicationTask->title) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Task Desc') --></th>
            <td><!-- php: = h($patientVisitMedicationTask->task_desc) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Id') --></th>
            <td><!-- php: = $this->Number->format($patientVisitMedicationTask->id) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Minutes Duration') --></th>
            <td><!-- php: = $this->Number->format($patientVisitMedicationTask->minutes_duration) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Requested Medication Fk') --></th>
            <td><!-- php: = $this->Number->format($patientVisitMedicationTask->requested_medication_fk) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Patient Visit Fk') --></th>
            <td><!-- php: = $this->Number->format($patientVisitMedicationTask->patient_visit_fk) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Start Date Time') --></th>
            <td><!-- php: = h($patientVisitMedicationTask->start_date_time) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('End Date Time') --></th>
            <td><!-- php: = h($patientVisitMedicationTask->end_date_time) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Date Created') --></th>
            <td><!-- php: = h($patientVisitMedicationTask->date_created) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Is Reminder Set') --></th>
            <td><!-- php: = $patientVisitMedicationTask->is_reminder_set ? __('Yes') : __('No'); --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Is Completed') --></th>
            <td><!-- php: = $patientVisitMedicationTask->is_completed ? __('Yes') : __('No'); --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Is Paused') --></th>
            <td><!-- php: = $patientVisitMedicationTask->is_paused ? __('Yes') : __('No'); --></td>
        </tr>
    </table>
</div>

`;

export default function PatientVisitMedicationTasksViewPage() {
  return (
    <PageShell title="PatientVisitMedicationTasks/view.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
