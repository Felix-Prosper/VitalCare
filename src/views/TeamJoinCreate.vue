<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  ArrowLeft as ArrowLeftIcon, 
  Lock as LockIcon, 
  Info as InfoIcon, 
  Camera as CameraIcon,
  ArrowRight as ArrowRightIcon,
  Check as CheckIcon,
  Globe as GlobeIcon,
  Users as UsersIcon,
  Copy as CopyIcon,
  Sparkles as SparklesIcon,
  Share2 as ShareIcon
} from 'lucide-vue-next';

const router = useRouter();
const mode = ref('join'); // 'join' or 'create'
const teamType = ref<'public' | 'private'>('public');
const teamName = ref('');
const teamCodeInput = ref('');
const passwordInput = ref('');
const logoPreview = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

// Success State
const isCreated = ref(false);
const generatedCode = ref('778899'); // Mock generated code

// Mock Data
const openTeams = ref([
  { id: '123456', name: 'City Runners', members: 2, logo: 'https://picsum.photos/seed/t1/100/100', private: false },
  { id: '987654', name: 'Weekend Joggers', members: 4, logo: 'https://picsum.photos/seed/t2/100/100', private: true },
  { id: '554433', name: 'BKK Speedsters', members: 3, logo: 'https://picsum.photos/seed/t3/100/100', private: false },
]);

const triggerLogoUpload = () => {
  fileInput.value?.click();
};

const onLogoChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      logoPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(input.files[0]);
  }
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  alert('คัดลอกรหัสแล้ว: ' + text);
};

const handleConfirm = () => {
  if (mode.value === 'join') {
    alert('เข้าร่วมทีมสำเร็จ!');
    router.push('/events');
  } else {
    if (!teamName.value) {
      alert('กรุณากรอกชื่อทีม');
      return;
    }
    isCreated.value = true;
  }
};

const resetAndGoHome = () => {
  router.push('/events');
};
</script>

