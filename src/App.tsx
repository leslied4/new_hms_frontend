import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import LoginLayout from './layouts/LoginLayout';
import MainLayout from './layouts/MainLayout';
import TemplateIndex from './pages/TemplateIndex';
import UsersLogin from './pages/Users/login';
import UsersChangePassword from './pages/Users/change_password';
import UsersResetPassword from './pages/Users/reset_password';
import UsersUpdateProfile from './pages/Users/update_profile';
import UsersViewUserDetails from './pages/Users/view_user_details';
import UsersEditUser from './pages/Users/edit_user';
import PatientsDashboard from './pages/Patients/dashboard';
import PatientsViewPatients from './pages/Patients/view_patients';
import PatientsAddPatient from './pages/Patients/add_patient';
import PatientsEditPatient from './pages/Patients/edit_patient';
import PatientsViewPatient from './pages/Patients/view_patient';
import PatientsViewVisits from './pages/Patients/view_visits';
import PatientsViewVisit from './pages/Patients/view_visit';
import PatientsPatientBill from './pages/Patients/patient_bill';
import PatientsViewPatientHistory from './pages/Patients/view_patient_history';
import PatientsViewPatientExamination from './pages/Patients/view_patient_examination';
import PatientsViewPatientNote from './pages/Patients/view_patient_note';
import PatientsViewPatientFlow from './pages/Patients/view_patient_flow';
import PatientsViewVisitsIpd from './pages/Patients/view_visits_ipd';
import PatientsViewOpdVisits from './pages/Patients/view_opd_visits';
import PatientsAddWalkinPatient from './pages/Patients/add_walkin_patient';
import PatientsViewPatientsEmployee from './pages/Patients/view_patients_employee';
import PatientsPopulationHealthDashboard from './pages/Patients/population_health_dashboard';
import PatientsExecutiveSummaryDashboard from './pages/Patients/executive_summary_dashboard';
import PatientsFinancialDashboard from './pages/Patients/financial_dashboard';
import PatientsClinicalQualityDashboard from './pages/Patients/clinical_quality_dashboard';
import PatientsOperationEfficiency from './pages/Patients/operation_efficiency';
import PatientsProviderProductivity from './pages/Patients/provider_productivity';
import PatientsVisitSpace from './pages/Patients/visit_space';
import PatientsVisitMini from './pages/Patients/visit_mini';
import PatientsVisitReport from './pages/Patients/visit_report';
import PatientsViewVisitReport from './pages/Patients/view_visit_report';
import PatientsOutpatientReport from './pages/Patients/outpatient_report';
import PatientsInpatientReport from './pages/Patients/inpatient_report';
import PatientsPrerounding from './pages/Patients/prerounding';
import PatientsMaternalVisits from './pages/Patients/maternal_visits';
import PatientsEyeSpace from './pages/Patients/eye_space';
import PatientsChiroSpace from './pages/Patients/chiro_space';
import PatientsPatientSessionsView from './pages/Patients/patient_sessions_view';
import PatientsPatientInsuranceExpiry from './pages/Patients/patient_insurance_expiry';
import PatientsViewPatientsRoutineCare from './pages/Patients/view_patients_routine_care';
import PatientsRoutineCareReport from './pages/Patients/routine_care_report';
import PatientsSelectivePatientBill from './pages/Patients/selective_patient_bill';
import PatientsReferalReport from './pages/Patients/referal_report';
import PatientsChiroAssessmentPlanVisitReport from './pages/Patients/chiro_assessment_plan_visit_report';
import PatientsSingleChiroAssessmentPlanVisitReport from './pages/Patients/single_chiro_assessment_plan_visit_report';
import PatientsChiroNotesVisitReport from './pages/Patients/chiro_notes_visit_report';
import PatientsViewMaternity from './pages/Patients/view_maternity';
import PatientsViewMaternity1 from './pages/Patients/view_maternity_1';
import PatientsJsonUpdateProcedures from './pages/Patients/json/update_procedures';
import BookManageAppointmentsPage from './pages/Book/manage_appointments';


import BillingsIndex from './pages/Billings/index';
import BillingsAnalytics from './pages/Billings/analytics';
import BillingsAnalyticsCopy from './pages/Billings/analytics_copy';
import BillingsViewInvoice from './pages/Billings/view_invoice';
import BillingsReceipt from './pages/Billings/receipt';
import BillingsInvoicePayments from './pages/Billings/invoice_payments';
import BillingsReconcile from './pages/Billings/reconcile';
import BillingsSuperBill from './pages/Billings/super_bill';
import BillingsBillingReport from './pages/Billings/billing_report';
import BillingsInsuranceBillingReport from './pages/Billings/insurance_billing_report';
import BillingsNewBillingReport from './pages/Billings/new_billing_report';
import BillingsPatientOutstandingBills from './pages/Billings/patient_outstanding_bills';
import BillingsSessionVouchers from './pages/Billings/session_vouchers';
import BillingsSalesReversals from './pages/Billings/sales_reversals';
import BillingsIndex20210831 from './pages/Billings/index_2021_08_31';
import BillingsIndexed from './pages/Billings/indexed';

