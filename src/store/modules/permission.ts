import { defineStore } from 'pinia';
import { store } from '..';
import { ascending, filterNoPermissionTree, filterTree, formatFlatteningRoutes } from '@/router/utils';
import { constantMenus } from '@/router';

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => ({
    // 静态路由模块
    constantMenus,
    // 整体路由菜单
    wholeMenus: [],
    // 整体路由（一维数组格式）
    flatteningRoutes: [],
    // 缓存路由
    cachePageList: [],
  }),
  actions: {
    /** 组装整体路由生成的菜单 */
    handleWholeMenus(routes: any[]) {
      // 过滤掉没有权限并且showLink的路由，并升序排序
      this.wholeMenus = filterNoPermissionTree(filterTree(ascending(this.constantMenus.concat(routes))));
      this.flatteningRoutes = formatFlatteningRoutes(this.constantMenus.concat(routes));
    },
  },
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}