<template>
  <div class="team-page">
    <header class="team-header">
      <button @click="isCreated ? isCreated = false : router.back()" class="back-btn">
        <ArrowLeftIcon :size="24" />
      </button>
      <h1 class="header-title">{{ isCreated ? 'สร้างทีมสำเร็จ' : 'ทีม' }}</h1>
      <div class="header-spacer"></div>
    </header>

    <main class="team-container">
      
      <!-- Success View -->
      <div v-if="isCreated" class="success-view-container">
        <div class="success-card fade-in-content">
          <div class="sparkle-bg">
            <SparklesIcon :size="48" />
          </div>
          
          <div class="created-team-display">
            <div class="created-logo-wrapper">
               <img v-if="logoPreview" :src="logoPreview" class="created-logo" />
               <div v-else class="created-logo-placeholder">
                 <UsersIcon :size="40" />
               </div>
               <div class="success-badge">
                 <CheckIcon :size="16" />
               </div>
            </div>
            
            <h2 class="created-name">{{ teamName }}</h2>
            <div :class="['privacy-tag', teamType]">
              <template v-if="teamType === 'public'">
                <GlobeIcon :size="12" /> ทีมสาธารณะ
              </template>
              <template v-else>
                <LockIcon :size="12" /> ทีมส่วนตัว
              </template>
            </div>
          </div>

          <div class="code-share-section">
            <p class="share-label">รหัสเข้าร่วมทีมของคุณ</p>
            <div class="share-code-box">
              <span class="share-hash">#</span>
              <span class="share-code">{{ generatedCode }}</span>
              <button @click="copyToClipboard(generatedCode)" class="copy-action-btn">
                <CopyIcon :size="18" />
              </button>
            </div>
            <p class="share-hint">ส่งรหัสนี้ให้เพื่อนเพื่อเริ่มการวิ่งด้วยกัน!</p>
          </div>

          <button @click="resetAndGoHome" class="done-btn">
            ไปที่หน้ากิจกรรมคอนเฟิร์ม
          </button>
          
        
        </div>
      </div>

      <!-- Main Flow -->
      <template v-else>
        <!-- Mode Tabs -->
        <div class="tabs-container">
          <button 
            type="button"
            @click="mode = 'join'" 
            :class="['tab-btn', { active: mode === 'join' }]"
          >
            เข้าร่วมทีม
          </button>
          <button 
            type="button"
            @click="mode = 'create'" 
            :class="['tab-btn', { active: mode === 'create' }]"
          >
            สร้างทีม
          </button>
        </div>

        <!-- Join Mode -->
        <div v-if="mode === 'join'" class="fade-in-content">
          <div class="input-section">
            <label class="input-label">รหัสทีม</label>
            <div class="code-input-wrapper">
              <span class="prefix">#</span>
              <input 
                v-model="teamCodeInput"
                type="text" 
                placeholder="กรอกรหัสทีม 6 หลัก" 
                class="code-input" 
              />
            </div>
          </div>

          <div class="input-section">
            <div class="label-row">
              <label class="input-label">รหัสผ่านทีม</label>
              <span class="sub-label">(เฉพาะทีมส่วนตัว)</span>
            </div>
            <div class="icon-input-wrapper">
              <LockIcon class="input-icon" :size="20" />
              <input 
                v-model="passwordInput"
                type="password" 
                placeholder="กรอกรหัสผ่าน (ถ้ามี)" 
                class="icon-input" 
              />
            </div>
          </div>

          <div class="info-banner blue">
            <InfoIcon :size="20" class="info-icon" />
            <p class="info-text">คุณสามารถเข้าร่วมทีมด้วยรหัส หรือเลือกทีมสาธารณะด้านล่างนี้</p>
          </div>

          <hr class="divider" />

          <div class="public-teams-section">
            <h3 class="section-title">ทีมที่กำลังเปิดรับสมัคร</h3>
            <div class="team-cards-list">
              <div v-for="team in openTeams" :key="team.id" class="team-card">
                <div class="team-info">
                  <img :src="team.logo" class="team-logo" />
                  <div class="team-meta">
                    <h4 class="team-name">
                      {{ team.name }}
                      <LockIcon v-if="team.private" :size="12" class="lock-small" />
                    </h4>
                    <p class="team-stats">#{{ team.id }} • {{ team.members }}/6 สมาชิก</p>
                  </div>
                </div>
                <button class="join-action-btn">เข้าร่วม</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Create Mode -->
        <div v-else class="fade-in-content">
          <div class="logo-upload-container">
            <div @click="triggerLogoUpload" class="logo-circle">
              <img v-if="logoPreview" :src="logoPreview" class="logo-preview-img" />
              <template v-else>
                <CameraIcon :size="32" />
                <span class="upload-hint">โลโก้ทีม</span>
              </template>
              <input 
                type="file" 
                ref="fileInput" 
                class="hidden-input" 
                accept="image/*" 
                @change="onLogoChange" 
              />
            </div>
          </div>

          <div class="input-section">
            <label class="input-label">ชื่อทีม</label>
            <input 
              v-model="teamName"
              type="text" 
              placeholder="กรอกชื่อทีมที่โดดเด่น" 
              class="standard-input" 
            />
          </div>

          <div class="input-section">
            <label class="input-label">ความเป็นส่วนตัว</label>
            <div class="type-selector">
              <button 
                type="button"
                @click="teamType = 'public'" 
                :class="['type-btn', { active: teamType === 'public' }]"
              >
                <GlobeIcon :size="18" />
                <span>สาธารณะ</span>
              </button>
              <button 
                type="button"
                @click="teamType = 'private'" 
                :class="['type-btn', { active: teamType === 'private' }]"
              >
                <LockIcon :size="18" />
                <span>ส่วนตัว</span>
              </button>
            </div>
            <p class="type-hint">
              {{ teamType === 'public' ? 'ทุกคนจะสามารถมองเห็นและขอเข้าร่วมทีมของคุณได้' : 'เฉพาะคนที่มีรหัสผ่านเท่านั้นถึงจะเข้าร่วมทีมได้' }}
            </p>
          </div>

          <div class="create-info-card">
            <div class="info-card-header">
              <UsersIcon :size="24" class="primary-color" />
              <h3 class="info-card-title">สร้างทีมแล้วชวนเพื่อน</h3>
            </div>
            <p class="info-card-desc">
              หลังจากสร้างทีมสำเร็จ คุณจะได้รับรหัสทีมเพื่อส่งให้เพื่อนนำมากรอกเพื่อเข้าร่วมทีม หรือถ้าคุณเป็นทีมสาธารณะ ทีมจะแสดงในรายการด้านบน
            </p>
          </div>
        </div>
      </template>
    </main>

    <!-- Bottom Action Bar -->
    <div v-if="!isCreated" class="bottom-action-bar">
      <div class="action-container">
        <button @click="handleConfirm" class="confirm-btn">
          <span>{{ mode === 'join' ? 'เริ่มเข้าร่วมทีม' : 'ยืนยันการสร้างทีม' }}</span>
          <ArrowRightIcon v-if="mode === 'join'" :size="20" />
          <CheckIcon v-else :size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-page {
  min-height: 100vh;
  background-color: #f8fafc;
  padding-bottom: 9rem;
  font-family: 'Kanit', sans-serif;
  color: #1e293b;
}

