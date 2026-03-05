<script setup lang="ts">
import { useRouter } from 'vue-router';
import { 
  ArrowDown, 
  Scan, 
  Scale, 
  Users, 
  Trophy, 
  Utensils, 
  Activity, 
  Smile,
  TrendingUp,
  Gamepad2,
  LineChart
} from 'lucide-vue-next';

const router = useRouter();

const stats = [
  { label: 'นักวิ่งที่เข้าร่วม', value: '10,000+' },
  { label: 'กม. ที่พิชิตแล้ว', value: '850k+' }
];

const navigateToStart = () => {
  router.push('/events');
};
</script>

<template>
  <div class="home-page">
    <!-- Navigation Header -->
    <header class="app-navbar">
      <button @click="router.push('/profile')" class="profile-trigger">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaEhPmL4tcTVuSSOgjosauWyaPxQnHZMRklwCtWz-zxp3C49NgAMviafmy8ogi4WyvhpcKZW_YfT3x12mgLAc0Cj7t5hdvjzHR-F7qEixWC44yXBhiIkDveymEH5uyZyhzwdaov3Hj95GQ9kSKYy9oTnxzhVh6PIHN8aKVf83dTNS7MkpVdkecQ4IklljfaY7EVEEXtlpxZhVXeoMeuRnc7CiWBKpS01pcX9WVdT7pr4ggcaQm6AT6tFLzZXYQEM02XaLbCm8twmNA" alt="Profile" />
      </button>
      <button @click="navigateToStart" class="nav-cta-btn">เริ่มเลย</button>
    </header>

    <main class="content-wrapper">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1 class="hero-title">
            ก้าวสู่สุขภาพที่ดีกว่า<br/>
            <span class="gradient-text">ไปกับเรา VitalCare</span>
          </h1>
          <p class="hero-subtitle">แอปที่จะเปลี่ยนการวิ่งและการใช้ชีวิตของคุณให้เป็นเรื่องสนุกและมีระบบ</p>
          
          <div class="scroll-indicator">
            <span class="scroll-text">เลื่อนเพื่อดูเพิ่มเติม</span>
            <ArrowDown class="bounce-icon" :size="20" />
          </div>
        </div>
      </section>

      <!-- Stats Banner -->
      <section class="stats-banner-container">
        <div class="stats-banner glass-card">
          <div v-for="stat in stats" :key="stat.label" class="stat-item">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="grid-layout">
          <div class="feature-card glass-card shift-down">
            <div class="icon-box blue">
              <Scan :size="28" />
            </div>
            <h3>บันทึกผลด้วย AI</h3>
            <p>ดึงข้อมูลจากรูปภาพอัตโนมัติด้วยเทคโนโลยี OCR Typhoon</p>
          </div>

          <div class="feature-card glass-card">
            <div class="icon-box green">
              <Scale :size="28" />
            </div>
            <h3>สมดุล 3 อ.</h3>
            <p>ติดตามและประเมิน อาหาร ออกกำลังกาย และอารมณ์</p>
          </div>

          <div class="feature-card glass-card shift-down">
            <div class="icon-box purple">
              <Users :size="28" />
            </div>
            <h3>สังคมของนักวิ่ง</h3>
            <p>สร้างทีม แข่งขัน และเข้าร่วมกิจกรรมไปพร้อมกัน</p>
          </div>

          <div class="feature-card glass-card">
            <div class="icon-box gold">
              <Trophy :size="28" />
            </div>
            <h3>พิชิตรางวัล</h3>
            <p>สะสมแต้มเพื่อแลกฉายาและกรอบโปรไฟล์สุดพิเศษ</p>
          </div>
        </div>
      </section>

      <!-- Core Philosophy (3A) -->
      <section class="philosophy-section">
        <div class="section-header">
          <h2>หัวใจสำคัญคือ <span class="primary-color">สมดุล 3 อ.</span></h2>
          <p>ดูแลตัวเองให้ครบทุกมิติ เพื่อสุขภาพที่ยั่งยืน</p>
        </div>

        <div class="philosophy-list">
          <div class="philosophy-item glass-card">
            <div class="p-icon orange"><Utensils :size="24" /></div>
            <div class="p-text">
              <h4>อาหาร (Food)</h4>
              <p>กินให้พอดี มีประโยชน์ต่อร่างกาย</p>
            </div>
          </div>
          <div class="philosophy-item glass-card">
            <div class="p-icon blue"><Activity :size="24" /></div>
            <div class="p-text">
              <h4>ออกกำลังกาย (Exercise)</h4>
              <p>ขยับร่างกายอย่างสม่ำเสมอ</p>
            </div>
          </div>
          <div class="philosophy-item glass-card">
            <div class="p-icon pink"><Smile :size="24" /></div>
            <div class="p-text">
              <h4>อารมณ์ (Emotion)</h4>
              <p>พักผ่อนให้เพียงพอ จัดการความเครียด</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Community Section -->
      <section class="community-section">
        <h2>ก้าวไปพร้อมกับเพื่อน</h2>
        <div class="avatar-stack">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="User" />
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=James" alt="User" />
          <div class="avatar-more">+99</div>
        </div>
        <p class="community-desc">ร่วมเป็นส่วนหนึ่งของสังคมคนรักสุขภาพ แลกเปลี่ยนประสบการณ์และเป็นแรงบันดาลใจให้กันและกัน</p>
      </section>

      <!-- Benefits List -->
      <section class="benefits-section">
        <h2 class="benefits-title">ช่วยคุณได้อย่างไร?</h2>
        <div class="benefits-stack">
          <div class="benefit-row glass-card">
            <div class="benefit-icon"><LineChart :size="20" /></div>
            <span class="benefit-text">วิเคราะห์ความเสี่ยงรายบุคคล</span>
          </div>
          <div class="benefit-row glass-card">
            <div class="benefit-icon"><TrendingUp :size="20" /></div>
            <span class="benefit-text">ติดตามพัฒนาการรายวัน</span>
          </div>
          <div class="benefit-row glass-card">
            <div class="benefit-icon"><Gamepad2 :size="20" /></div>
            <span class="benefit-text">สร้างแรงจูงใจด้วยเกม</span>
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="cta-section">
        <button @click="navigateToStart" class="main-cta-btn">
          เริ่มก้าวแรกวันนี้
        </button>
        <p class="cta-hint">ใช้งานฟรี ไม่มีข้อผูกมัด</p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background-color: #ffffff;
  font-family: 'Kanit', sans-serif;
  color: #1e293b;
  overflow-x: hidden;
}

