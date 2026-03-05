<script setup lang="ts">
import { useRouter } from 'vue-router';
import { 
  ArrowLeft as ArrowLeftIcon,
  ChevronRight as ChevronRightIcon,
  Cigarette as CigaretteIcon,
  Wine as WineIcon,
  Moon as MoonIcon,
  Heart as HeartIcon,
  Utensils as UtensilsIcon,
  Activity as ActivityIcon,
  Smile as SmileIcon,
  AlertTriangle as AlertTriangleIcon
} from 'lucide-vue-next';

const router = useRouter();

const habits = [
  { label: 'บุหรี่', icon: CigaretteIcon, bg: 'bg-slate', color: 'text-slate', status: 'เสี่ยงต่ำ', statusClass: 'status-green' },
  { label: 'สุรา', icon: WineIcon, bg: 'bg-slate', color: 'text-slate', status: 'เสี่ยงต่ำ', statusClass: 'status-green' },
  { label: 'การนอน', icon: MoonIcon, bg: 'bg-slate', color: 'text-slate', status: '6.5 ชม.', statusClass: 'status-blue' },
];

const threeOsStatus = [
  { label: 'อาหาร', icon: UtensilsIcon, status: 'ดี', statusClass: 'status-green' },
  { label: 'ออกกำลังกาย', icon: ActivityIcon, status: 'ปานกลาง', statusClass: 'status-amber' },
  { label: 'อารมณ์', icon: SmileIcon, status: 'ดีมาก', statusClass: 'status-green' },
];
</script>

<template>
  <div class="profile-page">
    <!-- Header: Sticky on mobile, relative on desktop to avoid nav overlap -->
    <header class="profile-header">
      <div class="header-container">
        <button @click="router.back()" class="back-link">
          <ArrowLeftIcon :size="24" />
        </button>
        <h1 class="header-title">โปรไฟล์สุขภาพ</h1>
      </div>
    </header>

    <main class="profile-content">
      <!-- User Card -->
      <section class="user-card glass-card">
        <div class="avatar-container">
          <img src="https://picsum.photos/seed/user/200/200" class="profile-img" alt="User Avatar" />
          <div class="online-indicator"></div>
        </div>
        <div class="user-info">
          <h2 class="user-display-name">ณัฐสิทธิ์ ลาสะแน</h2>
          <p class="user-id">B6602840</p>
        </div>
        <div class="health-score-circle">
          <span class="score-value">85</span>
        </div>
      </section>

      <!-- Health Trends -->
      <section class="trends-section">
        <div class="section-header">
          <h3 class="section-label">แนวโน้มสุขภาพ (7 วันล่าสุด)</h3>
          <button @click="router.push('/report')" class="inline-action">
            ดูรายงานเชิงลึก <ChevronRightIcon :size="12" />
          </button>
        </div>
        <div class="trends-grid">
          <div class="trend-card glass-card">
            <div class="trend-meta">
              <span class="trend-title">คะแนนรวม</span>
              <span class="trend-badge positive">+2</span>
            </div>
            <div class="chart-mockup">
              <div v-for="(h, i) in [20, 35, 45, 55, 65, 80, 95]" :key="i" 
                class="bar-item primary" :style="{ height: h + '%' }"></div>
            </div>
          </div>
          <div class="trend-card glass-card">
            <div class="trend-meta">
              <span class="trend-title">คะแนน 3 อ.</span>
              <span class="trend-badge neutral">คงที่</span>
            </div>
            <div class="chart-mockup">
              <div v-for="(h, i) in [40, 50, 45, 60, 55, 65, 60]" :key="i" 
                class="bar-item orange" :style="{ height: h + '%' }"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Habit Cards -->
      <section class="habits-section">
        <h3 class="section-label">พฤติกรรมสุขภาพ</h3>
        <div class="habits-grid">
          <div v-for="habit in habits" :key="habit.label" 
            class="habit-card glass-card"
            @click="router.push('/assessments')">
            <div class="habit-icon-box">
              <component :is="habit.icon" class="habit-icon" :size="20" />
            </div>
            <span class="habit-name">{{ habit.label }}</span>
            <span :class="['status-chip', habit.statusClass]">
              {{ habit.status }}
            </span>
          </div>
        </div>
      </section>

      <!-- 3 O's Detailed -->
      <section class="three-os-card glass-card">
        <div class="card-header">
          <HeartIcon class="accent-color" :size="20" />
          <h3 class="card-title">3 อ. (อาหาร, ออกกำลัง, อารมณ์)</h3>
        </div>
        <div class="os-list">
          <div v-for="item in threeOsStatus" :key="item.label" class="os-row">
            <div class="os-info">
              <component :is="item.icon" class="os-icon" :size="18" />
              <span class="os-label">{{ item.label }}</span>
            </div>
            <span :class="['status-chip', item.statusClass]">
              {{ item.status }}
            </span>
          </div>
        </div>
      </section>

      <!-- Stats Summary -->
      <div class="stats-grid">
        <div class="summary-card glass-card">
          <p class="summary-value highlight">120.5</p>
          <p class="summary-label">กิโลเมตรรวม</p>
        </div>
        <div class="summary-card glass-card">
          <p class="summary-value">15</p>
          <p class="summary-label">กิจกรรม</p>
        </div>
      </div>

      <!-- Risk Alert -->
      <div class="alert-box risk">
        <div class="alert-icon-box">
          <AlertTriangleIcon :size="20" />
        </div>
        <div class="alert-body">
          <h4 class="alert-title">กลุ่มเสี่ยง (High Risk)</h4>
          <p class="alert-desc">
            พบค่าสถิติบางประการที่ควรได้รับคำแนะนำจากแพทย์ กรุณาตรวจสอบข้อมูลสุขภาพโดยละเอียด
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="action-stack">
        <button class="primary-btn">ดูประวัติสุขภาพละเอียด</button>
        <button class="secondary-btn">แก้ไขข้อมูล</button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.profile-page {
  padding-bottom: 6rem;
  background-color: #f8fafc;
  min-height: 100vh;
}

