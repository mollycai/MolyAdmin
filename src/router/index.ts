import { RouteComponent, RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
// 动态路由
import { getAsyncRoutes } from '@/api/routes';
import { localCache } from '@/utils/cache';
import { usePermissionStoreHook } from '@/store/modules/permission';
import { cloneDeep } from 'lodash-es';
import { ascending, formatAsyncRoute } from './utils';
import { isURL } from '@/utils/utils';
import NProgress from '@/utils/progress';
import remainingRouter from './modules/remaining';

// 自动导入全部静态路由
const modules: Record<string, any> = import.meta.glob(['./modules/**/*.ts'], {
  eager: true,
});

// 原始静态路由（未做任何处理）
const routes = [];
Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default);
});
// 静态路由菜单
export const constantMenus: Array<RouteComponent> = ascending(routes.flat(Infinity));
// @TODO 考虑下是否需要吧3级路由再拍成2级的，再添加进createRouter

/** 不参与菜单的路由 */
export const remainingPaths = Object.keys(remainingRouter).map((v) => {
  return remainingRouter[v].path;
});

/** 处理动态路由 */
function handleAsyncRoutes(routeList: any[]) {
  if (routeList.length !== 0) {
    // 获取home路由
    const homeRoute = router.options.routes.filter((item) => item.name === 'Home');
    // 对后端返回的路由进行格式化，重新生成路由规范
    formatAsyncRoute(routeList).map((item: RouteRecordRaw) => {
      // 防止重复添加路由
      if (homeRoute[0].children.findIndex((value) => value.path === item.path) !== -1) {
        return;
      } else {
        // 将路由push到routes后还需要再使用addRoute添加一次，注意要把业务路由加入到Home下
        if (!router.hasRoute(item?.name)) router.addRoute('Home', item);
      }
    });
  }
  usePermissionStoreHook().handleWholeMenus(routeList);
}

/** 初始化路由 */
function initRouter() {
  // @TODO 判断是否缓存动态路由，此处默认缓存
  const key = 'async-routes';
  const asyncRouteList = localCache.get(key) as any;
  if (asyncRouteList && asyncRouteList?.length > 0) {
    return new Promise((resolve) => {
      handleAsyncRoutes(asyncRouteList);
      resolve(router);
    });
  } else {
    return new Promise((resolve) => {
      getAsyncRoutes().then(({ data }) => {
        handleAsyncRoutes(cloneDeep(data));
        // @考虑一下这里是否需要先过滤权限
        localCache.set(key, data);
        resolve(router);
      });
    });
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const whiteList = ['/login'];

router.beforeEach((to: ToRouteType, _from, next) => {
  // @TODO 路由缓存处理机制
  // @TODO 获取用户信息
  NProgress.start();
  // 处理浏览器页面标题
  const externalLink = isURL(to?.name as string);
  if (!externalLink) {
    to.matched.some((item) => {
      if (!item.meta.title) return '';
      document.title = item.meta.title as string;
    });
  }
  // @TODO 判断是否有权限，下列默认为有权限的操作，无权限需自动重定向到403
  // @TODO 判断是否是超链接，是的话用特定的打开方式
  // @TODO 刷新时对多标签页的处理

  next();
});

router.afterEach(() => {
  NProgress.done();
});
// @TODO 在等录后调用
initRouter();

export default router;
