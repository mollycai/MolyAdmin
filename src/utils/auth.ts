import { routerNameSpace } from '@/config/constants';
import { useUserStoreHook } from '@/store/modules/user';
import Cookies from 'js-cookie';
import { localCache } from './cache';

export interface DataInfo<T> {
  /** token */
  accessToken: string;
  /** `accessToken`的过期时间（时间戳） */
  expires: T;
  /** 用于调用刷新accessToken的接口时所需的token */
  refreshToken: string;
  /** 头像 */
  avatar?: string;
  /** 用户名 */
  username?: string;
  /** 昵称 */
  nickname?: string;
  /** 当前登录用户的角色 */
  roles?: Array<string>;
  /** 当前登录用户的按钮级别权限 */
  permissions?: Array<string>;
}

export const userKey = 'user-info';
export const tokenKey = 'authorized-token';
export const multipleTabsKey = 'multiple-tabs';

/** 获取`token` */
export function getToken() {
  return Cookies.get(tokenKey) ? JSON.parse(Cookies.get(tokenKey)) : localCache.get(userKey);
}

/**
 * 设置token一些信息并无感刷新token
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 */
export function setToken(data: DataInfo<Date>) {
  // let expires = 0;
  const { accessToken, refreshToken } = data;
  const { isRemembered, loginDay } = useUserStoreHook();

  let expires = new Date(data.expires).getTime();
  const cookieString = JSON.stringify({ accessToken, expires, refreshToken });

  // 设置Cookie过期的天数
  expires > 0
    ? Cookies.set(tokenKey, cookieString, {
        expires: (expires - Date.now()) / 86400000,
      })
    : Cookies.set(tokenKey, cookieString);
  Cookies.set(
    multipleTabsKey,
    'true',
    isRemembered
      ? {
          expires: loginDay,
        }
      : {},
  );

  function setUserKey({ avatar, username, nickname, roles, permissions }) {
    useUserStoreHook().SET_AVATAR(avatar);
    useUserStoreHook().SET_USERNAME(username);
    useUserStoreHook().SET_NICKNAME(nickname);
    useUserStoreHook().SET_ROLES(roles);
    useUserStoreHook().SET_PERMS(permissions);
    localCache.set(userKey, {
      refreshToken,
      expires,
      avatar,
      username,
      nickname,
      roles,
      permissions,
    });
  }

  const { avatar, username, nickname, roles, permissions } = data;
  setUserKey({
    avatar,
    username,
    nickname,
    roles,
    permissions,
  });
}

/** 删除Token以及Userinfo */
export function removeToken() {
  Cookies.remove(tokenKey);
  Cookies.remove(multipleTabsKey);
  localCache.remove(userKey);
  localCache.remove(routerNameSpace);
}

/** 格式化token（jwt格式） */
export function formatToken(token: string): string {
  if (token.startsWith('Bearer')) {
    return token;
  } else {
    return 'Bearer ' + token;
  }
}

export function hasPermissions() {}
