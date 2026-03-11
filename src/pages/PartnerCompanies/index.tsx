import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PartnerCompanies/index.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PartnerCompany[]|\Cake\Collection\CollectionInterface $partnerCompanies */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('New Partner Company'), ['action' => 'add']) --></li>
        <li><!-- php: = $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) --></li>
        <li><!-- php: = $this->Html->link(__('List Insurance Profiles'), ['controller' => 'InsuranceProfiles', 'action' => 'index']) --></li>
        <li><!-- php: = $this->Html->link(__('New Insurance Profile'), ['controller' => 'InsuranceProfiles', 'action' => 'add']) --></li>
    </ul>
</nav>
<div class="partnerCompanies index large-9 medium-8 columns content">
    <h3><!-- php: = __('Partner Companies') --></h3>
    <table cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th scope="col"><!-- php: = $this->Paginator->sort('id') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('user_id') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('insurance_profile_id') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('company_name') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('tin_number') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('business_type') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('business_email') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('business_tele') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('business_mobile') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('business_address') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('number_of_directors') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('country') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('region') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('gps') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('director_one_name') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('director_one_email') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('director_one_mobile') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('director_two_name') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('director_two_email') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('director_two_mobile') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('director_three_name') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('director_three_email') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('director_three_mobile') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('director_four_name') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('director_four_email') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('director_four_mobile') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('director_five_name') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('director_five_email') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('director_five_mobile') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('relationship_manager_name') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('relationship_manager_email') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('relationship_manager_mobile') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('date_modified') --></th>
                <th scope="col"><!-- php: = $this->Paginator->sort('date_created') --></th>
                <th scope="col" class="actions"><!-- php: = __('Actions') --></th>
            </tr>
        </thead>
        <tbody>
            <!-- php: foreach ($partnerCompanies as $partnerCompany): -->
            <tr>
                <td><!-- php: = $this->Number->format($partnerCompany->id) --></td>
                <td><!-- php: = $partnerCompany->has('user') ? $this->Html->link($partnerCompany->user->full_name, ['controller' => 'Users', 'action' => 'view', $partnerCompany->user->id]) : '' --></td>
                <td><!-- php: = $partnerCompany->has('insurance_profile') ? $this->Html->link($partnerCompany->insurance_profile->id, ['controller' => 'InsuranceProfiles', 'action' => 'view', $partnerCompany->insurance_profile->id]) : '' --></td>
                <td><!-- php: = h($partnerCompany->company_name) --></td>
                <td><!-- php: = $this->Number->format($partnerCompany->tin_number) --></td>
                <td><!-- php: = h($partnerCompany->business_type) --></td>
                <td><!-- php: = h($partnerCompany->business_email) --></td>
                <td><!-- php: = h($partnerCompany->business_tele) --></td>
                <td><!-- php: = h($partnerCompany->business_mobile) --></td>
                <td><!-- php: = h($partnerCompany->business_address) --></td>
                <td><!-- php: = $this->Number->format($partnerCompany->number_of_directors) --></td>
                <td><!-- php: = h($partnerCompany->country) --></td>
                <td><!-- php: = h($partnerCompany->region) --></td>
                <td><!-- php: = h($partnerCompany->gps) --></td>
                <td><!-- php: = h($partnerCompany->director_one_name) --></td>
                <td><!-- php: = h($partnerCompany->director_one_email) --></td>
                <td><!-- php: = h($partnerCompany->director_one_mobile) --></td>
                <td><!-- php: = h($partnerCompany->director_two_name) --></td>
                <td><!-- php: = h($partnerCompany->director_two_email) --></td>
                <td><!-- php: = h($partnerCompany->director_two_mobile) --></td>
                <td><!-- php: = h($partnerCompany->director_three_name) --></td>
                <td><!-- php: = h($partnerCompany->director_three_email) --></td>
                <td><!-- php: = h($partnerCompany->director_three_mobile) --></td>
                <td><!-- php: = h($partnerCompany->director_four_name) --></td>
                <td><!-- php: = h($partnerCompany->director_four_email) --></td>
                <td><!-- php: = h($partnerCompany->director_four_mobile) --></td>
                <td><!-- php: = h($partnerCompany->director_five_name) --></td>
                <td><!-- php: = h($partnerCompany->director_five_email) --></td>
                <td><!-- php: = h($partnerCompany->director_five_mobile) --></td>
                <td><!-- php: = h($partnerCompany->relationship_manager_name) --></td>
                <td><!-- php: = h($partnerCompany->relationship_manager_email) --></td>
                <td><!-- php: = h($partnerCompany->relationship_manager_mobile) --></td>
                <td><!-- php: = h($partnerCompany->date_modified) --></td>
                <td><!-- php: = h($partnerCompany->date_created) --></td>
                <td class="actions">
                    <!-- php: = $this->Html->link(__('View'), ['action' => 'view', $partnerCompany->id]) -->
                    <!-- php: = $this->Html->link(__('Edit'), ['action' => 'edit', $partnerCompany->id]) -->
                    <!-- php: = $this->Form->postLink(__('Delete'), ['action' => 'delete', $partnerCompany->id], ['confirm' => __('Are you sure you want to delete # {0}?', $partnerCompany->id)]) -->
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

export default function PartnerCompaniesIndexPage() {
  return (
    <PageShell title="PartnerCompanies/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
