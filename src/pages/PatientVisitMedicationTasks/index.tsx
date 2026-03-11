import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitMedicationTasks/index.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PatientVisitMedicationTask[]|\Cake\Collection\CollectionInterface $patientVisitMedicationTasks */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('New Patient Visit Medication Task'), ['action' => 'add']) --></li>
    </ul>
</nav>
<div class="patientVisitMedicationTasks index large-9 medium-8 columns content">
    <h3><!-- php: = __('Patient Visit Medication Tasks') --></h3>
    <table cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th scope="col"><!-- php: = $this->Paginator->sort('id') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('title') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('task_desc') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('is_reminder_set') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('is_completed') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('is_paused') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('minutes_duration') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('requested_medication_fk') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('start_date_time') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('end_date_time') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('patient_visit_fk') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('date_created') --></th>
                <th scope="col" class="actions"><!-- php: = __('Actions') --></th>
            </tr>
        </thead>
        <tbody>
            <!-- php: foreach ($patientVisitMedicationTasks as $patientVisitMedicationTask): -->
            <tr>
                <td><!-- php: = $this->Number->format($patientVisitMedicationTask->id) --></td>
                <td><!-- php: = h($patientVisitMedicationTask->title) --></td>
                <td><!-- php: = h($patientVisitMedicationTask->task_desc) --></td>
                <td><!-- php: = h($patientVisitMedicationTask->is_reminder_set) --></td>
                <td><!-- php: = h($patientVisitMedicationTask->is_completed) --></td>
                <td><!-- php: = h($patientVisitMedicationTask->is_paused) --></td>
                <td><!-- php: = $this->Number->format($patientVisitMedicationTask->minutes_duration) --></td>
                <td><!-- php: = $this->Number->format($patientVisitMedicationTask->requested_medication_fk) --></td>
                <td><!-- php: = h($patientVisitMedicationTask->start_date_time) --></td>
                <td><!-- php: = h($patientVisitMedicationTask->end_date_time) --></td>
                <td><!-- php: = $this->Number->format($patientVisitMedicationTask->patient_visit_fk) --></td>
                <td><!-- php: = h($patientVisitMedicationTask->date_created) --></td>
                <td class="actions">
                    <!-- php: = $this->Html->link(__('View'), ['action' => 'view', $patientVisitMedicationTask->id]) -->
                    <!-- php: = $this->Html->link(__('Edit'), ['action' => 'edit', $patientVisitMedicationTask->id]) -->
                    <!-- php: = $this->Form->postLink(__('Delete'), ['action' => 'delete', $patientVisitMedicationTask->id], ['confirm' => __('Are you sure you want to delete # {0}?', $patientVisitMedicationTask->id)]) -->
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

export default function PatientVisitMedicationTasksIndexPage() {
  return (
    <PageShell title="PatientVisitMedicationTasks/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
