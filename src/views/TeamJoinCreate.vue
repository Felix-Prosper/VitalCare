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
            <SparklesIcon class="sparkle-icon" :size="48" />
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
              <component :is="teamType === 'public' ? GlobeIcon : LockIcon" :size="12" />
              {{ teamType === 'public' ? 'ทีมสาธารณะ' : 'ทีมส่วนตัว' }}
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
          
          <button class="share-social-btn">
            <ShareIcon :size="18" /> แชร์รหัสให้เพื่อน
          </button>
        </div>
      </div>

      <!-- Main Flow -->
      <template v-else>
        <!-- Mode Tabs -->
        <div class="tabs-container">
          <button 
            @click="mode = 'join'" 
            :class="['tab-btn', { active: mode === 'join' }]"
          >
            เข้าร่วมทีม
          </button>
          <button 
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
                @click="teamType = 'public'" 
                :class="['type-btn', { active: teamType === 'public' }]"
              >
                <GlobeIcon :size="16" /> สาธารณะ
              </button>
              <button 
                @click="teamType = 'private'" 
                :class="['type-btn', { active: teamType === 'private' }]"
              >
                <LockIcon :size="16" /> ส่วนตัว
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
      <button @click="handleConfirm" class="confirm-btn">
        <span class="btn-text">{{ mode === 'join' ? 'เริ่มเข้าร่วมทีม' : 'ยืนยันการสร้างทีม' }} </span>
        <ArrowRightIcon v-if="mode === 'join'" :size="20" />
        <CheckIcon v-else :size="20" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.team-page {
  min-height: 100vh;
  background-color: #f8fafc;
  padding-bottom: 8rem;
  font-family: 'Kanit', sans-serif;
  color: #1e293b;
}

:global(.dark) .team-page {
  background-color: #020617;
  color: #f8fafc;
}

/* Header */
.team-header {
  padding: 1.5rem;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 30;
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
  transition: background 0.2s;
  color: inherit;
}

.back-btn:hover {
  background-color: #f1f5f9;
}

:global(.dark) .back-btn:hover {
  background-color: #334155;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.header-spacer {
  width: 2.5rem;
}

/* Container */
.team-container {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 32rem;
  margin: 0 auto;
}

/* Tabs */
.tabs-container {
  display: flex;
  padding: 0.25rem;
  background-color: #f1f5f9;
  border-radius: 1.25rem;
}

:global(.dark) .tabs-container {
  background-color: #1e293b;
}

.tab-btn {
  flex: 1;
  padding: 0.75rem 0;
  border: none;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn.active {
  background-color: #ffffff;
  color: #1e293b;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
}

:global(.dark) .tab-btn.active {
  background-color: #334155;
  color: #f8fafc;
  border-color: #475569;
}

/* Input Styles */
.input-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input-label {
  font-size: 0.875rem;
  font-weight: 700;
}

.sub-label {
  font-size: 0.625rem;
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 700;
}

.code-input-wrapper, .icon-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.prefix {
  position: absolute;
  left: 1rem;
  color: #94a3b8;
  font-weight: 700;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: #94a3b8;
}

.code-input, .icon-input, .standard-input {
  width: 100%;
  padding: 1rem;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.2s;
}

:global(.dark) .code-input, :global(.dark) .icon-input, :global(.dark) .standard-input {
  background-color: #0f172a;
  border-color: #1e293b;
  color: white;
}

.code-input {
  padding-left: 2.5rem;
}

.icon-input {
  padding-left: 3rem;
}

.code-input:focus, .icon-input:focus, .standard-input:focus {
  outline: none;
  border-color: #F05A23;
  box-shadow: 0 0 0 4px rgba(240, 90, 35, 0.1);
}

/* Banner */
.info-banner {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 1.5rem;
  border: 1px solid transparent;
}

.info-banner.blue {
  background-color: #eff6ff;
  border-color: #dbeafe;
}

:global(.dark) .info-banner.blue {
  background-color: rgba(30, 58, 138, 0.1);
  border-color: rgba(30, 58, 138, 0.2);
}

.info-icon {
  color: #3b82f6;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.info-text {
  font-size: 0.75rem;
  color: #1d4ed8;
  line-height: 1.5;
  margin: 0;
}

:global(.dark) .info-text {
  color: #93c5fd;
}

.divider {
  border: none;
  border-top: 1px solid #f1f5f9;
  margin: 0;
}

:global(.dark) .divider {
  border-top-color: #1e293b;
}

/* Team List */
.public-teams-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 700;
}

