<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900">
    <!-- Desktop Navigation (Top Navbar) -->
    <nav v-if="!hideNav" class="hidden md:flex fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-8 py-4 justify-between items-center z-50">
      <div class="flex items-center gap-8">
        <router-link to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black italic">RT</div>
          <span class="text-lg font-bold tracking-tight">RunTogether</span>
        </router-link>
        
        <div class="flex items-center gap-6">
          <router-link to="/" class="text-sm font-bold text-slate-400 hover:text-primary transition-colors" active-class="text-primary">หน้าแรก</router-link>
          <router-link to="/events" class="text-sm font-bold text-slate-400 hover:text-primary transition-colors" active-class="text-primary">กิจกรรม</router-link>
          <router-link to="/assessments" class="text-sm font-bold text-slate-400 hover:text-primary transition-colors" active-class="text-primary">แบบประเมิน</router-link>
          <router-link to="/tasks" class="text-sm font-bold text-slate-400 hover:text-primary transition-colors" active-class="text-primary">ภารกิจ</router-link>
          <router-link to="/leaderboard" class="text-sm font-bold text-slate-400 hover:text-primary transition-colors" active-class="text-primary">อันดับ</router-link>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <router-link to="/users" class="p-2 text-slate-400 hover:text-primary transition-colors">
          <UsersIcon :size="20" />
        </router-link>
        <router-link to="/profile" class="flex items-center gap-3 pl-4 border-l border-slate-100 group">
          <div class="text-right">
            <p class="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">ณัฐสิทธิ์ ลาสะแน</p>
            <p class="text-[10px] text-slate-400">Level 42</p>
          </div>
          <img src="https://picsum.photos/seed/user/100/100" class="w-10 h-10 rounded-full border-2 border-slate-100 group-hover:border-primary transition-colors" referrerPolicy="no-referrer" />
        </router-link>
      </div>
    </nav>

    <!-- Main Content -->
    <div :class="{'md:pt-20': !hideNav}">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <!-- Mobile Bottom Navigation -->
    <nav v-if="!hideNav" class="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 px-4 py-3 flex justify-between items-center z-50">
      <router-link to="/" class="flex flex-col items-center gap-1 text-slate-400" active-class="text-primary">
        <HomeIcon :size="20" />
        <span class="text-[10px] font-bold">หน้าแรก</span>
      </router-link>
      <router-link to="/events" class="flex flex-col items-center gap-1 text-slate-400" active-class="text-primary">
        <CalendarIcon :size="20" />
        <span class="text-[10px] font-bold">กิจกรรม</span>
      </router-link>
      <router-link to="/assessments" class="flex flex-col items-center gap-1 text-slate-400" active-class="text-primary">
        <ClipboardListIcon :size="20" />
        <span class="text-[10px] font-bold">ประเมิน</span>
      </router-link>
      <router-link to="/tasks" class="flex flex-col items-center gap-1 text-slate-400" active-class="text-primary">
        <CheckCircleIcon :size="20" />
        <span class="text-[10px] font-bold">ภารกิจ</span>
      </router-link>
      <router-link to="/leaderboard" class="flex flex-col items-center gap-1 text-slate-400" active-class="text-primary">
        <TrophyIcon :size="20" />
        <span class="text-[10px] font-bold">อันดับ</span>
      </router-link>
      <router-link to="/profile" class="flex flex-col items-center gap-1 text-slate-400" active-class="text-primary">
        <UserIcon :size="20" />
        <span class="text-[10px] font-bold">โปรไฟล์</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { 
  Home as HomeIcon, 
  Calendar as CalendarIcon, 
  CheckCircle as CheckCircleIcon, 
  Trophy as TrophyIcon, 
  User as UserIcon,
  ClipboardList as ClipboardListIcon,
  Users as UsersIcon
} from 'lucide-vue-next';

const route = useRoute();
const hideNav = computed(() => {
  return route.path.startsWith('/questionnaire') || route.path === '/certificate' || route.path === '/';
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #F05A23;
}

.text-primary {
  color: var(--primary);
}

.bg-primary {
  background-color: var(--primary);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

body {
  font-family: 'Kanit', sans-serif;
}
</style>
