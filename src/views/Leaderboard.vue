<template>
  <div class="pb-48">
    <!-- Header -->
    <header class="p-6 bg-white sticky top-0 z-30 border-b border-slate-100">
      <div class="flex items-center justify-between mb-6">
        <button @click="$router.back()" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeftIcon :size="24" />
        </button>
        <h1 class="text-xl font-bold">Team Leaderboard</h1>
        <button @click="$router.push('/team/manage')" class="p-2 bg-primary/10 text-primary rounded-full">
          <PlusIcon :size="24" />
        </button>
      </div>
      
      <div class="flex p-1 bg-slate-100 rounded-2xl max-w-xs mx-auto mb-4">
        <button 
          @click="activeTab = 'individual'"
          :class="`flex-1 py-2.5 text-sm md:text-base font-black rounded-xl transition-all ${activeTab === 'individual' ? 'bg-white text-primary shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`">
          ประเภทเดี่ยว
        </button>
        <button 
          @click="activeTab = 'team'"
          :class="`flex-1 py-2.5 text-sm md:text-base font-black rounded-xl transition-all ${activeTab === 'team' ? 'bg-white text-primary shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`">
          ประเภททีม
        </button>
      </div>
    </header>

    <main class="p-6 space-y-16 md:max-w-4xl md:mx-auto">
      <!-- Podium -->
      <div class="flex items-end justify-center gap-4 md:gap-12 pt-12">
        <!-- 2nd Place -->
        <div class="flex flex-col items-center flex-1 animate-in slide-in-from-bottom-4 duration-700 delay-100">
          <div class="relative mb-6">
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-300 text-white text-xs font-black px-3 py-1 rounded-full z-10 shadow-lg">2</div>
            <div class="w-24 h-24 md:w-32 md:h-32 rounded-full p-1.5 bg-gradient-to-tr from-slate-300 to-slate-100 shadow-2xl">
              <img :src="podiumData[1].image" class="w-full h-full rounded-full border-4 border-white object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
          <p class="text-base md:text-xl font-black text-slate-800 tracking-tight">{{ podiumData[1].name }}</p>
          <p class="text-[10px] md:text-xs text-slate-400 font-bold uppercase mb-3 tracking-widest">{{ activeTab === 'team' ? 'ทีมยอดเยี่ยม' : 'นักวิ่งดาวรุ่ง' }}</p>
          <div class="bg-white px-4 py-2 rounded-full shadow-md border border-slate-100 flex items-center gap-2">
            <TrophyIcon :size="14" class="text-slate-300" />
            <span class="text-sm md:text-base font-black text-slate-700">{{ podiumData[1].score }} <span class="text-xs font-normal text-slate-400">km</span></span>
          </div>
        </div>

        <!-- 1st Place -->
        <div class="flex flex-col items-center flex-[1.2] animate-in slide-in-from-bottom-8 duration-700">
          <div class="relative mb-8">
            <div class="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-400 text-white text-sm font-black px-4 py-1.5 rounded-full z-10 shadow-xl shadow-amber-400/40">1</div>
            <div class="w-32 h-32 md:w-44 md:h-44 rounded-full p-2 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-2xl shadow-amber-400/20">
              <img :src="podiumData[0].image" class="w-full h-full rounded-full border-4 border-white object-cover" referrerPolicy="no-referrer" />
              <div class="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-xl">
                <StarIcon :size="20" class="text-amber-400 fill-amber-400" />
              </div>
            </div>
          </div>
          <p class="text-xl md:text-3xl font-black text-slate-800 tracking-tighter">{{ podiumData[0].name }}</p>
          <p class="text-[10px] md:text-xs text-primary font-black uppercase bg-primary/10 px-4 py-1 rounded-full mb-4 tracking-widest">{{ activeTab === 'team' ? 'ทีมระดับตำนาน' : 'นักวิ่งระดับโลก' }}</p>
          <div class="bg-white px-6 py-2.5 rounded-full shadow-xl border border-amber-100 flex items-center gap-2">
            <TrophyIcon :size="18" class="text-amber-400" />
            <span class="text-lg md:text-2xl font-black text-slate-800">{{ podiumData[0].score }} <span class="text-sm font-normal text-slate-400">km</span></span>
          </div>
        </div>

        <!-- 3rd Place -->
        <div class="flex flex-col items-center flex-1 animate-in slide-in-from-bottom-4 duration-700 delay-200">
          <div class="relative mb-6">
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-300 text-white text-xs font-black px-3 py-1 rounded-full z-10 shadow-lg">3</div>
            <div class="w-20 h-20 md:w-28 md:h-28 rounded-full p-1.5 bg-gradient-to-tr from-orange-300 to-orange-100 shadow-2xl">
              <img :src="podiumData[2].image" class="w-full h-full rounded-full border-4 border-white object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
          <p class="text-base md:text-xl font-black text-slate-800 tracking-tight">{{ podiumData[2].name }}</p>
          <p class="text-[10px] md:text-xs text-slate-400 font-bold uppercase mb-3 tracking-widest">{{ activeTab === 'team' ? 'ผู้ท้าชิง' : 'จอมพลัง' }}</p>
          <div class="bg-white px-4 py-2 rounded-full shadow-md border border-slate-100 flex items-center gap-2">
            <TrophyIcon :size="14" class="text-orange-300" />
            <span class="text-sm md:text-base font-black text-slate-700">{{ podiumData[2].score }} <span class="text-xs font-normal text-slate-400">km</span></span>
          </div>
        </div>
      </div>

      <!-- List -->
      <div class="space-y-4 md:max-w-3xl md:mx-auto">
        <div v-for="item in listData" :key="item.rank" 
          class="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
          <span class="w-8 text-center text-lg font-black text-slate-300 italic">{{ item.rank }}</span>
          <img :src="item.image" class="w-16 h-16 rounded-full border-4 border-slate-50 object-cover shadow-sm" referrerPolicy="no-referrer" />
          <div class="flex-1">
            <h4 class="text-lg font-black text-slate-800 tracking-tight">{{ item.name }}</h4>
            <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{{ activeTab === 'team' ? `${item.members} สมาชิก` : 'นักวิ่งอิสระ' }}</p>
          </div>
          <div class="text-right">
            <div class="flex items-center gap-1 justify-end">
              <span class="text-xl font-black text-slate-700 tracking-tighter">{{ item.score }}</span>
              <span class="text-xs font-bold text-slate-400 uppercase">km</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Sticky User Rank -->
    <div class="fixed bottom-24 left-4 right-4 z-40 md:max-w-2xl md:mx-auto">
      <div class="bg-white/90 backdrop-blur-xl p-4 rounded-[2rem] flex items-center gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border border-slate-100 animate-in slide-in-from-bottom-5 duration-500">
        <div class="flex flex-col items-center px-4 border-r border-slate-100">
          <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">อันดับ</p>
          <p class="text-2xl font-black text-primary italic leading-none">42</p>
        </div>
        
        <div class="relative">
          <img src="https://picsum.photos/seed/myteam/100/100" class="w-12 h-12 rounded-full border-2 border-primary object-cover shadow-md" referrerPolicy="no-referrer" />
          <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white border-2 border-white">
            <StarIcon :size="10" class="fill-white" />
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-black text-slate-800 tracking-tight truncate">{{ activeTab === 'team' ? 'ทีมหอยทาก' : 'ณัฐสิทธิ์ ลาสะแน' }}</h4>
          <div class="flex items-center gap-2 mt-0.5">
            <span class="text-[9px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase tracking-widest">
              {{ activeTab === 'team' ? '3/6 สมาชิก' : 'Level 42' }}
            </span>
          </div>
        </div>

        <div class="text-right">
          <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">ระยะทาง</p>
          <div class="flex items-baseline gap-0.5 justify-end">
            <span class="text-xl font-black text-slate-800 tracking-tighter leading-none">4,520</span>
            <span class="text-[10px] font-bold text-slate-400 uppercase">km</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  ArrowLeft as ArrowLeftIcon, 
  Trophy as TrophyIcon, 
  Star as StarIcon,
  Plus as PlusIcon
} from 'lucide-vue-next';

