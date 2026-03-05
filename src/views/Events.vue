<template>
  <div class="pb-24">
    <!-- Header -->
    <header class="p-6 bg-white sticky top-0 z-30 border-b border-slate-100 flex justify-between items-center">
      <div class="flex items-center gap-3">
        <img src="https://picsum.photos/seed/user/100/100" class="w-10 h-10 rounded-full border-2 border-primary/20" referrerPolicy="no-referrer" />
        <h1 class="text-xl font-bold">ค้นหางานวิ่ง</h1>
      </div>
      <div class="flex items-center gap-2">
        <button @click="$router.push('/event/create')" class="p-2 bg-primary/10 text-primary rounded-full">
          <PlusIcon :size="20" />
        </button>
        <button class="p-2 bg-slate-50 rounded-full relative">
          <BellIcon :size="20" class="text-slate-600" />
          <span class="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>

    <main class="p-6 space-y-8 md:max-w-7xl md:mx-auto">
      <!-- Search -->
      <div class="relative max-w-2xl mx-auto">
        <SearchIcon class="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" :size="24" />
        <input type="text" placeholder="ค้นหางานวิ่ง สถานที่ หรือระยะทาง..." 
          class="w-full pl-16 pr-16 py-5 bg-white rounded-3xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm text-lg" />
        <button class="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
          <SlidersIcon :size="24" />
        </button>
      </div>

      <!-- Categories -->
      <div class="flex gap-3 overflow-x-auto pb-4 no-scrollbar snap-x">
        <button v-for="cat in categories" :key="cat" 
          :class="`px-8 py-3 rounded-full text-sm md:text-base font-black whitespace-nowrap transition-all snap-start ${activeCat === cat ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-105' : 'bg-white text-slate-500 border border-slate-100 hover:border-primary/30'}`"
          @click="activeCat = cat">
          {{ cat }}
        </button>
      </div>

      <!-- Event Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="event in filteredEvents" :key="event.id" 
          class="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
          @click="$router.push(`/event/${event.id}`)">
          <div class="relative aspect-[16/9]">
            <img :src="event.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <button class="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30">
              <BookmarkIcon :size="18" />
            </button>
            <div class="absolute bottom-4 left-6">
              <span class="px-3 py-1 bg-primary/20 backdrop-blur-md text-primary text-[10px] font-bold rounded-lg border border-primary/30 uppercase tracking-wider">
                {{ event.type }}
              </span>
            </div>
          </div>
          
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-bold text-slate-800">{{ event.title }}</h3>
              <div class="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                <CheckCircleIcon :size="14" class="text-primary" />
                <span>{{ event.organizer }}</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="flex items-center gap-2 text-slate-500 text-xs">
                <CalendarIcon :size="16" class="text-primary/60" />
                <span>{{ event.date }}</span>
              </div>
              <div class="flex items-center gap-2 text-slate-500 text-xs">
                <ClockIcon :size="16" class="text-primary/60" />
                <span>{{ event.time }}</span>
              </div>
              <div class="flex items-center gap-2 text-slate-500 text-xs col-span-2">
                <MapPinIcon :size="16" class="text-primary/60" />
                <span class="truncate">{{ event.location }}</span>
              </div>
            </div>

            <div class="bg-slate-50 p-4 rounded-2xl flex justify-between items-center mb-6">
              <div>
                <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">ระยะทาง</p>
                <p class="text-sm font-bold text-slate-700">{{ event.distances.join(', ') }}</p>
              </div>
              <div class="text-right">
                <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">ราคาเริ่มต้น</p>
                <p class="text-lg font-bold text-primary">{{ event.price }} ฿</p>
              </div>
            </div>

            <div class="mb-6">
              <div class="flex justify-between text-[10px] font-bold text-slate-400 mb-2">
                <span>ที่นั่งว่าง</span>
                <span>{{ event.filled }} / {{ event.total }}</span>
              </div>
              <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-primary rounded-full transition-all duration-1000" :style="{ width: (event.filled / event.total * 100) + '%' }"></div>
              </div>
            </div>

            <button class="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform">
              ลงทะเบียนตอนนี้
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  Bell as BellIcon, 
  Search as SearchIcon, 
  Sliders as SlidersIcon,
  Bookmark as BookmarkIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MapPin as MapPinIcon,
  CheckCircle as CheckCircleIcon,
  Plus as PlusIcon
} from 'lucide-vue-next';

const categories = ['ทั้งหมด', 'มาราธอน', 'ฮาล์ฟมาราธอน', 'มินิมาราธอน', 'ฟันรัน'];
const activeCat = ref('ทั้งหมด');

const events = [
  {
    id: 1,
    title: 'วิ่งมาราธอนกลางกรุง 2023',
    type: 'มินิมาราธอน',
    organizer: 'BKK Run Club',
    date: '15 ส.ค. 66',
    time: '04:00 น.',
    location: 'สวนลุมพินี, กรุงเทพมหานคร',
    distances: ['5km', '10km', '21km'],
    price: 450,
    filled: 150,
    total: 500,
    image: 'https://images.unsplash.com/photo-1530549387074-d56a99e148c6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'งานวิ่งชมสวนยามเช้า',
    type: 'ฟันรัน',
    organizer: 'Green City Run',
    date: '02 ก.ย. 66',
    time: '05:30 น.',
    location: 'สวนวชิรเบญจทัศ (สวนรถไฟ)',
    distances: ['3km', '5km'],
    price: 350,
    filled: 80,
    total: 300,
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'วิ่งท้าลมหนาว เขาใหญ่',
    type: 'ฮาล์ฟมาราธอน',
    organizer: 'Trail Masters',
    date: '10 ต.ค. 66',
    time: '03:00 น.',
    location: 'อุทยานแห่งชาติเขาใหญ่',
    distances: ['10km', '21km'],
    price: 650,
    filled: 300,
    total: 300,
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800'
  }
];

const filteredEvents = computed(() => {
  if (activeCat.value === 'ทั้งหมด') return events;
  return events.filter(e => e.type === activeCat.value);
});
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
