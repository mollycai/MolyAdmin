export default {
  path: '/:pathMatch(.*)',
  name: 'notFound',
  component: () => import('@/views/not-found/404.vue'),
  meta: {
    title: '404',
    showLink: false,
  },
};