:global(.dark) .profile-page {
  background-color: #020617;
}

/* Header fix for Desktop Scroll overlap */
.profile-header {
  background-color: #ffffff;
  border-bottom: 1px solid #f1f5f9;
  position: sticky;
  top: 0;
  z-index: 100;
}

:global(.dark) .profile-header {
  background-color: #0f172a;
  border-bottom-color: #1e293b;
}

/* On desktop, remove sticky to avoid overlap or adjust top */
@media (min-width: 768px) {
  .profile-header {
    position: relative; /* Fixed: Not sticky on desktop as requested */
    border-bottom: none;
    background: transparent;
  }
}

.header-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  max-width: 42rem;
  margin: 0 auto;
}

.back-link {
  padding: 0.5rem;
  border: none;
  background: transparent;
  border-radius: 9999px;
  cursor: pointer;
  display: flex;
  transition: background 0.2s;
  color: inherit;
}

.back-link:hover {
  background-color: #f1f5f9;
}

:global(.dark) .back-link:hover {
  background-color: #1e293b;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

/* Content */
.profile-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 42rem;
  margin: 0 auto;
}

.glass-card {
  background: #ffffff;
  border-radius: 2rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
  transition: transform 0.2s;
}

:global(.dark) .glass-card {
  background: #0f172a;
  border-color: #1e293b;
}

/* User Card */
.user-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
}

.avatar-container {
  position: relative;
}

.profile-img {
  width: 5rem;
  height: 5rem;
  border-radius: 9999px;
  object-fit: cover;
  border: 4px solid #f8fafc;
}

