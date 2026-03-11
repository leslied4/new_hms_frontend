import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../lib/api';
import SearchableSelect from './SearchableSelect';

type WorkspaceTab = 'manage' | 'tracker' | 'report' | 'record';

type EquipmentRow = {
  id: string;
  name?: string;
  item_category?: string;
  model?: string;
  manufacturer?: string;
  vendor_supplier?: string;
  quantity?: number | string;
  cost?: number | string;
  total_cost?: number | string;
  bill_amount?: number | string;
  bill_session?: number | string;
  risk_level?: string;
  institution_id?: string;
};

type TaskRow = {
  id: string;
  equipment_id?: string;
  title?: string;
  status?: string;
  priority?: string;
  due_date?: string;
  planned?: number | string;
  date_created?: string;
  institution_id?: string;
};

type WorkOrderRow = {
  id: string;
  equipment_maintenance_id?: string;
  wo_status?: string;
  service_procedure?: string;
  service_time?: string;
  down_time?: string;
  started?: string;
  finished?: string;
  fail_mode?: string;
  comments?: string;
  user_id?: string;
  institution_id?: string;
};

type PagedResponse<T> = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: T[];
};

type UserProfileResponse = {
  user?: {
    id?: string;
    institution_id?: string;
  };
};

type WorkOrderForm = {
  wo_status: string;
  service_procedure: string;
  service_time: string;
  down_time: string;
  started: string;
  finished: string;
  fail_mode: string;
  comments: string;
};

type EquipmentForm = {
  id: string;
  name: string;
  item_category: string;
  model: string;
  manufacturer: string;
  vendor_supplier: string;
  cost: string;
  quantity: string;
  total_cost: string;
  bill_amount: string;
  bill_session: string;
  risk_level: string;
};

type OptionRow = { id: string; name?: string; age?: string };

type EquipmentSpecRow = {
  id: string;
  serial_number: string;
  location: string;
  department: string;
  mdc: string;
  age: string;
  gender: string;
};

type ChecklistForm = {
  present: string;
  received: string;
  intact: string;
  reported: string;
  undamaged: string;
  ordered: string;
  user_manual_added: string;
  technical_manual_added: string;
  consumables_added: string;
  parts_added: string;
  satisfactorily: string;
  fitted: string;
  learners: string;
  working: string;
  staff_operation: string;
};

type MaintenanceForm = {
  notice_period: string;
  type: string;
  recur_start: string;
  condition: string;
  recur_end: string;
  occurence: string;
  every_day: string;
  every_week: string;
  every_month: string;
};

const EMPTY_FORM: WorkOrderForm = {
  wo_status: 'Pending',
  service_procedure: '',
  service_time: '',
  down_time: '',
  started: '',
  finished: '',
  fail_mode: '',
  comments: '',
};
const EMPTY_EQUIPMENT_FORM: EquipmentForm = {
  id: '',
  name: '',
  item_category: '',
  model: '',
  manufacturer: '',
  vendor_supplier: '',
  cost: '',
  quantity: '1',
  total_cost: '0',
  bill_amount: '0',
  bill_session: '1',
  risk_level: '',
};
const EMPTY_SPEC_ROW = (): EquipmentSpecRow => ({
  id: makeId(),
  serial_number: '',
  location: '',
  department: '',
  mdc: '',
  age: '',
  gender: '',
});
const EMPTY_CHECKLIST: ChecklistForm = {
  present: '2',
  received: '2',
  intact: '2',
  reported: '2',
  undamaged: '2',
  ordered: '2',
  user_manual_added: '2',
  technical_manual_added: '2',
  consumables_added: '2',
  parts_added: '2',
  satisfactorily: '2',
  fitted: '2',
  learners: '2',
  working: '2',
  staff_operation: '2',
};
const EMPTY_MAINTENANCE = (): MaintenanceForm => ({
  notice_period: '',
  type: '',
  recur_start: toInputDate(new Date()),
  condition: 'stop-date',
  recur_end: '',
  occurence: '',
  every_day: '1',
  every_week: '1',
  every_month: '1',
});

const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
const PAGE_SIZE = 40;

function asText(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function asArray<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (payload && typeof payload === 'object' && Array.isArray((payload as PagedResponse<T>).results)) {
    return ((payload as PagedResponse<T>).results || []) as T[];
  }
  return [];
}

function parseDate(value: string): Date | null {
  const text = asText(value);
  if (!text) return null;
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(value: string): string {
  const parsed = parseDate(value);
  if (!parsed) return 'N/A';
  return parsed.toLocaleDateString();
}

function formatDateTime(value: string): string {
  const parsed = parseDate(value);
  if (!parsed) return 'N/A';
  return parsed.toLocaleString();
}

function toInputDate(value: Date): string {
  const yyyy = value.getFullYear();
  const mm = `${value.getMonth() + 1}`.padStart(2, '0');
  const dd = `${value.getDate()}`.padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID().replace(/-/g, '');
  }
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function asNumber(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toQueryString(params: Record<string, string | number | undefined | null>): string {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    const text = String(value).trim();
    if (!text) return;
    qs.set(key, text);
  });
  return qs.toString();
}

async function fetchPage<T>(path: string, params: Record<string, string | number | undefined | null>) {
  const query = toQueryString(params);
  const divider = path.includes('?') ? '&' : '?';
  const payload = await api.get<PagedResponse<T> | T[]>(`${path}${query ? `${divider}${query}` : ''}`);
  const rows = asArray<T>(payload);
  const meta = payload && typeof payload === 'object' && !Array.isArray(payload)
    ? payload as PagedResponse<T>
    : undefined;
  return {
    rows,
    count: Number(meta?.count || 0),
    next: Boolean(meta?.next),
    previous: Boolean(meta?.previous),
  };
}