const activeTab = ref('team');

const teamPodium = [
  { name: 'รวมพลังนักวิ่ง', score: '15,020', image: 'https://picsum.photos/seed/team1/200/200' },
  { name: 'เสือหมอบ', score: '12,450', image: 'https://picsum.photos/seed/team2/200/200' },
  { name: 'วิ่งลืมตาย', score: '11,800', image: 'https://picsum.photos/seed/team3/200/200' },
];

const individualPodium = [
  { name: 'สมชาย สายสปีด', score: '2,450', image: 'https://picsum.photos/seed/p1/200/200' },
  { name: 'วิภาวดี วิ่งไว', score: '2,120', image: 'https://picsum.photos/seed/p2/200/200' },
  { name: 'มานะ มาราธอน', score: '1,980', image: 'https://picsum.photos/seed/p3/200/200' },
];

const teamList = [
  { rank: 4, name: 'เพื่อนนักวิ่ง', members: '6/6', score: '9,850', image: 'https://picsum.photos/seed/t4/100/100' },
  { rank: 5, name: 'แก๊งค์ปอดเหล็ก', members: '5/6', score: '9,200', image: 'https://picsum.photos/seed/t5/100/100' },
  { rank: 6, name: 'สู้โว้ย', members: '6/6', score: '8,500', image: 'https://picsum.photos/seed/t6/100/100' },
  { rank: 7, name: 'นักวิ่งสายชิลล์', members: '4/6', score: '7,800', image: 'https://picsum.photos/seed/t7/100/100' },
];

const individualList = [
  { rank: 4, name: 'กิตติพงษ์ เก่งกาจ', score: '1,750', image: 'https://picsum.photos/seed/p4/100/100' },
  { rank: 5, name: 'ธนพล ทนทาน', score: '1,620', image: 'https://picsum.photos/seed/p5/100/100' },
  { rank: 6, name: 'รุ่งโรจน์ รวดเร็ว', score: '1,500', image: 'https://picsum.photos/seed/p6/100/100' },
  { rank: 7, name: 'สิริพร สู้ไม่ถอย', score: '1,420', image: 'https://picsum.photos/seed/p7/100/100' },
];

const podiumData = computed(() => activeTab.value === 'team' ? teamPodium : individualPodium);
const listData = computed(() => activeTab.value === 'team' ? teamList : individualList);
</script>

