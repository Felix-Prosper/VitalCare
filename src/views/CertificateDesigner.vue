<template>
  <div class="h-screen flex flex-col bg-slate-50 overflow-hidden">
    <!-- Header -->
    <header class="p-4 bg-white border-b border-slate-100 flex items-center justify-between z-50 shadow-sm">
      <div class="flex items-center gap-4">
        <button @click="$router.back()" class="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeftIcon :size="24" class="text-slate-600" />
        </button>
        <h1 class="text-lg font-black text-slate-800 tracking-tight leading-tight">
          เครื่องมือออกแบบใบ<br />ประกาศ
        </h1>
      </div>
      <div class="flex items-center gap-6">
        <button class="text-sm font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-widest">
          พรี<br />วิว
        </button>
        <button class="px-8 py-3 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/30 active:scale-95 transition-all">
          บันทึก
        </button>
      </div>
    </header>

    <!-- Main Editor Area -->
    <main class="flex-1 relative flex flex-col items-center justify-center p-6 overflow-hidden">
      <!-- Floating Toolbar -->
      <div class="absolute top-8 left-1/2 -translate-x-1/2 z-40 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full shadow-2xl border border-white flex items-center gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <button class="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors">
          <TypeIcon :size="22" />
        </button>
        <div class="w-px h-6 bg-slate-100"></div>
        <button class="w-6 h-6 rounded-full bg-primary border-2 border-white shadow-sm"></button>
        <div class="w-px h-6 bg-slate-100"></div>
        <button class="text-rose-400 hover:text-rose-600 transition-colors">
          <Trash2Icon :size="22" />
        </button>
      </div>

      <!-- Canvas -->
      <div class="relative w-full max-w-md aspect-[3/4] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 canvas-grid group">
        <!-- Draggable Elements Mockup -->
        <div class="absolute inset-0 p-12 flex flex-col items-center justify-center gap-8">
          <!-- Profile Pic Placeholder -->
          <div class="relative w-32 h-32 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center bg-white/50 group-hover:border-primary transition-colors">
            <div class="text-center p-4">
              <p class="text-[10px] font-black text-primary uppercase tracking-widest leading-tight">
                [รูปโปรไฟล์<br />ผู้ใช้]
              </p>
            </div>
            <!-- Resize Handles -->
            <div class="absolute -top-1 -left-1 w-2 h-2 bg-white border border-primary rounded-full"></div>
            <div class="absolute -top-1 -right-1 w-2 h-2 bg-white border border-primary rounded-full"></div>
            <div class="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-primary rounded-full"></div>
            <div class="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-primary rounded-full"></div>
          </div>

          <!-- Name Placeholder -->
          <div class="relative px-8 py-3 border-2 border-dashed border-primary/40 rounded-2xl bg-white/50 group-hover:border-primary transition-colors">
            <p class="text-lg font-black text-slate-800 tracking-tight">[ชื่อ-นามสกุล]</p>
            <div class="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-primary rounded-full"></div>
            <div class="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-primary rounded-full"></div>
          </div>

          <!-- Team Placeholder -->
          <div class="relative px-6 py-2 border-2 border-dashed border-primary/40 rounded-xl bg-white/50 group-hover:border-primary transition-colors">
            <p class="text-xs font-black text-primary uppercase tracking-widest">[ชื่อทีม]</p>
            <div class="absolute -top-2 -right-2 bg-primary text-white text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-sm">DR</div>
          </div>
        </div>

        <!-- Data Fields Panel Overlay -->
        <div class="absolute bottom-6 left-6 right-6 z-30 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white p-6 animate-in slide-in-from-bottom-10 duration-700">
          <div class="flex justify-between items-center mb-6">
            <div class="flex items-center gap-2">
              <DatabaseIcon :size="18" class="text-primary" />
              <h3 class="text-sm font-black text-slate-800 tracking-tight">ฟิลด์ข้อมูลจากระบบ</h3>
            </div>
            <button class="text-slate-300 hover:text-slate-500 transition-colors">
              <XIcon :size="20" />
            </button>
          </div>

          <div class="grid grid-cols-2 gap-3 mb-6">
            <div v-for="field in systemFields" :key="field.label" 
              class="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100 cursor-grab active:cursor-grabbing hover:border-primary/30 transition-all group">
              <div class="flex items-center gap-2">
                <component :is="field.icon" :size="16" class="text-slate-400 group-hover:text-primary transition-colors" />
                <span class="text-[10px] font-black text-slate-600 tracking-tight">{{ field.label }}</span>
              </div>
              <GripVerticalIcon :size="14" class="text-slate-200" />
            </div>
          </div>

          <p class="text-[9px] text-center text-slate-400 font-bold italic tracking-wide">
            * ลากฟิลด์ข้อมูลไปวางบนใบประกาศเพื่อแสดงผลอัตโนมัติ
          </p>
        </div>
      </div>
    </main>

    <!-- Bottom Navigation -->
    <nav class="bg-white border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <button v-for="item in navItems" :key="item.label" 
        :class="`flex flex-col items-center gap-2 transition-all ${activeNav === item.id ? 'text-primary scale-110' : 'text-slate-400 hover:text-slate-600'}`"
        @click="activeNav = item.id">
        <div :class="`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeNav === item.id ? 'bg-primary/10 shadow-inner' : 'bg-slate-50'}`">
          <component :is="item.icon" :size="22" />
        </div>
        <span class="text-[9px] font-black uppercase tracking-widest">{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  ArrowLeft as ArrowLeftIcon, 
  Type as TypeIcon, 
  Trash2 as Trash2Icon,
  Database as DatabaseIcon,
  X as XIcon,
  GripVertical as GripVerticalIcon,
  Users as UsersIcon,
  Trophy as TrophyIcon,
  Activity as ActivityIcon,
  BarChart3 as BarChart3Icon,
  UserCircle2 as UserCircle2Icon,
  QrCode as QrCodeIcon
} from 'lucide-vue-next';

const activeNav = ref('system');

const systemFields = [
  { label: '[ชื่อทีม]', icon: UsersIcon },
  { label: '[อันดับ]', icon: TrophyIcon },
  { label: '[ประเภทการวิ่ง]', icon: ActivityIcon },
  { label: '[คะแนนรวม]', icon: BarChart3Icon },
];

const navItems = [
  { id: 'text', label: 'เพิ่มข้อความ', icon: TypeIcon },
  { id: 'system', label: 'ข้อมูลระบบ', icon: DatabaseIcon },
  { id: 'profile', label: 'รูปโปรไฟล์', icon: UserCircle2Icon },
  { id: 'stats', label: 'สถิติ', icon: BarChart3Icon },
  { id: 'qr', label: 'คิวอาร์', icon: QrCodeIcon },
];
</script>

<style scoped>
.canvas-grid {
  background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
  background-size: 20px 20px;
  background-color: #ffffff;
}
</style>
