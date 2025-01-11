// 模拟后端动态生成路由
import { defineFakeRoute } from 'vite-plugin-fake-server/client';

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */
const data = [
  {
    path: '/system',
    name: 'system',
    component: null,
    meta: {
      title: '系统管理',
      icon: 'ep:tools',
      isCache: true,
      isFrame: false,
      rank: 2,
    },
    children: [
      {
        path: '/system/user/index',
        name: 'user',
        component: '/system/user/index',
        meta: {
          title: '用户管理',
          icon: '#',
          isCache: true,
          isFrame: false,
          rank: 1,
        },
      },
      {
        path: '/system/role/index',
        name: 'role',
        component: '/system/role/index',
        meta: {
          title: '角色管理',
          icon: '#',
          isCache: true,
          isFrame: false,
          rank: 2,
        },
      },
      {
        path: '/system/menu/index',
        name: 'menu',
        component: '/system/menu/index',
        meta: {
          title: '菜单管理',
          icon: '#',
          isCache: true,
          isFrame: false,
          rank: 3,
        },
      },
      {
        path: '/system/dept/index',
        name: 'dept',
        component: '/system/dept/index',
        meta: {
          title: '部门管理',
          icon: '#',
          isCache: true,
          isFrame: false,
          rank: 4,
        },
      },
      {
        path: '/system/post/index',
        name: 'post',
        component: '/system/post/index',
        meta: {
          title: '岗位管理',
          icon: '#',
          isCache: true,
          isFrame: false,
          rank: 5,
        },
      },
      {
        path: '/system/log',
        name: 'log',
        component: null,
        meta: {
          title: '日志管理',
          icon: '#',
          isCache: true,
          isFrame: false,
          rank: 6,
        },
        children: [
          {
            path: '/system/log/operate',
            name: 'operatelog',
            component: '/system/log/operate',
            meta: {
              title: '操作日志',
              icon: '#',
              isCache: true,
              isFrame: false,
              rank: 1,
            },
          },
          {
            path: '/system/log/login',
            name: 'loginlog',
            component: '/system/log/login',
            meta: {
              title: '登录日志',
              icon: '#',
              isCache: true,
              isFrame: false,
              rank: 2,
            },
          },
        ],
      },
    ],
  },
  {
    path: '/monitor',
    name: 'monitor',
    component: null,
    meta: {
      title: '系统监控',
      icon: 'ep:platform',
      isCache: true,
      isFrame: false,
      rank: 3,
    },
    children: [
      {
        path: '/monitor/online/index',
        name: 'online',
        component: '/monitor/online/index',
        meta: {
          title: '在线用户',
          icon: '#',
          isCache: true,
          isFrame: false,
          rank: 1,
        },
      },
      {
        path: '/monitor/data/index',
        name: 'data',
        component: '/monitor/data/index',
        meta: {
          title: '数据监控',
          icon: '#',
          isCache: true,
          isFrame: false,
          rank: 2,
        },
      },
    ],
  },
  {
    path: '/tools',
    name: 'tools',
    component: null,
    meta: {
      title: '系统工具',
      icon: 'ep:briefcase',
      isCache: true,
      isFrame: false,
      rank: 4,
    },
    children: [
      {
        path: '/tools/test/index',
        name: 'test',
        component: '/tools/test/index',
        meta: {
          title: '测试页面',
          icon: '#',
          isCache: true,
          isFrame: false,
          rank: 1,
        },
      },
    ],
  },
];

export default defineFakeRoute([
  {
    url: '/get-async-routes',
    method: 'get',
    response: () => {
      return {
        success: true,
        data: data,
      };
    },
  },
]);
