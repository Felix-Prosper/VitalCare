<template>
  <div class="app-shell">
    <!-- Desktop Navigation (Top Navbar) -->
    <nav v-if="!hideNav" class="desktop-nav">
      <div class="nav-container">
        <div class="nav-left">
          <router-link to="/" class="brand">
            <div class="brand-icon">VC</div>
            <span class="brand-name">VitalCare</span>
          </router-link>
          
          <div class="nav-links">
            <router-link to="/" class="nav-link" active-class="active">หน้าแรก</router-link>
            <router-link to="/events" class="nav-link" active-class="active">กิจกรรม</router-link>
            <router-link to="/assessments" class="nav-link" active-class="active">ประเมิน</router-link>
            <router-link to="/tasks" class="nav-link" active-class="active">ภารกิจ</router-link>
            <router-link to="/leaderboard" class="nav-link" active-class="active">อันดับ</router-link>
          </div>
        </div>

        <div class="nav-right">
          <router-link to="/users" class="icon-action">
            <UsersIcon :size="20" />
          </router-link>
          <router-link to="/profile" class="profile-preview">
            <div class="profile-info">
              <p class="user-name">ณัฐสิทธิ์ ลาสะแน</p>
              <p class="user-stats">4,200 แต้ม</p>
            </div>
            <img src="https://picsum.photos/seed/user/100/100" class="profile-avatar" />
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div :class="['content-host', { 'with-nav': !hideNav }]">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <!-- Mobile Bottom Navigation -->
    <nav v-if="!hideNav" class="mobile-nav">
      <router-link to="/" class="m-nav-item" active-class="active">
        <HomeIcon :size="20" />
        <span>หน้าแรก</span>
      </router-link>
      <router-link to="/events" class="m-nav-item" active-class="active">
        <CalendarIcon :size="20" />
        <span>กิจกรรม</span>
      </router-link>
      <router-link to="/assessments" class="m-nav-item" active-class="active">
        <ClipboardListIcon :size="20" />
        <span>ประเมิน</span>
      </router-link>
      <router-link to="/tasks" class="m-nav-item" active-class="active">
        <CheckCircleIcon :size="20" />
        <span>ภารกิจ</span>
      </router-link>
      <router-link to="/leaderboard" class="m-nav-item" active-class="active">
        <TrophyIcon :size="20" />
        <span>อันดับ</span>
      </router-link>
      <router-link to="/profile" class="m-nav-item" active-class="active">
        <UserIcon :size="20" />
        <span>โปรไฟล์</span>
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
  // Hide global nav on specific pages to avoid overlapping logic
  return route.path.startsWith('/questionnaire') || 
         route.path === '/certificate' || 
         route.path === '/';
});
</script>

<style>
:root {
  --primary: #F05A23;
  --bg-slate-50: #f8fafc;
  --text-slate-900: #0f172a;
  --text-slate-400: #94a3b8;
  --border-slate-200: #e2e8f0;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Kanit', sans-serif;
  background-color: var(--bg-slate-50);
  color: var(--text-slate-900);
  -webkit-font-smoothing: antialiased;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Desktop Navbar */
.desktop-nav {
  display: none; /* Hide by default, show on MD */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4.5rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-slate-200);
  z-index: 1000;
}

@media (min-width: 768px) {
  .desktop-nav {
    display: block;
  }
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.nav-left, .nav-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
}

.brand-icon {
  width: 2.25rem;
  height: 2.25rem;
  background-color: var(--primary);
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 900;
  font-style: italic;
  font-size: 0.875rem;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-slate-400);
  transition: color 0.2s;
}

.nav-link:hover, .nav-link.active {
  color: var(--primary);
}

.icon-action {
  color: var(--text-slate-400);
  transition: color 0.2s;
  display: flex;
}

.icon-action:hover {
  color: var(--primary);
}

.profile-preview {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-left: 1.5rem;
  border-left: 1px solid #f1f5f9;
  text-decoration: none;
  color: inherit;
}

.profile-info {
  text-align: right;
}

.user-name {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  color: #1e293b;
}

.user-stats {
  margin: 0;
  font-size: 0.625rem;
  color: var(--primary);
  font-weight: 600;
}

.profile-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

/* Content Host */
.content-host {
  flex: 1;
  transition: padding 0.3s;
}

@media (min-width: 768px) {
  .with-nav {
    padding-top: 4.5rem;
  }
}

/* Page Transition */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

/* Mobile Nav */
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4.5rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid var(--border-slate-200);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 0.5rem;
  z-index: 1000;
}

@media (min-width: 768px) {
  .mobile-nav {
    display: none;
  }
}

.m-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  text-decoration: none;
  color: var(--text-slate-400);
  transition: all 0.2s;
  flex: 1;
}

.m-nav-item span {
  font-size: 0.625rem;
  font-weight: 700;
}

.m-nav-item.active {
  color: var(--primary);
  transform: translateY(-2px);
}

/* Utilities */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
