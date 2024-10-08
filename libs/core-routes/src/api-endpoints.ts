export const PREFIX = {
  user: '/user',
  userActivityLog: '/user-activity-log',
  project: '/project',
};

export const apiVersion = '/api/v1';
// const apiAdmin = '/api/admin';

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
  project: {
    base: PREFIX.project,
    byId: '/',
    getAll: '/get-all',
  },
};

const user = ROUTE.user;
const userActivityLog = ROUTE.userActivityLog;
const project = ROUTE.project;

// If an endpoint ends in a "/" it implies a param/id should be passed to it
export const API = {
  admin: {
    user: {
      root: apiVersion + ROUTE.user.base, // POST, GET
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
  project: {
    root: apiVersion + project.base, // POST, GET
    byId: apiVersion + project.base + project.byId, // requires ID param
    getAll: apiVersion + project.base + project.getAll, // GET, returns all projects and Images
  },
};
