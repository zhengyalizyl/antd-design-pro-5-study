// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取规则列表 GET /admin/permissions */
export async function queryPermissions(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.PermissionList>('/admin/permissions', {
    method: 'GET',
    params: {
      ...params,
      ...(options || {}),
    },
    
  });
}

/** 删除规则 DELETE /api/rule  */
export async function removeRule(options?: { [key: string]: any }) {
  return request<API.PermissionListItem>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 新建规则 POST /admin/addPermissions */
export async function addPermissions(options?: { [key: string]: any }) {
  return request<API.PermissionListItem>('/admin/addPermissions', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

/** 更新规则 PUT /admin/permission/:id*/
export async function updatePermission(options: { [key: string]: any }) {
  const {_id}=options;
  return request<Record<string, any>>(`/admin/permission/${_id}`, {
    method: 'PUT',
    data: {
      ...(options || {}),
    },
  });
}


/** 更新规则 PUT /admin/permission/:id*/
export async function handlePermission(options: { [key: string]: any }) {
  const {_id}=options;
  return request<Record<string, any>>(`/admin/roles/${_id}/permissions`, {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}
