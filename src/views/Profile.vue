<template>
  <div class="pb-24">
    <!-- Header -->
    <header class="p-6 flex items-center gap-4 bg-white sticky top-0 z-30 border-b border-slate-100">
      <button @click="$router.back()" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
        <ArrowLeftIcon :size="24" />
      </button>
      <h1 class="text-xl font-bold">โปรไฟล์สุขภาพ</h1>
    </header>

    <main class="p-6 space-y-6 md:max-w-2xl md:mx-auto">
      <!-- User Card -->
      <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
        <div class="relative">
          <img src="https://picsum.photos/seed/user/200/200" class="w-20 h-20 rounded-full object-cover border-4 border-slate-50" referrerPolicy="no-referrer" />
          <div class="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
        </div>
        <div class="flex-1">
          <h2 class="text-xl font-bold text-slate-800">ณัฐสิทธิ์ ลาสะแน</h2>
          <p class="text-xs text-slate-400 font-medium">B6602840</p>
        </div>
        <div class="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
          <span class="text-xl font-bold text-slate-800">85</span>
        </div>
      </div>

      <!-- Health Trends -->
      <section>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider">แนวโน้มสุขภาพ (7 วันล่าสุด)</h3>
          <button @click="$router.push('/report')" class="text-[10px] font-bold text-primary flex items-center gap-1">
            ดูรายงานเชิงลึก <ChevronRightIcon :size="12" />
          </button>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <div class="flex justify-between items-center mb-4">
              <span class="text-xs font-bold text-slate-400">คะแนนรวม</span>
              <span class="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">+2</span>
            </div>
            <div class="flex items-end gap-1 h-16">
              <div v-for="(h, i) in [20, 35, 45, 55, 65, 80, 95]" :key="i" 
                :class="`flex-1 rounded-t-sm bg-green-500`" :style="{ height: h + '%' }"></div>
            </div>
          </div>
          <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <div class="flex justify-between items-center mb-4">
              <span class="text-xs font-bold text-slate-400">คะแนน 3 อ.</span>
              <span class="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">คงที่</span>
            </div>
            <div class="flex items-end gap-1 h-16">
              <div v-for="(h, i) in [40, 50, 45, 60, 55, 65, 60]" :key="i" 
                :class="`flex-1 rounded-t-sm bg-orange-400`" :style="{ height: h + '%' }"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Habit Cards -->
      <section>
        <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">พฤติกรรมสุขภาพ</h3>
        <div class="grid grid-cols-3 gap-3">
          <div v-for="habit in habits" :key="habit.label" 
            class="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center cursor-pointer hover:bg-slate-50 transition-colors"
            @click="$router.push('/assessments')">
            <div :class="`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${habit.bg}`">
              <component :is="habit.icon" :class="habit.color" :size="20" />
            </div>
            <span class="text-xs font-bold text-slate-800 mb-2">{{ habit.label }}</span>
            <span :class="`text-[10px] font-bold px-3 py-1 rounded-full ${habit.statusBg} ${habit.statusColor}`">
              {{ habit.status }}
            </span>
          </div>
        </div>
      </section>

      <!-- 3 O's Detailed -->
      <section class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        <div class="flex items-center gap-2 mb-2">
          <HeartIcon class="text-primary fill-primary" :size="20" />
          <h3 class="font-bold text-slate-800">3 อ. (อาหาร, ออกกำลัง, อารมณ์)</h3>
        </div>
        <div v-for="item in threeOsStatus" :key="item.label" class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <component :is="item.icon" class="text-slate-400" :size="18" />
            <span class="text-sm font-medium text-slate-600">{{ item.label }}</span>
          </div>
          <span :class="`text-[10px] font-bold px-3 py-1 rounded-full ${item.bg} ${item.color}`">
            {{ item.status }}
          </span>
        </div>
      </section>

      <!-- Stats Summary -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
          <p class="text-2xl font-bold text-primary">120.5</p>
          <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">กิโลเมตรรวม</p>
        </div>
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
          <p class="text-2xl font-bold text-slate-800">15</p>
          <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">กิจกรรม</p>
        </div>
      </div>

      <!-- Risk Alert -->
      <div class="bg-red-50 p-6 rounded-3xl border border-red-100 flex gap-4">
        <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0">
          <AlertTriangleIcon :size="20" />
        </div>
        <div>
          <h4 class="font-bold text-red-600 text-sm">กลุ่มเสี่ยง (High Risk)</h4>
          <p class="text-[10px] text-red-400 mt-1 leading-relaxed">
            พบค่าสถิติบางประการที่ควรได้รับคำแนะนำจากแพทย์ กรุณาตรวจสอบข้อมูลสุขภาพโดยละเอียด
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="space-y-3">
        <button class="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20">
          ดูประวัติสุขภาพละเอียด
        </button>
        <button class="w-full bg-white text-slate-600 font-bold py-4 rounded-2xl border border-slate-200">
          แก้ไขข้อมูล
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
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

const habits = [
  { label: 'บุหรี่', icon: CigaretteIcon, bg: 'bg-slate-50', color: 'text-slate-400', status: 'เสี่ยงต่ำ', statusBg: 'bg-green-50', statusColor: 'text-green-500' },
  { label: 'สุรา', icon: WineIcon, bg: 'bg-slate-50', color: 'text-slate-400', status: 'เสี่ยงต่ำ', statusBg: 'bg-green-50', statusColor: 'text-green-500' },
  { label: 'การนอน', icon: MoonIcon, bg: 'bg-slate-50', color: 'text-slate-400', status: '6.5 ชม.', statusBg: 'bg-blue-50', statusColor: 'text-blue-500' },
];

const threeOsStatus = [
  { label: 'อาหาร', icon: UtensilsIcon, status: 'ดี', bg: 'bg-green-50', color: 'text-green-500' },
  { label: 'ออกกำลังกาย', icon: ActivityIcon, status: 'ปานกลาง', bg: 'bg-amber-50', color: 'text-amber-500' },
  { label: 'อารมณ์', icon: SmileIcon, status: 'ดีมาก', bg: 'bg-green-50', color: 'text-green-500' },
];
</script>
