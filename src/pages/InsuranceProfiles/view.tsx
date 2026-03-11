import PageShell from '../../components/PageShell';

const sourcePath = 'templates/InsuranceProfiles/view.php';
const rawHtml = `
<!-- php: /** * @var \App\View\AppView $this * @var \App\Model\Entity\InsuranceProfile $insuranceProfile */ -->
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><!-- php: = __('Actions') --></li>
        <li><!-- php: = $this->Html->link(__('Edit Insurance Profile'), ['action' => 'edit', $insuranceProfile->id]) --> </li>
        <li><!-- php: = $this->Form->postLink(__('Delete Insurance Profile'), ['action' => 'delete', $insuranceProfile->id], ['confirm' => __('Are you sure you want to delete # {0}?', $insuranceProfile->id)]) --> </li>
        <li><!-- php: = $this->Html->link(__('List Insurance Profiles'), ['action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New Insurance Profile'), ['action' => 'add']) --> </li>
        <li><!-- php: = $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) --> </li>
        <li><!-- php: = $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) --> </li>
    </ul>
</nav>
<div class="insuranceProfiles view large-9 medium-8 columns content">
    <h3><!-- php: = h($insuranceProfile->id) --></h3>
    <table class="vertical-table">
        <tr>
            <th scope="row"><!-- php: = __('User') --></th>
            <td><!-- php: = $insuranceProfile->has('user') ? $this->Html->link($insuranceProfile->user->full_name, ['controller' => 'Users', 'action' => 'view', $insuranceProfile->user->id]) : '' --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Insurance Name') --></th>
            <td><!-- php: = h($insuranceProfile->insurance_name) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Accreditation No') --></th>
            <td><!-- php: = h($insuranceProfile->accreditation_no) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Premium Type') --></th>
            <td><!-- php: = h($insuranceProfile->premium_type) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Id') --></th>
            <td><!-- php: = $this->Number->format($insuranceProfile->id) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Health Care Provider Level') --></th>
            <td><!-- php: = $this->Number->format($insuranceProfile->health_care_provider_level) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Health Care Prescription Level') --></th>
            <td><!-- php: = $this->Number->format($insuranceProfile->health_care_prescription_level) --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Is Private Insurance') --></th>
            <td><!-- php: = $insuranceProfile->is_private_insurance ? __('Yes') : __('No'); --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Is Public Insurance') --></th>
            <td><!-- php: = $insuranceProfile->is_public_insurance ? __('Yes') : __('No'); --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Is Company Insurance') --></th>
            <td><!-- php: = $insuranceProfile->is_company_insurance ? __('Yes') : __('No'); --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Is Non Resident Insurance') --></th>
            <td><!-- php: = $insuranceProfile->is_non_resident_insurance ? __('Yes') : __('No'); --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Drug Formulary') --></th>
            <td><!-- php: = $insuranceProfile->drug_formulary ? __('Yes') : __('No'); --></td>
        </tr>
        <tr>
            <th scope="row"><!-- php: = __('Copay') --></th>
            <td><!-- php: = $insuranceProfile->copay ? __('Yes') : __('No'); --></td>
        </tr>
    </table>
</div>

`;

export default function InsuranceProfilesViewPage() {
  return (
    <PageShell title="InsuranceProfiles/view.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
