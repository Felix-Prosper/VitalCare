<template>
  <div class="pb-32">
    <header class="p-6 bg-white sticky top-0 z-30 border-b border-slate-100 flex items-center justify-between">
      <button @click="$router.back()" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
        <ArrowLeftIcon :size="24" />
      </button>
      <h1 class="text-xl font-bold">เข้าร่วมหรือสร้างทีม</h1>
      <div class="w-10"></div>
    </header>

    <main class="p-6 space-y-8 md:max-w-xl md:mx-auto">
      <!-- Tabs -->
      <div class="flex p-1 bg-slate-100 rounded-2xl">
        <button @click="mode = 'join'" :class="`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${mode === 'join' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-400'}`">เข้าร่วมทีม</button>
        <button @click="mode = 'create'" :class="`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${mode === 'create' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-400'}`">สร้างทีม</button>
      </div>

      <div v-if="mode === 'join'" class="space-y-8 animate-in fade-in duration-500">
        <div class="space-y-4">
          <label class="text-sm font-bold text-slate-800">รหัสทีม</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">#</span>
            <input type="text" placeholder="กรอกรหัสทีม 6 หลัก" class="w-full pl-10 pr-4 py-4 bg-white rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <label class="text-sm font-bold text-slate-800">รหัสผ่านทีม</label>
            <span class="text-[10px] text-slate-400 font-bold uppercase">(เฉพาะทีมส่วนตัว)</span>
          </div>
          <div class="relative">
            <LockIcon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="20" />
            <input type="password" placeholder="กรอกรหัสผ่าน (ถ้ามี)" class="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
        </div>

        <div class="bg-blue-50 p-5 rounded-3xl border border-blue-100 flex gap-4">
          <InfoIcon :size="20" class="text-blue-500 shrink-0 mt-0.5" />
          <p class="text-xs text-blue-700 leading-relaxed">คุณสามารถขอรหัสทีมได้จากหัวหน้าทีม หรือเพื่อนที่อยู่ในทีมที่คุณต้องการเข้าร่วม</p>
        </div>

        <hr class="border-slate-100" />

        <div class="space-y-4">
          <h3 class="font-bold text-slate-800">ทีมที่กำลังเปิดรับสมัคร</h3>
          <div v-for="team in openTeams" :key="team.id" class="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <img :src="team.logo" class="w-12 h-12 rounded-full object-cover border-2 border-slate-50" referrerPolicy="no-referrer" />
              <div>
                <h4 class="text-sm font-bold text-slate-800 flex items-center gap-1">
                  {{ team.name }}
                  <LockIcon v-if="team.private" :size="12" class="text-slate-300" />
                </h4>
                <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">#{{ team.id }} • {{ team.members }}/6 สมาชิก</p>
              </div>
            </div>
            <button class="px-5 py-2 bg-primary text-white text-[10px] font-bold rounded-xl shadow-lg shadow-primary/20">เข้าร่วม</button>
          </div>
        </div>
      </div>

      <div v-else class="space-y-8 animate-in fade-in duration-500">
        <div class="flex flex-col items-center gap-4">
          <div class="w-24 h-24 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 cursor-pointer hover:bg-slate-100 transition-colors">
            <CameraIcon :size="32" class="mb-1" />
            <span class="text-[10px] font-bold uppercase">รูปโลโก้ทีม</span>
          </div>
        </div>

        <div class="space-y-4">
          <label class="text-sm font-bold text-slate-800">ชื่อทีม</label>
          <input type="text" placeholder="กรอกชื่อทีม" class="w-full px-6 py-4 bg-white rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
        </div>

        <div class="space-y-4">
          <label class="text-sm font-bold text-slate-800">ประเภททีม</label>
          <div class="flex p-1 bg-slate-100 rounded-2xl">
            <button class="flex-1 py-3 text-sm font-bold text-slate-400 rounded-xl transition-all">สาธารณะ</button>
            <button class="flex-1 py-3 text-sm font-bold bg-white text-slate-800 shadow-sm border border-slate-200 rounded-xl">ส่วนตัว</button>
          </div>
        </div>

        <hr class="border-slate-100" />

        <div class="space-y-4">
          <div class="flex justify-between items-end">
            <div>
              <h3 class="font-bold text-slate-800">สมาชิกในทีม</h3>
              <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">สมาชิกไม่เกิน 6 คน (รวมคุณ)</p>
            </div>
            <span class="text-[10px] font-bold text-primary">เลือกแล้ว 0/5 คน</span>
          </div>
          
          <div class="relative">
            <SearchIcon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
            <input type="text" placeholder="ค้นหาเพื่อนด้วยชื่อ หรือ ID" class="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-full border-none text-sm focus:ring-2 focus:ring-primary/20 transition-all" />
          </div>

          <div class="space-y-3">
            <div v-for="friend in friends" :key="friend.name" class="bg-white p-3 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img :src="friend.avatar" class="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                <span class="text-sm font-bold text-slate-700">{{ friend.name }}</span>
              </div>
              <button class="px-4 py-1.5 border border-primary text-primary text-[10px] font-bold rounded-full hover:bg-primary hover:text-white transition-all">เชิญ</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom Action -->
    <div class="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-lg border-t border-slate-100 z-40 md:max-w-xl md:mx-auto">
      <button class="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
        {{ mode === 'join' ? 'เข้าร่วมทีมเลย' : 'ยืนยันการสร้างทีม' }} 
        <ArrowRightIcon v-if="mode === 'join'" :size="20" />
        <CheckIcon v-else :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  ArrowLeft as ArrowLeftIcon, 
  Lock as LockIcon, 
  Info as InfoIcon, 
  Search as SearchIcon, 
  Camera as CameraIcon,
  ArrowRight as ArrowRightIcon,
  Check as CheckIcon
} from 'lucide-vue-next';

const mode = ref('join');

const openTeams = [
  { id: '123456', name: 'City Runners', members: 2, logo: 'https://picsum.photos/seed/t1/100/100', private: false },
  { id: '987654', name: 'Weekend Joggers', members: 4, logo: 'https://picsum.photos/seed/t2/100/100', private: true },
];

const friends = [
  { name: 'สมชาย ใจดี', avatar: 'https://picsum.photos/seed/f1/100/100' },
  { name: 'มานะ รักเรียน', avatar: 'https://picsum.photos/seed/f2/100/100' },
  { name: 'วิชัย ขยัน', avatar: 'https://picsum.photos/seed/f3/100/100' },
];
</script>