function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function InventoryListWorkspace({ initialTab }: { initialTab: WorkspaceTab }) {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<WorkspaceTab>(initialTab);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [equipments, setEquipments] = useState<EquipmentRow[]>([]);
  const [equipmentCatalog, setEquipmentCatalog] = useState<EquipmentRow[]>([]);
  const [tasks, setTasks] = useState<TaskRow[]>([]);
  const [reportTasks, setReportTasks] = useState<TaskRow[]>([]);
  const [workOrders, setWorkOrders] = useState<WorkOrderRow[]>([]);

  const [userId, setUserId] = useState('');
  const [institutionId, setInstitutionId] = useState('');

  const [equipmentSearch, setEquipmentSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [taskStatusFilter, setTaskStatusFilter] = useState('all');
  const [taskSearch, setTaskSearch] = useState('');
  const [reportSearch, setReportSearch] = useState('');
  const [reportStartDate, setReportStartDate] = useState(() => toInputDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1)));
  const [reportEndDate, setReportEndDate] = useState(() => toInputDate(new Date()));
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [form, setForm] = useState<WorkOrderForm>(EMPTY_FORM);
  const [equipmentPage, setEquipmentPage] = useState(1);
  const [taskPage, setTaskPage] = useState(1);
  const [reportPage, setReportPage] = useState(1);
  const [equipmentCount, setEquipmentCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const [hasEquipmentNext, setHasEquipmentNext] = useState(false);
  const [hasTaskNext, setHasTaskNext] = useState(false);
  const [hasReportNext, setHasReportNext] = useState(false);
  const [hasEquipmentPrevious, setHasEquipmentPrevious] = useState(false);
  const [hasTaskPrevious, setHasTaskPrevious] = useState(false);
  const [hasReportPrevious, setHasReportPrevious] = useState(false);
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);
  const [equipmentFormMode, setEquipmentFormMode] = useState<'create' | 'edit'>('create');
  const [equipmentForm, setEquipmentForm] = useState<EquipmentForm>(EMPTY_EQUIPMENT_FORM);
  const [departmentOptions, setDepartmentOptions] = useState<OptionRow[]>([]);
  const [specialtyOptions, setSpecialtyOptions] = useState<OptionRow[]>([]);
  const [ageOptions, setAgeOptions] = useState<OptionRow[]>([]);
  const [genderOptions, setGenderOptions] = useState<OptionRow[]>([]);
  const [vendorOptions, setVendorOptions] = useState<OptionRow[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [departmentQuery, setDepartmentQuery] = useState('');
  const [specRows, setSpecRows] = useState<EquipmentSpecRow[]>([EMPTY_SPEC_ROW()]);
  const [checklistForm, setChecklistForm] = useState<ChecklistForm>(EMPTY_CHECKLIST);
  const [maintenanceForm, setMaintenanceForm] = useState<MaintenanceForm>(EMPTY_MAINTENANCE);

  const debouncedEquipmentSearch = useDebouncedValue(equipmentSearch, 280);
  const debouncedTaskSearch = useDebouncedValue(taskSearch, 280);
  const debouncedReportSearch = useDebouncedValue(reportSearch, 280);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [profile, equipmentLookup, departments, specialties, ages, genders, vendors] = await Promise.all([
          api.get<UserProfileResponse>('/legacy/users/update-profile/'),
          fetchPage<EquipmentRow>('/equipment_management/', { page: 1, page_size: 500 }),
          fetchPage<OptionRow>('/departments/', { page: 1, page_size: 500 }),
          fetchPage<OptionRow>('/specialties/', { page: 1, page_size: 500 }),
          fetchPage<OptionRow>('/age_specifications/', { page: 1, page_size: 500 }),
          fetchPage<OptionRow>('/genders/', { page: 1, page_size: 500 }),
          fetchPage<OptionRow>('/vsp_procurement/', { page: 1, page_size: 500 }),
        ]);
        if (!mounted) return;
        setUserId(asText(profile?.user?.id));
        setInstitutionId(asText(profile?.user?.institution_id));
        setEquipmentCatalog(equipmentLookup.rows);
        setDepartmentOptions(departments.rows);
        setSpecialtyOptions(specialties.rows);
        setAgeOptions(ages.rows);
        setGenderOptions(genders.rows);
        setVendorOptions(vendors.rows);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load inventory list workspace.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const requestedTask = asText(searchParams.get('task_id'));
    if (!requestedTask) return;
    setSelectedTaskId(requestedTask);
    setTab('record');
  }, [searchParams]);

  useEffect(() => {
    if (tab !== 'manage') return;
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchPage<EquipmentRow>('/equipment_management/', {
          page: equipmentPage,
          page_size: PAGE_SIZE,
          search: debouncedEquipmentSearch || undefined,
          item_category: categoryFilter || undefined,
          institution_id: institutionId || undefined,
        });
        if (!mounted) return;
        setEquipments(response.rows);
        setEquipmentCount(response.count);
        setHasEquipmentNext(response.next);
        setHasEquipmentPrevious(response.previous);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load equipment.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [tab, equipmentPage, debouncedEquipmentSearch, categoryFilter, institutionId]);

  useEffect(() => {
    if (tab !== 'tracker' && tab !== 'record') return;
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [taskResponse, workOrderResponse] = await Promise.all([
          fetchPage<TaskRow>('/equipment_management_tasks/', {
            page: taskPage,
            page_size: PAGE_SIZE,
            search: debouncedTaskSearch || undefined,
            status: taskStatusFilter === 'all' ? undefined : taskStatusFilter,
            institution_id: institutionId || undefined,
          }),
          tab === 'record'
            ? fetchPage<WorkOrderRow>('/equipment_management_work_order_data/', {
                page: 1,
                page_size: 500,
                institution_id: institutionId || undefined,
              })
            : Promise.resolve({ rows: workOrders, count: 0, next: false, previous: false }),
        ]);
        if (!mounted) return;
        setTasks(taskResponse.rows);
        setTaskCount(taskResponse.count);
        setHasTaskNext(taskResponse.next);
        setHasTaskPrevious(taskResponse.previous);
        if (tab === 'record') {
          setWorkOrders(workOrderResponse.rows);
        }
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load tasks.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [tab, taskPage, debouncedTaskSearch, taskStatusFilter, institutionId]);

  useEffect(() => {
    if (tab !== 'report') return;
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchPage<TaskRow>('/equipment_management_tasks/', {
          page: reportPage,
          page_size: PAGE_SIZE,
          search: debouncedReportSearch || undefined,
          status: 'Completed',
          institution_id: institutionId || undefined,
        });
        if (!mounted) return;
        setReportTasks(response.rows);
        setReportCount(response.count);
        setHasReportNext(response.next);
        setHasReportPrevious(response.previous);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load reports.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [tab, reportPage, debouncedReportSearch, institutionId]);

  useEffect(() => {
    setEquipmentPage(1);
  }, [debouncedEquipmentSearch, categoryFilter]);

  useEffect(() => {
    setTaskPage(1);
  }, [debouncedTaskSearch, taskStatusFilter]);

  useEffect(() => {
    setReportPage(1);
  }, [debouncedReportSearch]);

  const equipmentById = useMemo(() => {
    const map = new Map<string, EquipmentRow>();
    equipmentCatalog.forEach((row) => {
      map.set(asText(row.id), row);
    });
    equipments.forEach((row) => {
      map.set(asText(row.id), row);
    });
    return map;
  }, [equipments, equipmentCatalog]);

  const categories = useMemo(() => {
    return Array.from(new Set(equipmentCatalog.map((row) => asText(row.item_category)).filter(Boolean))).sort((a, b) => a.localeCompare(b));
  }, [equipmentCatalog]);

  const filteredDepartmentOptions = useMemo(() => {
    const needle = departmentQuery.trim().toLowerCase();
    return departmentOptions.filter((row) => {
      if (!needle) return true;
      const haystack = `${asText(row.name)} ${asText(row.id)}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [departmentOptions, departmentQuery]);

  const filteredEquipments = useMemo(() => {
    const needle = equipmentSearch.trim().toLowerCase();
    return equipments.filter((row) => {
      if (categoryFilter && asText(row.item_category) !== categoryFilter) return false;
      if (!needle) return true;
      const haystack = `${asText(row.name)} ${asText(row.model)} ${asText(row.manufacturer)} ${asText(row.vendor_supplier)} ${asText(row.item_category)}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [equipments, equipmentSearch, categoryFilter]);

  const filteredTasks = useMemo(() => {
    const needle = taskSearch.trim().toLowerCase();
    return tasks.filter((row) => {
      const status = asText(row.status) || 'Pending';
      if (taskStatusFilter !== 'all' && status !== taskStatusFilter) return false;
      if (!needle) return true;
      const equipment = equipmentById.get(asText(row.equipment_id));
      const haystack = `${asText(row.title)} ${status} ${asText(row.priority)} ${asText(equipment?.name)} ${asText(equipment?.model)}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [tasks, taskSearch, taskStatusFilter, equipmentById]);

  const reportRows = useMemo(() => {
    const needle = reportSearch.trim().toLowerCase();
    const start = parseDate(`${reportStartDate}T00:00:00`);
    const end = parseDate(`${reportEndDate}T23:59:59`);
    return reportTasks.filter((row) => {
      if (asText(row.status) !== 'Completed') return false;
      const rowDate = parseDate(asText(row.date_created));
      if (start && rowDate && rowDate < start) return false;
      if (end && rowDate && rowDate > end) return false;
      if (!needle) return true;
      const equipment = equipmentById.get(asText(row.equipment_id));
      const haystack = `${asText(row.title)} ${asText(equipment?.name)} ${asText(equipment?.model)} ${asText(row.priority)}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [reportTasks, equipmentById, reportSearch, reportStartDate, reportEndDate]);

  const selectedTask = useMemo(() => {
    return tasks.find((row) => asText(row.id) === selectedTaskId) || null;
  }, [tasks, selectedTaskId]);

  const selectedEquipment = useMemo(() => {
    if (!selectedTask) return null;
    return equipmentById.get(asText(selectedTask.equipment_id)) || null;
  }, [selectedTask, equipmentById]);

  const currentWorkOrder = useMemo(() => {
    if (!selectedTask) return null;
    return workOrders.find((row) => asText(row.equipment_maintenance_id) === asText(selectedTask.id)) || null;
  }, [selectedTask, workOrders]);

  useEffect(() => {
    if (!selectedTaskId) {
      setForm(EMPTY_FORM);
      return;
    }
    if (!currentWorkOrder) {
      setForm({
        ...EMPTY_FORM,
        wo_status: asText(selectedTask?.status) || 'Pending',
      });
      return;
    }
    setForm({
      wo_status: asText(currentWorkOrder.wo_status) || 'Pending',
      service_procedure: asText(currentWorkOrder.service_procedure),
      service_time: asText(currentWorkOrder.service_time),
      down_time: asText(currentWorkOrder.down_time),
      started: asText(currentWorkOrder.started),
      finished: asText(currentWorkOrder.finished),
      fail_mode: asText(currentWorkOrder.fail_mode),
      comments: asText(currentWorkOrder.comments),
    });
  }, [selectedTaskId, currentWorkOrder, selectedTask]);

  const startTask = async (taskId: string) => {
    try {
      await api.patch(`/equipment_management_tasks/${encodeURIComponent(taskId)}/`, { status: 'In Progress' });
      const taskResponse = await fetchPage<TaskRow>('/equipment_management_tasks/', {
        page: taskPage,
        page_size: PAGE_SIZE,
        search: debouncedTaskSearch || undefined,
        status: taskStatusFilter === 'all' ? undefined : taskStatusFilter,
        institution_id: institutionId || undefined,
      });
      setTasks(taskResponse.rows);
      setTaskCount(taskResponse.count);
      setHasTaskNext(taskResponse.next);
      setHasTaskPrevious(taskResponse.previous);
    } catch {
      // global toast via api client
    }
  };

  const openRecordForTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setTab('record');
  };

  const reloadManageData = async () => {
    const [response, lookup] = await Promise.all([
      fetchPage<EquipmentRow>('/equipment_management/', {
        page: equipmentPage,
        page_size: PAGE_SIZE,
        search: debouncedEquipmentSearch || undefined,
        item_category: categoryFilter || undefined,
        institution_id: institutionId || undefined,
      }),
      fetchPage<EquipmentRow>('/equipment_management/', { page: 1, page_size: 500 }),
    ]);
    setEquipments(response.rows);
    setEquipmentCount(response.count);
    setHasEquipmentNext(response.next);
    setHasEquipmentPrevious(response.previous);
    setEquipmentCatalog(lookup.rows);
  };

  const openCreateEquipment = () => {
    setEquipmentFormMode('create');
    setEquipmentForm({
      ...EMPTY_EQUIPMENT_FORM,
      id: makeId(),
    });
    setDepartmentQuery('');
    setSelectedDepartments([]);
    setSpecRows([EMPTY_SPEC_ROW()]);
    setChecklistForm(EMPTY_CHECKLIST);
    setMaintenanceForm(EMPTY_MAINTENANCE());
    setShowEquipmentForm(true);
  };

  const openEditEquipment = (row: EquipmentRow) => {
    setEquipmentFormMode('edit');
    setEquipmentForm({
      id: asText(row.id),
      name: asText(row.name),
      item_category: asText(row.item_category),
      model: asText(row.model),
      manufacturer: asText(row.manufacturer),
      vendor_supplier: asText(row.vendor_supplier),
      cost: asText(row.cost),
      quantity: asText(row.quantity) || '1',
      total_cost: asText(row.total_cost || asNumber(row.cost) * asNumber(row.quantity)),
      bill_amount: asText(row.bill_amount || row.total_cost || asNumber(row.cost) * asNumber(row.quantity)),
      bill_session: asText(row.bill_session) || '1',
      risk_level: asText(row.risk_level),
    });
    setDepartmentQuery('');
    setSelectedDepartments([]);
    setSpecRows([EMPTY_SPEC_ROW()]);
    setChecklistForm(EMPTY_CHECKLIST);
    setMaintenanceForm(EMPTY_MAINTENANCE());
    setShowEquipmentForm(true);
  };

  const updateEquipmentForm = (key: keyof EquipmentForm, value: string) => {
    setEquipmentForm((current) => {
      const next = { ...current, [key]: value };
      if (key === 'cost' || key === 'quantity') {
        const total = asNumber(next.cost) * asNumber(next.quantity);
        next.total_cost = total ? String(total) : '0';
        if (!asText(current.bill_amount) || asText(current.bill_amount) === asText(current.total_cost)) {
          next.bill_amount = next.total_cost;
        }
      }
      return next;
    });
  };

  const updateSpecRow = (rowId: string, key: keyof EquipmentSpecRow, value: string) => {
    setSpecRows((current) => current.map((row) => (row.id === rowId ? { ...row, [key]: value } : row)));
  };

  const addSpecRow = () => {
    setSpecRows((current) => [...current, EMPTY_SPEC_ROW()]);
  };

  const removeSpecRow = (rowId: string) => {
    setSpecRows((current) => {
      const next = current.filter((row) => row.id !== rowId);
      return next.length ? next : [EMPTY_SPEC_ROW()];
    });
  };

  const toggleDepartment = (departmentId: string) => {
    setSelectedDepartments((current) => (
      current.includes(departmentId)
        ? current.filter((id) => id !== departmentId)
        : [...current, departmentId]
    ));
  };

  const buildMaintenanceRows = (equipmentId: string): Array<Record<string, unknown>> => {
    if (asText(equipmentForm.risk_level) !== '0') return [];
    const recurType = asText(maintenanceForm.type);
    if (!recurType) return [];
    const startDate = asText(maintenanceForm.recur_start);
    if (!startDate) return [];
    let stepDays = 1;
    if (recurType === 'weekly') stepDays = Math.max(1, Math.floor(asNumber(maintenanceForm.every_week))) * 7;
    if (recurType === 'monthly') stepDays = Math.max(1, Math.floor(asNumber(maintenanceForm.every_month))) * 30;
    if (recurType === 'daily') stepDays = Math.max(1, Math.floor(asNumber(maintenanceForm.every_day)));
    const start = new Date(`${startDate}T00:00:00`);
    if (Number.isNaN(start.getTime())) return [];

    const rows: Array<Record<string, unknown>> = [];
    const condition = asText(maintenanceForm.condition) || 'stop-date';
    if (condition === 'stop-occurence') {
      const occurrences = Math.max(1, Math.floor(asNumber(maintenanceForm.occurence)));
      const maxCount = Math.min(occurrences, 120);
      for (let i = 0; i < maxCount; i += 1) {
        const when = new Date(start);
        when.setDate(start.getDate() + (i * stepDays));
        rows.push({
          id: makeId(),
          equipment_id: equipmentId,
          title: `${asText(equipmentForm.name)} - Maintenance Schedule`,
          type: recurType,
          start: when.toISOString(),
          end: '',
          status: 'Scheduled',
          work_status: 'Unavailable',
          supervisor: '',
          amount: 50,
          work_order: 0,
          purchased: 0,
          institution_id: institutionId || null,
        });
      }
      return rows;
    }

    const endRaw = asText(maintenanceForm.recur_end);
    if (!endRaw) return [];
    const end = new Date(`${endRaw}T23:59:59`);
    if (Number.isNaN(end.getTime()) || end < start) return [];
    for (let i = 0; i < 120; i += 1) {
      const when = new Date(start);
      when.setDate(start.getDate() + (i * stepDays));
      if (when > end) break;
      rows.push({
        id: makeId(),
        equipment_id: equipmentId,
        title: `${asText(equipmentForm.name)} - Maintenance Schedule`,
        type: recurType,
        start: when.toISOString(),
        end: '',
        status: 'Scheduled',
        work_status: 'Unavailable',
        supervisor: '',
        amount: 50,
        work_order: 0,
        purchased: 0,
        institution_id: institutionId || null,
      });
    }
    return rows;
  };

  const saveEquipment = async () => {
    if (!asText(equipmentForm.name) || !asText(equipmentForm.item_category) || !asText(equipmentForm.model)) return;
    setSaving(true);
    try {
      const totalCost = asNumber(equipmentForm.total_cost || asNumber(equipmentForm.cost) * asNumber(equipmentForm.quantity));
      const equipmentId = asText(equipmentForm.id) || makeId();
      const payload = {
        id: equipmentId,
        name: asText(equipmentForm.name),
        item_category: asText(equipmentForm.item_category),
        model: asText(equipmentForm.model),
        manufacturer: asText(equipmentForm.manufacturer),
        vendor_supplier: asText(equipmentForm.vendor_supplier),
        cost: asNumber(equipmentForm.cost),
        quantity: Math.max(0, Math.floor(asNumber(equipmentForm.quantity))),
        total_cost: totalCost,
        bill_amount: asNumber(equipmentForm.bill_amount || totalCost),
        bill_session: Math.max(1, Math.floor(asNumber(equipmentForm.bill_session || 1))),
        risk_level: asText(equipmentForm.risk_level),
        institution_id: institutionId || null,
      };
      if (equipmentFormMode === 'edit' && asText(equipmentForm.id)) {
        await api.patch(`/equipment_management/${encodeURIComponent(asText(equipmentForm.id))}/`, payload);
      } else {
        await api.post('/equipment_management/', payload);
        await Promise.all(
          selectedDepartments.map((departmentId) => api.post('/equipment_management_departments/', {
            id: makeId(),
            equipment_management_id: equipmentId,
            department_id: departmentId,
            institution_id: institutionId || null,
          })),
        );
        const validSpecRows = specRows.filter((row) => asText(row.serial_number) || asText(row.location));
        await Promise.all(
          validSpecRows.map((row) => api.post('/equipment_specifications/', {
            id: makeId(),
            serial_number: asText(row.serial_number),
            location: asText(row.location),
            department: asText(row.department),
            mdc: asText(row.mdc),
            age: asText(row.age),
            gender: asText(row.gender),
            institution_id: institutionId || null,
          })),
        );
        await api.post('/equipment_checklist/', {
          id: makeId(),
          equipment_id: equipmentId,
          ...checklistForm,
          institution_id: institutionId || null,
        });
        const maintenanceRows = buildMaintenanceRows(equipmentId);
        if (maintenanceRows.length) {
          await Promise.all(maintenanceRows.map((row) => api.post('/equipment_maintenance_schedule/', row)));
        }
      }
      setShowEquipmentForm(false);
      await reloadManageData();
    } catch {
      // handled by global toast
    } finally {
      setSaving(false);
    }
  };

  const saveWorkOrder = async () => {
    if (!selectedTask) return;
    setSaving(true);
    try {
      const basePayload = {
        equipment_maintenance_id: asText(selectedTask.id),
        wo_status: form.wo_status,
        service_procedure: form.service_procedure || null,
        service_time: form.service_time || null,
        down_time: form.down_time || null,
        started: form.started || null,
        finished: form.finished || null,
        fail_mode: form.fail_mode || null,
        comments: form.comments || null,
        user_id: userId || null,
        institution_id: institutionId || null,
      };

      if (currentWorkOrder) {
        await api.patch(`/equipment_management_work_order_data/${encodeURIComponent(asText(currentWorkOrder.id))}/`, basePayload);
      } else {
        await api.post('/equipment_management_work_order_data/', {
          id: makeId(),
          ...basePayload,
        });
      }

      if (asText(selectedTask.status) !== form.wo_status) {
        await api.patch(`/equipment_management_tasks/${encodeURIComponent(asText(selectedTask.id))}/`, {
          status: form.wo_status,
        });
      }
      const [taskResponse, workOrderResponse] = await Promise.all([
        fetchPage<TaskRow>('/equipment_management_tasks/', {
          page: taskPage,
          page_size: PAGE_SIZE,
          search: debouncedTaskSearch || undefined,
          status: taskStatusFilter === 'all' ? undefined : taskStatusFilter,
          institution_id: institutionId || undefined,
        }),
        fetchPage<WorkOrderRow>('/equipment_management_work_order_data/', {
          page: 1,
          page_size: 500,
          institution_id: institutionId || undefined,
        }),
      ]);
      setTasks(taskResponse.rows);
      setTaskCount(taskResponse.count);
      setHasTaskNext(taskResponse.next);
      setHasTaskPrevious(taskResponse.previous);
      setWorkOrders(workOrderResponse.rows);
    } catch {
      // toast handled globally
    } finally {
      setSaving(false);
    }
  };

  const tabButton = (id: WorkspaceTab, label: string) => (
    <button
      type="button"
      onClick={() => setTab(id)}
      className={`btn rounded-xl border px-3 py-2 text-xs font-semibold ${
        tab === id
          ? 'border-cyan-300 bg-cyan-100 text-cyan-800'
          : 'border-slate-300 bg-white text-slate-700'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">InventoryList</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">Equipment & Work Orders</h1>
            <p className="mt-1 text-sm text-slate-600">Improved unified workspace for management, tracking, reports, and recording.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {tabButton('manage', 'Manage Equipment')}
            {tabButton('tracker', 'Work Order Tracker')}
            {tabButton('report', 'Reports')}
            {tabButton('record', 'Record Work Order')}
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>
      ) : null}

      {loading ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
          Loading inventory list workspace...
        </section>
      ) : null}

      {!loading && tab === 'manage' ? (
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-slate-800">Equipment Directory</p>
            <button
              type="button"
              onClick={openCreateEquipment}
              className="btn rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-700"
            >
              + Add Equipment
            </button>
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr,240px]">
            <input
              value={equipmentSearch}
              onChange={(event) => setEquipmentSearch(event.target.value)}
              placeholder="Search equipment name, model, manufacturer..."
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <SearchableSelect
              value={categoryFilter}
              onChange={(value) => setCategoryFilter(value)}
              options={categories.map((category) => ({ value: category, label: category }))}
              placeholder="All Categories"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.12em] text-slate-500">
                  <th className="px-2 py-2">Equipment</th>
                  <th className="px-2 py-2">Category</th>
                  <th className="px-2 py-2">Model</th>
                  <th className="px-2 py-2">Manufacturer</th>
                  <th className="px-2 py-2">Vendor</th>
                  <th className="px-2 py-2">Quantity</th>
                  <th className="px-2 py-2">Risk</th>
                  <th className="px-2 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEquipments.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100">
                    <td className="px-2 py-2 font-semibold text-slate-900">{asText(row.name) || 'Unnamed equipment'}</td>
                    <td className="px-2 py-2 text-slate-700">{asText(row.item_category) || 'N/A'}</td>
                    <td className="px-2 py-2 text-slate-700">{asText(row.model) || 'N/A'}</td>
                    <td className="px-2 py-2 text-slate-700">{asText(row.manufacturer) || 'N/A'}</td>
                    <td className="px-2 py-2 text-slate-700">{asText(row.vendor_supplier) || 'N/A'}</td>
                    <td className="px-2 py-2 text-slate-700">{asText(row.quantity) || '0'}</td>
                    <td className="px-2 py-2 text-slate-700">{asText(row.risk_level) || 'N/A'}</td>
                    <td className="px-2 py-2">
                      <button
                        type="button"
                        onClick={() => openEditEquipment(row)}
                        className="btn rounded-lg border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
                {!filteredEquipments.length ? (
                  <tr>
                    <td colSpan={8} className="px-2 py-6 text-center text-slate-500">No equipment found.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
            <p>
              Showing page {equipmentPage} · {filteredEquipments.length} rows on this page · {equipmentCount} total
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEquipmentPage((current) => Math.max(1, current - 1))}
                disabled={!hasEquipmentPrevious}
                className="btn rounded-lg border border-slate-300 bg-white px-2 py-1 font-semibold text-slate-700 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setEquipmentPage((current) => current + 1)}
                disabled={!hasEquipmentNext}
                className="btn rounded-lg border border-slate-300 bg-white px-2 py-1 font-semibold text-slate-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {showEquipmentForm ? (
            <div className="rounded-2xl border border-cyan-200 bg-cyan-50/40 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">
                  {equipmentFormMode === 'edit' ? 'Edit Equipment' : 'Add Equipment'}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowEquipmentForm(false)}
                  className="btn rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700"
                >
                  Close
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <label className="block text-xs text-slate-700">
                  Name
                  <input value={equipmentForm.name} onChange={(e) => updateEquipmentForm('name', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                </label>
                <label className="block text-xs text-slate-700">
                  Category
                  <SearchableSelect
                    value={equipmentForm.item_category}
                    onChange={(value) => updateEquipmentForm('item_category', value)}
                    options={categories.map((category) => ({ value: category, label: category }))}
                    placeholder="Select category"
                    className="mt-1"
                  />
                </label>
                <label className="block text-xs text-slate-700">
                  Model
                  <input value={equipmentForm.model} onChange={(e) => updateEquipmentForm('model', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                </label>
                <label className="block text-xs text-slate-700">
                  Manufacturer
                  <input value={equipmentForm.manufacturer} onChange={(e) => updateEquipmentForm('manufacturer', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                </label>
                <label className="block text-xs text-slate-700">
                  Vendor/Supplier
                  <SearchableSelect
                    value={equipmentForm.vendor_supplier}
                    onChange={(value) => updateEquipmentForm('vendor_supplier', value)}
                    options={vendorOptions.map((vendor) => ({
                      value: asText(vendor.id),
                      label: asText(vendor.name) || asText(vendor.id),
                    }))}
                    placeholder="Select vendor/supplier"
                    className="mt-1"
                  />
                </label>
                <label className="block text-xs text-slate-700">
                  Risk Level
                  <SearchableSelect
                    value={equipmentForm.risk_level}
                    onChange={(value) => updateEquipmentForm('risk_level', value)}
                    options={[
                      { value: '12', label: 'Class 1 - Low Risk' },
                      { value: '6', label: 'Class 2 - Medium Risk' },
                      { value: '3', label: 'Class 3 - High Risk' },
                      { value: '0', label: 'Custom' },
                    ]}
                    placeholder="Select risk level"
                    className="mt-1"
                  />
                </label>
                <label className="block text-xs text-slate-700">
                  Unit Cost
                  <input type="number" min="0" step="0.01" value={equipmentForm.cost} onChange={(e) => updateEquipmentForm('cost', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                </label>
                <label className="block text-xs text-slate-700">
                  Quantity
                  <input type="number" min="0" step="1" value={equipmentForm.quantity} onChange={(e) => updateEquipmentForm('quantity', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                </label>
                <label className="block text-xs text-slate-700">
                  Total Cost
                  <input type="number" min="0" step="0.01" value={equipmentForm.total_cost} onChange={(e) => updateEquipmentForm('total_cost', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                </label>
                <label className="block text-xs text-slate-700">
                  Bill Amount
                  <input type="number" min="0" step="0.01" value={equipmentForm.bill_amount} onChange={(e) => updateEquipmentForm('bill_amount', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                </label>
                <label className="block text-xs text-slate-700">
                  Bill Session
                  <SearchableSelect
                    value={equipmentForm.bill_session}
                    onChange={(value) => updateEquipmentForm('bill_session', value)}
                    options={[
                      { value: '1', label: '1 hour' },
                      { value: '2', label: '2 hours' },
                      { value: '4', label: '4 hours' },
                      { value: '6', label: '6 hours' },
                      { value: '8', label: '8 hours' },
                    ]}
                    placeholder="Select billing window"
                    className="mt-1"
                  />
                </label>
              </div>
              {equipmentFormMode === 'create' ? (
                <div className="mt-4 space-y-4">
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Departments</p>
                    <input
                      value={departmentQuery}
                      onChange={(event) => setDepartmentQuery(event.target.value)}
                      placeholder="Search departments to add..."
                      className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                    {selectedDepartments.length ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedDepartments.map((depId) => {
                          const dep = departmentOptions.find((row) => asText(row.id) === depId);
                          const label = asText(dep?.name) || depId;
                          return (
                            <button
                              key={`selected-${depId}`}
                              type="button"
                              onClick={() => toggleDepartment(depId)}
                              className="btn inline-flex items-center gap-1 rounded-full border border-cyan-300 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800"
                              title="Remove department"
                            >
                              <span>{label}</span>
                              <span className="text-cyan-600">x</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="mt-2 text-xs text-slate-500">No departments selected yet.</p>
                    )}
                    <div className="mt-2 max-h-40 space-y-1 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2">
                      {filteredDepartmentOptions.map((department) => {
                        const depId = asText(department.id);
                        const active = selectedDepartments.includes(depId);
                        if (active) return null;
                        return (
                          <button
                            key={depId}
                            type="button"
                            onClick={() => toggleDepartment(depId)}
                            className="btn block w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-left text-xs text-slate-700 hover:border-cyan-300 hover:bg-cyan-50"
                          >
                            {asText(department.name) || depId}
                          </button>
                        );
                      })}
                      {!filteredDepartmentOptions.some((department) => !selectedDepartments.includes(asText(department.id))) ? (
                        <p className="px-1 py-1 text-xs text-slate-500">No departments found.</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Equipment Specifications</p>
                      <button type="button" onClick={addSpecRow} className="btn rounded-lg border border-cyan-200 bg-cyan-50 px-2 py-1 text-xs font-semibold text-cyan-700">
                        + Add row
                      </button>
                    </div>
                    <div className="space-y-2">
                      {specRows.map((row) => (
                        <div key={row.id} className="grid gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2 md:grid-cols-7">
                          <input value={row.serial_number} onChange={(e) => updateSpecRow(row.id, 'serial_number', e.target.value)} placeholder="Serial number" className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                          <input value={row.location} onChange={(e) => updateSpecRow(row.id, 'location', e.target.value)} placeholder="Location" className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                          <SearchableSelect value={row.department} onChange={(value) => updateSpecRow(row.id, 'department', value)} options={departmentOptions.map((item) => ({ value: asText(item.id), label: asText(item.name) || asText(item.id) }))} placeholder="Department" />
                          <SearchableSelect value={row.mdc} onChange={(value) => updateSpecRow(row.id, 'mdc', value)} options={specialtyOptions.map((item) => ({ value: asText(item.id), label: asText(item.name) || asText(item.id) }))} placeholder="MDC" />
                          <SearchableSelect value={row.age} onChange={(value) => updateSpecRow(row.id, 'age', value)} options={ageOptions.map((item) => ({ value: asText(item.id), label: asText(item.age || item.name) || asText(item.id) }))} placeholder="Age spec" />
                          <SearchableSelect value={row.gender} onChange={(value) => updateSpecRow(row.id, 'gender', value)} options={genderOptions.map((item) => ({ value: asText(item.id), label: asText(item.name) || asText(item.id) }))} placeholder="Gender" />
                          <button type="button" onClick={() => removeSpecRow(row.id)} className="btn rounded-lg border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-700">Remove</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Acceptance Checklist</p>
                    <div className="mt-2 grid gap-2 md:grid-cols-3">
                      {Object.entries(checklistForm).map(([key, value]) => (
                        <div key={key}>
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">{key.replaceAll('_', ' ')}</p>
                          <SearchableSelect
                            value={value}
                            onChange={(next) => setChecklistForm((current) => ({ ...current, [key]: next } as ChecklistForm))}
                            options={[
                              { value: '1', label: 'Yes' },
                              { value: '0', label: 'No' },
                              { value: '2', label: 'Corrected if Applicable' },
                            ]}
                            placeholder="Select"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Planned Maintenance Schedule</p>
                    <div className="mt-2 grid gap-2 md:grid-cols-3">
                      <div>
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Notice period</p>
                        <SearchableSelect
                          value={maintenanceForm.notice_period}
                          onChange={(value) => setMaintenanceForm((current) => ({ ...current, notice_period: value }))}
                          options={[
                            { value: '30', label: '30 days' },
                            { value: '7', label: '0-7 days' },
                            { value: '14', label: '14-21 days' },
                            { value: '21', label: '21-28 days' },
                          ]}
                          placeholder="Select notice period"
                        />
                      </div>
                      <div>
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Recurring type</p>
                        <SearchableSelect
                          value={maintenanceForm.type}
                          onChange={(value) => setMaintenanceForm((current) => ({ ...current, type: value }))}
                          options={[
                            { value: 'daily', label: 'Daily' },
                            { value: 'weekly', label: 'Weekly' },
                            { value: 'monthly', label: 'Monthly' },
                          ]}
                          placeholder="Select recurring type"
                        />
                      </div>
                      <label className="block text-xs text-slate-700">
                        Start date
                        <input type="date" value={maintenanceForm.recur_start} onChange={(e) => setMaintenanceForm((current) => ({ ...current, recur_start: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                      </label>
                      <div>
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Stop condition</p>
                        <SearchableSelect
                          value={maintenanceForm.condition}
                          onChange={(value) => setMaintenanceForm((current) => ({ ...current, condition: value }))}
                          options={[
                            { value: 'stop-date', label: 'Stop by date' },
                            { value: 'stop-occurence', label: 'Stop by occurrences' },
                          ]}
                          placeholder="Select condition"
                        />
                      </div>
                      {maintenanceForm.condition === 'stop-date' ? (
                        <label className="block text-xs text-slate-700">
                          End date
                          <input type="date" value={maintenanceForm.recur_end} onChange={(e) => setMaintenanceForm((current) => ({ ...current, recur_end: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                        </label>
                      ) : (
                        <label className="block text-xs text-slate-700">
                          Occurrences
                          <input type="number" min="1" value={maintenanceForm.occurence} onChange={(e) => setMaintenanceForm((current) => ({ ...current, occurence: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                        </label>
                      )}
                      {maintenanceForm.type === 'daily' ? (
                        <label className="block text-xs text-slate-700">
                          Repeat every (days)
                          <input type="number" min="1" value={maintenanceForm.every_day} onChange={(e) => setMaintenanceForm((current) => ({ ...current, every_day: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                        </label>
                      ) : null}
                      {maintenanceForm.type === 'weekly' ? (
                        <label className="block text-xs text-slate-700">
                          Repeat every (weeks)
                          <input type="number" min="1" value={maintenanceForm.every_week} onChange={(e) => setMaintenanceForm((current) => ({ ...current, every_week: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                        </label>
                      ) : null}
                      {maintenanceForm.type === 'monthly' ? (
                        <label className="block text-xs text-slate-700">
                          Repeat every (months)
                          <input type="number" min="1" value={maintenanceForm.every_month} onChange={(e) => setMaintenanceForm((current) => ({ ...current, every_month: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                        </label>
                      ) : null}
                    </div>
                    <p className="mt-2 text-[11px] text-slate-500">Custom maintenance rows are auto-created when risk level is set to Custom.</p>
                  </div>
                </div>
              ) : null}
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => void saveEquipment()}
                  disabled={saving || !asText(equipmentForm.name) || !asText(equipmentForm.item_category) || !asText(equipmentForm.model)}
                  className="btn rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 disabled:opacity-60"
                >
                  {saving ? 'Saving...' : equipmentFormMode === 'edit' ? 'Update Equipment' : 'Create Equipment'}
                </button>
                <p className="text-xs text-slate-600">Required: Name, Category, Model.</p>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {!loading && tab === 'tracker' ? (
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr,220px]">
            <input
              value={taskSearch}
              onChange={(event) => setTaskSearch(event.target.value)}
              placeholder="Search tasks or equipment..."
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <SearchableSelect
              value={taskStatusFilter}
              onChange={(value) => setTaskStatusFilter(value || 'all')}
              options={STATUS_OPTIONS.map((status) => ({ value: status, label: status }))}
              placeholder="All Statuses"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.12em] text-slate-500">
                  <th className="px-2 py-2">Task</th>
                  <th className="px-2 py-2">Equipment</th>
                  <th className="px-2 py-2">Status</th>
                  <th className="px-2 py-2">Priority</th>
                  <th className="px-2 py-2">Due Date</th>
                  <th className="px-2 py-2">Created</th>
                  <th className="px-2 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => {
                  const equipment = equipmentById.get(asText(task.equipment_id));
                  const status = asText(task.status) || 'Pending';
                  return (
                    <tr key={task.id} className="border-t border-slate-100">
                      <td className="px-2 py-2 font-semibold text-slate-900">{asText(task.title) || 'Maintenance Task'}</td>
                      <td className="px-2 py-2 text-slate-700">{asText(equipment?.name) || asText(task.equipment_id) || 'N/A'}</td>
                      <td className="px-2 py-2">
                        <span className={`rounded-full border px-2 py-0.5 text-[11px] ${
                          status === 'Completed'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                            : status === 'In Progress'
                              ? 'border-amber-200 bg-amber-50 text-amber-700'
                              : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-slate-700">{asText(task.priority) || 'N/A'}</td>
                      <td className="px-2 py-2 text-slate-700">{formatDate(asText(task.due_date))}</td>
                      <td className="px-2 py-2 text-slate-700">{formatDateTime(asText(task.date_created))}</td>
                      <td className="px-2 py-2">
                        <div className="flex gap-1.5">
                          {status !== 'Completed' ? (
                            <button
                              type="button"
                              onClick={() => void startTask(asText(task.id))}
                              className="btn rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-700"
                            >
                              Start
                            </button>
                          ) : null}
                          <button
                            type="button"
                            onClick={() => openRecordForTask(asText(task.id))}
                            className="btn rounded-lg border border-cyan-200 bg-cyan-50 px-2 py-1 text-[11px] font-semibold text-cyan-700"
                          >
                            Record
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!filteredTasks.length ? (
                  <tr>
                    <td colSpan={7} className="px-2 py-6 text-center text-slate-500">No tasks found.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
            <p>
              Showing page {taskPage} · {filteredTasks.length} rows on this page · {taskCount} total
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTaskPage((current) => Math.max(1, current - 1))}
                disabled={!hasTaskPrevious}
                className="btn rounded-lg border border-slate-300 bg-white px-2 py-1 font-semibold text-slate-700 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setTaskPage((current) => current + 1)}
                disabled={!hasTaskNext}
                className="btn rounded-lg border border-slate-300 bg-white px-2 py-1 font-semibold text-slate-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {!loading && tab === 'report' ? (
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr,190px,190px]">
            <input
              value={reportSearch}
              onChange={(event) => setReportSearch(event.target.value)}
              placeholder="Search completed tasks/equipment..."
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              type="date"
              value={reportStartDate}
              onChange={(event) => setReportStartDate(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              type="date"
              value={reportEndDate}
              onChange={(event) => setReportEndDate(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.12em] text-slate-500">
                  <th className="px-2 py-2">Task</th>
                  <th className="px-2 py-2">Equipment</th>
                  <th className="px-2 py-2">Completed On</th>
                  <th className="px-2 py-2">Priority</th>
                  <th className="px-2 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {reportRows.map((task) => {
                  const equipment = equipmentById.get(asText(task.equipment_id));
                  return (
                    <tr key={task.id} className="border-t border-slate-100">
                      <td className="px-2 py-2 font-semibold text-slate-900">{asText(task.title) || 'Maintenance Task'}</td>
                      <td className="px-2 py-2 text-slate-700">{asText(equipment?.name) || 'N/A'}</td>
                      <td className="px-2 py-2 text-slate-700">{formatDateTime(asText(task.date_created))}</td>
                      <td className="px-2 py-2 text-slate-700">{asText(task.priority) || 'N/A'}</td>
                      <td className="px-2 py-2">
                        <button
                          type="button"
                          onClick={() => openRecordForTask(asText(task.id))}
                          className="btn rounded-lg border border-cyan-200 bg-cyan-50 px-2 py-1 text-[11px] font-semibold text-cyan-700"
                        >
                          View Record
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {!reportRows.length ? (
                  <tr>
                    <td colSpan={5} className="px-2 py-6 text-center text-slate-500">No completed tasks in current report filter.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
            <p>
              Showing page {reportPage} · {reportRows.length} rows on this page · {reportCount} total
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setReportPage((current) => Math.max(1, current - 1))}
                disabled={!hasReportPrevious}
                className="btn rounded-lg border border-slate-300 bg-white px-2 py-1 font-semibold text-slate-700 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setReportPage((current) => current + 1)}
                disabled={!hasReportNext}
                className="btn rounded-lg border border-slate-300 bg-white px-2 py-1 font-semibold text-slate-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {!loading && tab === 'record' ? (
        <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[360px,1fr]">
          <aside className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <h3 className="text-sm font-semibold text-slate-900">Select Task</h3>
            <div className="mt-2 max-h-[520px] space-y-2 overflow-y-auto pr-1">
              {tasks.map((task) => {
                const isActive = asText(task.id) === selectedTaskId;
                const equipment = equipmentById.get(asText(task.equipment_id));
                return (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => setSelectedTaskId(asText(task.id))}
                    className={`w-full rounded-lg border p-2 text-left text-xs ${
                      isActive
                        ? 'border-cyan-300 bg-cyan-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <p className="font-semibold text-slate-900">{asText(task.title) || 'Maintenance Task'}</p>
                    <p className="text-slate-600">{asText(equipment?.name) || asText(task.equipment_id) || 'N/A'}</p>
                    <p className="text-slate-500">{asText(task.status) || 'Pending'}</p>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            {!selectedTask ? (
              <p className="text-sm text-slate-600">Select a task to record or update work-order data.</p>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-3">
                  <p className="text-base font-semibold text-slate-900">{asText(selectedTask.title) || 'Maintenance Task'}</p>
                  <p className="text-xs text-slate-700">
                    {asText(selectedEquipment?.name) || asText(selectedTask.equipment_id)} · Current Status: {asText(selectedTask.status) || 'Pending'}
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Work Status</span>
                    <SearchableSelect
                      value={form.wo_status}
                      onChange={(value) => setForm((current) => ({ ...current, wo_status: value }))}
                      options={STATUS_OPTIONS.map((status) => ({ value: status, label: status }))}
                      className="mt-1"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Service Procedure</span>
                    <input
                      value={form.service_procedure}
                      onChange={(event) => setForm((current) => ({ ...current, service_procedure: event.target.value }))}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Service Time</span>
                    <input
                      type="datetime-local"
                      value={form.service_time}
                      onChange={(event) => setForm((current) => ({ ...current, service_time: event.target.value }))}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Down Time</span>
                    <input
                      type="datetime-local"
                      value={form.down_time}
                      onChange={(event) => setForm((current) => ({ ...current, down_time: event.target.value }))}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Started</span>
                    <input
                      type="datetime-local"
                      value={form.started}
                      onChange={(event) => setForm((current) => ({ ...current, started: event.target.value }))}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Finished</span>
                    <input
                      type="datetime-local"
                      value={form.finished}
                      onChange={(event) => setForm((current) => ({ ...current, finished: event.target.value }))}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Failure Mode</span>
                    <input
                      value={form.fail_mode}
                      onChange={(event) => setForm((current) => ({ ...current, fail_mode: event.target.value }))}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Comments</span>
                    <textarea
                      rows={4}
                      value={form.comments}
                      onChange={(event) => setForm((current) => ({ ...current, comments: event.target.value }))}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => void saveWorkOrder()}
                    disabled={saving}
                    className="btn rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 disabled:opacity-60"
                  >
                    {saving ? 'Saving...' : currentWorkOrder ? 'Update Work Order' : 'Save Work Order'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
}