import BillingsExportDataToPdf from './pages/Billings/export_data_to_pdf';
import ManageSecurityIndex from './pages/ManageSecurity/index';
import ManageSecurityEditSpecialties from './pages/ManageSecurity/edit_specialties';
import HomeIndex from './pages/Home/index';
import HomePatient from './pages/Home/patient';
import NurseStationIndex from './pages/NurseStation/index';
import SettingsIndex from './pages/Settings/index';
import SettingsViewSettings from './pages/Settings/view_settings';
import SettingsAddSetting from './pages/Settings/add_setting';
import SettingsEditSetting from './pages/Settings/edit_setting';
import SettingsEditDiscount from './pages/Settings/edit_discount';
import SettingsQueueManager from './pages/Settings/queue_manager';
import SettingsIncallQueue from './pages/Settings/incall_queue';
import ExpensesIndex from './pages/Expenses/index';
import ExpensesRecurringModal from './pages/Expenses/recurring_modal';
import ExpensesEnablePendingModal from './pages/Expenses/enable_pending_modal';
import ExpensesRecurringApproveInvoiceModal from './pages/Expenses/recurring_approve_invoice_modal';
import ExpensesPendingRecordModal from './pages/Expenses/pending_record_modal';
import ExpensesDisableRecurringModal from './pages/Expenses/disable_recurring_modal';
import ExpensesWriteoffRecurringModal from './pages/Expenses/writeoff_recurring_modal';
import ExpensesEnableRecurringModal from './pages/Expenses/enable_recurring_modal';
import ExpensesRecurringAmountModal from './pages/Expenses/recurring_amount_modal';
import ExpensesPendingAmountModal from './pages/Expenses/pending_amount_modal';
import ExpensesPendingModal from './pages/Expenses/pending_modal';
import ExpensesDisablePendingModal from './pages/Expenses/disable_pending_modal';
import ExpensesWriteoffPendingModal from './pages/Expenses/writeoff_pending_modal';
import ExpensesApproveInvoiceModal from './pages/Expenses/approve_invoice_modal';
import ExpensesRecurringRecordModal from './pages/Expenses/recurring_record_modal';
import CashIndex from './pages/Cash/index';
import CashCashRecords from './pages/Cash/cash_records';
import CashCashRecordsOld from './pages/Cash/cash_records_old';
import CashCashRecordsCopy from './pages/Cash/cash_records_copy';
import CashCashierSales from './pages/Cash/cashier_sales';
import CashViewSalesReport from './pages/Cash/view_sales_report';
import CashPrintSalesReport from './pages/Cash/print_sales_report';
import CashPrintCashRecords from './pages/Cash/print_cash_records';
import CashCashSettlement from './pages/Cash/cash_settlement';
import CashRefunds from './pages/Cash/refunds';
import CashSubmitSales from './pages/Cash/submit_sales';
import CashFlowIndex from './pages/CashFlow/index';
import CashBookIndex from './pages/CashBook/index';
import CashBookEditDrugPrice from './pages/CashBook/edit_drug_price';
import CashBookEditLabTestPrice from './pages/CashBook/edit_lab_test_price';
import CashBookEditServiceStockPrice from './pages/CashBook/edit_service_stock_price';
import CashBookEditDrugPriceCredit from './pages/CashBook/edit_drug_price_credit';
import CashBookEditLabTestPriceCredit from './pages/CashBook/edit_lab_test_price_credit';
import CashBookEditServiceStockPriceCredit from './pages/CashBook/edit_service_stock_price_credit';
import CashBookEditConsultationPriceCredit from './pages/CashBook/edit_consultation_price_credit';
import CashBookEditRadiologyPriceCredit from './pages/CashBook/edit_radiology_price_credit';
import CashBookEditWardPriceCredit from './pages/CashBook/edit_ward_price_credit';
import CashBookEditProcedurePriceCredit from './pages/CashBook/edit_procedure_price_credit';
import CashBookEditProcedureStocksPriceCredit from './pages/CashBook/edit_procedure_stocks_price_credit';
import { templateRoutes } from './routes';
import { overriddenPaths } from './routeOverrides';
import InventoryOrders from './pages/Inventory/orders';
import InventoryStockCountReconciliation from './pages/Inventory/stock_count_reconciliation';
import InventoryWasteRecord from './pages/Inventory/waste_record';
import InventoryCategories from './pages/Inventory/categories';
import InventoryInventoryReport from './pages/Inventory/inventory_report';
import InventoryTransferList from './pages/Inventory/transfer_list';
import InventoryAddMedicine from './pages/Inventory/add_medicine';
import InventoryBaskets from './pages/Inventory/baskets';
import InventoryDepartmentStore from './pages/Inventory/department_store';
import InventoryStockTransfers from './pages/Inventory/stock_transfers';
import InventoryBloodBank from './pages/Inventory/blood_bank';
import InventoryCount from './pages/Inventory/count';
import InventoryOutlets from './pages/Inventory/outlets';
import InventoryViewPurchases from './pages/Inventory/view_purchases';
import InventoryStockCount from './pages/Inventory/stock_count';
import InventoryEditItemModal from './pages/Inventory/edit_item_modal';
import InventoryManage from './pages/Inventory/manage';
import InventoryModalTemplate from './pages/Inventory/modal-template';
import InventoryConsumables from './pages/Inventory/consumables';
import InventoryReconciliations from './pages/Inventory/reconciliations';
import InventoryRecipeViewer from './pages/Inventory/recipe_viewer';
import InventoryAssessTransfer from './pages/Inventory/assess_transfer';
import InventoryItems from './pages/Inventory/items';
import InventoryAddItem from './pages/Inventory/add_item';
import InventoryMainStore from './pages/Inventory/main_store';
import InventoryDrugStockFiltered from './pages/Inventory/drug_stock_filtered';
import InventoryViewStockReconciliation from './pages/Inventory/view_stock_reconciliation';
import InventoryReceiveStock from './pages/Inventory/receive_stock';
import InventoryViewCount from './pages/Inventory/view_count';
import InventoryViewStockCount from './pages/Inventory/view_stock_count';
import InventoryWaste from './pages/Inventory/waste';
import InventoryDrugFiltered from './pages/Inventory/drug_filtered';
import InventoryReceivePurchases from './pages/Inventory/receive_purchases';
import InventoryDrugConsumption from './pages/Inventory/drug_consumption';
import InventoryTransfers from './pages/Inventory/transfers';
import InventoryOrderStockCount from './pages/Inventory/order_stock_count';
import InventoryDrugs from './pages/Inventory/drugs';
import InventoryForcasting from './pages/Inventory/forcasting';
import CreditClaimsIndex from './pages/CreditClaims/index';
import CreditClaimsFlaggedAndSubmittedClaims from './pages/CreditClaims/flagged_and_submitted_claims';
import CreditClaimsClaimReconciliation from './pages/CreditClaims/claim_reconciliation';
import CreditClaimsViewClaimDetails from './pages/CreditClaims/view_claim_details';
import CreditClaimsViewClaimDetailsInpatient from './pages/CreditClaims/view_claim_details_inpatient';
import CreditClaimsClaimPdf from './pages/CreditClaims/claim_pdf';
import VspProcurementIndex from './pages/VspProcurement/index';
import VspProcurementVspView from './pages/VspProcurement/vsp_view';
import InventoryListReport from './pages/InventoryList/report';
import InventoryListManageEquipment from './pages/InventoryList/manage_equipment';
import InventoryListRecordWorkOrder from './pages/InventoryList/record_work_order';
import InventoryListWorkOrderTracker from './pages/InventoryList/work_order_tracker';
import InvoicingIndex from './pages/Invoicing/index';
import InvoicingEdit from './pages/Invoicing/edit';
import InvoicingConfirm from './pages/Invoicing/confirm';
import PaymentsIndex from './pages/Payments/index';
import SessionsIndex from './pages/Sessions/index';
import SessionsCreateSession from './pages/Sessions/create_session';
import SessionsCreateSessionVisit from './pages/Sessions/create_session_visit';
import SessionsCreateVoucher from './pages/Sessions/create_voucher';
import SessionsPlanner from './pages/Sessions/planner';
import SessionsPlannerCalendar from './pages/Sessions/planner_calendar';
import SessionsDoctorPlanner from './pages/Sessions/doctor_planner';
import SessionsConfigureSession from './pages/Sessions/configure_session';
import SessionsVoucherInvoiceItems from './pages/Sessions/voucher_invoice_items';
import SessionsVoucherPayments from './pages/Sessions/voucher_payments';
import QueueDoctor from './pages/Queue/doctor';
import QueueNurse from './pages/Queue/nurse';
import ReportQueriesPatientBasic from './pages/ReportQueries/patient_basic';
import ReportQueriesMedicineAvailability from './pages/ReportQueries/medicine_availability';
import ReportQueriesLabAnalyticsReport from './pages/ReportQueries/lab_analytics_report';
import ReportQueriesSalesReport from './pages/ReportQueries/sales_report';
import ReportQueriesView from './pages/ReportQueries/view';
import ReportQueriesPriceAdjustmentReport from './pages/ReportQueries/price_adjustment_report';
import ReportQueriesClinical from './pages/ReportQueries/clinical';
import ReportQueriesIndex from './pages/ReportQueries/index';
import ReportQueriesDashboard from './pages/ReportQueries/dashboard';
import ReportQueriesAlo from './pages/ReportQueries/alo';
import ReportsClaims from './pages/Reports/claims';
import ReportsNotifications from './pages/Reports/notifications';
import Reports_oldClaims from './pages/Reports_old/claims';
import Reports_oldNotifications from './pages/Reports_old/notifications';
import Reports_2021_03_11Claims from './pages/Reports_2021_03_11/claims';
import Reports_2021_03_11DrugConsumption from './pages/Reports_2021_03_11/drug_consumption';
import RequestApprovalIndex from './pages/RequestApproval/index';
import RequestPrescriptionsIndex from './pages/RequestPrescriptions/index';
import RequestPrescriptionsAdd from './pages/RequestPrescriptions/add';
import RequestPrescriptionsEdit from './pages/RequestPrescriptions/edit';
import RequestPrescriptionsView from './pages/RequestPrescriptions/view';
import RequestServicesIndex from './pages/RequestServices/index';
import RequestServicesViewRequest from './pages/RequestServices/view_request';
import RequestServicesReport from './pages/RequestServices/report';
import RequestSurgeriesIndex from './pages/RequestSurgeries/index';
import RequestSurgeriesView from './pages/RequestSurgeries/view';
import RequestSurgeriesViewRequest from './pages/RequestSurgeries/view_request';
import RequestSurgeriesViewRequestSurgery from './pages/RequestSurgeries/view_request_surgery';
import RequestSurgeriesEditRequestSurgery from './pages/RequestSurgeries/edit_request_surgery';
import RequestSurgeriesReport from './pages/RequestSurgeries/report';
import RequestRadiologiesIndex from './pages/RequestRadiologies/index';
import RequestRadiologiesViewRequest from './pages/RequestRadiologies/view_request';
import RequestRadiologiesReport from './pages/RequestRadiologies/report';
import RequestRadiologiesPatientVisitReport from './pages/RequestRadiologies/patient_visit_report';
import RequestRadiologiesScanTestResult from './pages/RequestRadiologies/scan_test_result';
import RequestRadiologiesViewScanFiles from './pages/RequestRadiologies/view_scan_files';
import RequestRadiologiesViewPatientScanFiles from './pages/RequestRadiologies/view_patient_scan_files';
import RequestRadiologiesRadiologyScansFiles from './pages/RequestRadiologies/radiology_scans_files';
import RequestRadiologiesViewProcessScan from './pages/RequestRadiologies/view_process_scan';
import RequestLabsIndex from './pages/RequestLabs/index';
import RequestLabsAnalysis from './pages/RequestLabs/analysis';
import RequestLabsReport from './pages/RequestLabs/report';
import RequestLabsPatientReport from './pages/RequestLabs/patient_report';
import RequestLabsPatientVisitReport from './pages/RequestLabs/patient_visit_report';
import RequestLabsPatientVisitLabReport from './pages/RequestLabs/patient_visit_lab_report';
import RequestLabsVisitRequestLabReport from './pages/RequestLabs/visit_request_lab_report';
import RequestLabsEmailPatientVisitReport from './pages/RequestLabs/email_patient_visit_report';
import RequestLabsLabTestResult from './pages/RequestLabs/lab_test_result';
import RequestLabsLabTestHistory from './pages/RequestLabs/lab_test_history';
import RequestLabsSpecimenTracker from './pages/RequestLabs/specimen_tracker';
import RequestLabsSpecimenTrackerInformation from './pages/RequestLabs/specimen_tracker_information';
import RequestLabsLoadedLabTemplate from './pages/RequestLabs/loaded_lab_template';
import RequestLabsSinglePatientVisitReport from './pages/RequestLabs/single_patient_visit_report';
import RequestLabsViewRequest from './pages/RequestLabs/view_request';
import RequestLabsCompleteBomDetails from './pages/RequestLabs/complete_bom_details';
import RequestMedicationsIndex from './pages/RequestMedications/index';
import RequestMedicationsReport from './pages/RequestMedications/report';
import RequestMedicationsReportBase from './pages/RequestMedications/report_base';
import RequestMedicationsOtherItems from './pages/RequestMedications/other_items';
import RequestMedicationsViewRequest from './pages/RequestMedications/view_request';
import RequestMedicationsViewOtherItemRequest from './pages/RequestMedications/view_other_item_request';
import RequestMedicationsViewMedication from './pages/RequestMedications/view_medication';
import RequestMedicationsViewPrescription from './pages/RequestMedications/view_prescription';
import RequestMedicationsViewPrescriptionTp from './pages/RequestMedications/view_prescription_tp';
import RequestMedicationsAllPatientRequestedMedicationTp from './pages/RequestMedications/all_patient_requested_medication_tp';
import RequestMedicationsViewInfusion from './pages/RequestMedications/view_infusion';
import RequestMedicationsViewInfusionTp from './pages/RequestMedications/view_infusion_tp';
import RequestMedicationsViewTransfusion from './pages/RequestMedications/view_transfusion';
import ManageInsurancesIndex from './pages/ManageInsurances/index';
import ManageInsurancesEditPrivateInsurance from './pages/ManageInsurances/edit_private_insurance';
import ManageInsurancesEditPublicInsurance from './pages/ManageInsurances/edit_public_insurance';
import ManageInsurancesEditCompanyInsurance from './pages/ManageInsurances/edit_company_insurance';
import ManageLabsIndex from './pages/ManageLabs/index';
import ManageLabsViewLabTest from './pages/ManageLabs/view_lab_test';
import ManageLabsUpdateLabTemplate from './pages/ManageLabs/update_lab_template';
import ManageLabsEditSpecimenTypeModal from './pages/ManageLabs/edit_specimen_type_modal';
import ManageRadiologiesIndex from './pages/ManageRadiologies/index';
import ManageRadiologiesUpdateScanTemplate from './pages/ManageRadiologies/update_scan_template';
import ManageServicesIndex from './pages/ManageServices/index';
import ManageServicesUpdateLabTemplate from './pages/ManageServices/update_lab_template';
import ManageWardsIndex from './pages/ManageWards/index';
import ToastViewport from './components/ToastViewport';

