<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  ChevronLeft, 
  ImagePlus, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  PlusCircle, 
  Trash2, 
  Star, 
  ArrowRight,
  Save,
  Activity,
  Utensils,
  Smile,
  Moon,
  Dumbbell
} from 'lucide-vue-next';

const router = useRouter();

// Form State
const eventName = ref('');
const organizer = ref('');
const eventType = ref('');
const regStart = ref('');
const regEnd = ref('');
const eventDate = ref('');
const startTime = ref('');
const endTime = ref('');
const location = ref('');
const description = ref('');
const rewardPoints = ref(500);
const photoPreview = ref<string | null>(null);

// Distances State
interface EventDistance {
  id: number;
  name: string;
  price: number;
  seats: number;
}

const distances = ref<EventDistance[]>([
  { id: 1, name: '10km (Mini Marathon)', price: 450, seats: 500 }
]);

const addDistance = () => {
  const newId = distances.value.length > 0 ? Math.max(...distances.value.map(d => d.id)) + 1 : 1;
  distances.value.push({
    id: newId,
    name: '',
    price: 0,
    seats: 0
  });
};

const removeDistance = (id: number) => {
  distances.value = distances.value.filter(d => d.id !== id);
};

// Daily Tasks State
const tasks = ref([
  { id: 'run', name: 'ส่งรูปการวิ่ง/ระยะทาง', points: 50, active: true, icon: Activity },
  { id: 'food', name: 'ส่งรูปอาหารสุขภาพ', points: 50, active: true, icon: Utensils },
  { id: 'mood', name: 'ส่งรูปอารมณ์วันนี้', points: 50, active: true, icon: Smile },
  { id: 'sleep', name: 'ส่งรูปเวลาการนอน', points: 50, active: true, icon: Moon },
  { id: 'workout', name: 'ส่งรูปการออกกำลังกายอื่นๆ', points: 50, active: true, icon: Dumbbell },
]);

const fileInput = ref<HTMLInputElement | null>(null);

const onPhotoChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(input.files[0]);
  }
};

const triggerFileUpload = () => {
  fileInput.value?.click();
};

const goBack = () => {
  router.back();
};

const saveEvent = () => {
  console.log('Saving event...', {
    eventName: eventName.value,
    distances: distances.value,
    tasks: tasks.value
  });
  alert('บันทึกกิจกรรมเรียบร้อยแล้ว');
  router.push('/events');
};
</script>

