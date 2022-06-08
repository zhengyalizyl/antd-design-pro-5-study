// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取规则列表 GET /admin/menus */
export async function queryMenus(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.MenuList>('/admin/menus', {
    method: 'GET',
    params: {
      ...params,
      ...(options || {}),
    },
    
  });
}

/** 删除规则 DELETE /api/rule  */
export async function removeRule(options?: { [key: string]: any }) {
  return request<API.MenuListItem>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 新建规则 POST /admin/menus */
export async function addMenus(options?: { [key: string]: any }) {
  return request<API.MenuListItem>('/admin/menus', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

/** 更新规则 PUT /admin/menus/:id*/
export async function updateMenu(options: { [key: string]: any }) {
  const {_id}=options;
  return request<Record<string, any>>(`/admin/menus/${_id}`, {
    method: 'PUT',
    data: {
      ...(options || {}),
    },
  });
}
