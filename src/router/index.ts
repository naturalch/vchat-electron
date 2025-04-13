import {
  createRouter,
  createMemoryHistory,
  type RouteRecordRaw,
  type RouteLocationNormalized,
} from 'vue-router';
import Home from '@/views/Home.vue';
import Conversation from '@/views/Conversation.vue';
import Settings from '@/views/Settings.vue';
import { useConversationStore } from '@/store/modules/conversation'; 

const routes:Array<RouteRecordRaw> = [
  { path: '/', name: 'home', component: Home, meta: { title: '首页' } },
  { path: '/conversation/:id', name: 'conversation', component: Conversation, meta: { title: '对话' } },
  { path: '/settings', name: 'settings', component: Settings, meta: { title: '设置' } },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    title?: string;
  };
}

router.beforeEach((to: toRouteType, from, next) => {
  // 设置应用 title
  document.title = to.meta.title || 'VChat Electron';
  // 为确保 pinia 实例创建了，将 useStore 的调用放在 pinia 安装后才会执行的函数中
  const store = useConversationStore();
  if (!to.path.startsWith('/conversation/')) {
    store.selectedId = -1;
  }
  next();
});

export default router;
