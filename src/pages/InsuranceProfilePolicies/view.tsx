import PageShell from '../../components/PageShell';

const sourcePath = 'templates/InsuranceProfilePolicies/view.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\InsuranceProfilePolicy $insuranceProfilePolicy */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('Edit Insurance Profile Policy'), ['action' => 'edit', $insuranceProfilePolicy->id]) --> </li>
        <li><!-- php: = $this->Form->postLink(__('Delete Insurance Profile Policy'), ['action' => 'delete', $insuranceProfilePolicy->id], ['confirm' => __('Are you sure you want to delete # {0}?', $insuranceProfilePolicy->id)]) --> </li>
        <li><!-- php: = $this->Html->link(__('List Insurance Profile Policies'), ['action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New Insurance Profile Policy'), ['action' => 'add']) --> </li>
        <li><!-- php: = $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) --> </li>
        <li><!-- php: = $this->Html->link(__('List Insurance Profiles'), ['controller' => 'InsuranceProfiles', 'action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New Insurance Profile'), ['controller' => 'InsuranceProfiles', 'action' => 'add']) --> </li>
    </ul>
</nav>
<div class="insuranceProfilePolicies view large-9 medium-8 columns content">
    <h3><!-- php: = h($insuranceProfilePolicy->id) --></h3>
    <table class="vertical-table">
        <tr>
            <th scope="row"><!-- php: = __('User') --></th>
            <td><!-- php: = $insuranceProfilePolicy->has('user') ? $this->Html->link($insuranceProfilePolicy->user->full_name, ['controller' => 'Users', 'action' => 'view', $insuranceProfilePolicy->user->id]) : '' --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Policy Name') --></th>
            <td><!-- php: = h($insuranceProfilePolicy->policy_name) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Id') --></th>
            <td><!-- php: = $this->Number->format($insuranceProfilePolicy->id) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Insurance Profile Id') --></th>
            <td><!-- php: = $this->Number->format($insuranceProfilePolicy->insurance_profile_id) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Date Modified') --></th>
            <td><!-- php: = h($insuranceProfilePolicy->date_modified) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Date Created') --></th>
            <td><!-- php: = h($insuranceProfilePolicy->date_created) --></td>
        </tr>
    </table>
</div>

`;

export default function InsuranceProfilePoliciesViewPage() {
  return (
    <PageShell title="InsuranceProfilePolicies/view.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
