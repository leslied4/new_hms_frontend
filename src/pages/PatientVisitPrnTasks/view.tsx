import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitPrnTasks/view.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PatientVisitPrnTask $patientVisitPrnTask */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('Edit Patient Visit Prn Task'), ['action' => 'edit', $patientVisitPrnTask->id]) --> </li>
        <li><!-- php: = $this->Form->postLink(__('Delete Patient Visit Prn Task'), ['action' => 'delete', $patientVisitPrnTask->id], ['confirm' => __('Are you sure you want to delete # {0}?', $patientVisitPrnTask->id)]) --> </li>
        <li><!-- php: = $this->Html->link(__('List Patient Visit Prn Tasks'), ['action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New Patient Visit Prn Task'), ['action' => 'add']) --> </li>
        <li><!-- php: = $this->Html->link(__('List Request Prescriptions'), ['controller' => 'RequestPrescriptions', 'action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New Request Prescription'), ['controller' => 'RequestPrescriptions', 'action' => 'add']) --> </li>
        <li><!-- php: = $this->Html->link(__('List Request Infusions'), ['controller' => 'RequestInfusions', 'action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New Request Infusion'), ['controller' => 'RequestInfusions', 'action' => 'add']) --> </li>
        <li><!-- php: = $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) --> </li>
    </ul>
</nav>
<div class="patientVisitPrnTasks view large-9 medium-8 columns content">
    <h3><!-- php: = h($patientVisitPrnTask->title) --></h3>
    <table class="vertical-table">
        <tr>
            <th scope="row"><!-- php: = __('Title') --></th>
            <td><!-- php: = h($patientVisitPrnTask->title) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Task Desc') --></th>
            <td><!-- php: = h($patientVisitPrnTask->task_desc) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Request Prescription') --></th>
            <td><!-- php: = $patientVisitPrnTask->has('request_prescription') ? $this->Html->link($patientVisitPrnTask->request_prescription->id, ['controller' => 'RequestPrescriptions', 'action' => 'view', $patientVisitPrnTask->request_prescription->id]) : '' --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Request Infusion') --></th>
            <td><!-- php: = $patientVisitPrnTask->has('request_infusion') ? $this->Html->link($patientVisitPrnTask->request_infusion->id, ['controller' => 'RequestInfusions', 'action' => 'view', $patientVisitPrnTask->request_infusion->id]) : '' --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Resource') --></th>
            <td><!-- php: = h($patientVisitPrnTask->resource) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('User') --></th>
            <td><!-- php: = $patientVisitPrnTask->has('user') ? $this->Html->link($patientVisitPrnTask->user->full_name, ['controller' => 'Users', 'action' => 'view', $patientVisitPrnTask->user->id]) : '' --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Id') --></th>
            <td><!-- php: = $this->Number->format($patientVisitPrnTask->id) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Task Duration In Minutes') --></th>
            <td><!-- php: = $this->Number->format($patientVisitPrnTask->task_duration_in_minutes) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Start') --></th>
            <td><!-- php: = h($patientVisitPrnTask->start) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('End') --></th>
            <td><!-- php: = h($patientVisitPrnTask->end) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Date Created') --></th>
            <td><!-- php: = h($patientVisitPrnTask->date_created) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Date Modified') --></th>
            <td><!-- php: = h($patientVisitPrnTask->date_modified) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Is Completed') --></th>
            <td><!-- php: = $patientVisitPrnTask->is_completed ? __('Yes') : __('No'); --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Is Paused') --></th>
            <td><!-- php: = $patientVisitPrnTask->is_paused ? __('Yes') : __('No'); --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Is Started') --></th>
            <td><!-- php: = $patientVisitPrnTask->is_started ? __('Yes') : __('No'); --></td>
        </tr>
    </table>
</div>

`;

export default function PatientVisitPrnTasksViewPage() {
  return (
    <PageShell title="PatientVisitPrnTasks/view.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
