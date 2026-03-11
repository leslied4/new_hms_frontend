import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitServiceTasks/index.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PatientVisitServiceTask[]|\Cake\Collection\CollectionInterface $patientVisitServiceTasks */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('New Patient Visit Service Task'), ['action' => 'add']) --></li>
    </ul>
</nav>
<div class="patientVisitServiceTasks index large-9 medium-8 columns content">
    <h3><!-- php: = __('Patient Visit Service Tasks') --></h3>
    <table cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th scope="col"><!-- php: = $this->Paginator->sort('id') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('title') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('task_desc') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('is_completed') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('is_paused') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('requested_service_fk') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('requested_lab_fk') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('requested_surgery_fk') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('start_date_time') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('end_date_time') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('task_duration_in_minutes') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('patient_visit_fk') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('date_created') --></th>
                <th scope="col" class="actions"><!-- php: = __('Actions') --></th>
            </tr>
        </thead>
        <tbody>
            <!-- php: foreach ($patientVisitServiceTasks as $patientVisitServiceTask): -->
            <tr>
                <td><!-- php: = $this->Number->format($patientVisitServiceTask->id) --></td>
                <td><!-- php: = h($patientVisitServiceTask->title) --></td>
                <td><!-- php: = h($patientVisitServiceTask->task_desc) --></td>
                <td><!-- php: = h($patientVisitServiceTask->is_completed) --></td>
                <td><!-- php: = h($patientVisitServiceTask->is_paused) --></td>
                <td><!-- php: = $this->Number->format($patientVisitServiceTask->requested_service_fk) --></td>
                <td><!-- php: = $this->Number->format($patientVisitServiceTask->requested_lab_fk) --></td>
                <td><!-- php: = $this->Number->format($patientVisitServiceTask->requested_surgery_fk) --></td>
                <td><!-- php: = h($patientVisitServiceTask->start_date_time) --></td>
                <td><!-- php: = h($patientVisitServiceTask->end_date_time) --></td>
                <td><!-- php: = $this->Number->format($patientVisitServiceTask->task_duration_in_minutes) --></td>
                <td><!-- php: = $this->Number->format($patientVisitServiceTask->patient_visit_fk) --></td>
                <td><!-- php: = h($patientVisitServiceTask->date_created) --></td>
                <td class="actions">
                    <!-- php: = $this->Html->link(__('View'), ['action' => 'view', $patientVisitServiceTask->id]) -->
                    <!-- php: = $this->Html->link(__('Edit'), ['action' => 'edit', $patientVisitServiceTask->id]) -->
                    <!-- php: = $this->Form->postLink(__('Delete'), ['action' => 'delete', $patientVisitServiceTask->id], ['confirm' => __('Are you sure you want to delete # {0}?', $patientVisitServiceTask->id)]) -->
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

export default function PatientVisitServiceTasksIndexPage() {
  return (
    <PageShell title="PatientVisitServiceTasks/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
