/**
 * User type definition
 * @typedef {Object} User
 * @property {string} _id - User ID
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} role - User role (user or admin)
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Update timestamp
 */

/**
 * User registration data
 * @typedef {Object} UserRegisterData
 * @property {string} name - User name (required)
 * @property {string} email - User email (required)
 * @property {string} password - User password (required)
 */

/**
 * User login data
 * @typedef {Object} UserLoginData
 * @property {string} email - User email (required)
 * @property {string} password - User password (required)
 */

/**
 * User update data
 * @typedef {Object} UserUpdateData
 * @property {string} [name] - Updated name
 * @property {string} [email] - Updated email
 * @property {string} [password] - Updated password
 */

/**
 * Authentication response
 * @typedef {Object} AuthResponse
 * @property {User} user - User object
 * @property {string} token - JWT authentication token
 */

// User roles enum
export const UserRoles = {
  USER: 'user',
  ADMIN: 'admin'
};

// User role labels for display
export const UserRoleLabels = {
  [UserRoles.USER]: 'User',
  [UserRoles.ADMIN]: 'Administrator'
};

