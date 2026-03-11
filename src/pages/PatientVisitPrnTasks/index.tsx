import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitPrnTasks/index.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PatientVisitPrnTask[]|\Cake\Collection\CollectionInterface $patientVisitPrnTasks */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('New Patient Visit Prn Task'), ['action' => 'add']) --></li>
        <li><!-- php: = $this->Html->link(__('List Request Prescriptions'), ['controller' => 'RequestPrescriptions', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New Request Prescription'), ['controller' => 'RequestPrescriptions', 'action' => 'add']) --></li>
        <li><!-- php: = $this->Html->link(__('List Request Infusions'), ['controller' => 'RequestInfusions', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New Request Infusion'), ['controller' => 'RequestInfusions', 'action' => 'add']) --></li>
        <li><!-- php: = $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) --></li>
    </ul>
</nav>
<div class="patientVisitPrnTasks index large-9 medium-8 columns content">
    <h3><!-- php: = __('Patient Visit Prn Tasks') --></h3>
    <table cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th scope="col"><!-- php: = $this->Paginator->sort('id') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('title') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('task_desc') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('is_completed') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('is_paused') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('is_started') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('request_prescription_id') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('request_infusion_id') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('resource') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('start') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('end') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('task_duration_in_minutes') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('user_id') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('date_created') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('date_modified') --></th>
                <th scope="col" class="actions"><!-- php: = __('Actions') --></th>
            </tr>
        </thead>
        <tbody>
            <!-- php: foreach ($patientVisitPrnTasks as $patientVisitPrnTask): -->
            <tr>
                <td><!-- php: = $this->Number->format($patientVisitPrnTask->id) --></td>
                <td><!-- php: = h($patientVisitPrnTask->title) --></td>
                <td><!-- php: = h($patientVisitPrnTask->task_desc) --></td>
                <td><!-- php: = h($patientVisitPrnTask->is_completed) --></td>
                <td><!-- php: = h($patientVisitPrnTask->is_paused) --></td>
                <td><!-- php: = h($patientVisitPrnTask->is_started) --></td>
                <td><!-- php: = $patientVisitPrnTask->has('request_prescription') ? $this->Html->link($patientVisitPrnTask->request_prescription->id, ['controller' => 'RequestPrescriptions', 'action' => 'view', $patientVisitPrnTask->request_prescription->id]) : '' --></td>
                <td><!-- php: = $patientVisitPrnTask->has('request_infusion') ? $this->Html->link($patientVisitPrnTask->request_infusion->id, ['controller' => 'RequestInfusions', 'action' => 'view', $patientVisitPrnTask->request_infusion->id]) : '' --></td>
                <td><!-- php: = h($patientVisitPrnTask->resource) --></td>
                <td><!-- php: = h($patientVisitPrnTask->start) --></td>
                <td><!-- php: = h($patientVisitPrnTask->end) --></td>
                <td><!-- php: = $this->Number->format($patientVisitPrnTask->task_duration_in_minutes) --></td>
                <td><!-- php: = $patientVisitPrnTask->has('user') ? $this->Html->link($patientVisitPrnTask->user->full_name, ['controller' => 'Users', 'action' => 'view', $patientVisitPrnTask->user->id]) : '' --></td>
                <td><!-- php: = h($patientVisitPrnTask->date_created) --></td>
                <td><!-- php: = h($patientVisitPrnTask->date_modified) --></td>
                <td class="actions">
                    <!-- php: = $this->Html->link(__('View'), ['action' => 'view', $patientVisitPrnTask->id]) -->
                    <!-- php: = $this->Html->link(__('Edit'), ['action' => 'edit', $patientVisitPrnTask->id]) -->
                    <!-- php: = $this->Form->postLink(__('Delete'), ['action' => 'delete', $patientVisitPrnTask->id], ['confirm' => __('Are you sure you want to delete # {0}?', $patientVisitPrnTask->id)]) -->
                </td>
            </tr>
            <!-- php: endforeach; -->
        </tbody>
    </table>
    <div class="paginator">
        <ul class="pagination">
            <!-- php: = $this->Paginator->first('<< ' . __('first')) -->
            <!-- php: = $this->Paginator->prev('< ' . __('previous')) -->
            <!-- php: = $this->Paginator->numbers() -->
            <!-- php: = $this->Paginator->next(__('next') . ' >') -->
            <!-- php: = $this->Paginator->last(__('last') . ' >>') -->
        </ul>
        <p><!-- php: = $this->Paginator->counter(__('Page {{page}} of {{pages}}, showing {{current}} record(s) out of {{count}} total')) --></p>
    </div>
</div>

`;

export default function PatientVisitPrnTasksIndexPage() {
  return (
    <PageShell title="PatientVisitPrnTasks/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
