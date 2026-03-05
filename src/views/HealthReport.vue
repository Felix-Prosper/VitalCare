<template>
  <div class="pb-24">
    <header class="p-6 bg-white sticky top-0 z-30 border-b border-slate-100 flex items-center gap-4">
      <button @click="$router.back()" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
        <ArrowLeftIcon :size="24" />
      </button>
      <h1 class="text-xl font-bold">รายงานสุขภาพเชิงลึก</h1>
    </header>

    <main class="p-6 space-y-8 md:max-w-2xl md:mx-auto">
      <!-- Radar Chart Placeholder -->
      <div class="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center">
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">HEALTH BALANCE</p>
        <h2 class="text-xl font-bold text-slate-800 mb-8">ความสมดุลสุขภาพ 4 ด้าน</h2>
        
        <div class="relative w-64 h-64 flex items-center justify-center">
          <!-- Simple SVG Radar Chart -->
          <svg viewBox="0 0 100 100" class="w-full h-full overflow-visible">
            <!-- Background Rings -->
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" stroke-width="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#f1f5f9" stroke-width="0.5" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="#f1f5f9" stroke-width="0.5" />
            <circle cx="50" cy="50" r="10" fill="none" stroke="#f1f5f9" stroke-width="0.5" />
            
            <!-- Axes -->
            <line x1="50" y1="10" x2="50" y2="90" stroke="#f1f5f9" stroke-width="0.5" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="#f1f5f9" stroke-width="0.5" />
            
            <!-- Data Shape -->
            <polygon points="50,15 85,50 50,70 20,50" fill="rgba(240, 90, 35, 0.2)" stroke="#F05A23" stroke-width="1" />
            
            <!-- Points -->
            <circle cx="50" cy="15" r="2" fill="#F05A23" />
            <circle cx="85" cy="50" r="2" fill="#F05A23" />
            <circle cx="50" cy="70" r="2" fill="#F05A23" />
            <circle cx="20" cy="50" r="2" fill="#F05A23" />
          </svg>
          
          <!-- Labels -->
          <div class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">บุหรี่ (90)</div>
          <div class="absolute top-1/2 -right-12 -translate-y-1/2 text-[10px] font-bold text-slate-400">สุรา (85)</div>
          <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">นอน (50)</div>
          <div class="absolute top-1/2 -left-12 -translate-y-1/2 text-[10px] font-bold text-slate-400">3 อ. (70)</div>
        </div>
      </div>

      <!-- Insights -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-green-50 p-6 rounded-3xl border border-green-100">
          <div class="flex items-center gap-2 mb-3">
            <CheckCircleIcon :size="16" class="text-green-500" />
            <h4 class="text-xs font-bold text-green-600">จุดแข็ง</h4>
          </div>
          <p class="text-[10px] text-green-700 leading-relaxed">คุณจัดการพฤติกรรมการสูบบุหรี่และการดื่มสุราได้ยอดเยี่ยม</p>
        </div>
        <div class="bg-red-50 p-6 rounded-3xl border border-red-100">
          <div class="flex items-center gap-2 mb-3">
            <AlertCircleIcon :size="16" class="text-red-500" />
            <h4 class="text-xs font-bold text-red-600">ควรปรับปรุง</h4>
          </div>
          <p class="text-[10px] text-red-700 leading-relaxed">คุณภาพการนอนส่งผลต่อความสมดุลด้าน 3 อ.</p>
        </div>
      </div>

      <!-- Detailed Metrics -->
      <section class="space-y-6">
        <h3 class="text-lg font-bold text-slate-800">รายละเอียดเชิงลึก</h3>
        
        <div v-for="metric in metrics" :key="metric.label" class="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
          <div class="flex justify-between items-start">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                <component :is="metric.icon" :size="24" />
              </div>
              <div>
                <h4 class="font-bold text-slate-800">{{ metric.label }}</h4>
                <span :class="`text-[10px] font-bold px-2 py-0.5 rounded-md ${metric.statusBg} ${metric.statusColor}`">{{ metric.status }}</span>
              </div>
            </div>
            <div class="text-right">
              <span class="text-3xl font-black italic text-slate-800">{{ metric.score }}</span>
              <span class="text-xs font-bold text-slate-300"> / 100</span>
            </div>
          </div>

          <div class="bg-slate-50 p-4 rounded-2xl flex gap-3 items-start">
            <SparklesIcon :size="16" class="text-orange-400 shrink-0 mt-0.5" />
            <p class="text-[10px] text-slate-500 leading-relaxed">
              <span class="font-bold text-slate-700">คำแนะนำส่วนตัว:</span> {{ metric.advice }}
            </p>
          </div>

          <div class="pt-4 border-t border-slate-50">
            <div class="flex justify-between items-center mb-2">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">แนวโน้ม 30 วัน</span>
              <div class="h-4 w-24 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-primary/20 rounded-full" :style="{ width: metric.trend + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Share Button -->
      <button class="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-2">
        <UploadIcon :size="20" />
        แชร์รายงานสุขภาพ
      </button>
      <p class="text-center text-[10px] text-slate-400">ข้อมูลของคุณถูกเก็บรักษาเป็นความลับ</p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { 
  ArrowLeft as ArrowLeftIcon, 
  CheckCircle as CheckCircleIcon, 
  AlertCircle as AlertCircleIcon,
  Cigarette as CigaretteIcon,
  Wine as WineIcon,
  Moon as MoonIcon,
  Sparkles as SparklesIcon,
  Upload as UploadIcon
} from 'lucide-vue-next';

const metrics = [
  { label: 'พฤติกรรมการสูบบุหรี่', score: 90, status: 'ปกติ', statusBg: 'bg-green-50', statusColor: 'text-green-500', icon: CigaretteIcon, advice: 'ยอดเยี่ยมมาก! ปอดของคุณกำลังแข็งแรง รักษาระดับนี้ไว้เพื่อลดความเสี่ยงระยะยาว', trend: 80 },
  { label: 'การดื่มสุรา', score: 85, status: 'ปกติ', statusBg: 'bg-green-50', statusColor: 'text-green-500', icon: WineIcon, advice: 'คุณดื่มได้อย่างมีสติและควบคุมปริมาณได้ดีเยี่ยม ตับของคุณจะขอบคุณสำหรับสิ่งนี้', trend: 60 },
  { label: 'การนอนหลับ', score: 50, status: 'ควรระวัง', statusBg: 'bg-red-50', statusColor: 'text-red-500', icon: MoonIcon, advice: 'ควรเพิ่มเวลานอนให้ได้ 7-8 ชม. งดใช้หน้าจอก่อนนอน 1 ชม. เพื่อคุณภาพที่สูงขึ้น', trend: 40 },
];
</script>
