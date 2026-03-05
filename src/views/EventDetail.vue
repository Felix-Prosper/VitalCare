<template>
  <div class="pb-32">
    <!-- Hero Header -->
    <div class="relative h-[40vh] min-h-[300px]">
      <img src="https://images.unsplash.com/photo-1530549387074-d56a99e148c6?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30"></div>
      
      <header class="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
        <button @click="$router.back()" class="p-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30">
          <ArrowLeftIcon :size="24" />
        </button>
        <button class="p-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30">
          <Share2Icon :size="24" />
        </button>
      </header>
    </div>

    <main class="relative z-10 -mt-12 bg-slate-50 rounded-t-[3rem] p-6 space-y-8 md:max-w-3xl md:mx-auto">
      <!-- Title & Basic Info -->
      <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div class="flex justify-between items-start mb-4">
          <span class="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg uppercase tracking-wider">มินิมาราธอน</span>
          <button class="p-2 bg-slate-50 rounded-full text-slate-400"><BookmarkIcon :size="20" /></button>
        </div>
        <h1 class="text-2xl font-bold text-slate-800 mb-2">วิ่งมาราธอนกลางกรุง 2023</h1>
        <div class="flex items-center gap-2 text-xs text-slate-400 font-bold mb-8">
          <CheckCircleIcon :size="14" class="text-primary" />
          <span>จัดโดย BKK Run Club</span>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <div class="flex flex-col items-center text-center p-3 bg-slate-50 rounded-2xl">
            <CalendarIcon :size="20" class="text-primary mb-2" />
            <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">วันที่</p>
            <p class="text-xs font-bold text-slate-800">15 ส.ค. 66</p>
          </div>
          <div class="flex flex-col items-center text-center p-3 bg-slate-50 rounded-2xl">
            <ClockIcon :size="20" class="text-primary mb-2" />
            <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">เวลา</p>
            <p class="text-xs font-bold text-slate-800">04:00 - 10:00</p>
          </div>
          <div class="flex flex-col items-center text-center p-3 bg-slate-50 rounded-2xl">
            <MapPinIcon :size="20" class="text-primary mb-2" />
            <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">สถานที่</p>
            <p class="text-xs font-bold text-slate-800">สวนลุมพินี</p>
          </div>
        </div>
      </div>

      <!-- Registration Info -->
      <div class="bg-orange-50 p-6 rounded-[2rem] border border-orange-100 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm">
            <CalendarIcon :size="24" />
          </div>
          <div>
            <p class="text-[10px] text-slate-400 font-bold uppercase">ระยะเวลารับสมัคร</p>
            <p class="text-sm font-bold text-slate-700">1 มิ.ย. - 31 ก.ค. 66</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-[10px] text-slate-400 font-bold uppercase">แต้มรางวัล</p>
          <p class="text-sm font-bold text-primary">รับสูงสุด 500 แต้ม</p>
        </div>
      </div>

      <!-- Distances & Price -->
      <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div class="flex justify-between items-center mb-6">
          <div>
            <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">ระยะทางที่เปิดรับ</p>
            <p class="text-lg font-bold text-slate-800">5km, 10km, 21km</p>
          </div>
          <div class="text-right">
            <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">ราคา</p>
            <p class="text-xl font-black text-primary">450 - 1,200 ฿</p>
          </div>
        </div>
        
        <div class="space-y-2">
          <div class="flex justify-between text-[10px] font-bold text-slate-400">
            <span>ที่นั่งว่าง</span>
            <span>150 / 500</span>
          </div>
          <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full bg-primary rounded-full" style="width: 30%"></div>
          </div>
        </div>
      </div>

      <!-- Missions -->
      <section>
        <h3 class="text-lg font-bold text-slate-800 mb-4">ภารกิจสุขภาพในกิจกรรมนี้</h3>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="m in missions" :key="m.title" class="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-3">
            <div :class="`w-10 h-10 rounded-2xl flex items-center justify-center ${m.bg}`">
              <component :is="m.icon" :class="m.color" :size="20" />
            </div>
            <div>
              <h4 class="text-xs font-bold text-slate-800">{{ m.title }}</h4>
              <p class="text-[8px] text-slate-400 font-medium">{{ m.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Details -->
      <section class="space-y-4">
        <h3 class="text-lg font-bold text-slate-800">รายละเอียดกิจกรรม</h3>
        <p class="text-sm text-slate-500 leading-relaxed">
          เตรียมพร้อมสำหรับงานวิ่งสุดยิ่งใหญ่กลางใจเมือง "วิ่งมาราธอนกลางกรุง 2023" สัมผัสบรรยากาศยามเช้าที่สดชื่นของกรุงเทพมหานคร พร้อมเส้นทางวิ่งที่ผ่านแลนด์มาร์คสำคัญต่างๆ งานนี้เหมาะสำหรับนักวิ่งทุกระดับ ไม่ว่าจะเป็นนักวิ่งหน้าใหม่หรือนักวิ่งมืออาชีพ
        </p>
        <p class="text-sm text-slate-500 leading-relaxed">
          จุดเด่นของงานคือเส้นทางวิ่งที่ถูกออกแบบมาเป็นพิเศษ ปลอดภัย มีจุดบริการน้ำดื่มและเกลือแร่ทุกๆ 2 กิโลเมตร พร้อมทีมแพทย์และพยาบาลสแตนด์บายตลอดเส้นทาง นอกจากนี้ยังมีช่างภาพมืออาชีพคอยเก็บภาพความประทับใจของคุณตลอดการแข่งขัน
        </p>
      </section>

      <!-- Map Placeholder -->
      <section class="space-y-4">
        <h3 class="text-lg font-bold text-slate-800">เส้นทางวิ่ง (แผนที่)</h3>
        <div class="aspect-video bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300">
          <MapIcon :size="48" class="mb-4" />
          <div class="flex items-center gap-2 mb-1">
            <span class="text-lg font-bold text-slate-800">เร็วๆ นี้</span>
            <LockIcon :size="16" class="text-primary" />
          </div>
          <p class="text-xs font-medium">เส้นทางวิ่งจะเปิดเผยเร็วๆ นี้</p>
        </div>
      </section>
    </main>

    <!-- Bottom Action -->
    <div class="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-lg border-t border-slate-100 z-40 md:max-w-3xl md:mx-auto">
      <button class="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
        ลงทะเบียนตอนนี้ <ArrowRightIcon :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  ArrowLeft as ArrowLeftIcon, 
  Share2 as Share2Icon, 
  Bookmark as BookmarkIcon,
  CheckCircle as CheckCircleIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MapPin as MapPinIcon,
  Activity as ActivityIcon,
  Utensils as UtensilsIcon,
  Moon as MoonIcon,
  Smile as SmileIcon,
  Map as MapIcon,
  Lock as LockIcon,
  ArrowRight as ArrowRightIcon
} from 'lucide-vue-next';

const missions = [
  { title: 'ออกกำลังกาย', desc: 'เก็บกิโลเมตร', icon: ActivityIcon, bg: 'bg-blue-50', color: 'text-blue-500' },
  { title: 'อาหาร (3 อ.)', desc: 'บันทึกมื้ออาหาร', icon: UtensilsIcon, bg: 'bg-green-50', color: 'text-green-500' },
  { title: 'การนอน', desc: 'พักผ่อนให้เพียงพอ', icon: MoonIcon, bg: 'bg-indigo-50', color: 'text-indigo-500' },
  { title: 'อารมณ์', desc: 'บันทึกความรู้สึก', icon: SmileIcon, bg: 'bg-amber-50', color: 'text-amber-500' },
];
</script>