.team-cards-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.team-card {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 1.5rem;
  border: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}

:global(.dark) .team-card {
  background-color: #0f172a;
  border-color: #1e293b;
}

.team-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.team-logo {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  object-fit: cover;
  border: 2px solid #f8fafc;
}

:global(.dark) .team-logo {
  border-color: #1e293b;
}

.team-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.team-name {
  font-size: 0.875rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.lock-small {
  color: #cbd5e1;
}

.team-stats {
  font-size: 0.625rem;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
}

.join-action-btn {
  padding: 0.5rem 1.25rem;
  background-color: #F05A23;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.625rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(240, 90, 35, 0.2);
  transition: all 0.2s;
}

.join-action-btn:hover {
  transform: translateY(-1px);
}

/* Create Flow - Logo upload */
.logo-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-circle {
  width: 6rem;
  height: 6rem;
  border-radius: 9999px;
  background-color: #f8fafc;
  border: 2px dashed #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}

:global(.dark) .logo-circle {
  background-color: #1e293b;
  border-color: #334155;
}

.logo-circle:hover {
  background-color: #f1f5f9;
  border-color: #F05A23;
  color: #F05A23;
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
  margin-top: 0.25rem;
}

.hidden-input {
  display: none;
}

/* Success View Styles */
.success-view-container {
  padding: 1rem 0;
}

.success-card {
  background: white;
  border-radius: 2.5rem;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
  border: 1px solid #f1f5f9;
  position: relative;
  overflow: hidden;
}

:global(.dark) .success-card {
  background: #0f172a;
  border-color: #1e293b;
}

.sparkle-bg {
  position: absolute;
  top: -20px;
  right: -20px;
  color: rgba(240, 90, 35, 0.1);
  transform: rotate(15deg);
}

.created-team-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.created-logo-wrapper {
  position: relative;
}

.created-logo, .created-logo-placeholder {
  width: 6rem;
  height: 6rem;
  border-radius: 9999px;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
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
  bottom: 0;
  right: 0;
  background: #10b981;
  color: white;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

.created-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.privacy-tag {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.privacy-tag.public {
  background: #ecfdf5;
  color: #059669;
}

.privacy-tag.private {
  background: #fff7ed;
  color: #ea580c;
}

.code-share-section {
  background: #f8fafc;
  border-radius: 1.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

:global(.dark) .code-share-section {
  background: #1e293b;
}

.share-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.share-code-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.share-hash {
  font-size: 1.25rem;
  font-weight: 700;
  color: #F05A23;
}

.share-code {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #1e293b;
}

:global(.dark) .share-code {
  color: white;
}

.copy-action-btn {
  background: transparent;
  border: none;
  padding: 0.5rem;
  color: #F05A23;
  cursor: pointer;
  transition: transform 0.2s;
}

.copy-action-btn:hover {
  transform: scale(1.1);
}

.share-hint {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
}

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
  box-shadow: 0 10px 20px rgba(240, 90, 35, 0.3);
  margin-bottom: 1rem;
  transition: all 0.3s;
}

.done-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(240, 90, 35, 0.4);
}

.share-social-btn {
  width: 100%;
  background: transparent;
  color: #64748b;
  border: 1px solid #e2e8f0;
  padding: 1rem;
  border-radius: 1.25rem;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.share-social-btn:hover {
  background: #f1f5f9;
}

/* Animations */
.fade-in-content {
  animation: fadeIn 0.5s ease-out forwards;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
