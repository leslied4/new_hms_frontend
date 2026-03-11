import PageShell from '../../components/PageShell';

const sourcePath = 'templates/InsuranceProfilePolicies/index.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\InsuranceProfilePolicy[]|\Cake\Collection\CollectionInterface $insuranceProfilePolicies */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('New Insurance Profile Policy'), ['action' => 'add']) --></li>
        <li><!-- php: = $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) --></li>
        <li><!-- php: = $this->Html->link(__('List Insurance Profiles'), ['controller' => 'InsuranceProfiles', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New Insurance Profile'), ['controller' => 'InsuranceProfiles', 'action' => 'add']) --></li>
    </ul>
</nav>
<div class="insuranceProfilePolicies index large-9 medium-8 columns content">
    <h3><!-- php: = __('Insurance Profile Policies') --></h3>
    <table cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th scope="col"><!-- php: = $this->Paginator->sort('id') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('user_id') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('policy_name') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('insurance_profile_id') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('date_modified') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('date_created') --></th>
                <th scope="col" class="actions"><!-- php: = __('Actions') --></th>
            </tr>
        </thead>
        <tbody>
            <!-- php: foreach ($insuranceProfilePolicies as $insuranceProfilePolicy): -->
            <tr>
                <td><!-- php: = $this->Number->format($insuranceProfilePolicy->id) --></td>
                <td><!-- php: = $insuranceProfilePolicy->has('user') ? $this->Html->link($insuranceProfilePolicy->user->full_name, ['controller' => 'Users', 'action' => 'view', $insuranceProfilePolicy->user->id]) : '' --></td>
                <td><!-- php: = h($insuranceProfilePolicy->policy_name) --></td>
                <td><!-- php: = $this->Number->format($insuranceProfilePolicy->insurance_profile_id) --></td>
                <td><!-- php: = h($insuranceProfilePolicy->date_modified) --></td>
                <td><!-- php: = h($insuranceProfilePolicy->date_created) --></td>
                <td class="actions">
                    <!-- php: = $this->Html->link(__('View'), ['action' => 'view', $insuranceProfilePolicy->id]) -->
                    <!-- php: = $this->Html->link(__('Edit'), ['action' => 'edit', $insuranceProfilePolicy->id]) -->
                    <!-- php: = $this->Form->postLink(__('Delete'), ['action' => 'delete', $insuranceProfilePolicy->id], ['confirm' => __('Are you sure you want to delete # {0}?', $insuranceProfilePolicy->id)]) -->
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

export default function InsuranceProfilePoliciesIndexPage() {
  return (
    <PageShell title="InsuranceProfilePolicies/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
