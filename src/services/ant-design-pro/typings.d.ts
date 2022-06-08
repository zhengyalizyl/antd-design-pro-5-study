// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
      avatar:string;
      name:string;
      isAdmin:boolean
  };

  type LoginResult = {
    success?:boolean ;
    message?:string;
    errors?: {
      general?: string;
    };
    data?:{
      token:string
    }
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    _id?:string;
    username?: string;
    updatedAt?: string;
    createdAt?: string;
    password?:string;
    isAdmin?:boolean
  };

  type RoleListItem = {
    _id?:string;
    name?: string;
    updatedAt?: string;
    createdAt?: string;
    permissions?:[];
    nameCn?:string;
  };
  type PermissionListItem = {
    _id?:string;
    name?: string;
    updatedAt?: string;
    createdAt?: string;
    nameCn?:string;
  };

  type MenuListItem = {
    _id?:string;
    name?: string;
    updatedAt?: string;
    createdAt?: string;
    nameCn?:string;
    parent?:string;
    path?:string;
    permission?:string;
  };

  type MenuList = {
    data?: MenuListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type RoleList = {
    data?: RoleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type PermissionList = {
    data?: PermissionListIte[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
