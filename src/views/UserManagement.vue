<template>
  <div class="pb-24">
    <header class="p-6 bg-white sticky top-0 z-30 border-b border-slate-100">
      <div class="flex items-center gap-4 mb-6">
        <button @click="$router.back()" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeftIcon :size="24" />
        </button>
        <h1 class="text-xl font-bold">ค้นหาและจัดการผู้ใช้งาน</h1>
      </div>
      
      <div class="relative">
        <SearchIcon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="20" />
        <input type="text" placeholder="ค้นหาชื่อ, รหัสผู้ใช้งาน..." 
          class="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all" />
      </div>
    </header>

    <main class="p-6 space-y-6 md:max-w-2xl md:mx-auto">
      <div class="flex items-center justify-between">
        <p class="text-sm font-bold text-slate-400">รวมผู้ใช้งานทั้งหมด: <span class="text-slate-800">1,240 คน</span></p>
        <button class="p-2 text-slate-400"><SlidersIcon :size="20" /></button>
      </div>

      <!-- Filter Tabs -->
      <div class="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        <button v-for="tab in tabs" :key="tab" 
          :class="`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-500 border border-slate-100'}`"
          @click="activeTab = tab">
          {{ tab }}
        </button>
      </div>

      <!-- User List -->
      <div class="space-y-3">
        <div v-for="user in users" :key="user.id" 
          class="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
          @click="$router.push('/profile')">
          <div class="relative">
            <img :src="user.avatar" class="w-14 h-14 rounded-full object-cover border-2 border-slate-50" referrerPolicy="no-referrer" />
            <div :class="`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white ${user.statusColor}`"></div>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-bold text-slate-800 truncate">{{ user.name }}</h4>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-[10px] text-slate-400 font-bold uppercase">{{ user.id }}</span>
              <span class="text-slate-200">•</span>
              <span :class="`text-[10px] font-bold px-2 py-0.5 rounded-md ${user.riskBg} ${user.riskColor}`">{{ user.risk }}</span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div :class="`w-12 h-12 rounded-full border-4 flex items-center justify-center ${user.scoreBorder}`">
              <span class="text-sm font-bold text-slate-800">{{ user.score }}</span>
            </div>
            <ChevronRightIcon class="text-slate-300" :size="20" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  ArrowLeft as ArrowLeftIcon, 
  Search as SearchIcon, 
  Sliders as SlidersIcon, 
  ChevronRight as ChevronRightIcon 
} from 'lucide-vue-next';

const tabs = ['ทั้งหมด', 'กลุ่มเสี่ยงสูง', 'แอคทีฟล่าสุด', 'สมาชิกใหม่'];
const activeTab = ref('ทั้งหมด');

const users = [
  { id: 'USER-1029', name: 'สมชาย ใจดี', score: 85, risk: 'เสี่ยงสูง', riskBg: 'bg-red-50', riskColor: 'text-red-500', statusColor: 'bg-red-500', scoreBorder: 'border-green-500', avatar: 'https://picsum.photos/seed/u1/100/100' },
  { id: 'USER-2041', name: 'วิไลวรรณ รักสงบ', score: 92, risk: 'ปกติ', riskBg: 'bg-green-50', riskColor: 'text-green-500', statusColor: 'bg-green-500', scoreBorder: 'border-green-500', avatar: 'https://picsum.photos/seed/u2/100/100' },
  { id: 'USER-0853', name: 'กิตติพงษ์ ยอดเยี่ยม', score: 74, risk: 'เฝ้าระวัง', riskBg: 'bg-orange-50', riskColor: 'text-orange-500', statusColor: 'bg-orange-500', scoreBorder: 'border-orange-400', avatar: 'https://picsum.photos/seed/u3/100/100' },
  { id: 'USER-3112', name: 'อารยา มั่นคง', score: 68, risk: 'เสี่ยงสูง', riskBg: 'bg-red-50', riskColor: 'text-red-500', statusColor: 'bg-red-500', scoreBorder: 'border-orange-400', avatar: 'https://picsum.photos/seed/u4/100/100' },
  { id: 'USER-4590', name: 'ธนดล สุขใจ', score: 88, risk: 'ปกติ', riskBg: 'bg-green-50', riskColor: 'text-green-500', statusColor: 'bg-green-500', scoreBorder: 'border-green-500', avatar: 'https://picsum.photos/seed/u5/100/100' },
];
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
