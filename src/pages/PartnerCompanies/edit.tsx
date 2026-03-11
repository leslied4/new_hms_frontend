import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PartnerCompanies/edit.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PartnerCompany $partnerCompany */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Form->postLink( __('Delete'), ['action' => 'delete', $partnerCompany->id], ['confirm' => __('Are you sure you want to delete # {0}?', $partnerCompany->id)] ) --></li>
        <li><!-- php: = $this->Html->link(__('List Partner Companies'), ['action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) --></li>
        <li><!-- php: = $this->Html->link(__('List Insurance Profiles'), ['controller' => 'InsuranceProfiles', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New Insurance Profile'), ['controller' => 'InsuranceProfiles', 'action' => 'add']) --></li>
    </ul>
</nav>
<div class="partnerCompanies form large-9 medium-8 columns content">
    <!-- php: = $this->Form->create($partnerCompany) -->
    <fieldset>
        <legend><!-- php: = __('Edit Partner Company') --></legend>
        <!-- php: echo $this->Form->control('user_id', ['options' => $users]); echo $this->Form->control('insurance_profile_id', ['options' => $insuranceProfiles]); echo $this->Form->control('company_name'); echo $this->Form->control('tin_number'); echo $thi... -->
    </fieldset>
    <!-- php: = $this->Form->button(__('Submit')) -->
    <!-- php: = $this->Form->end() -->
</div>

`;

export default function PartnerCompaniesEditPage() {
  return (
    <PageShell title="PartnerCompanies/edit.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
