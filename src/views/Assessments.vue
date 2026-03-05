<template>
  <div class="pb-24">
    <header class="p-6 bg-white sticky top-0 z-30 border-b border-slate-100 flex items-center gap-4">
      <button @click="$router.back()" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
        <ArrowLeftIcon :size="24" />
      </button>
      <h1 class="text-xl font-bold">ศูนย์รวมแบบประเมิน</h1>
    </header>

    <main class="p-6 space-y-8 md:max-w-xl md:mx-auto">
      <!-- Overall Score Card -->
      <div class="bg-gradient-to-br from-orange-400 to-primary p-8 rounded-[2.5rem] shadow-xl shadow-primary/30 text-white text-center">
        <p class="text-xs font-bold uppercase tracking-widest opacity-80 mb-4">คะแนนสุขภาพรวม</p>
        <div class="flex items-baseline justify-center gap-2 mb-4">
          <span class="text-7xl font-black italic">85</span>
          <span class="text-xl font-bold opacity-60">/ 100</span>
        </div>
        <p class="text-sm font-medium leading-relaxed opacity-90">
          คุณดูแลสุขภาพได้ดีมาก! ทำแบบประเมินสม่ำเสมอเพื่อสุขภาพที่ดีขึ้น
        </p>
      </div>
<!-- Assessment List -->
      <!-- Assessment List -->
      <div class="space-y-6">
        <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider">แบบประเมินของคุณ</h3>
        
        <div v-for="item in assessments" :key="item.title" 
          class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <div class="flex items-start gap-4">
            <div :class="`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg}`">
              <component :is="item.icon" :class="item.color" :size="24" />
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-slate-800">{{ item.title }}</h4>
              <p class="text-xs text-slate-400 mt-1">{{ item.desc }}</p>
              <div class="flex items-center gap-2 mt-3">
                <span v-if="item.done" class="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">ทำแล้ว</span>
                <span v-else class="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">ยังไม่ได้ทำสัปดาห์นี้</span>
                <span class="text-[10px] text-slate-400 font-medium" v-if="item.lastScore">ล่าสุด: {{ item.lastScore }}/100</span>
              </div>
            </div>
          </div>
          
          <button v-if="item.done" @click="$router.push(`/questionnaire/${item.id}`)" class="w-full py-3 rounded-2xl border border-slate-100 text-slate-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
            ทำอีกครั้ง <RefreshCwIcon :size="14" />
          </button>
          <button v-else @click="$router.push(`/questionnaire/${item.id}`)" class="w-full py-4 rounded-2xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
            เริ่มทำ <ArrowRightIcon :size="16" />
          </button>
        </div>
      </div>

      <!-- Footer Action -->
      <button @click="$router.push('/report')" class="w-full py-5 bg-orange-50 text-primary font-bold rounded-3xl flex items-center justify-center gap-2 border border-orange-100">
        <ActivityIcon :size="18" />
        ดูภาพรวมผลการประเมินทั้งหมด
      </button>
    </main>
  </div>
</template>

<script setup lang="ts">
import { 
  ArrowLeft as ArrowLeftIcon, 
  RefreshCw as RefreshCwIcon, 
  ArrowRight as ArrowRightIcon,
  Cigarette as CigaretteIcon,
  Wine as WineIcon,
  Moon as MoonIcon,
  Activity as ActivityIcon,
  Dumbbell as DumbbellIcon
} from 'lucide-vue-next';

const assessments = [
  { id: 'smoking', title: 'พฤติกรรมการสูบบุหรี่', desc: 'ประเมินเพื่อลดละเลิก', icon: CigaretteIcon, bg: 'bg-blue-50', color: 'text-blue-500', done: true, lastScore: 90 },
  { id: 'alcohol', title: 'การดื่มสุราและแอลกอฮอล์', desc: 'ดื่มอย่างมีสติเพื่อสุขภาพที่ดี', icon: WineIcon, bg: 'bg-orange-50', color: 'text-orange-500', done: false },
  { id: 'sleep', title: 'คุณภาพการนอนหลับ', desc: 'นอนเต็มอิ่มเพื่อวันใหม่ที่สดใส', icon: MoonIcon, bg: 'bg-indigo-50', color: 'text-indigo-500', done: true, lastScore: 75 },
  { id: 'three-os', title: 'หลัก 3 อ.', desc: 'เช็กสมดุล อาหาร ออกกำลัง อารมณ์', icon: DumbbellIcon, bg: 'bg-emerald-50', color: 'text-emerald-500', done: false },
];
</script>
