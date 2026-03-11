import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitServiceTasks/add.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PatientVisitServiceTask $patientVisitServiceTask */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('List Patient Visit Service Tasks'), ['action' => 'index']) --></li>
    </ul>
</nav>
<div class="patientVisitServiceTasks form large-9 medium-8 columns content">
    <!-- php: = $this->Form->create($patientVisitServiceTask) -->
    <fieldset>
        <legend><!-- php: = __('Add Patient Visit Service Task') --></legend>
        <!-- php: echo $this->Form->control('title'); echo $this->Form->control('task_desc'); echo $this->Form->control('is_completed'); echo $this->Form->control('is_paused'); echo $this->Form->control('requested_service_fk'); echo $this->Form->control('req... -->
    </fieldset>
    <!-- php: = $this->Form->button(__('Submit')) -->
    <!-- php: = $this->Form->end() -->
</div>

`;

export default function PatientVisitServiceTasksAddPage() {
  return (
    <PageShell title="PatientVisitServiceTasks/add.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