:global(.dark) .home-page {
  background-color: #020617;
  color: #f8fafc;
}

/* Navbar */
.app-navbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.profile-trigger {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  cursor: pointer;
  padding: 0;
}

.profile-trigger img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nav-cta-btn {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  color: #F05A23;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.nav-cta-btn:hover {
  transform: scale(1.05);
  background: white;
}

/* Hero */
.hero-section {
  position: relative;
  height: 85vh;
  min-height: 600px;
  background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB71F3Xg8jm-Z92FbjCKtPjOFcmKTklZboqcG7yx-yKmfQ_ybCJdQ6I9zPC6ixWsITyuJc4lFTpLNSzVWRetGDJUO1BLP9Om7eu5MA2Ph90FXaer3RMcn68WuK7dJYFKIcRuVvQEPYbuGKHnTustdGcYt1ZjhaP4eVQ1IM7-K-bP1Z8JgGuu_OUk5R75pioZ2zSAjkwJc8CyeUTAoDI898sgclT8PRI4TRLQ9AKu51dKXH9KxY9w9t_URBYcziHXghxj-YjbuPRr0Ap');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 1.5rem;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.4), rgba(26, 16, 12, 0.95));
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 32rem;
}

.hero-title {
  font-size: clamp(2rem, 8vw, 3.5rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(90deg, #fb923c, #F05A23);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.scroll-indicator {
  position: absolute;
  bottom: -6rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.7;
}

.scroll-text {
  font-size: 0.625rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.bounce-icon {
  color: white;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-5px);}
  60% {transform: translateY(-3px);}
}

/* Glass Card Global Styles */
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
}

