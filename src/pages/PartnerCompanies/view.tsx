import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PartnerCompanies/view.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\PartnerCompany $partnerCompany */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('Edit Partner Company'), ['action' => 'edit', $partnerCompany->id]) --> </li>
        <li><!-- php: = $this->Form->postLink(__('Delete Partner Company'), ['action' => 'delete', $partnerCompany->id], ['confirm' => __('Are you sure you want to delete # {0}?', $partnerCompany->id)]) --> </li>
        <li><!-- php: = $this->Html->link(__('List Partner Companies'), ['action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New Partner Company'), ['action' => 'add']) --> </li>
        <li><!-- php: = $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) --> </li>
        <li><!-- php: = $this->Html->link(__('List Insurance Profiles'), ['controller' => 'InsuranceProfiles', 'action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New Insurance Profile'), ['controller' => 'InsuranceProfiles', 'action' => 'add']) --> </li>
    </ul>
</nav>
<div class="partnerCompanies view large-9 medium-8 columns content">
    <h3><!-- php: = h($partnerCompany->id) --></h3>
    <table class="vertical-table">
        <tr>
            <th scope="row"><!-- php: = __('User') --></th>
            <td><!-- php: = $partnerCompany->has('user') ? $this->Html->link($partnerCompany->user->full_name, ['controller' => 'Users', 'action' => 'view', $partnerCompany->user->id]) : '' --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Insurance Profile') --></th>
            <td><!-- php: = $partnerCompany->has('insurance_profile') ? $this->Html->link($partnerCompany->insurance_profile->id, ['controller' => 'InsuranceProfiles', 'action' => 'view', $partnerCompany->insurance_profile->id]) : '' --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Company Name') --></th>
            <td><!-- php: = h($partnerCompany->company_name) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Business Type') --></th>
            <td><!-- php: = h($partnerCompany->business_type) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Business Email') --></th>
            <td><!-- php: = h($partnerCompany->business_email) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Business Tele') --></th>
            <td><!-- php: = h($partnerCompany->business_tele) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Business Mobile') --></th>
            <td><!-- php: = h($partnerCompany->business_mobile) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Business Address') --></th>
            <td><!-- php: = h($partnerCompany->business_address) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Country') --></th>
            <td><!-- php: = h($partnerCompany->country) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Region') --></th>
            <td><!-- php: = h($partnerCompany->region) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Gps') --></th>
            <td><!-- php: = h($partnerCompany->gps) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Director One Name') --></th>
            <td><!-- php: = h($partnerCompany->director_one_name) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Director One Email') --></th>
            <td><!-- php: = h($partnerCompany->director_one_email) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Director One Mobile') --></th>
            <td><!-- php: = h($partnerCompany->director_one_mobile) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Director Two Name') --></th>
            <td><!-- php: = h($partnerCompany->director_two_name) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Director Two Email') --></th>
            <td><!-- php: = h($partnerCompany->director_two_email) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Director Two Mobile') --></th>
            <td><!-- php: = h($partnerCompany->director_two_mobile) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Director Three Name') --></th>
            <td><!-- php: = h($partnerCompany->director_three_name) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Director Three Email') --></th>
            <td><!-- php: = h($partnerCompany->director_three_email) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Director Three Mobile') --></th>
            <td><!-- php: = h($partnerCompany->director_three_mobile) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Director Four Name') --></th>
            <td><!-- php: = h($partnerCompany->director_four_name) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Director Four Email') --></th>
            <td><!-- php: = h($partnerCompany->director_four_email) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Director Four Mobile') --></th>
            <td><!-- php: = h($partnerCompany->director_four_mobile) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Director Five Name') --></th>
            <td><!-- php: = h($partnerCompany->director_five_name) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Director Five Email') --></th>
            <td><!-- php: = h($partnerCompany->director_five_email) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Director Five Mobile') --></th>
            <td><!-- php: = h($partnerCompany->director_five_mobile) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Relationship Manager Name') --></th>
            <td><!-- php: = h($partnerCompany->relationship_manager_name) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Relationship Manager Email') --></th>
            <td><!-- php: = h($partnerCompany->relationship_manager_email) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Relationship Manager Mobile') --></th>
            <td><!-- php: = h($partnerCompany->relationship_manager_mobile) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Id') --></th>
            <td><!-- php: = $this->Number->format($partnerCompany->id) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Tin Number') --></th>
            <td><!-- php: = $this->Number->format($partnerCompany->tin_number) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Number Of Directors') --></th>
            <td><!-- php: = $this->Number->format($partnerCompany->number_of_directors) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Date Modified') --></th>
            <td><!-- php: = h($partnerCompany->date_modified) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Date Created') --></th>
            <td><!-- php: = h($partnerCompany->date_created) --></td>
        </tr>
    </table>
</div>

`;

export default function PartnerCompaniesViewPage() {
  return (
    <PageShell title="PartnerCompanies/view.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