<template>
  <div class="event-create-page">
    <!-- Header -->
    <header class="app-header">
      <button @click="goBack" class="icon-btn">
        <ChevronLeft class="icon" />
      </button>
      <h1 class="page-title">สร้างกิจกรรมวิ่งใหม่</h1>
      <div class="spacer"></div>
    </header>

    <main class="content-container">
      
      <!-- Photo Upload -->
      <section class="form-section">
        <label class="section-label">รูปภาพกิจกรรม</label>
        <div @click="triggerFileUpload" class="upload-area">
          <img v-if="photoPreview" :src="photoPreview" class="preview-img" />
          <div v-else class="upload-placeholder">
            <ImagePlus class="upload-icon" />
            <span class="upload-text">อัปโหลดรูปภาพกิจกรรม</span>
            <span class="upload-hint">ขนาดแนะนำ 16:9</span>
          </div>
          <input type="file" ref="fileInput" class="hidden-input" accept="image/*" @change="onPhotoChange" />
          
          <div v-if="photoPreview" class="change-overlay">
             <div class="overlay-btn">
               <ImagePlus class="mini-icon" /> เปลี่ยนรูปภาพ
             </div>
          </div>
        </div>
      </section>

      <!-- Basic Info -->
      <section class="card-section">
        <div class="section-header">
          <h2 class="section-title">ข้อมูลพื้นฐาน</h2>
        </div>
        
        <div class="grid-form">
          <div class="input-group full-width">
            <label class="input-label">ชื่อกิจกรรม</label>
            <input v-model="eventName" type="text" placeholder="เช่น วิ่งมาราธอนกลางกรุง 2024" class="text-input" />
          </div>
          
          <div class="input-group">
            <label class="input-label">ผู้จัดกิจกรรม</label>
            <input v-model="organizer" type="text" placeholder="เช่น BKK Run Club" class="text-input" />
          </div>

          <div class="input-group">
            <label class="input-label">ประเภทการวิ่ง</label>
            <div class="select-wrapper">
              <select v-model="eventType" class="select-input">
                <option value="" disabled>เลือกประเภทการวิ่ง</option>
                <option value="marathon">มาราธอน (42.195 km)</option>
                <option value="half_marathon">ฮาล์ฟมาราธอน (21.1 km)</option>
                <option value="mini_marathon">มินิมาราธอน (10 km)</option>
                <option value="fun_run">ฟันรัน (5 km)</option>
                <option value="trail">เทรล (Trail)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <!-- Timeframes Grid -->
      <div class="flex-grid">
        <!-- Registration -->
        <section class="card-section half-width">
          <div class="section-header">
            <h2 class="section-title">รับสมัคร</h2>
          </div>
          <div class="vertical-form">
            <div class="input-group">
              <label class="input-label flex-label">
                <CalendarIcon class="mini-icon" /> เริ่มต้น
              </label>
              <input v-model="regStart" type="date" class="date-input" />
            </div>
            <div class="input-group">
              <label class="input-label flex-label">
                <ArrowRight class="mini-icon" /> สิ้นสุด
              </label>
              <input v-model="regEnd" type="date" class="date-input" />
            </div>
          </div>
        </section>

        <!-- Event Date -->
        <section class="card-section half-width">
          <div class="section-header">
            <h2 class="section-title">วันจัดงาน</h2>
          </div>
          <div class="vertical-form">
            <div class="input-group">
              <label class="input-label">วันที่จัดงาน</label>
              <input v-model="eventDate" type="date" class="date-input" />
            </div>
            <div class="horizontal-form">
              <div class="input-group flex-1">
                <label class="input-label flex-label">
                  <Clock class="mini-icon" /> เวลาเริ่ม
                </label>
                <input v-model="startTime" type="time" class="time-input" />
              </div>
              <div class="input-group flex-1">
                 <label class="input-label flex-label">
                   <ArrowRight class="mini-icon" /> เวลาจบ
                 </label>
                <input v-model="endTime" type="time" class="time-input" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Location & Details -->
      <section class="card-section">
        <div class="section-header">
          <h2 class="section-title">สถานที่และรายละเอียด</h2>
        </div>
        
        <div class="vertical-form">
          <div class="input-group">
            <label class="input-label flex-label">
              <MapPin class="mini-icon" /> สถานที่จัดงาน
            </label>
            <textarea v-model="location" rows="2" placeholder="ระบุสถานที่จัดงาน เช่น สวนลุมพินี, กรุงเทพมหานคร" class="textarea-input"></textarea>
          </div>
          
          <div class="input-group">
            <label class="input-label">รายละเอียดเพิ่มเติม</label>
            <textarea v-model="description" rows="4" placeholder="อธิบายเกี่ยวกับกิจกรรมวิ่ง, เส้นทาง, กฎกติกา ฯลฯ" class="textarea-input"></textarea>
          </div>

          <div class="input-group">
            <label class="input-label flex-label">
              <Star class="mini-icon primary-color" /> แต้มรางวัลพื้นฐาน
            </label>
            <div class="input-wrapper">
              <input v-model="rewardPoints" type="number" class="text-input" />
              <span class="input-suffix">Points</span>
            </div>
            <p class="input-hint">แต้มสะสมสำหรับผู้ที่เข้าร่วมและวิ่งจบกิจกรรม</p>
          </div>
        </div>
      </section>

      <!-- Distances -->
      <section class="dist-section">
        <div class="dist-header">
          <div class="section-header no-margin">
            <h2 class="section-title">ตัวเลือกการสมัคร</h2>
          </div>
          <button @click="addDistance" class="add-btn">
            <PlusCircle class="mini-icon" /> เพิ่มระยะทาง
          </button>
        </div>

        <div class="distance-list">
          <transition-group name="list">
            <div v-for="(dist, index) in distances" :key="dist.id" class="distance-card">
              <button 
                v-if="distances.length > 1"
                @click="removeDistance(dist.id)" 
                class="remove-btn"
              >
                <Trash2 class="icon" />
              </button>
              
              <div class="dist-grid">
                <div class="input-group dist-name">
                  <label class="tiny-label">ชื่อระยะทาง</label>
                  <input v-model="dist.name" type="text" placeholder="เช่น 5km (Fun Run)" class="small-input" />
                </div>
                <div class="input-group">
                  <label class="tiny-label">ราคา (บาท)</label>
                  <input v-model="dist.price" type="number" class="small-input" />
                </div>
                <div class="input-group">
                  <label class="tiny-label">จำนวนที่รับ</label>
                  <input v-model="dist.seats" type="number" class="small-input" />
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </section>

      <!-- Daily Tasks -->
      <section class="card-section">
        <div class="section-header">
          <h2 class="section-title">ภารกิจสะสมแต้มรายวัน</h2>
        </div>
        
        <div class="task-list">
          <div v-for="task in tasks" :key="task.id" class="task-item">
            <div class="task-info">
              <div class="task-icon-bg">
                <component :is="task.icon" class="task-icon" />
              </div>
              <div class="task-text">
                <h3 class="task-name">{{ task.name }}</h3>
                <div class="task-points-row">
                  <input v-model="task.points" type="number" class="points-input" />
                  <span class="tiny-label">แต้ม/ครั้ง</span>
                </div>
              </div>
            </div>
            
            <label class="toggle-switch">
              <input type="checkbox" v-model="task.active">
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>

    </main>

    <!-- Bottom Actions -->
    <div class="bottom-bar">
      <div class="action-container">
        <button @click="goBack" class="secondary-btn">ยกเลิก</button>
        <button @click="saveEvent" class="primary-btn">
          <Save class="mini-icon" /> บันทึกและเปิดใช้งาน
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Variables */
:host {
  --primary: #F05A23;
  --bg-light: #f8fafc;
  --border-light: #e2e8f0;
  --card-bg: #ffffff;
  --text-main: #1e293b;
  --text-muted: #64748b;
  --input-bg: #f1f5f9;
}

