// 模拟后端动态生成路由
import { defineFakeRoute } from 'vite-plugin-fake-server/client';

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */
const permissionRouter = {
  path: '/permission',
  name: 'Permission',
  meta: {
    title: '权限管理',
    icon: 'ep:lollipop',
    rank: 10,
  },
  children: [
    {
      path: '/permission/page/index',
      name: 'PermissionPage',
      meta: {
        title: '页面权限',
        roles: ['superAdmin', 'admin', 'common'],
      },
    },
    {
      path: '/permission/button/index',
      name: 'PermissionButton',
      meta: {
        title: '按钮权限',
        roles: ['superAdmin', 'admin', 'common'],
        auths: ['permission:btn:add', 'permission:btn:edit', 'permission:btn:delete'],
      },
    },
    {
      path: '/permission/test/index',
      name: 'PermissionTest',
      meta: {
        title: '测试权限',
        roles: ['superAdmin'],
        auths: ['permission:test:add', 'permission:test:edit', 'permission:test:delete'],
      },
    },
  ],
};

const sercetRouter = {
  path: '/sercet',
  meta: {
    title: '机密管理',
    icon: 'ep:lock',
    rank: 12,
  },
  children: [
    {
      path: '/sercet/page/index',
      name: 'sercetPage',
      meta: {
        title: '机密权限',
        roles: ['superAdmin'],
      },
    },
  ],
};

const test = {
  path: '/test',
  redirect: '/test/test1',
  meta: {
    title: '测试',
    icon: 'mdi:alert-decagram-outline',
    rank: '100',
  },
  children: [
    {
      path: '/test/test1',
      name: 'Test1',
      meta: {
        title: '测试页面1',
      },
      children: [
        {
          path: '/test/test1-1',
          name: 'Test1-1',
          meta: {
            title: '测试页面1-1',
            showParent: true,
          },
        },
      ],
    },
    {
      path: '/test/test2',
      name: 'Test2',
      meta: {
        title: '测试页面2',
      },
    },
  ],
};

export default defineFakeRoute([
  {
    url: '/get-async-routes',
    method: 'get',
    response: () => {
      return {
        success: true,
        data: [permissionRouter, sercetRouter, test],
      };
    },
  },
]);
