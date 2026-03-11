import PageShell from '../../components/PageShell';

const sourcePath = 'templates/InsuranceProfiles/add.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\InsuranceProfile $insuranceProfile */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('List Insurance Profiles'), ['action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) --></li>
    </ul>
</nav>
<div class="insuranceProfiles form large-9 medium-8 columns content">
    <!-- php: = $this->Form->create($insuranceProfile) -->
    <fieldset>
        <legend><!-- php: = __('Add Insurance Profile') --></legend>
        <!-- php: echo $this->Form->control('user_id', ['options' => $users]); echo $this->Form->control('region'); echo $this->Form->control('directorate'); echo $this->Form->control('insurance_name'); echo $this->Form->control('accreditation_no'); echo $th... -->
    </fieldset>
    <!-- php: = $this->Form->button(__('Submit')) -->
    <!-- php: = $this->Form->end() -->
</div>

`;

export default function InsuranceProfilesAddPage() {
  return (
    <PageShell title="InsuranceProfiles/add.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
