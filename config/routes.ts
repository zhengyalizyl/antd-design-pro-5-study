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
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //  // access: 'canAdmin',
  //   routes: [
  //     {
  //       path: '/admin/users',
  //       name: 'table',
  //       icon: 'users',
  //       // component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  {
    name: 'admin',
    icon: 'table',
    path: '/admin',
    access: 'canAdmin',
    routes: [
      {
        name: 'admin.user',
        icon: 'users',
        path: '/admin/users',
        component: './admin/Users',
      }
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