:global(.dark) .glass-card {
  background: rgba(15, 23, 42, 0.6);
  border-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Stats Banner */
.stats-banner-container {
  padding: 0 1.5rem;
  margin-top: -3rem;
  position: relative;
  z-index: 20;
}

.stats-banner {
  max-width: 32rem;
  margin: 0 auto;
  border-radius: 1.5rem;
  display: flex;
  padding: 1.5rem;
  justify-content: space-around;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
}

.stats-banner .stat-item:not(:last-child) {
  border-right: 1px solid rgba(0,0,0,0.1);
}

:global(.dark) .stats-banner .stat-item:not(:last-child) {
  border-right-color: rgba(255,255,255,0.1);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e293b;
}

:global(.dark) .stat-value { color: white; }

.stat-label {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  margin-top: 0.25rem;
}

/* Features */
.features-section {
  padding: 5rem 1.5rem;
  max-width: 64rem;
  margin: 0 auto;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

@media (min-width: 768px) {
  .grid-layout { grid-template-columns: repeat(4, 1fr); }
}

.feature-card {
  padding: 2rem 1.5rem;
  border-radius: 2rem;
  text-align: center;
  transition: transform 0.3s;
}

.shift-down {
  transform: translateY(1.5rem);
}

.icon-box {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
}

.icon-box.blue { background: #eff6ff; color: #3b82f6; }
.icon-box.green { background: #f0fdf4; color: #22c55e; }
.icon-box.purple { background: #faf5ff; color: #a855f7; }
.icon-box.gold { background: #fffbeb; color: #f59e0b; }

.feature-card h3 {
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.5;
}

/* Philosophy */
.philosophy-section {
  padding: 3rem 1.5rem;
  max-width: 36rem;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-header h2 {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.primary-color { color: #F05A23; }

.section-header p {
  font-size: 0.875rem;
  color: #64748b;
}

.philosophy-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.philosophy-item {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  border-radius: 1.5rem;
}

.p-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.p-icon.orange { background: #fff7ed; color: #ea580c; }
.p-icon.blue { background: #eff6ff; color: #3b82f6; }
.p-icon.pink { background: #fdf2f8; color: #db2777; }

.p-text h4 {
  font-size: 0.9375rem;
  font-weight: 700;
  margin: 0;
}

.p-text p {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.25rem;
}

/* Community */
.community-section {
  padding: 5rem 1.5rem;
  text-align: center;
  background: radial-gradient(circle at center, rgba(240, 90, 35, 0.05), transparent);
}

.community-section h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
}

.avatar-stack {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
}

.avatar-stack img, .avatar-more {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  border: 3px solid white;
  margin-left: -0.75rem;
  object-fit: cover;
}

:global(.dark) .avatar-stack img, :global(.dark) .avatar-more { border-color: #020617; }

.avatar-stack img:first-child { margin-left: 0; }

.avatar-more {
  background: #F05A23;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 800;
  position: relative;
  z-index: 10;
}

.community-desc {
  font-size: 0.875rem;
  color: #64748b;
  max-width: 20rem;
  margin: 0 auto;
  line-height: 1.6;
}

/* Benefits */
.benefits-section {
  padding: 3rem 1.5rem;
  max-width: 32rem;
  margin: 0 auto;
}

.benefits-title {
  font-size: 1.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2rem;
}

.benefits-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.benefit-row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  border-radius: 1.25rem;
}

.benefit-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F05A23;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

:global(.dark) .benefit-icon { background: #1e293b; }

.benefit-text {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #475569;
}

:global(.dark) .benefit-text { color: #f8fafc; }

/* Final CTA */
.cta-section {
  padding: 5rem 1.5rem 8rem;
  text-align: center;
  max-width: 24rem;
  margin: 0 auto;
}

.main-cta-btn {
  width: 100%;
  padding: 1.25rem;
  border-radius: 1.5rem;
  border: none;
  background: linear-gradient(90deg, #fb923c, #F05A23, #ef4444);
  color: white;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(240, 90, 35, 0.4);
  transition: all 0.3s;
}

.main-cta-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(240, 90, 35, 0.5);
}

.main-cta-btn:active {
  transform: translateY(0);
}

.cta-hint {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 1.25rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>