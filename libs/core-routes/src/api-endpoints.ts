export const PREFIX = {
  user: '/user',
  userActivityLog: '/user-activity-log',
  businessUnit: '/business-unit',
};

const apiVersion = '/api/v1';
const apiAdmin = '/api/admin';

export const ROUTE = {
  user: {
    base: PREFIX.user,
    byId: '/',
    currentUser: '/current-user',
    adminUsers: '/admin-users/',
  },
  userActivityLog: {
    base: PREFIX.userActivityLog,
    byId: '/',
    featuredLog: '/featured-log',
  },
  businessUnit: {
    base: PREFIX.businessUnit,
    byId: '/',
  },
};

const user = ROUTE.user;
const userActivityLog = ROUTE.userActivityLog;
const businessUnit = ROUTE.businessUnit;

// If an endpoint ends in a "/" it implies a param/id should be passed to it
export const API = {
  admin: {
    businessUnit: {
      root: apiAdmin + ROUTE.businessUnit.base, // POST, GET
      byId: apiAdmin + businessUnit.base + businessUnit.byId, // Requires {id} param - GET, DELETE, PUT
    },
    user: {
      root: apiAdmin + ROUTE.user.base, // POST, GET
      byId: apiAdmin + user.base + businessUnit.byId, // Requires {id} param - GET, DELETE, PUT
    },
  },
  user: {
    root: apiVersion + user.base, // POST, GET
    byId: apiVersion + user.base + user.byId, // Requires {id} param - GET, DELETE, PUT
    currentUser: apiVersion + user.base + user.currentUser, // GET
    adminUsers: apiVersion + user.base + user.adminUsers, // Requires {businessUnitId} param - GET
  },
  userActivityLog: {
    root: apiVersion + ROUTE.userActivityLog.base, // POST, GET
    byId: apiVersion + userActivityLog.base + userActivityLog.byId, // Requires {id} param - GET, DELETE, PUT
    featuredLog: apiVersion + userActivityLog.base + userActivityLog.featuredLog, // GET
  },
};
