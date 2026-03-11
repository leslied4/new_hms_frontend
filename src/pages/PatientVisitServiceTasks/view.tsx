import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitServiceTasks/view.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PatientVisitServiceTask $patientVisitServiceTask */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('Edit Patient Visit Service Task'), ['action' => 'edit', $patientVisitServiceTask->id]) --> </li>
        <li><!-- php: = $this->Form->postLink(__('Delete Patient Visit Service Task'), ['action' => 'delete', $patientVisitServiceTask->id], ['confirm' => __('Are you sure you want to delete # {0}?', $patientVisitServiceTask->id)]) --> </li>
        <li><!-- php: = $this->Html->link(__('List Patient Visit Service Tasks'), ['action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New Patient Visit Service Task'), ['action' => 'add']) --> </li>
    </ul>
</nav>
<div class="patientVisitServiceTasks view large-9 medium-8 columns content">
    <h3><!-- php: = h($patientVisitServiceTask->title) --></h3>
    <table class="vertical-table">
        <tr>
            <th scope="row"><!-- php: = __('Title') --></th>
            <td><!-- php: = h($patientVisitServiceTask->title) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Task Desc') --></th>
            <td><!-- php: = h($patientVisitServiceTask->task_desc) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Id') --></th>
            <td><!-- php: = $this->Number->format($patientVisitServiceTask->id) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Requested Service Fk') --></th>
            <td><!-- php: = $this->Number->format($patientVisitServiceTask->requested_service_fk) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Requested Lab Fk') --></th>
            <td><!-- php: = $this->Number->format($patientVisitServiceTask->requested_lab_fk) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Requested Surgery Fk') --></th>
            <td><!-- php: = $this->Number->format($patientVisitServiceTask->requested_surgery_fk) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Task Duration In Minutes') --></th>
            <td><!-- php: = $this->Number->format($patientVisitServiceTask->task_duration_in_minutes) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Patient Visit Fk') --></th>
            <td><!-- php: = $this->Number->format($patientVisitServiceTask->patient_visit_fk) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Start Date Time') --></th>
            <td><!-- php: = h($patientVisitServiceTask->start_date_time) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('End Date Time') --></th>
            <td><!-- php: = h($patientVisitServiceTask->end_date_time) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Date Created') --></th>
            <td><!-- php: = h($patientVisitServiceTask->date_created) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Is Completed') --></th>
            <td><!-- php: = $patientVisitServiceTask->is_completed ? __('Yes') : __('No'); --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Is Paused') --></th>
            <td><!-- php: = $patientVisitServiceTask->is_paused ? __('Yes') : __('No'); --></td>
        </tr>
    </table>
</div>

`;

export default function PatientVisitServiceTasksViewPage() {
  return (
    <PageShell title="PatientVisitServiceTasks/view.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
