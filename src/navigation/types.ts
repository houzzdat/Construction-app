export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Projects: undefined;
  Materials: undefined;
  Labor: undefined;
  Safety: undefined;
  Finance: undefined;
  Quality: undefined;
  Communication: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type ProjectStackParamList = {
  ProjectList: undefined;
  ProjectDetails: { projectId: string };
  TaskList: { projectId: string };
  TaskDetails: { projectId: string; taskId: string };
  GanttChart: { projectId: string };
};

export type MaterialStackParamList = {
  MaterialList: undefined;
  MaterialDetails: { materialId: string };
  SupplierList: undefined;
  SupplierDetails: { supplierId: string };
  PurchaseOrders: undefined;
  PurchaseOrderDetails: { orderId: string };
};

export type LaborStackParamList = {
  WorkerList: undefined;
  WorkerDetails: { workerId: string };
  Attendance: undefined;
  Payroll: undefined;
  Skills: undefined;
};

export type SafetyStackParamList = {
  SafetyInspections: undefined;
  InspectionDetails: { inspectionId: string };
  Incidents: undefined;
  IncidentDetails: { incidentId: string };
  Training: undefined;
};

export type FinanceStackParamList = {
  Budget: undefined;
  Expenses: undefined;
  Invoices: undefined;
  InvoiceDetails: { invoiceId: string };
  Reports: undefined;
};

export type QualityStackParamList = {
  Inspections: undefined;
  InspectionDetails: { inspectionId: string };
  Defects: undefined;
  DefectDetails: { defectId: string };
  Documents: undefined;
};

export type CommunicationStackParamList = {
  Messages: undefined;
  Chat: { chatId: string };
  Files: undefined;
  Notifications: undefined;
}; 