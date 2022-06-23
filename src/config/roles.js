const roles = {
  admin: "adminService",
  requester: "requesterService",
  worker: "workerService",
};

const roleRights = new Map();
roleRights.set("admin", ["getInfo"]);
roleRights.set("worker", []);
roleRights.set("requester", []);

module.exports = {
  roles,
  roleRights,
};