const Loading = () => (
  <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 text-sm text-slate-700">
    Loading template...
  </div>
);

export default function App() {
  const routedTemplates = templateRoutes.filter((route) => !overriddenPaths.has(route.path));

  return (
    <BrowserRouter>
      <ToastViewport />
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/Users/login" element={<UsersLogin />} />
          <Route path="/:institutionUri" element={<UsersLogin />} />
          <Route path="/:institutionUri/Users/login" element={<UsersLogin />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/Home/index" element={<HomeIndex />} />
          <Route path="/Home/patient" element={<HomePatient />} />
          <Route path="/NurseStation/index" element={<NurseStationIndex />} />
          <Route path="/Queue/doctor" element={<QueueDoctor />} />
          <Route path="/Billings/index" element={<BillingsIndex />} />
          <Route path="/Billings/index/:billType" element={<BillingsIndex />} />
          <Route path="/Billings/view_invoice" element={<BillingsViewInvoice />} />
          <Route path="/Billings/new_billing_report" element={<BillingsNewBillingReport />} />
          <Route path="/CreditClaims/index" element={<CreditClaimsIndex />} />
          <Route path="/CreditClaims/flagged_and_submitted_claims" element={<CreditClaimsFlaggedAndSubmittedClaims />} />
          <Route path="/CreditClaims/claim_reconciliation" element={<CreditClaimsClaimReconciliation />} />
          <Route path="/CreditClaims/claim-reconciliation" element={<CreditClaimsClaimReconciliation />} />
          <Route path="/credit-claims/claim-reconciliation" element={<CreditClaimsClaimReconciliation />} />
          <Route path="/CreditClaims/view_claim_details" element={<CreditClaimsViewClaimDetails />} />
          <Route path="/CreditClaims/view_claim_details_inpatient" element={<CreditClaimsViewClaimDetailsInpatient />} />
          <Route path="/CreditClaims/claim_pdf" element={<CreditClaimsClaimPdf />} />
          <Route path="/ManageLabs/index" element={<ManageLabsIndex />} />
          <Route path="/ManageInsurances/index" element={<ManageInsurancesIndex />} />
          <Route path="/ManageSecurity/index" element={<ManageSecurityIndex />} />
          <Route path="/Sessions/index" element={<SessionsIndex />} />
          <Route path="/Settings/index" element={<SettingsIndex />} />
          <Route path="/Patients/view_patients" element={<PatientsViewPatients />} />
          <Route path="/Patients/add_patient" element={<PatientsAddPatient />} />
          <Route path="/Patients/add_walkin_patient" element={<PatientsAddWalkinPatient />} />
          <Route path="/Patients/view_patient" element={<PatientsViewPatient />} />
          <Route path="/Patients/view_patients_routine_care" element={<PatientsViewPatientsRoutineCare />} />
          <Route path="/Patients/edit_patient" element={<PatientsEditPatient />} />
          <Route path="/Patients/view_opd_visits" element={<PatientsViewOpdVisits />} />
          <Route path="/Patients/view_opd_visits/:filterType/:periodType" element={<PatientsViewOpdVisits />} />
          <Route path="/Patients/view_visits_ipd" element={<PatientsViewVisitsIpd />} />
          <Route path="/Patients/visit_space" element={<PatientsVisitSpace />} />
          <Route path="/Book/manage_appointments" element={<BookManageAppointmentsPage />} />
          <Route path="/Sessions/planner" element={<SessionsPlanner />} />
          <Route path="/RequestLabs/view_request" element={<RequestLabsViewRequest />} />
          <Route path="/RequestLabs/index" element={<RequestLabsIndex />} />
          <Route path="/RequestLabs/specimen_tracker" element={<RequestLabsSpecimenTracker />} />
          <Route path="/RequestMedications/index" element={<RequestMedicationsIndex />} />
          <Route path="/RequestMedications/view_request" element={<RequestMedicationsViewRequest />} />
          <Route path="/RequestRadiologies/index" element={<RequestRadiologiesIndex />} />
          <Route path="/RequestRadiologies/view_request" element={<RequestRadiologiesViewRequest />} />
          <Route path="/RequestRadiologies/report" element={<RequestRadiologiesReport />} />
          <Route path="/RequestRadiologies/patient_visit_report" element={<RequestRadiologiesPatientVisitReport />} />
          <Route path="/RequestRadiologies/scan_test_result" element={<RequestRadiologiesScanTestResult />} />
          <Route path="/RequestRadiologies/view_scan_files" element={<RequestRadiologiesViewScanFiles />} />
          <Route path="/RequestRadiologies/view_patient_scan_files" element={<RequestRadiologiesViewPatientScanFiles />} />
          <Route path="/RequestRadiologies/radiology_scans_files" element={<RequestRadiologiesRadiologyScansFiles />} />
          <Route path="/RequestRadiologies/view_process_scan" element={<RequestRadiologiesViewProcessScan />} />
          <Route path="/Inventory/items" element={<InventoryItems />} />
          <Route path="/Inventory/add_item" element={<InventoryAddItem />} />
          <Route path="/Inventory/add_blood_item" element={<InventoryAddItem />} />
          <Route path="/Inventory/add_consumables" element={<InventoryAddItem />} />
          <Route path="/Inventory/main_store" element={<InventoryMainStore />} />
          <Route path="/Inventory/receive_purchases" element={<InventoryReceivePurchases />} />
          <Route path="/Inventory/view_purchases" element={<InventoryViewPurchases />} />
          <Route path="/Inventory/manage" element={<InventoryManage />} />
          <Route path="/InventoryList/report" element={<InventoryListReport />} />
          <Route path="/InventoryList/manage_equipment" element={<InventoryListManageEquipment />} />
          <Route path="/InventoryList/record_work_order" element={<InventoryListRecordWorkOrder />} />
          <Route path="/InventoryList/work_order_tracker" element={<InventoryListWorkOrderTracker />} />
          <Route path="/VspProcurement/index" element={<VspProcurementIndex />} />
          <Route path="/VspProcurement/vsp" element={<VspProcurementVspView />} />
          <Route path="/Users/update_profile" element={<UsersUpdateProfile />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route index element={<TemplateIndex />} />
          <Route path="/Users/change_password" element={<UsersChangePassword />} />
          <Route path="/Users/reset_password" element={<UsersResetPassword />} />
          <Route path="/Users/view_user_details" element={<UsersViewUserDetails />} />
          <Route path="/Users/edit_user" element={<UsersEditUser />} />
          <Route path="/Patients/dashboard" element={<PatientsDashboard />} />
          <Route path="/Patients/view_visits" element={<PatientsViewVisits />} />
          <Route path="/Patients/view_visit" element={<PatientsViewVisit />} />
          <Route path="/Patients/patient_bill" element={<PatientsPatientBill />} />
          <Route path="/Patients/view_patient_history" element={<PatientsViewPatientHistory />} />
          <Route path="/Patients/view_patient_examination" element={<PatientsViewPatientExamination />} />
          <Route path="/Patients/view_patient_note" element={<PatientsViewPatientNote />} />
          <Route path="/Patients/view_patient_flow" element={<PatientsViewPatientFlow />} />
          <Route path="/Patients/view_patients_employee" element={<PatientsViewPatientsEmployee />} />
          <Route path="/Patients/population_health_dashboard" element={<PatientsPopulationHealthDashboard />} />
          <Route path="/Patients/executive_summary_dashboard" element={<PatientsExecutiveSummaryDashboard />} />
          <Route path="/Patients/financial_dashboard" element={<PatientsFinancialDashboard />} />
          <Route path="/Patients/clinical_quality_dashboard" element={<PatientsClinicalQualityDashboard />} />
          <Route path="/Patients/operation_efficiency" element={<PatientsOperationEfficiency />} />
          <Route path="/Patients/provider_productivity" element={<PatientsProviderProductivity />} />
          <Route path="/Patients/visit_mini" element={<PatientsVisitMini />} />
          <Route path="/Patients/visit_report" element={<PatientsVisitReport />} />
          <Route path="/Patients/view_visit_report" element={<PatientsViewVisitReport />} />
          <Route path="/Patients/outpatient_report" element={<PatientsOutpatientReport />} />
          <Route path="/Patients/inpatient_report" element={<PatientsInpatientReport />} />
          <Route path="/Patients/prerounding" element={<PatientsPrerounding />} />
          <Route path="/Patients/maternal_visits" element={<PatientsMaternalVisits />} />
          <Route path="/Patients/eye_space" element={<PatientsEyeSpace />} />
          <Route path="/Patients/chiro_space" element={<PatientsChiroSpace />} />
          <Route path="/Patients/patient_sessions_view" element={<PatientsPatientSessionsView />} />
          <Route path="/Patients/patient_insurance_expiry" element={<PatientsPatientInsuranceExpiry />} />
          <Route path="/Patients/routine_care_report" element={<PatientsRoutineCareReport />} />
          <Route path="/Patients/selective_patient_bill" element={<PatientsSelectivePatientBill />} />
          <Route path="/Patients/referal_report" element={<PatientsReferalReport />} />
          <Route path="/Patients/chiro_assessment_plan_visit_report" element={<PatientsChiroAssessmentPlanVisitReport />} />
          <Route path="/Patients/single_chiro_assessment_plan_visit_report" element={<PatientsSingleChiroAssessmentPlanVisitReport />} />
          <Route path="/Patients/chiro_notes_visit_report" element={<PatientsChiroNotesVisitReport />} />
          <Route path="/Patients/view_maternity" element={<PatientsViewMaternity />} />
          <Route path="/Patients/view_maternity_1" element={<PatientsViewMaternity1 />} />
          <Route path="/Patients/json/update_procedures" element={<PatientsJsonUpdateProcedures />} />
          <Route path="/Billings/analytics" element={<BillingsAnalytics />} />
          <Route path="/Billings/analytics_copy" element={<BillingsAnalyticsCopy />} />
          <Route path="/Billings/receipt" element={<BillingsReceipt />} />
          <Route path="/Billings/invoice_payments" element={<BillingsInvoicePayments />} />
          <Route path="/Billings/reconcile" element={<BillingsReconcile />} />
          <Route path="/Billings/super_bill" element={<BillingsSuperBill />} />
          <Route path="/Billings/billing_report" element={<BillingsBillingReport />} />
          <Route path="/Billings/insurance_billing_report" element={<BillingsInsuranceBillingReport />} />
          <Route path="/Billings/patient_outstanding_bills" element={<BillingsPatientOutstandingBills />} />
          <Route path="/Billings/session_vouchers" element={<BillingsSessionVouchers />} />
          <Route path="/Billings/sales_reversals" element={<BillingsSalesReversals />} />
          <Route path="/Billings/index_2021_08_31" element={<BillingsIndex20210831 />} />
          <Route path="/Billings/indexed" element={<BillingsIndexed />} />
          <Route path="/Billings/export_data_to_pdf" element={<BillingsExportDataToPdf />} />
          <Route path="/ManageSecurity/edit_specialties" element={<ManageSecurityEditSpecialties />} />
          <Route path="/Settings/view_settings" element={<SettingsViewSettings />} />
          <Route path="/Settings/add_setting" element={<SettingsAddSetting />} />
          <Route path="/Settings/edit_setting" element={<SettingsEditSetting />} />
          <Route path="/Settings/edit_discount" element={<SettingsEditDiscount />} />
          <Route path="/Settings/queue_manager" element={<SettingsQueueManager />} />
          <Route path="/Settings/incall_queue" element={<SettingsIncallQueue />} />
          <Route path="/Expenses/index" element={<ExpensesIndex />} />
          <Route path="/Expenses/recurring_modal" element={<ExpensesRecurringModal />} />
          <Route path="/Expenses/enable_pending_modal" element={<ExpensesEnablePendingModal />} />
          <Route path="/Expenses/recurring_approve_invoice_modal" element={<ExpensesRecurringApproveInvoiceModal />} />
          <Route path="/Expenses/pending_record_modal" element={<ExpensesPendingRecordModal />} />
          <Route path="/Expenses/disable_recurring_modal" element={<ExpensesDisableRecurringModal />} />
          <Route path="/Expenses/writeoff_recurring_modal" element={<ExpensesWriteoffRecurringModal />} />
          <Route path="/Expenses/enable_recurring_modal" element={<ExpensesEnableRecurringModal />} />
          <Route path="/Expenses/recurring_amount_modal" element={<ExpensesRecurringAmountModal />} />
          <Route path="/Expenses/pending_amount_modal" element={<ExpensesPendingAmountModal />} />
          <Route path="/Expenses/pending_modal" element={<ExpensesPendingModal />} />
          <Route path="/Expenses/disable_pending_modal" element={<ExpensesDisablePendingModal />} />
          <Route path="/Expenses/writeoff_pending_modal" element={<ExpensesWriteoffPendingModal />} />
          <Route path="/Expenses/approve_invoice_modal" element={<ExpensesApproveInvoiceModal />} />
          <Route path="/Expenses/recurring_record_modal" element={<ExpensesRecurringRecordModal />} />
          <Route path="/Cash/index" element={<CashIndex />} />
          <Route path="/Cash/cash_records" element={<CashCashRecords />} />
          <Route path="/Cash/cash_records_old" element={<CashCashRecordsOld />} />
          <Route path="/Cash/cash_records_copy" element={<CashCashRecordsCopy />} />
          <Route path="/Cash/cashier_sales" element={<CashCashierSales />} />
          <Route path="/Cash/view_sales_report" element={<CashViewSalesReport />} />
          <Route path="/Cash/print_sales_report" element={<CashPrintSalesReport />} />
          <Route path="/Cash/print_cash_records" element={<CashPrintCashRecords />} />
          <Route path="/Cash/cash_settlement" element={<CashCashSettlement />} />
          <Route path="/Cash/refunds" element={<CashRefunds />} />
          <Route path="/Cash/submit_sales" element={<CashSubmitSales />} />
          <Route path="/CashFlow/index" element={<CashFlowIndex />} />
          <Route path="/CashBook/index" element={<CashBookIndex />} />
          <Route path="/CashBook/edit_drug_price" element={<CashBookEditDrugPrice />} />
          <Route path="/CashBook/edit_lab_test_price" element={<CashBookEditLabTestPrice />} />
          <Route path="/CashBook/edit_service_stock_price" element={<CashBookEditServiceStockPrice />} />
          <Route path="/CashBook/edit_drug_price_credit" element={<CashBookEditDrugPriceCredit />} />
          <Route path="/CashBook/edit_lab_test_price_credit" element={<CashBookEditLabTestPriceCredit />} />
          <Route path="/CashBook/edit_service_stock_price_credit" element={<CashBookEditServiceStockPriceCredit />} />
          <Route path="/CashBook/edit_consultation_price_credit" element={<CashBookEditConsultationPriceCredit />} />
          <Route path="/CashBook/edit_radiology_price_credit" element={<CashBookEditRadiologyPriceCredit />} />
          <Route path="/CashBook/edit_ward_price_credit" element={<CashBookEditWardPriceCredit />} />
          <Route path="/CashBook/edit_procedure_price_credit" element={<CashBookEditProcedurePriceCredit />} />
          <Route path="/CashBook/edit_procedure_stocks_price_credit" element={<CashBookEditProcedureStocksPriceCredit />} />
          <Route path="/Inventory/orders" element={<InventoryOrders />} />
          <Route path="/Inventory/stock_count_reconciliation" element={<InventoryStockCountReconciliation />} />
          <Route path="/Inventory/waste_record" element={<InventoryWasteRecord />} />
          <Route path="/Inventory/categories" element={<InventoryCategories />} />
          <Route path="/Inventory/inventory_report" element={<InventoryInventoryReport />} />
          <Route path="/Inventory/transfer_list" element={<InventoryTransferList />} />
          <Route path="/Inventory/add_medicine" element={<InventoryAddMedicine />} />
          <Route path="/Inventory/baskets" element={<InventoryBaskets />} />
          <Route path="/Inventory/department_store" element={<InventoryDepartmentStore />} />
          <Route path="/Inventory/stock_transfers" element={<InventoryStockTransfers />} />
          <Route path="/Inventory/blood_bank" element={<InventoryBloodBank />} />
          <Route path="/Inventory/count" element={<InventoryCount />} />
          <Route path="/Inventory/outlets" element={<InventoryOutlets />} />
          <Route path="/Inventory/stock_count" element={<InventoryStockCount />} />
          <Route path="/Inventory/edit_item_modal" element={<InventoryEditItemModal />} />
          <Route path="/Inventory/modal-template" element={<InventoryModalTemplate />} />
          <Route path="/Inventory/consumables" element={<InventoryConsumables />} />
          <Route path="/Inventory/reconciliations" element={<InventoryReconciliations />} />
          <Route path="/Inventory/recipe_viewer" element={<InventoryRecipeViewer />} />
          <Route path="/Inventory/assess_transfer" element={<InventoryAssessTransfer />} />
          <Route path="/Inventory/drug_stock_filtered" element={<InventoryDrugStockFiltered />} />
          <Route path="/Inventory/view_stock_reconciliation" element={<InventoryViewStockReconciliation />} />
          <Route path="/Inventory/receive_stock" element={<InventoryReceiveStock />} />
          <Route path="/Inventory/view_count" element={<InventoryViewCount />} />
          <Route path="/Inventory/view_stock_count" element={<InventoryViewStockCount />} />
          <Route path="/Inventory/waste" element={<InventoryWaste />} />
          <Route path="/Inventory/drug_filtered" element={<InventoryDrugFiltered />} />
          <Route path="/Inventory/drug_consumption" element={<InventoryDrugConsumption />} />
          <Route path="/Inventory/transfers" element={<InventoryTransfers />} />
          <Route path="/Inventory/order_stock_count" element={<InventoryOrderStockCount />} />
          <Route path="/Inventory/drugs" element={<InventoryDrugs />} />
          <Route path="/Inventory/forcasting" element={<InventoryForcasting />} />
          <Route path="/Invoicing/index" element={<InvoicingIndex />} />
          <Route path="/Invoicing/edit" element={<InvoicingEdit />} />
          <Route path="/Invoicing/confirm" element={<InvoicingConfirm />} />
          <Route path="/Payments/index" element={<PaymentsIndex />} />
          <Route path="/Sessions/create_session" element={<SessionsCreateSession />} />
          <Route path="/Sessions/create_session_visit" element={<SessionsCreateSessionVisit />} />
          <Route path="/Sessions/create_voucher" element={<SessionsCreateVoucher />} />
          <Route path="/Sessions/planner_calendar" element={<SessionsPlannerCalendar />} />
          <Route path="/Sessions/doctor_planner" element={<SessionsDoctorPlanner />} />
          <Route path="/Sessions/configure_session" element={<SessionsConfigureSession />} />
          <Route path="/Sessions/voucher_invoice_items" element={<SessionsVoucherInvoiceItems />} />
          <Route path="/Sessions/voucher_payments" element={<SessionsVoucherPayments />} />
          <Route path="/Queue/nurse" element={<QueueNurse />} />

          <Route path="/ReportQueries/patient_basic" element={<ReportQueriesPatientBasic />} />
          <Route path="/ReportQueries/medicine_availability" element={<ReportQueriesMedicineAvailability />} />
          <Route path="/ReportQueries/lab_analytics_report" element={<ReportQueriesLabAnalyticsReport />} />
          <Route path="/ReportQueries/sales_report" element={<ReportQueriesSalesReport />} />
          <Route path="/ReportQueries/view" element={<ReportQueriesView />} />
          <Route path="/ReportQueries/price_adjustment_report" element={<ReportQueriesPriceAdjustmentReport />} />
          <Route path="/ReportQueries/clinical" element={<ReportQueriesClinical />} />
          <Route path="/ReportQueries/index" element={<ReportQueriesIndex />} />
          <Route path="/ReportQueries/dashboard" element={<ReportQueriesDashboard />} />
          <Route path="/ReportQueries/alo" element={<ReportQueriesAlo />} />

          <Route path="/Reports/claims" element={<ReportsClaims />} />
          <Route path="/Reports/notifications" element={<ReportsNotifications />} />

          <Route path="/Reports_old/claims" element={<Reports_oldClaims />} />
          <Route path="/Reports_old/notifications" element={<Reports_oldNotifications />} />

          <Route path="/Reports_2021_03_11/claims" element={<Reports_2021_03_11Claims />} />
          <Route path="/Reports_2021_03_11/drug_consumption" element={<Reports_2021_03_11DrugConsumption />} />


          <Route path="/RequestApproval/index" element={<RequestApprovalIndex />} />
          <Route path="/RequestPrescriptions/index" element={<RequestPrescriptionsIndex />} />
          <Route path="/RequestPrescriptions/add" element={<RequestPrescriptionsAdd />} />
          <Route path="/RequestPrescriptions/edit" element={<RequestPrescriptionsEdit />} />
          <Route path="/RequestPrescriptions/view" element={<RequestPrescriptionsView />} />
          <Route path="/RequestServices/index" element={<RequestServicesIndex />} />
          <Route path="/RequestServices/view_request" element={<RequestServicesViewRequest />} />
          <Route path="/RequestServices/report" element={<RequestServicesReport />} />
          <Route path="/RequestSurgeries/index" element={<RequestSurgeriesIndex />} />
          <Route path="/RequestSurgeries/view" element={<RequestSurgeriesView />} />
          <Route path="/RequestSurgeries/view_request" element={<RequestSurgeriesViewRequest />} />
          <Route path="/RequestSurgeries/view_request_surgery" element={<RequestSurgeriesViewRequestSurgery />} />
          <Route path="/RequestSurgeries/edit_request_surgery" element={<RequestSurgeriesEditRequestSurgery />} />
          <Route path="/RequestSurgeries/report" element={<RequestSurgeriesReport />} />
          <Route path="/RequestLabs/analysis" element={<RequestLabsAnalysis />} />
          <Route path="/RequestLabs/report" element={<RequestLabsReport />} />
          <Route path="/RequestLabs/patient_report" element={<RequestLabsPatientReport />} />
          <Route path="/RequestLabs/patient_visit_report" element={<RequestLabsPatientVisitReport />} />
          <Route path="/RequestLabs/patient_visit_lab_report" element={<RequestLabsPatientVisitLabReport />} />
          <Route path="/RequestLabs/visit_request_lab_report" element={<RequestLabsVisitRequestLabReport />} />
          <Route path="/RequestLabs/email_patient_visit_report" element={<RequestLabsEmailPatientVisitReport />} />
          <Route path="/RequestLabs/lab_test_result" element={<RequestLabsLabTestResult />} />
          <Route path="/RequestLabs/lab_test_history" element={<RequestLabsLabTestHistory />} />
          <Route path="/RequestLabs/specimen_tracker_information" element={<RequestLabsSpecimenTrackerInformation />} />
          <Route path="/RequestLabs/loaded_lab_template" element={<RequestLabsLoadedLabTemplate />} />
          <Route path="/RequestLabs/single_patient_visit_report" element={<RequestLabsSinglePatientVisitReport />} />
          <Route path="/RequestLabs/complete_bom_details" element={<RequestLabsCompleteBomDetails />} />
          <Route path="/RequestMedications/report" element={<RequestMedicationsReport />} />
          <Route path="/RequestMedications/report_base" element={<RequestMedicationsReportBase />} />
          <Route path="/RequestMedications/other_items" element={<RequestMedicationsOtherItems />} />
          <Route path="/RequestMedications/view_other_item_request" element={<RequestMedicationsViewOtherItemRequest />} />
          <Route path="/RequestMedications/view_medication" element={<RequestMedicationsViewMedication />} />
          <Route path="/RequestMedications/view_prescription" element={<RequestMedicationsViewPrescription />} />
          <Route path="/RequestMedications/view_prescription_tp" element={<RequestMedicationsViewPrescriptionTp />} />
          <Route path="/RequestMedications/all_patient_requested_medication_tp" element={<RequestMedicationsAllPatientRequestedMedicationTp />} />
          <Route path="/RequestMedications/view_infusion" element={<RequestMedicationsViewInfusion />} />
          <Route path="/RequestMedications/view_infusion_tp" element={<RequestMedicationsViewInfusionTp />} />
          <Route path="/RequestMedications/view_transfusion" element={<RequestMedicationsViewTransfusion />} />

          <Route path="/ManageInsurances/edit_private_insurance" element={<ManageInsurancesEditPrivateInsurance />} />
          <Route path="/ManageInsurances/edit_public_insurance" element={<ManageInsurancesEditPublicInsurance />} />
          <Route path="/ManageInsurances/edit_company_insurance" element={<ManageInsurancesEditCompanyInsurance />} />
          <Route path="/ManageLabs/view_lab_test" element={<ManageLabsViewLabTest />} />
          <Route path="/ManageLabs/update_lab_template" element={<ManageLabsUpdateLabTemplate />} />
          <Route path="/ManageLabs/edit_specimen_type_modal" element={<ManageLabsEditSpecimenTypeModal />} />
          <Route path="/ManageRadiologies/index" element={<ManageRadiologiesIndex />} />
          <Route path="/ManageRadiologies/update_scan_template" element={<ManageRadiologiesUpdateScanTemplate />} />
          <Route path="/ManageServices/index" element={<ManageServicesIndex />} />
          <Route path="/ManageServices/update_lab_template" element={<ManageServicesUpdateLabTemplate />} />
          <Route path="/ManageWards/index" element={<ManageWardsIndex />} />

          {routedTemplates.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<Loading />}>
                  <Component />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
