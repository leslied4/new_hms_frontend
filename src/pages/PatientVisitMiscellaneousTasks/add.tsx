import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitMiscellaneousTasks/add.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PatientVisitMiscellaneousTask $patientVisitMiscellaneousTask */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('List Patient Visit Miscellaneous Tasks'), ['action' => 'index']) --></li>
    </ul>
</nav>
<div class="patientVisitMiscellaneousTasks form large-9 medium-8 columns content">
    <!-- php: = $this->Form->create($patientVisitMiscellaneousTask) -->
    <fieldset>
        <legend><!-- php: = __('Add Patient Visit Miscellaneous Task') --></legend>
        <!-- php: echo $this->Form->control('task_desc'); echo $this->Form->control('start_date_time', ['empty' => true]); echo $this->Form->control('end_date_time', ['empty' => true]); echo $this->Form->control('isReminderSet'); echo $this->Form->control('i... -->
    </fieldset>
    <!-- php: = $this->Form->button(__('Submit')) -->
    <!-- php: = $this->Form->end() -->
</div>

`;

export default function PatientVisitMiscellaneousTasksAddPage() {
  return (
    <PageShell title="PatientVisitMiscellaneousTasks/add.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
