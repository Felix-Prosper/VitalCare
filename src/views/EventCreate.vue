<template>
  <div class="pb-32">
    <header class="p-6 bg-white sticky top-0 z-30 border-b border-slate-100 flex items-center gap-4">
      <button @click="$router.back()" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
        <ArrowLeftIcon :size="24" />
      </button>
      <h1 class="text-xl font-bold">สร้างกิจกรรมวิ่งใหม่</h1>
    </header>

    <main class="p-6 space-y-8 md:max-w-xl md:mx-auto">
      <!-- Image Upload Placeholder -->
      <div class="aspect-video bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-100 transition-colors">
        <ImageIcon :size="48" class="mb-4" />
        <p class="text-sm font-bold">อัปโหลดรูปภาพหน้าปก</p>
        <p class="text-[10px] font-medium mt-1">ขนาดแนะนำ 1920x1080 px</p>
      </div>

      <!-- Form -->
      <div class="space-y-6">
        <div class="space-y-2">
          <label class="text-sm font-bold text-slate-800">ชื่อกิจกรรม</label>
          <input type="text" placeholder="ระบุชื่อกิจกรรมของคุณ" class="w-full px-6 py-4 bg-white rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-bold text-slate-800">วันที่จัดงาน</label>
            <div class="relative">
              <CalendarIcon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="20" />
              <input type="date" class="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-bold text-slate-800">เวลาปล่อยตัว</label>
            <div class="relative">
              <ClockIcon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="20" />
              <input type="time" class="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-bold text-slate-800">สถานที่จัดงาน</label>
          <div class="relative">
            <MapPinIcon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="20" />
            <input type="text" placeholder="ระบุสถานที่จัดงาน" class="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-bold text-slate-800">ประเภทกิจกรรม</label>
          <select class="w-full px-6 py-4 bg-white rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none">
            <option>มาราธอน</option>
            <option>ฮาล์ฟมาราธอน</option>
            <option>มินิมาราธอน</option>
            <option>ฟันรัน</option>
          </select>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-bold text-slate-800">รายละเอียดกิจกรรม</label>
          <textarea rows="4" placeholder="ระบุรายละเอียดกิจกรรม กฎกติกา และสิ่งที่จะได้รับ" class="w-full px-6 py-4 bg-white rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"></textarea>
        </div>
      </div>
    </main>

    <div class="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-lg border-t border-slate-100 z-40 md:max-w-xl md:mx-auto">
      <button class="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
        สร้างกิจกรรม <CheckIcon :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  ArrowLeft as ArrowLeftIcon, 
  Image as ImageIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MapPin as MapPinIcon,
  Check as CheckIcon
} from 'lucide-vue-next';
</script>
