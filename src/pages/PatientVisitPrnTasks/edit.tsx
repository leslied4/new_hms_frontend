import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitPrnTasks/edit.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PatientVisitPrnTask $patientVisitPrnTask */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Form->postLink( __('Delete'), ['action' => 'delete', $patientVisitPrnTask->id], ['confirm' => __('Are you sure you want to delete # {0}?', $patientVisitPrnTask->id)] ) --></li>
        <li><!-- php: = $this->Html->link(__('List Patient Visit Prn Tasks'), ['action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('List Request Prescriptions'), ['controller' => 'RequestPrescriptions', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New Request Prescription'), ['controller' => 'RequestPrescriptions', 'action' => 'add']) --></li>
        <li><!-- php: = $this->Html->link(__('List Request Infusions'), ['controller' => 'RequestInfusions', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New Request Infusion'), ['controller' => 'RequestInfusions', 'action' => 'add']) --></li>
        <li><!-- php: = $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) --></li>
    </ul>
</nav>
<div class="patientVisitPrnTasks form large-9 medium-8 columns content">
    <!-- php: = $this->Form->create($patientVisitPrnTask) -->
    <fieldset>
        <legend><!-- php: = __('Edit Patient Visit Prn Task') --></legend>
        <!-- php: echo $this->Form->control('title'); echo $this->Form->control('task_desc'); echo $this->Form->control('is_completed'); echo $this->Form->control('is_paused'); echo $this->Form->control('is_started'); echo $this->Form->control('request_presc... -->
    </fieldset>
    <!-- php: = $this->Form->button(__('Submit')) -->
    <!-- php: = $this->Form->end() -->
</div>

`;

export default function PatientVisitPrnTasksEditPage() {
  return (
    <PageShell title="PatientVisitPrnTasks/edit.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
