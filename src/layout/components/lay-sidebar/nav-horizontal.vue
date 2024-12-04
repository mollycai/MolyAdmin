<template>
  <div class="horizontal-header">
    <div v-if="showLogo" class="horizontal-header-left">
      <img :src="getLogo()" alt="logo" />
      <span>{{ title }}</span>
    </div>
    <el-menu ref="menuRef" mode="horizontal" class="horizontal-header-menu" :default-active="activeIndex">
      <LaySidebarItem v-for="route in menuData" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
    <div class="horizontal-header-right">
      <!-- 搜索 -->
      <search id="search" />
      <!-- 国际化 -->
      <translation id="translation"></translation>
      <!-- 全屏 -->
      <fullScreen id="full-screen" />
      <!-- 消息通知 -->
      <notice id="notice"></notice>
      <!-- admin -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link navbar-bg-hover">
          <img :src="'https://avatars.githubusercontent.com/u/99068236?v=4'" :style="avatarsStyle" />
          <p v-if="username" class="dark:text-white">{{ username }}</p>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="logout">
            <el-dropdown-item @click="logout">
              <IconifyIconOffline :icon="LogoutCircleRLine" style="margin: 5px" />
              退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 设置 -->
      <span class="set-icon navbar-bg-hover" title="打开系统配置" @click="onPanel">
        <IconifyIconOffline :icon="Setting" />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LaySidebarItem from './components/sidebar-item.vue';
import search from '../lay-search/index.vue';
import notice from '../lay-notice/index.vue';
import fullScreen from '../lay-navbar/components/full-screen.vue';
import translation from '../lay-navbar/components/translation.vue';

import { usePermissionStoreHook } from '@/store/modules/permission';
import { useGlobalConfig } from '@/config';
import { computed, ref, onMounted, watch } from 'vue';
import { isEmpty } from 'lodash-es';
import { useRoute } from 'vue-router';
import { emitter } from '@/utils/mitt';

import Setting from '@iconify-icons/ri/settings-3-line';
import LogoutCircleRLine from '@iconify-icons/ri/logout-circle-r-line';

const { getConfig } = useGlobalConfig();

const showLogo = computed(() => getConfig().ShowLogo);
function getLogo() {
  return new URL('/logo.svg', import.meta.url).href;
}

const title = computed(() => getConfig().Title);

const menuData = computed(() => usePermissionStoreHook().wholeMenus);

const route = useRoute();
const activeIndex = ref<string>('/');

function onPanel() {
  emitter.emit('openPanel');
}

function logout() {
  // @TODO 退出登录
}

// @TODO
const username = ref('admin');
const avatarsStyle = computed(() => {
  return username.value ? { marginRight: '10px' } : '';
});

onMounted(() => {
  activeIndex.value = !isEmpty(route.meta?.activePath) ? route.meta.activePath : route.path;
});

watch(
  () => route.path,
  () => {
    activeIndex.value = route.path;
  },
);
</script>
