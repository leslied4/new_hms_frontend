import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitMiscellaneousTasks/view.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PatientVisitMiscellaneousTask $patientVisitMiscellaneousTask */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('Edit Patient Visit Miscellaneous Task'), ['action' => 'edit', $patientVisitMiscellaneousTask->id]) --> </li>
        <li><!-- php: = $this->Form->postLink(__('Delete Patient Visit Miscellaneous Task'), ['action' => 'delete', $patientVisitMiscellaneousTask->id], ['confirm' => __('Are you sure you want to delete # {0}?', $patientVisitMiscellaneousTask->id)]) --> </li>
        <li><!-- php: = $this->Html->link(__('List Patient Visit Miscellaneous Tasks'), ['action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New Patient Visit Miscellaneous Task'), ['action' => 'add']) --> </li>
    </ul>
</nav>
<div class="patientVisitMiscellaneousTasks view large-9 medium-8 columns content">
    <h3><!-- php: = h($patientVisitMiscellaneousTask->id) --></h3>
    <table class="vertical-table">
        <tr>
            <th scope="row"><!-- php: = __('Task Desc') --></th>
            <td><!-- php: = h($patientVisitMiscellaneousTask->task_desc) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Title') --></th>
            <td><!-- php: = h($patientVisitMiscellaneousTask->title) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Id') --></th>
            <td><!-- php: = $this->Number->format($patientVisitMiscellaneousTask->id) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Patient Visit Fk') --></th>
            <td><!-- php: = $this->Number->format($patientVisitMiscellaneousTask->patient_visit_fk) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Start Date Time') --></th>
            <td><!-- php: = h($patientVisitMiscellaneousTask->start_date_time) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('End Date Time') --></th>
            <td><!-- php: = h($patientVisitMiscellaneousTask->end_date_time) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Date Created') --></th>
            <td><!-- php: = h($patientVisitMiscellaneousTask->date_created) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('IsReminderSet') --></th>
            <td><!-- php: = $patientVisitMiscellaneousTask->isReminderSet ? __('Yes') : __('No'); --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('IsCompleted') --></th>
            <td><!-- php: = $patientVisitMiscellaneousTask->isCompleted ? __('Yes') : __('No'); --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('IsPaused') --></th>
            <td><!-- php: = $patientVisitMiscellaneousTask->isPaused ? __('Yes') : __('No'); --></td>
        </tr>
    </table>
</div>

`;

export default function PatientVisitMiscellaneousTasksViewPage() {
  return (
    <PageShell title="PatientVisitMiscellaneousTasks/view.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
