import { remainingPaths } from '@/router';
import { usePermissionStoreHook } from '@/store/modules/permission';
import { emitter } from '@/utils/mitt';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

// @TODO 封装所有与导航相关的hook
export function useNav() {
  // 完整菜单
  const { wholeMenus } = storeToRefs(usePermissionStoreHook());
  // 用户名
  const username = ref('admin');
  // 用户头像
  const userAvatar = ref('https://avatars.githubusercontent.com/u/99068236?v=4');

  const avatarsStyle = computed(() => {
    return username.value ? { marginRight: '10px' } : '';
  });

  /** 菜单点击事件 */
  function menuSelect(indexPath: string) {
    if (wholeMenus.value.length === 0 || isRemaining(indexPath)) return;
    emitter.emit('changLayoutRoute', indexPath);
  }

  /** 判断路径是否参与菜单 */
  function isRemaining(path: string) {
    return remainingPaths.includes(path);
  }

  /** 退出登录 */
  function logout() {
    // @TODO 退出登录
  }

  /** 设置面板事件 */
  function onPanel() {
    emitter.emit('openPanel');
  }

  return {
    username,
    userAvatar,
    avatarsStyle,
    menuSelect,
    logout,
    onPanel,
  };
}