:global(.dark) .team-page {
  background-color: #020617;
  color: #f8fafc;
}

/* Header */
.team-header {
  padding: 1.25rem 1.5rem;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:global(.dark) .team-header {
  background-color: #0f172a;
  border-bottom-color: #1e293b;
}

.back-btn {
  padding: 0.5rem;
  background: transparent;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn:hover {
  background-color: #f1f5f9;
}

:global(.dark) .back-btn:hover {
  background-color: #334155;
}

.header-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
}

.header-spacer {
  width: 2.5rem;
}

/* Container */
.team-container {
  padding: 1.5rem;
  max-width: 40rem;
  margin: 0 auto;
}

/* Tabs */
.tabs-container {
  display: flex;
  padding: 0.375rem;
  background-color: #f1f5f9;
  border-radius: 1.25rem;
  margin-bottom: 2rem;
}

:global(.dark) .tabs-container {
  background-color: #1e293b;
}

.tab-btn {
  flex: 1;
  padding: 0.875rem 0;
  border: none;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn.active {
  background-color: #ffffff;
  color: #1e293b;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

:global(.dark) .tab-btn.active {
  background-color: #334155;
  color: white;
}

/* Input Sections */
.fade-in-content {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  animation: fadeIn 0.4s ease-out;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input-label {
  font-size: 0.875rem;
  font-weight: 700;
  color: #475569;
}

:global(.dark) .input-label {
  color: #94a3b8;
}

.standard-input, .code-input, .icon-input {
  width: 100%;
  box-sizing: border-box;
  padding: 1.125rem;
  background-color: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 1.25rem;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.2s;
}

:global(.dark) .standard-input, 
:global(.dark) .code-input, 
:global(.dark) .icon-input {
  background-color: #0f172a;
  border-color: #1e293b;
  color: white;
}

.standard-input:focus, .code-input:focus, .icon-input:focus {
  outline: none;
  border-color: #F05A23;
  box-shadow: 0 0 0 4px rgba(240, 90, 35, 0.1);
}

.code-input-wrapper, .icon-input-wrapper {
  position: relative;
  width: 100%;
}

.prefix, .input-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-weight: 700;
}

.code-input { padding-left: 2.75rem; }
.icon-input { padding-left: 3.25rem; }

/* Type Selector (Public/Private) */
.type-selector {
  display: flex;
  gap: 0.75rem;
  width: 100%;
}

.type-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 1rem;
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
  color: #64748b;
  font-weight: 600;
  font-size: 0.875rem;
}

:global(.dark) .type-btn {
  background: #0f172a;
  border-color: #1e293b;
}

.type-btn.active {
  border-color: #F05A23;
  background: rgba(240, 90, 35, 0.04);
  color: #F05A23;
}

.type-hint {
  font-size: 0.8125rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

/* Logo Upload */
.logo-upload-container {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.logo-circle {
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 9999px;
  background-color: #f8fafc;
  border: 2px dashed #cbd5e1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.2s;
}

:global(.dark) .logo-circle {
  background-color: #1e293b;
  border-color: #334155;
}

.logo-circle:hover {
  border-color: #F05A23;
  background-color: #ffffff;
}

.logo-preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-hint {
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 0.375rem;
  color: #94a3b8;
}

.hidden-input {
  display: none;
}

/* Info Card */
.create-info-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

:global(.dark) .create-info-card {
  background: #0f172a;
  border-color: #1e293b;
}

.info-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.primary-color { color: #F05A23; }

.info-card-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
}

.info-card-desc {
  font-size: 0.8125rem;
  line-height: 1.6;
  color: #64748b;
  margin: 0;
}

/* Success View */
.success-view-container {
  padding: 1rem 0;
}

.success-card {
  background: white;
  border-radius: 2rem;
  padding: 3rem 1.5rem;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0,0,0,0.05);
  border: 1px solid #f1f5f9;
  position: relative;
}

:global(.dark) .success-card {
  background: #0f172a;
  border-color: #1e293b;
}

.sparkle-bg {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: #F05A23;
  opacity: 0.2;
}

.created-team-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.created-logo-wrapper {
  position: relative;
}

.created-logo, .created-logo-placeholder {
  width: 7rem;
  height: 7rem;
  border-radius: 9999px;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.created-logo-placeholder {
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
}

.success-badge {
  position: absolute;
  bottom: 0.25rem;
  right: 0.25rem;
  background: #10b981;
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
}

.created-name {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
}

.privacy-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.privacy-tag.public { background: #ecfdf5; color: #059669; }
.privacy-tag.private { background: #fff7ed; color: #ea580c; }

.code-share-section {
  background: #f8fafc;
  border-radius: 1.5rem;
  padding: 1.75rem;
  margin-bottom: 2rem;
}

:global(.dark) .code-share-section {
  background: #1e293b;
}

.share-label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #94a3b8;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.share-code-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.share-hash { font-size: 1.5rem; font-weight: 700; color: #F05A23; }
.share-code { font-size: 2.5rem; font-weight: 800; letter-spacing: 0.15em; }

.done-btn {
  width: 100%;
  background: #F05A23;
  color: white;
  border: none;
  padding: 1.25rem;
  border-radius: 1.25rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(240, 90, 35, 0.25);
  margin-bottom: 1.25rem;
}



/* Info Banner */
.info-banner {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: #eff6ff;
  border-radius: 1.25rem;
  color: #1d4ed8;
}

.info-text { font-size: 0.8125rem; line-height: 1.5; margin: 0; }

.divider { border: none; border-top: 1.5px solid #f1f5f9; margin: 0.5rem 0; }

/* Public Teams */
.public-teams-section { display: flex; flex-direction: column; gap: 1.25rem; }
.section-title { font-size: 1rem; font-weight: 700; margin: 0; }

.team-card {
  background: white;
  padding: 1.125rem;
  border-radius: 1.5rem;
  border: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.team-info { display: flex; align-items: center; gap: 1rem; }
.team-logo { width: 3.25rem; height: 3.25rem; border-radius: 9999px; object-fit: cover; }
.team-name { font-size: 0.9375rem; font-weight: 700; margin: 0; }
.team-stats { font-size: 0.75rem; color: #94a3b8; font-weight: 600; margin-top: 0.25rem; }

.join-action-btn {
  background: #F05A23;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.875rem;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
}

/* Bottom Action Bar */
.bottom-action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.25rem 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-top: 1px solid #f1f5f9;
  z-index: 100;
}

:global(.dark) .bottom-action-bar {
  background: rgba(2, 6, 23, 0.9);
  border-top-color: #1e293b;
}

.action-container {
  max-width: 40rem;
  margin: 0 auto;
}

.confirm-btn {
  width: 100%;
  background: #F05A23;
  color: white;
  border: none;
  padding: 1.25rem;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(240, 90, 35, 0.3);
  transition: all 0.2s ease;
}

.confirm-btn:active {
  transform: scale(0.98);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
