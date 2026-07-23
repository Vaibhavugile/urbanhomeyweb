// src/utils/admin.js

// Add more emails here later if you want multiple admins
export const ADMIN_EMAILS = [
  "aayesha.h.shaikh@gmail.com",
];

export function isAdminUser(user) {
  if (!user || !user.email) return false;
  return ADMIN_EMAILS.includes(user.email.toLowerCase());
}