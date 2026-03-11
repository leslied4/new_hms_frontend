import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitMiscellaneousTasks/index.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PatientVisitMiscellaneousTask[]|\Cake\Collection\CollectionInterface $patientVisitMiscellaneousTasks */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('New Patient Visit Miscellaneous Task'), ['action' => 'add']) --></li>
    </ul>
</nav>
<div class="patientVisitMiscellaneousTasks index large-9 medium-8 columns content">
    <h3><!-- php: = __('Patient Visit Miscellaneous Tasks') --></h3>
    <table cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th scope="col"><!-- php: = $this->Paginator->sort('id') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('task_desc') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('start_date_time') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('end_date_time') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('isReminderSet') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('isCompleted') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('isPaused') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('patient_visit_fk') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('date_created') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('title') --></th>
                <th scope="col" class="actions"><!-- php: = __('Actions') --></th>
            </tr>
        </thead>
        <tbody>
            <!-- php: foreach ($patientVisitMiscellaneousTasks as $patientVisitMiscellaneousTask): -->
            <tr>
                <td><!-- php: = $this->Number->format($patientVisitMiscellaneousTask->id) --></td>
                <td><!-- php: = h($patientVisitMiscellaneousTask->task_desc) --></td>
                <td><!-- php: = h($patientVisitMiscellaneousTask->start_date_time) --></td>
                <td><!-- php: = h($patientVisitMiscellaneousTask->end_date_time) --></td>
                <td><!-- php: = h($patientVisitMiscellaneousTask->isReminderSet) --></td>
                <td><!-- php: = h($patientVisitMiscellaneousTask->isCompleted) --></td>
                <td><!-- php: = h($patientVisitMiscellaneousTask->isPaused) --></td>
                <td><!-- php: = $this->Number->format($patientVisitMiscellaneousTask->patient_visit_fk) --></td>
                <td><!-- php: = h($patientVisitMiscellaneousTask->date_created) --></td>
                <td><!-- php: = h($patientVisitMiscellaneousTask->title) --></td>
                <td class="actions">
                    <!-- php: = $this->Html->link(__('View'), ['action' => 'view', $patientVisitMiscellaneousTask->id]) -->
                    <!-- php: = $this->Html->link(__('Edit'), ['action' => 'edit', $patientVisitMiscellaneousTask->id]) -->
                    <!-- php: = $this->Form->postLink(__('Delete'), ['action' => 'delete', $patientVisitMiscellaneousTask->id], ['confirm' => __('Are you sure you want to delete # {0}?', $patientVisitMiscellaneousTask->id)]) -->
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

export default function PatientVisitMiscellaneousTasksIndexPage() {
  return (
    <PageShell title="PatientVisitMiscellaneousTasks/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
