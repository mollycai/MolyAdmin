<template>
  <footer class="layout-footer text-[rgba(0,0,0,0.6)] dark:text-[rgba(220,220,242,0.8)]">
    Copyright © 2024-present
    <a class="hover:text-primary" href="" target="_blank"> &nbsp;{{ TITLE }} </a>
  </footer>
</template>

<script lang="ts" setup>
import { useGlobalConfig } from '@/config/index';
const { getConfig } = useGlobalConfig();

const TITLE = getConfig().Title;
</script>

<style lang="scss" scoped>
.layout-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 0 8px;
  font-size: 14px;
}
</style>