/* Dark Mode Support via class */
:global(.dark) .event-create-page {
  --bg-light: #020617;
  --border-light: #1e293b;
  --card-bg: #0f172a;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --input-bg: #1e293b;
}

.event-create-page {
  min-height: 100vh;
  background-color: var(--bg-light);
  padding-bottom: 8rem;
  color: var(--text-main);
  font-family: 'Kanit', sans-serif;
}

/* Header */
.app-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-light);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:global(.dark) .app-header {
  background: rgba(15, 23, 42, 0.8);
}

.icon-btn {
  padding: 0.5rem;
  border-radius: 9999px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.icon-btn:hover {
  background: var(--border-light);
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--text-muted);
}

.page-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.spacer {
  width: 2.5rem;
}

/* Main Container */
.content-container {
  max-width: 48rem;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: slideUp 0.5s ease-out forwards;
}

/* Form Sections */
.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-label {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-muted);
  margin-left: 0.25rem;
}

.upload-area {
  position: relative;
  aspect-ratio: 16 / 9;
  width: 100%;
  border: 2px dashed #F05A23;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  background: var(--card-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.upload-area:hover {
  border-color: rgba(240, 90, 35, 0.5);
}

.preview-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.upload-area:hover .preview-img {
  transform: scale(1.05);
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
}

.upload-icon {
  width: 3rem;
  height: 3rem;
}

.upload-text {
  font-weight: 700;
}

.upload-hint {
  font-size: 0.75rem;
}

.hidden-input {
  display: none;
}

.change-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;
}

.upload-area:hover .change-overlay {
  opacity: 1;
}

