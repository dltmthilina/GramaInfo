import { UserRoles } from "./enums";

export type ModalsState = {
  syncFrequency: boolean;
  sessionTimeout: boolean;
  language: boolean;
  theme: boolean;
  fontSize: boolean;
  cacheDuration: boolean;
};

export type Settings = {
  pushNotifications: boolean;
  smsAlerts: boolean;
  emailNotifications: boolean;
  dataUpdateAlerts: boolean;
  systemMaintenanceAlerts: boolean;
  autoSync: boolean;
  syncFrequency: string; // hourly, daily, weekly, manual
  offlineMode: boolean;
  dataBackup: boolean;
  biometricLock: boolean;
  sessionTimeout: string; // minutes
  dataEncryption: boolean;
  language: string; // en, si, ta
  theme: string; // light, dark, system
  fontSize: string; // small, medium, large
  cacheDuration: string; // days
  lowStorageWarning: boolean;
};

export type FamilyData = {
  id?: string;
  familyId: string;
  headOfFamily: string;
  address: string;
  phoneNumber: string;
  emailAddress?: string;
  nicNumber: string;
  occupation: string;
  monthlyIncome?: string;
  familyType: "nuclear" | "extended" | "single_parent";
  housingType: "owned" | "rented" | "shared" | "government";
  numberOfMembers: number;
  emergencyContact?: string;
  emergencyPhone?: string;
  notes?: string;
  status: "active" | "inactive" | "pending_verification";
  category: "small" | "standard" | "large";
  registeredDate: string;
  lastUpdated: string;
  registeredBy: string; // UID of user who registered
  villageCode: string;
  villageName: string;
};

export type User = {
  email: string;
  password: string;
  name: string;
  villageCode: string;
  role: UserRole;
};

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];
