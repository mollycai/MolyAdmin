import { defineStore } from 'pinia';
import { store } from '..';

export const useAppStore = defineStore({
  id: 'app',
  state: (): any => ({
    sidebar: {
      opened: true,
      isClickCollapse: false, // 判断是否手动点击Collapse
    },
    // @TODO 关于浏览器视口，多端适配的属性
  }),
  getters: {
    getSidebarStatus(state) {
      return state.sidebar.opened;
    },
  },
  actions: {
    toggleSidebar(opened?: boolean) {
      this.sidebar.opened = !this.sidebar.opened;
    },
  },
});

export function useAppStoreHook() {
  return useAppStore(store);
}