.overlay-btn {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Cards */
.card-section {
  background: var(--card-bg);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--border-light);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-header {
  border-left: 4px solid var(--primary);
  padding-left: 1rem;
  margin-left: -1.5rem;
}

.no-margin {
  margin-left: -0.5rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
}

/* Forms & Inputs */
.grid-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .grid-form {
    grid-template-columns: 1fr 1fr;
  }
  .full-width {
    grid-column: span 2;
  }
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-muted);
}

.flex-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.text-input, .select-input, .textarea-input, .date-input, .time-input {
  width: 100%;
  background: var(--input-bg);
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--text-main);
  font-family: inherit;
  transition: all 0.2s;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
}

.text-input:focus, .select-input:focus, .textarea-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary);
}

.textarea-input {
  resize: none;
}

.select-wrapper {
  position: relative;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-suffix {
  position: absolute;
  right: 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-muted);
}

.input-hint {
  font-size: 0.625rem;
  font-style: italic;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

/* Layout Utilities */
.flex-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .flex-grid {
    flex-direction: row;
  }
  .half-width {
    flex: 1;
  }
}

.vertical-form, .task-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.horizontal-form {
  display: flex;
  gap: 1rem;
}

.flex-1 {
  flex: 1;
}

/* Distances Section */
.dist-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
}

.add-btn {
  background: transparent;
  border: none;
  color: var(--primary);
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: opacity 0.2s;
}

.add-btn:hover {
  opacity: 0.8;
}

.distance-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.distance-card {
  position: relative;
  background: var(--card-bg);
  border: 1px solid var(--border-light);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s;
}

.distance-card:hover {
  border-color: rgba(240, 90, 35, 0.3);
}

.remove-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  transition: color 0.2s;
}

.remove-btn:hover {
  color: #ef4444;
}

.dist-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .dist-grid {
    grid-template-columns: 2fr 1fr 1fr;
  }
}

.small-input {
  width: 100%;
  background: var(--input-bg);
  border: none;
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;
  color: var(--text-main);
  font-size: 0.875rem;
}

.tiny-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Daily Tasks */
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--input-bg);
  border-radius: 1rem;
  transition: all 0.3s;
}

.task-item:hover {
  background: var(--card-bg);
  border: 1px solid var(--border-light);
}

.task-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.task-icon-bg {
  width: 3rem;
  height: 3rem;
  background: rgba(240, 90, 35, 0.1);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  transition: transform 0.3s;
}

.task-item:hover .task-icon-bg {
  transform: scale(1.1);
}

.task-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.task-text {
  display: flex;
  flex-direction: column;
}

.task-name {
  font-size: 0.875rem;
  font-weight: 700;
  margin: 0;
}

.task-points-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.points-input {
  width: 4rem;
  height: 1.75rem;
  background: var(--card-bg);
  border: none;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 700;
  color: var(--primary);
  font-size: 0.75rem;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 2.75rem;
  height: 1.5rem;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #cbd5e1;
  transition: .4s;
  border-radius: 9999px;
}


.toggle-slider:before {
  position: absolute;
  content: "";
  height: 1.25rem;
  width: 1.25rem;
  left: 0.125rem;
  bottom: 0.125rem;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: var(--primary);
}

input:checked + .toggle-slider:before {
  transform: translateX(1.25rem);
}

/* Bottom Actions */
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  border-top: 1px solid var(--border-light);
  z-index: 50;
}


.action-container {
  max-width: 48rem;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
}

.primary-btn {
  flex: 1;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(240, 90, 35, 0.3);
  transition: all 0.2s;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(240, 90, 35, 0.4);
}

.secondary-btn {
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  border: none;
  background: var(--input-bg);
  color: var(--text-muted);
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}

.secondary-btn:hover {
  background: var(--border-light);
}

/* Icons and Colors */
.mini-icon {
  width: 1rem;
  height: 1rem;
}

.primary-color {
  color: var(--primary);
}

/* Animations */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.list-enter-active, .list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

