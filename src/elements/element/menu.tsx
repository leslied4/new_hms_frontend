const rawHtml = `
<!-- start sidebar menu -->
<div class="sidebar-container">
    <div class="sidemenu-container navbar-collapse collapse fixed-menu">
        <div id="remove-scroll" class="left-sidemenu" style="height: 100vh">
            <ul class="sidemenu page-header-fixed slimscroll-style" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" style="padding-top: 20px">
                <li class="sidebar-toggler-wrapper hide">
                    <div class="sidebar-toggler">
                        <span></span>
                    </div>
                </li>

                <!-- php: // User session data $userName = $this->request->getSession()->read()['Auth']['User']['username']; $fullName = $this->request->getSession()->read()['Auth']['User']['first_name'] . ' ' . $this->request->getSession()->read()['Auth']['User']['... -->

                <!-- User Panel -->
                <li class="sidebar-user-panel">
                    <div class="user-panel d-flex flex-column align-items-center">
                        <div class="image">
                            <!-- php: if (null !== ($this->request->getSession()->read('Auth.User.image.file_path'))) { echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'], ['class' => 'img-circle user-img-circle']); } else if ($se... -->
                        </div>

                        <div class="d-flex flex-column align-items-center">
                            <p class="col-md-8" style="text-align:center"><!-- php: = $fullName --></p>
                            <p class="col-md-6"><!-- php: = $sessionRole --></p>
                        </div>
                    </div>
                </li>

                <!-- Home Menu Item -->
                <!-- php: echo buildMenuItem([ 'title' => 'Home', 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M160-180v-390q0-14.25 6.38-27 6.37-12.75 17.62-21l260-195q15.68-12 35.84-... -->

                <!-- Doctor's Queue Example -->
                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Queue', 'action' => 'doctor'])): -->
                    <!-- php: $queueSubItems = []; // Only add sub-items if user has access to them $queueSubItems[] = [ 'title' => "Doctor's Queue", 'url' => $this->Url->build(['controller' => 'Queue', 'action' => 'doctor']), 'activeCondition' => ($this->request->getPa... -->
                <!-- php: endif; -->

                <!-- Nurse's Queue (Example of single item menu that should redirect) -->
                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Queue', 'action' => 'nurse']) || $this->AuthUser->hasRole('seniornurse')): -->
                    <!-- php: echo buildMenuItem([ 'title' => "Nurse's Queue", 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M30-80q-13 0-21.5-8.5T0-110v-23q0-28 21-48.5T80-212q26-8 48-8t47... -->
                <!-- php: endif; -->


                <!-- Continue with other menu items using the same pattern -->
                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Queue', 'action' => 'nurse'])) { -->
                    <!-- php: echo buildMenuItem([ 'title' => 'Nurse Station', 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="m673-142-99-99q-9-8.8-9-20.9 0-12.1 9-21.1 9-9 21-9t21 9l78 77 1... -->
                <!-- php: } -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Patients', 'action' => 'viewOpdVisits'])) { $opdSubItems = []; // Check each sub-item access and add if user has permission if ( $this->AuthUser->hasAccess(['controller' => 'Patients', 'actio... -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Patients', 'action' => 'viewVisits'])) { $ipdSubItems = []; // Check each sub-item access and add if user has permission if ( $this->AuthUser->hasAccess(['controller' => 'Patients', 'action' ... -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Patients', 'action' => 'viewPatients'])) { $patientsSubItems = []; // Build sub-items array $patientsSubItems[] = [ 'title' => 'Registered Patients', 'url' => $this->Url->build(['controller' ... -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Maternal', 'action' => 'addDelivery'])) { $maternalSubItems = []; // Build sub-items array with access checks if ($this->AuthUser->hasAccess(['controller' => 'Patients', 'action' => 'viewVisi... -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Book', 'action' => 'manageAppointments'])) { -->
                    <!-- php: echo buildMenuItem([ 'title' => 'Book', 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M360-320q-17 0-28.5-11.5T320-360v-67q0-5 4-9.5t9-5.5q12-4 19.5-14.5T360-4... -->
                <!-- php: } -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Sessions', 'action' => 'planner'])) { -->
                    <!-- php: echo buildMenuItem([ 'title' => 'Planner', 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M200-640h560v-80H200v80Zm0 0v-80 80Zm0 560q-33 0-56.5-23.5T120-160v-56... -->
                <!-- php: } -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Concierge', 'action' => 'index'])) { -->
                    <!-- php: echo buildMenuItem([ 'title' => 'Concierge', 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M430-80q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8... -->
                <!-- php: } -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Patients', 'action' => 'viewPatientsRoutineCare'])) { -->
                    <!-- php: echo buildMenuItem([ 'title' => 'Routine Care', 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M140-480q0 105 57 190t153 125q12 5 17.5 16.5T367-126q-8 12-21 15.... -->
                <!-- php: } -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'OrPlanner', 'action' => 'index'])) { -->
                    <!-- php: echo buildMenuItem([ 'title' => 'OR Planner', 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M775-182q6-6 5.5-15t-6.5-15l-67-67v-100q0-8-6-14t-14-6q-8 0-14.5 6.... -->
                <!-- php: } -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'ShiftScheduler', 'action' => 'index'])) { -->
                    <!-- php: echo buildMenuItem([ 'title' => 'Shift Scheduler', 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M700-200h-90q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8... -->
                <!-- php: } -->

                <!-- php: if ( $this->AuthUser->hasAccess(['controller' => 'Cash', 'action' => 'index']) || $this->AuthUser->hasAccess(['controller' => 'Cash', 'action' => 'cashSettlement']) ) { $cashSubItems = []; // Check each sub-item access and add if user has p... -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Accounts', 'action' => 'index'])) { -->
                    <!-- php: $bankingSubItems = []; // Check each sub-item access and add if user has permission if ($this->AuthUser->hasAccess(['controller' => 'Accounts', 'action' => 'index'])) { $bankingSubItems[] = [ 'title' => 'Accounts', 'url' => $this->Url->buil... -->
                <!-- php: } -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'CashFlow'])) { -->
                    <!-- php: $ledgerSubItems = []; // Check each sub-item access and add if user has permission if ($this->AuthUser->hasAccess(['controller' => 'CashFlow', 'action' => 'index'])) { $ledgerSubItems[] = [ 'title' => 'Cashflow (money in vs money out)', 'ur... -->
                <!-- php: } -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Billings', 'action' => 'index'])) { -->
                    <!-- php: $billingsSubItems = []; // All sub-items under Billings (assuming user has access to all if parent is accessible) // In real implementation, you might want to check access for each sub-item $billingsSubItems[] = [ 'title' => 'Billing Analyt... -->
                <!-- php: } -->

                <!-- php: if ( $this->AuthUser->hasAccess(['controller' => 'CreditClaims', 'action' => 'index']) || $this->AuthUser->hasAccess(['controller' => 'CreditClaims', 'action' => 'report']) ) { $claimSubItems = []; // Check each sub-item access and add if u... -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Payments', 'action' => 'index'])) { -->
                    <!-- php: $transactionsSubItems = []; // Assuming if user has access to parent, they have access to all sub-items // In real implementation, you might want to check access for each sub-item $transactionsSubItems[] = [ 'title' => 'All Transactions', '... -->
                <!-- php: } -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Sessions', 'action' => 'index'])) { -->
                    <!-- php: $programSubItems = []; // Assuming if user has access to parent, they have access to all sub-items $programSubItems[] = [ 'title' => 'Sessions', 'url' => $this->Url->build(['controller' => 'Sessions', 'action' => 'index']), 'activeCondition... -->
                <!-- php: } -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Institutions', 'action' => 'index'])) { -->
                    <!-- php: echo buildMenuItem([ 'title' => 'Manage Institutions', 'icon' => '<i class="material-icons" style="padding: 10px;background-color: rgba(100, 120, 140, 0.2);border-radius: 10px;color:white">insert_chart</i>', 'url' => $this->Url->build(['con... -->
                <!-- php: } -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Outlets', 'action' => 'index'])) { -->
                    <!-- php: echo buildMenuItem([ 'title' => 'Manage Outlets', 'icon' => '<i class="material-icons" style="padding: 10px;background-color: rgba(100, 120, 140, 0.2);border-radius: 10px;color:white">timer</i>', 'url' => $this->Url->build(['controller' => ... -->
                <!-- php: } -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Licences', 'action' => 'index'])) { -->
                    <!-- php: echo buildMenuItem([ 'title' => 'Manage Licenses', 'icon' => '<i class="material-icons" style="padding: 10px;background-color: rgba(100, 120, 140, 0.2);border-radius: 10px;color:white">insert_invitation</i>', 'url' => $this->Url->build(['co... -->
                <!-- php: } -->

                <!-- php: if ( $this->AuthUser->hasAccess(['controller' => 'RequestMedications', 'action' => 'index']) || $this->AuthUser->hasAccess(['controller' => 'RequestMedications', 'action' => 'report']) ) { $medicationLabel = Cake\Core\Configure::read('LABEL... -->

                <!-- php: if ( $this->AuthUser->hasAccess(['controller' => 'Inventory', 'action' => 'index']) || $this->AuthUser->hasAccess(['controller' => 'Inventory', 'action' => 'outlets']) ) { $inventorySubItems = []; // Assuming all inventory sub-items are acc... -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'InventoryList', 'action' => 'overview'])) { $equipmentSubItems = []; // Note: Overview item has 'd-none' class in original, might want to exclude it // But including for completeness $equipme... -->

                <!-- php: if ( $this->AuthUser->hasAccess(['controller' => 'RequestApproval', 'action' => 'index']) || $this->AuthUser->hasAccess(['controller' => 'Inventory', 'action' => 'outlets']) ) { $procurementSubItems = []; // Check each sub-item access if ($... -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Followups', 'action' => 'index'])) { $followupsSubItems = []; // Assuming all followup sub-items are accessible if parent menu is // In real implementation, check access for each sub-item $fo... -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'RequestLabs', 'action' => 'specimenTracker'])) { -->
                    <!-- php: echo buildMenuItem([ 'title' => 'Specimen Tracker', 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M100-120q-25 0-42.5-17.5T40-180v-240q0-25 17.5-42.5T100-480h2... -->
                <!-- php: } -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'RequestLabs', 'action' => 'index'])) { $labsSubItems = []; // Check each sub-item access and add if user has permission if ($this->AuthUser->hasAccess(['controller' => 'RequestLabs', 'action'... -->

                <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'RequestRadiologies', 'action' => 'index'])) { $radiologySubItems = []; // Check each sub-item access and add if user has permission if ($this->AuthUser->hasAccess(['controller' => 'RequestRad... -->

                <!-- php: if ( $this->AuthUser->hasAccess(['controller' => 'ImmunizationRequest', 'action' => 'index']) || $this->AuthUser->hasAccess(['controller' => 'ImmunizationRequest', 'action' => 'report']) || $this->AuthUser->hasAccess(['controller' => 'Immun... -->

                <!-- php: if ( $this->AuthUser->hasAccess(['controller' => 'RequestSurgeries', 'action' => 'index']) || $this->AuthUser->hasAccess(['controller' => 'RequestSurgeries', 'action' => 'report']) ) { $surgicalSubItems = []; // OR Planner is always include... -->

                <!-- php: if ( $this->AuthUser->hasAccess(['controller' => 'RequestServices', 'action' => 'index']) || $this->AuthUser->hasAccess(['controller' => 'ManageServices', 'action' => 'index']) || $this->AuthUser->hasAccess(['controller' => 'RequestServices... -->

                <!-- php: // Check if user has access to any report functionality $hasReportsAccess = $this->AuthUser->hasAccess(['controller' => 'Reports', 'action' => 'index']) || $this->AuthUser->hasAccess(['controller' => 'Reports', 'action' => 'drugConsumption'... -->

            </ul>
        </div>
    </div>
</div>
<!-- end sidebar menu -->
`;

export default function ElementElementMenu() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
