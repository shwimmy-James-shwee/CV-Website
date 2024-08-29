export interface User {
  id: string;
  externalOid?: string;
  loginEmail: string;
  firstName: string;
  lastName: string;
  isSuperAdmin?: boolean;
  roles?: UserRole[];
  avatarUrl: string;
  thumbnailPhoto?: number[];
  timeZoneOffSet: string;
  timeZone: string;
  notificationFrequency: NotificationFrequency;
  createdAt: Date;
  updatedAt: Date;
  SignInLogs?: SignInLog[];
  UserActivityLogs?: UserActivityLog[];
  UserNotifications?: UserNotification[];
  MemberOfBusinessUnits?: Member[];
}

export interface UserNotification {
  id: number;
  status?: NotificationStatus[];
  message: string;
  additionalAttribute?: any;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  User: User;
}

export interface SignInLog {
  id: number;
  userId: string;
  signInDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
  User: User;
}

export interface UserActivityLog {
  id: number;
  userId: string;
  sessionIdentifier?: string;
  eventStartTime: Date;
  eventEndTime: Date;
  eventDuration: number;
  eventParam?: string;
  eventUrl: string;
  createdAt: Date;
  updatedAt: Date;
  User: User;
}

export interface BusinessUnit {
  id: string;
  type: BusinessUnitType;
  name: string;
  description?: string;
  features?: Feature[];
  parentBusinessUnitId?: string;
  ParentBusinessUnit?: BusinessUnit;
  createdAt: Date;
  updatedAt: Date;
  Members?: Member[];
  ChildBusinessUnits?: BusinessUnit[];
}

export interface Member {
  id: number;
  roles?: MemberRole[];
  createdAt: Date;
  updatedAt: Date;
  businessUnitId: string;
  BusinessUnit: BusinessUnit;
  userId: string;
  User: User;
}

export enum UserRole {
  STANDARD_USER = "STANDARD_USER",
  ADMINISTRATOR = "ADMINISTRATOR"
}

export enum NotificationFrequency {
  DISABLED = "DISABLED",
  REALTIME = "REALTIME",
  HOURLY = "HOURLY",
  DAILYEVE = "DAILYEVE",
  DAILYMORN = "DAILYMORN",
  WEEKLY = "WEEKLY"
}

export enum NotificationStatus {
  NOTIFIED = "NOTIFIED",
  READ = "READ"
}

export enum Feature {
  BASIC = "BASIC",
  BASIC_REPORTING = "BASIC_REPORTING"
}

export enum BusinessUnitType {
  TEAM = "TEAM",
  DEPARTMENT = "DEPARTMENT",
  DIVISION = "DIVISION",
  COMPANY = "COMPANY"
}

export enum MemberRole {
  ADMINISTRATOR = "ADMINISTRATOR",
  STANDARD = "STANDARD"
}
