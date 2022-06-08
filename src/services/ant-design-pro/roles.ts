// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取规则列表 GET /admin/roles */
export async function queryRoles(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RoleList>('/admin/roles', {
    method: 'GET',
    params: {
      ...params,
      ...(options || {}),
    },
    
  });
}

/** 删除规则 DELETE /api/rule  */
export async function removeRule(options?: { [key: string]: any }) {
  return request<API.RoleListItem>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 新建规则 POST /admin/addRoles */
export async function addRole(options?: { [key: string]: any }) {
  return request<API.RoleListItem>('/admin/addRoles', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

/** 更新规则 PUT /admin/updateRole/:id*/
export async function updateRole(options: { [key: string]: any }) {
  const {_id}=options;
  return request<Record<string, any>>(`/admin/updateRole/${_id}`, {
    method: 'PUT',
    data: {
      ...(options || {}),
    },
  });
}
