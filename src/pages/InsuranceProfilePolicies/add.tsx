import PageShell from '../../components/PageShell';

const sourcePath = 'templates/InsuranceProfilePolicies/add.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\InsuranceProfilePolicy $insuranceProfilePolicy */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('List Insurance Profile Policies'), ['action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) --></li>
        <li><!-- php: = $this->Html->link(__('List Insurance Profiles'), ['controller' => 'InsuranceProfiles', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New Insurance Profile'), ['controller' => 'InsuranceProfiles', 'action' => 'add']) --></li>
    </ul>
</nav>
<div class="insuranceProfilePolicies form large-9 medium-8 columns content">
    <!-- php: = $this->Form->create($insuranceProfilePolicy) -->
    <fieldset>
        <legend><!-- php: = __('Add Insurance Profile Policy') --></legend>
        <!-- php: echo $this->Form->control('user_id', ['options' => $users]); echo $this->Form->control('policy_name'); echo $this->Form->control('insurance_profile', ['options' => $insuranceProfiles]); echo $this->Form->control('date_modified'); echo $this... -->
    </fieldset>
    <!-- php: = $this->Form->button(__('Submit')) -->
    <!-- php: = $this->Form->end() -->
</div>

`;

export default function InsuranceProfilePoliciesAddPage() {
  return (
    <PageShell title="InsuranceProfilePolicies/add.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
