export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: 'admin',
    icon: 'table',
    path: '/admin',
    // access: 'canAdmin',
    routes: [
      {
        name: 'admin.user',
        icon: 'users',
        path: '/admin/users',
        component: './admin/users',
      },
      {
        name: 'admin.role',
        icon: 'users',
        path: '/admin/roles',
        component: './admin/roles',
      },
      {
        name: 'admin.perimission',
        icon: 'users',
        path: '/admin/permissions',
        component: './admin/permission',
      },
      {
        name: 'admin.menus',
        icon: 'users',
        path: '/admin/menus',
        component: './admin/menus',
      },
      {
        path: '/admin',
        redirect: '/admin/users',
      },
    ]
  },
  // {
  //   name: 'admin.user',
  //   icon: 'users',
  //   path: '/admin/users',
  //   access: 'canAdmin',
  //   component: './admin/Users',
  // },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/table',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