:global(.dark) .profile-img { border-color: #1e293b; }

.online-indicator {
  position: absolute;
  bottom: 0.25rem;
  right: 0.25rem;
  width: 1.25rem;
  height: 1.25rem;
  background-color: #10b981;
  border-radius: 9999px;
  border: 3px solid #fff;
}

:global(.dark) .online-indicator { border-color: #0f172a; }

.user-info { flex: 1; }
.user-display-name { font-size: 1.25rem; font-weight: 700; margin: 0; }
.user-id { font-size: 0.75rem; color: #94a3b8; font-weight: 600; margin-top: 0.25rem; }

.health-score-circle {
  width: 4rem;
  height: 4rem;
  border-radius: 9999px;
  border: 4px solid #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
}

.score-value { font-size: 1.25rem; font-weight: 800; color: #1e293b; }
:global(.dark) .score-value { color: white; }

/* Trends */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.inline-action {
  font-size: 0.75rem;
  font-weight: 700;
  color: #F05A23;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.trends-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.trend-card { padding: 1.25rem; }
.trend-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.trend-title { font-size: 0.75rem; font-weight: 700; color: #64748b; }

.trend-badge {
  font-size: 0.625rem;
  font-weight: 800;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
}
.trend-badge.positive { background: #ecfdf5; color: #10b981; }
.trend-badge.neutral { background: #f8fafc; color: #94a3b8; }

.chart-mockup {
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
  height: 4rem;
}

.bar-item { flex: 1; border-radius: 2px 2px 0 0; }
.bar-item.primary { background-color: #10b981; }
.bar-item.orange { background-color: #fb923c; }

/* Habits */
.habits-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.habit-card {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.habit-card:hover { background-color: #fafafa; }

.habit-icon-box {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  color: #64748b;
}

:global(.dark) .habit-icon-box { background-color: #1e293b; }

.habit-name { font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem; }

.status-chip {
  font-size: 0.625rem;
  font-weight: 800;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  white-space: nowrap;
}

.status-green { background: #ecfdf5; color: #10b981; }
.status-blue { background: #eff6ff; color: #3b82f6; }
.status-amber { background: #fff7ed; color: #f59e0b; }

/* 3 O's */
.three-os-card { padding: 1.5rem; }
.card-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
.accent-color { color: #f43f5e; fill: #f43f5e; }
.card-title { font-size: 0.875rem; font-weight: 700; margin: 0; }

.os-list { display: flex; flex-direction: column; gap: 1rem; }
.os-row { display: flex; justify-content: space-between; align-items: center; }
.os-info { display: flex; align-items: center; gap: 0.75rem; }
.os-icon { color: #94a3b8; }
.os-label { font-size: 0.875rem; font-medium: 600; color: #475569; }
:global(.dark) .os-label { color: #cbd5e1; }

/* Stats Summary */
.stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
.summary-card { padding: 1.5rem; text-align: center; }
.summary-value { font-size: 1.5rem; font-weight: 800; margin: 0; }
.summary-value.highlight { color: #F05A23; }
.summary-label { font-size: 0.625rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-top: 0.25rem; }

/* Alert */
.alert-box {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 1.5rem;
}

.alert-box.risk { background-color: #fef2f2; border: 1px solid #fee2e2; }
:global(.dark) .alert-box.risk { background-color: rgba(153, 27, 27, 0.1); border-color: rgba(153, 27, 27, 0.2); }

.alert-icon-box {
  width: 2.5rem;
  height: 2.5rem;
  background-color: #fee2e2;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
  flex-shrink: 0;
}

.alert-title { font-size: 0.875rem; font-weight: 700; color: #b91c1c; margin: 0; }
.alert-desc { font-size: 0.7rem; color: #dc2626; margin-top: 0.25rem; line-height: 1.5; }

/* Actions */
.action-stack { display: flex; flex-direction: column; gap: 1rem; }

.primary-btn {
  width: 100%;
  padding: 1.25rem;
  background-color: #F05A23;
  color: white;
  border: none;
  border-radius: 1.25rem;
  font-weight: 700;
  font-size: 0.9375rem;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(240, 90, 35, 0.2);
}

.secondary-btn {
  width: 100%;
  padding: 1.25rem;
  background-color: white;
  color: #64748b;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  font-weight: 700;
  cursor: pointer;
}

:global(.dark) .secondary-btn {
  background-color: #1e293b;
  border-color: #334155;
  color: #94a3b8;
}
</style>
