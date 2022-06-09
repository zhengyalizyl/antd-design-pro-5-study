/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.isAdmin,
    canCreateRole:currentUser&&currentUser.roles.some(role=>role.permissions!.map(permission=>permission.name).indexOf('create role')>-1)
  };
}
