<template>
  <div class="pb-24">
    <!-- Header -->
    <header class="p-6 bg-white sticky top-0 z-30 border-b border-slate-100 flex justify-between items-center">
      <div class="flex items-center gap-3">
        <img src="https://picsum.photos/seed/user/100/100" class="w-10 h-10 rounded-full border-2 border-primary/20" referrerPolicy="no-referrer" />
        <div>
          <h1 class="text-lg font-bold leading-none">ภารกิจวันนี้ของคุณ</h1>
          <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Daily Goals</p>
        </div>
      </div>
      <button class="p-2 bg-slate-50 rounded-full relative">
        <BellIcon :size="20" class="text-slate-600" />
        <span class="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
      </button>
    </header>

    <main class="p-6 space-y-8 md:max-w-xl md:mx-auto">
      <!-- Progress Card -->
      <div class="bg-primary p-8 rounded-[2.5rem] shadow-xl shadow-primary/30 text-white relative overflow-hidden">
        <div class="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div class="relative z-10">
          <div class="flex justify-between items-start mb-8">
            <div>
              <span class="text-5xl font-black italic">40<span class="text-2xl font-bold not-italic">%</span></span>
              <p class="text-xs font-bold opacity-80 mt-1 uppercase tracking-widest">ความคืบหน้ารวม</p>
            </div>
            <div class="text-right">
              <p class="text-[10px] font-bold opacity-60 uppercase tracking-widest mb-1">แต้มที่จะได้รับ</p>
              <span class="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl font-bold text-sm">+250 PTS</span>
            </div>
          </div>
          
          <div class="space-y-2">
            <div class="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-80">
              <span>สำเร็จแล้ว 2 จาก 5</span>
              <span>เป้าหมายวันนี้</span>
            </div>
            <div class="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div class="h-full bg-white rounded-full transition-all duration-1000" style="width: 40%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Task List -->
      <div class="space-y-4">
        <div v-for="task in tasks" :key="task.id" 
          class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group">
          <div class="flex items-center gap-4">
            <div :class="`w-14 h-14 rounded-2xl flex items-center justify-center ${task.bg}`">
              <component :is="task.icon" :class="task.color" :size="24" />
            </div>
            <div>
              <h4 class="text-sm font-bold text-slate-800">{{ task.title }}</h4>
              <p class="text-[10px] font-bold text-primary mt-1">+{{ task.points }} แต้ม</p>
            </div>
          </div>
          
          <div v-if="task.done" class="w-12 h-12 rounded-2xl bg-green-50 flex flex-col items-center justify-center text-green-500">
            <CheckIcon :size="20" />
            <span class="text-[8px] font-bold uppercase">สำเร็จ</span>
          </div>
          <button v-else @click="openSubmitModal(task)" class="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white text-[10px] font-bold rounded-2xl shadow-lg shadow-pink-500/20 active:scale-95 transition-transform">
            ส่งหลักฐาน
          </button>
        </div>
      </div>

      <!-- Summary Button -->
      <button class="w-full bg-slate-100 text-slate-400 font-bold py-5 rounded-3xl flex items-center justify-center gap-2 cursor-not-allowed">
        สรุปผลและรับรางวัล
        <ChevronRightIcon :size="18" />
      </button>
    </main>

    <!-- Submission Modal -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <div class="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
          <div class="p-8">
            <div class="flex justify-between items-center mb-8">
              <div>
                <h3 class="text-xl font-black text-slate-800 tracking-tight">ส่งหลักฐานภารกิจ</h3>
                <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{{ selectedTask?.title }}</p>
              </div>
              <button @click="showModal = false" class="p-2 bg-slate-50 text-slate-400 rounded-full hover:bg-slate-100 transition-colors">
                <XIcon :size="20" />
              </button>
            </div>

            <!-- Upload Area -->
            <div @click="triggerFileUpload" class="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-100 hover:border-primary/30 transition-all group mb-8 overflow-hidden relative">
              <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" accept="image/*" />
              
              <template v-if="!previewImage">
                <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all shadow-sm">
                  <CameraIcon :size="24" />
                </div>
                <div class="text-center">
                  <p class="text-sm font-bold text-slate-600">คลิกเพื่อเลือกรูปภาพ</p>
                  <p class="text-[10px] text-slate-400 font-medium">รองรับ JPG, PNG (สูงสุด 5MB)</p>
                </div>
              </template>
              <template v-else>
                <img :src="previewImage" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p class="text-white text-xs font-bold">เปลี่ยนรูปภาพ</p>
                </div>
              </template>
            </div>

            <!-- Submit Button -->
            <button 
              @click="submitTask"
              :disabled="!previewImage || isSubmitting"
              :class="`w-full py-5 rounded-3xl font-black text-white shadow-xl transition-all flex items-center justify-center gap-2 ${previewImage && !isSubmitting ? 'bg-primary shadow-primary/30 active:scale-95' : 'bg-slate-200 cursor-not-allowed shadow-none'}`">
              <span v-if="!isSubmitting">ยืนยันการส่งภารกิจ</span>
              <span v-else class="flex items-center gap-2">
                <Loader2Icon class="animate-spin" :size="20" />
                กำลังส่ง...
              </span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Success Toast -->
    <transition name="fade">
      <div v-if="showSuccess" class="fixed top-10 left-1/2 -translate-x-1/2 z-[110] bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
        <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
          <CheckIcon :size="14" />
        </div>
        <span class="text-sm font-bold">ส่งภารกิจสำเร็จ! +50 แต้ม</span>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  Bell as BellIcon, 
  Activity as ActivityIcon, 
  Utensils as UtensilsIcon, 
  Smile as SmileIcon, 
  Moon as MoonIcon, 
  Dumbbell as DumbbellIcon,
  Check as CheckIcon,
  ChevronRight as ChevronRightIcon,
  X as XIcon,
  Camera as CameraIcon,
  Loader2 as Loader2Icon
} from 'lucide-vue-next';

const showModal = ref(false);
const selectedTask = ref<any>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const previewImage = ref<string | null>(null);
const isSubmitting = ref(false);
const showSuccess = ref(false);

const tasks = ref([
  { id: 1, title: 'ส่งรูปการวิ่ง / ระยะทาง', points: 50, icon: ActivityIcon, bg: 'bg-green-50', color: 'text-green-500', done: true },
  { id: 2, title: 'ส่งรูปอาหารสุขภาพ', points: 50, icon: UtensilsIcon, bg: 'bg-orange-50', color: 'text-orange-500', done: true },
  { id: 3, title: 'ส่งรูปอารมณ์วันนี้', points: 50, icon: SmileIcon, bg: 'bg-amber-50', color: 'text-amber-500', done: false },
  { id: 4, title: 'ส่งรูปเวลาการนอน', points: 50, icon: MoonIcon, bg: 'bg-blue-50', color: 'text-blue-500', done: false },
  { id: 5, title: 'การออกกำลังกายอื่นๆ', points: 50, icon: DumbbellIcon, bg: 'bg-purple-50', color: 'text-purple-500', done: false },
]);

const openSubmitModal = (task: any) => {
  selectedTask.value = task;
  previewImage.value = null;
  showModal.value = true;
};

const triggerFileUpload = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const submitTask = () => {
  isSubmitting.value = true;
  
  // Simulate API call
  setTimeout(() => {
    const taskIndex = tasks.value.findIndex(t => t.id === selectedTask.value.id);
    if (taskIndex !== -1) {
      tasks.value[taskIndex].done = true;
    }
    
    isSubmitting.value = false;
    showModal.value = false;
    showSuccess.value = true;
    
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  }, 1500);
};
</script>
