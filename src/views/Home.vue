<template>
  <div class="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200 min-h-screen flex flex-col antialiased selection:bg-primary selection:text-white">
    
    <header class="flex items-center justify-between p-4 absolute top-0 w-full z-50">
      <button 
        @click="$router.push('/profile')"
        class="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden ring-2 ring-white/30 hover:ring-white transition-all bg-black/20 backdrop-blur-md"
      >
        <img alt="โปรไฟล์ผู้ใช้" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaEhPmL4tcTVuSSOgjosauWyaPxQnHZMRklwCtWz-zxp3C49NgAMviafmy8ogi4WyvhpcKZW_YfT3x12mgLAc0Cj7t5hdvjzHR-F7qEixWC44yXBhiIkDveymEH5uyZyhzwdaov3Hj95GQ9kSKYy9oTnxzhVh6PIHN8aKVf83dTNS7MkpVdkecQ4IklljfaY7EVEEXtlpxZhVXeoMeuRnc7CiWBKpS01pcX9WVdT7pr4ggcaQm6AT6tFLzZXYQEM02XaLbCm8twmNA"/>
      </button>
      
      <button 
        @click="$router.push('/start')"
        class="px-5 py-2 bg-white/90 backdrop-blur-md text-primary font-medium text-sm rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:bg-white hover:scale-105 transition-all"
      >
        เริ่มเลย
      </button>
    </header>

    <main class="flex-1 overflow-y-auto pb-6 hide-scrollbar">
      <section 
        class="relative h-[85vh] min-h-[600px] w-full bg-cover bg-center flex flex-col items-center justify-center px-6 text-center" 
        :style="{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuB71F3Xg8jm-Z92FbjCKtPjOFcmKTklZboqcG7yx-yKmfQ_ybCJdQ6I9zPC6ixWsITyuJc4lFTpLNSzVWRetGDJUO1BLP9Om7eu5MA2Ph90FXaer3RMcn68WuK7dJYFKIcRuVvQEPYbuGKHnTustdGcYt1ZjhaP4eVQ1IM7-K-bP1Z8JgGuu_OUk5R75pioZ2zSAjkwJc8CyeUTAoDI898sgclT8PRI4TRLQ9AKu51dKXH9KxY9w9t_URBYcziHXghxj-YjbuPRr0Ap)' }"
      >
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-[#1a100c]/90"></div>
        
        <div class="relative z-10 max-w-md mt-12 flex flex-col items-center">
          <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-white mb-5 leading-tight drop-shadow-lg">
            ก้าวสู่สุขภาพที่ดีกว่า<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-primary">ไปกับเรา</span>
          </h1>
          <p class="text-white/80 text-base md:text-lg font-light leading-relaxed mb-12 max-w-[280px]">
            แอปที่จะเปลี่ยนการวิ่งและการใช้ชีวิตของคุณให้เป็นเรื่องสนุกและมีระบบ
          </p>
        </div>

        <div class="absolute bottom-10 z-10 flex flex-col items-center justify-center opacity-80">
          <span class="text-white/60 text-xs tracking-widest uppercase mb-2">เลื่อนลงเพื่อดูเพิ่มเติม</span>
          <span class="material-symbols-outlined text-white/60 animate-bounce">keyboard_arrow_down</span>
        </div>
      </section>

      <section class="relative z-20 -mt-6 mx-4">
        <div class="glass-card rounded-2xl py-4 px-6 flex justify-around items-center divide-x divide-slate-200/50 dark:divide-slate-700/50">
          <div 
            v-for="stat in stats" 
            :key="stat.label" 
            class="text-center px-2 flex-1"
          >
            <p class="text-xl font-bold text-slate-800 dark:text-white drop-shadow-sm">{{ stat.value }}</p>
            <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-1">{{ stat.label }}</p>
          </div>
        </div>
      </section>

      <div class="mesh-bg-1 pt-12 pb-6">
        <section class="px-5 mb-16 max-w-6xl mx-auto">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="glass-card rounded-3xl p-5 flex flex-col items-center text-center transform translate-y-4">
              <div class="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 rounded-2xl flex items-center justify-center mb-4 text-blue-500 shadow-inner">
                <span class="material-symbols-outlined text-3xl fill">document_scanner</span>
              </div>
              <h3 class="text-slate-900 dark:text-white font-semibold text-sm mb-2">บันทึกผลด้วย AI</h3>
              <p class="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">ดึงข้อมูลจากรูปภาพอัตโนมัติด้วยเทคโนโลยี OCR Typhoon</p>
            </div>

            <div class="glass-card rounded-3xl p-5 flex flex-col items-center text-center">
              <div class="w-14 h-14 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-800/20 rounded-2xl flex items-center justify-center mb-4 text-green-500 shadow-inner">
                <span class="material-symbols-outlined text-3xl fill">monitor_weight</span>
              </div>
              <h3 class="text-slate-900 dark:text-white font-semibold text-sm mb-2">สมดุล 3 อ.</h3>
              <p class="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">ติดตามและประเมิน อาหาร ออกกำลังกาย และอารมณ์</p>
            </div>

            <div class="glass-card rounded-3xl p-5 flex flex-col items-center text-center transform translate-y-4">
              <div class="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/40 dark:to-purple-800/20 rounded-2xl flex items-center justify-center mb-4 text-purple-500 shadow-inner">
                <span class="material-symbols-outlined text-3xl fill">groups</span>
              </div>
              <h3 class="text-slate-900 dark:text-white font-semibold text-sm mb-2">สังคมของนักวิ่ง</h3>
              <p class="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">สร้างทีม แข่งขัน และเข้าร่วมกิจกรรมไปพร้อมกัน</p>
            </div>

            <div class="glass-card rounded-3xl p-5 flex flex-col items-center text-center">
              <div class="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-800/20 rounded-2xl flex items-center justify-center mb-4 text-amber-500 shadow-inner">
                <span class="material-symbols-outlined text-3xl fill">emoji_events</span>
              </div>
              <h3 class="text-slate-900 dark:text-white font-semibold text-sm mb-2">พิชิตรางวัล</h3>
              <p class="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">สะสมแต้มเพื่อแลกฉายาและกรอบโปรไฟล์สุดพิเศษ</p>
            </div>
          </div>
        </section>

        <section class="px-6 mb-16 max-w-2xl mx-auto">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">หัวใจสำคัญคือ <span class="text-primary">สมดุล 3 อ.</span></h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">ดูแลตัวเองให้ครบทุกมิติ เพื่อสุขภาพที่ยั่งยืน</p>
          </div>
          <div class="space-y-4">
            <div class="glass-card p-4 rounded-2xl flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 shrink-0">
                <span class="material-symbols-outlined">restaurant</span>
              </div>
              <div>
                <h4 class="font-semibold text-slate-800 dark:text-slate-200">อาหาร (Food)</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">กินให้พอดี มีประโยชน์ต่อร่างกาย</p>
              </div>
            </div>
            <div class="glass-card p-4 rounded-2xl flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 shrink-0">
                <span class="material-symbols-outlined">directions_run</span>
              </div>
              <div>
                <h4 class="font-semibold text-slate-800 dark:text-slate-200">ออกกำลังกาย (Exercise)</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">ขยับร่างกายอย่างสม่ำเสมอ</p>
              </div>
            </div>
            <div class="glass-card p-4 rounded-2xl flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-500 shrink-0">
                <span class="material-symbols-outlined">sentiment_satisfied</span>
              </div>
              <div>
                <h4 class="font-semibold text-slate-800 dark:text-slate-200">อารมณ์ (Emotion)</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">พักผ่อนให้เพียงพอ จัดการความเครียด</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="mesh-bg-2 py-12">
        <section class="px-6 mb-12 text-center max-w-2xl mx-auto">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">ก้าวไปพร้อมกับเพื่อน</h2>
          <div class="flex justify-center items-center mb-4">
            <div class="flex -space-x-3">
              <img alt="user avatar" class="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaEhPmL4tcTVuSSOgjosauWyaPxQnHZMRklwCtWz-zxp3C49NgAMviafmy8ogi4WyvhpcKZW_YfT3x12mgLAc0Cj7t5hdvjzHR-F7qEixWC44yXBhiIkDveymEH5uyZyhzwdaov3Hj95GQ9kSKYy9oTnxzhVh6PIHN8aKVf83dTNS7MkpVdkecQ4IklljfaY7EVEEXtlpxZhVXeoMeuRnc7CiWBKpS01pcX9WVdT7pr4ggcaQm6AT6tFLzZXYQEM02XaLbCm8twmNA"/>
              <div class="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark bg-slate-200 flex items-center justify-center"><span class="material-symbols-outlined text-slate-400 text-sm">person</span></div>
              <div class="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark bg-slate-300 flex items-center justify-center"><span class="material-symbols-outlined text-slate-500 text-sm">person</span></div>
              <div class="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark bg-slate-400 flex items-center justify-center"><span class="material-symbols-outlined text-slate-600 text-sm">person</span></div>
              <div class="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark bg-primary flex items-center justify-center text-white text-xs font-bold">+99</div>
            </div>
          </div>
          <p class="text-sm text-slate-500 dark:text-slate-400 max-w-[250px] mx-auto leading-relaxed">ร่วมเป็นส่วนหนึ่งของสังคมคนรักสุขภาพ แลกเปลี่ยนประสบการณ์และเป็นแรงบันดาลใจให้กันและกัน</p>
        </section>

        <section class="px-6 mb-12 max-w-2xl mx-auto">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight text-center">ช่วยคุณได้อย่างไร?</h2>
          <ul class="space-y-4">
            <li class="flex items-center gap-4 bg-white/50 dark:bg-card-dark/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div class="w-10 h-10 rounded-full bg-white dark:bg-card-dark shadow-sm flex items-center justify-center text-primary shrink-0">
                <span class="material-symbols-outlined">insights</span>
              </div>
              <span class="text-slate-700 dark:text-slate-200 font-medium">วิเคราะห์ความเสี่ยงรายบุคคล</span>
            </li>
            <li class="flex items-center gap-4 bg-white/50 dark:bg-card-dark/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div class="w-10 h-10 rounded-full bg-white dark:bg-card-dark shadow-sm flex items-center justify-center text-primary shrink-0">
                <span class="material-symbols-outlined">trending_up</span>
              </div>
              <span class="text-slate-700 dark:text-slate-200 font-medium">ติดตามพัฒนาการรายวัน</span>
            </li>
            <li class="flex items-center gap-4 bg-white/50 dark:bg-card-dark/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div class="w-10 h-10 rounded-full bg-white dark:bg-card-dark shadow-sm flex items-center justify-center text-primary shrink-0">
                <span class="material-symbols-outlined">sports_esports</span>
              </div>
              <span class="text-slate-700 dark:text-slate-200 font-medium">สร้างแรงจูงใจด้วยเกม</span>
            </li>
          </ul>
        </section>

        <section class="px-6 pb-8 max-w-md mx-auto">
          <button 
            @click="$router.push('/start')"
            class="w-full bg-gradient-to-r from-orange-400 via-[#F05A23] to-red-500 text-white font-bold text-lg py-4 rounded-2xl shadow-[0_10px_25px_rgba(240,90,35,0.4)] hover:shadow-[0_15px_35px_rgba(240,90,35,0.5)] transition-all duration-300 active:scale-[0.98] transform"
          >
            เริ่มก้าวแรกวันนี้
          </button>
          <p class="text-center text-xs text-slate-400 mt-4">ใช้งานฟรี ไม่มีข้อผูกมัด</p>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
/**
 * Logic ของ Vue เดิมถูกรักษาไว้ทั้งหมด
 * stats: ข้อมูลสถิติสำหรับนำไปแสดงผลแบบ Loop ใน Template
 */
const stats = [
  { label: 'นักวิ่งที่เข้าร่วม', value: '10,000+' },
  { label: 'กม. ที่พิชิตแล้ว', value: '850k+' }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;900&display=swap');

/* Material Symbols Config */
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 300,
    'GRAD' 0,
    'opsz' 24;
}

.material-symbols-outlined.fill {
  font-variation-settings: 'FILL' 1;
}

/* Custom Utilities from HTML UI */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Background Gradients (Mesh BG) */
.mesh-bg-1 {
  background-color: #ffffff;
  background-image: radial-gradient(at 8% 25%, hsla(28, 100%, 74%, 0.15) 0px, transparent 50%),
    radial-gradient(at 93% 5%, hsla(28, 100%, 74%, 0.15) 0px, transparent 50%),
    radial-gradient(at 12% 95%, hsla(28, 100%, 74%, 0.15) 0px, transparent 50%),
    radial-gradient(at 90% 89%, hsla(28, 100%, 74%, 0.15) 0px, transparent 50%);
}

.dark .mesh-bg-1 {
  background-color: #221510;
  background-image: radial-gradient(at 8% 25%, hsla(28, 100%, 54%, 0.1) 0px, transparent 50%),
    radial-gradient(at 93% 5%, hsla(28, 100%, 54%, 0.1) 0px, transparent 50%),
    radial-gradient(at 12% 95%, hsla(28, 100%, 54%, 0.1) 0px, transparent 50%),
    radial-gradient(at 90% 89%, hsla(28, 100%, 54%, 0.1) 0px, transparent 50%);
}

.mesh-bg-2 {
  background-color: #fafafa;
  background-image: radial-gradient(at 85% 55%, hsla(28, 100%, 74%, 0.1) 0px, transparent 50%),
    radial-gradient(at 15% 45%, hsla(190, 100%, 74%, 0.08) 0px, transparent 50%);
}

.dark .mesh-bg-2 {
  background-color: #1a100c;
  background-image: radial-gradient(at 85% 55%, hsla(28, 100%, 54%, 0.08) 0px, transparent 50%),
    radial-gradient(at 15% 45%, hsla(190, 100%, 54%, 0.05) 0px, transparent 50%);
}

/* Glassmorphism Card */
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);
}

.dark .glass-card {
  background: rgba(24, 42, 46, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
}
</style>