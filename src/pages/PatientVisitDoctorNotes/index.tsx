import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitDoctorNotes/index.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PatientVisitDoctorNote[]|\Cake\Collection\CollectionInterface $patientVisitDoctorNotes */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('New Patient Visit Doctor Note'), ['action' => 'add']) --></li>
        <li><!-- php: = $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) --></li>
        <li><!-- php: = $this->Html->link(__('List Patient Visits'), ['controller' => 'PatientVisits', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New Patient Visit'), ['controller' => 'PatientVisits', 'action' => 'add']) --></li>
    </ul>
</nav>
<div class="patientVisitDoctorNotes index large-9 medium-8 columns content">
    <h3><!-- php: = __('Patient Visit Doctor Notes') --></h3>
    <table cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th scope="col"><!-- php: = $this->Paginator->sort('id') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('user_id') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('patient_visit_id') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('date_created') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('date_modified') --></th>
                <th scope="col" class="actions"><!-- php: = __('Actions') --></th>
            </tr>
        </thead>
        <tbody>
            <!-- php: foreach ($patientVisitDoctorNotes as $patientVisitDoctorNote): -->
            <tr>
                <td><!-- php: = $this->Number->format($patientVisitDoctorNote->id) --></td>
                <td><!-- php: = $patientVisitDoctorNote->has('user') ? $this->Html->link($patientVisitDoctorNote->user->full_name, ['controller' => 'Users', 'action' => 'view', $patientVisitDoctorNote->user->id]) : '' --></td>
                <td><!-- php: = $patientVisitDoctorNote->has('patient_visit') ? $this->Html->link($patientVisitDoctorNote->patient_visit->id, ['controller' => 'PatientVisits', 'action' => 'view', $patientVisitDoctorNote->patient_visit->id]) : '' --></td>
                <td><!-- php: = h($patientVisitDoctorNote->date_created) --></td>
                <td><!-- php: = h($patientVisitDoctorNote->date_modified) --></td>
                <td class="actions">
                    <!-- php: = $this->Html->link(__('View'), ['action' => 'view', $patientVisitDoctorNote->id]) -->
                    <!-- php: = $this->Html->link(__('Edit'), ['action' => 'edit', $patientVisitDoctorNote->id]) -->
                    <!-- php: = $this->Form->postLink(__('Delete'), ['action' => 'delete', $patientVisitDoctorNote->id], ['confirm' => __('Are you sure you want to delete # {0}?', $patientVisitDoctorNote->id)]) -->
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

export default function PatientVisitDoctorNotesIndexPage() {
  return (
    <PageShell title="PatientVisitDoctorNotes/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
