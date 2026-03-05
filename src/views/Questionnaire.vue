<template>
  <div class="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-8">
    <!-- Main Card Container -->
    <div class="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[85vh] max-h-[700px]">
      
      <!-- Header -->
      <header class="p-6 border-b border-slate-50 flex items-center justify-between">
        <button @click="handleBack" class="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
          <ArrowLeftIcon :size="24" />
        </button>
        <h1 class="text-lg font-bold text-slate-800">แบบประเมินสุขภาพ</h1>
        <div class="w-10"></div>
      </header>

      <!-- Content Area -->
      <main class="flex-1 overflow-y-auto p-8 space-y-8">
        <!-- Progress Info -->
        <div class="text-center space-y-4">
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            คำถามที่ {{ currentQuestionIndex + 1 }} จาก {{ questions.length }}
          </p>
          
          <!-- Segmented Progress Bar -->
          <div class="flex gap-1.5 justify-center">
            <div v-for="(q, i) in questions" :key="i" 
              :class="`h-1.5 rounded-full transition-all duration-300 ${i <= currentQuestionIndex ? 'w-8 bg-primary' : 'w-4 bg-orange-100'}`">
            </div>
          </div>
        </div>

        <!-- Question Text -->
        <h2 class="text-2xl font-bold text-slate-800 text-center leading-tight">
          {{ currentQuestion.text }}
        </h2>

        <!-- Options -->
        <div class="space-y-3">
          <label v-for="(option, index) in currentQuestion.options" :key="index"
            :class="`relative flex items-center justify-between p-5 rounded-3xl border-2 transition-all cursor-pointer ${selectedOption === index ? 'border-primary bg-orange-50/30' : 'border-slate-100 hover:border-slate-200'}`">
            <input type="radio" :value="index" v-model="selectedOption" class="hidden" />
            <span class="text-sm font-bold text-slate-700">{{ option }}</span>
            
            <!-- Custom Radio Button -->
            <div :class="`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedOption === index ? 'border-primary' : 'border-slate-200'}`">
              <div v-if="selectedOption === index" class="w-3 h-3 rounded-full bg-primary"></div>
            </div>
          </label>
        </div>
      </main>

      <!-- Footer Action -->
      <footer class="p-8 bg-white border-t border-slate-50">
        <button 
          @click="handleNext"
          :disabled="selectedOption === null"
          :class="`w-full py-5 rounded-3xl font-bold text-white shadow-xl transition-all active:scale-[0.98] ${selectedOption === null ? 'bg-slate-200 shadow-none cursor-not-allowed' : 'bg-primary shadow-primary/30'}`">
          {{ isLastQuestion ? 'ดูผลการประเมิน' : 'คำถามถัดไป' }}
        </button>
      </footer>
    </div>

    <!-- Success Modal (Simple) -->
    <div v-if="showResult" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
      <div class="bg-white rounded-[3rem] p-10 w-full max-w-sm text-center space-y-6 animate-in zoom-in duration-300">
        <div class="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto">
          <CheckIcon :size="40" />
        </div>
        <div class="space-y-2">
          <h3 class="text-2xl font-bold text-slate-800">ประเมินสำเร็จ!</h3>
          <p class="text-sm text-slate-400">คุณทำแบบประเมินครบถ้วนแล้ว ข้อมูลของคุณจะถูกนำไปวิเคราะห์เพื่อสุขภาพที่ดีขึ้น</p>
        </div>
        <div class="bg-slate-50 p-6 rounded-3xl">
          <p class="text-[10px] font-bold text-slate-400 uppercase mb-1">คะแนนประเมินส่วนนี้</p>
          <p class="text-4xl font-black italic text-primary">92/100</p>
        </div>
        <button @click="$router.push('/report')" class="w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20">
          ดูภาพรวมสุขภาพ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft as ArrowLeftIcon, Check as CheckIcon } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

const topic = ref(route.params.topic as string);
const currentQuestionIndex = ref(0);
const selectedOption = ref<number | null>(null);
const showResult = ref(false);

// Sample Questions Data
const allQuestions: Record<string, any[]> = {
  smoking: [
    { text: 'คุณสูบบุหรี่บ่อยแค่ไหน?', options: ['ไม่เคยสูบเลย', 'สูบบางครั้ง (สัปดาห์ละ 1-2 ครั้ง)', 'สูบเป็นประจำทุกวัน', 'เคยสูบแต่เลิกแล้ว'] },
    { text: 'คุณเริ่มสูบบุหรี่ตั้งแต่อายุเท่าไหร่?', options: ['ต่ำกว่า 15 ปี', '15 - 20 ปี', '21 - 30 ปี', 'มากกว่า 30 ปี'] },
    { text: 'คุณมีความตั้งใจที่จะเลิกบุหรี่หรือไม่?', options: ['ตั้งใจมาก', 'ตั้งใจปานกลาง', 'ยังไม่แน่ใจ', 'ไม่ต้องการเลิก'] },
  ],
  alcohol: [
    { text: 'คุณดื่มแอลกอฮอล์บ่อยแค่ไหน?', options: ['ไม่ดื่มเลย', 'ดื่มเฉพาะงานสังคม', 'ดื่มสัปดาห์ละ 1-2 ครั้ง', 'ดื่มเป็นประจำทุกวัน'] },
    { text: 'ปริมาณที่คุณดื่มในแต่ละครั้ง?', options: ['1-2 แก้ว', '3-5 แก้ว', 'มากกว่า 5 แก้ว', 'ดื่มจนเมา'] },
    { text: 'คุณเคยมีปัญหาจากการดื่มหรือไม่?', options: ['ไม่เคยเลย', 'เคยมีปัญหาเล็กน้อย', 'เคยมีปัญหาบ่อยครั้ง', 'มีปัญหารุนแรง'] },
  ],
  sleep: [
    { text: 'คุณนอนหลับไปกี่ชั่วโมง?', options: ['น้อยกว่า 4 ชั่วโมง', '4 ถึง 6 ชั่วโมง', '6 ถึง 8 ชั่วโมง', 'มากกว่า 8 ชั่วโมง'] },
    { text: 'คุณรู้สึกสดชื่นเมื่อตื่นนอนหรือไม่?', options: ['สดชื่นมาก', 'สดชื่นปานกลาง', 'รู้สึกเพลียเล็กน้อย', 'เพลียมาก'] },
    { text: 'คุณมีปัญหาการนอนไม่หลับหรือไม่?', options: ['ไม่มีเลย', 'เป็นบางครั้ง', 'เป็นบ่อยครั้ง', 'เป็นทุกคืน'] },
  ],
  'three-os': [
    { text: 'คุณรับประทานผักและผลไม้เพียงพอหรือไม่?', options: ['เพียงพอทุกวัน', 'เพียงพอบางวัน', 'น้อยมาก', 'ไม่ทานเลย'] },
    { text: 'คุณออกกำลังกายบ่อยแค่ไหน?', options: ['มากกว่า 3 ครั้ง/สัปดาห์', '1-2 ครั้ง/สัปดาห์', 'นานๆ ครั้ง', 'ไม่ออกกำลังกายเลย'] },
    { text: 'คุณจัดการความเครียดได้ดีเพียงใด?', options: ['ดีมาก', 'ดี', 'ปานกลาง', 'ไม่ดีเลย'] },
  ]
};

const questions = computed(() => allQuestions[topic.value] || allQuestions.sleep);
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1);

const handleNext = () => {
  if (selectedOption.value === null) return;

  if (isLastQuestion.value) {
    showResult.value = true;
  } else {
    currentQuestionIndex.value++;
    selectedOption.value = null;
  }
};

const handleBack = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    selectedOption.value = null;
  } else {
    router.back();
  }
};

onMounted(() => {
  // Ensure we have a valid topic
  if (!allQuestions[topic.value]) {
    topic.value = 'sleep';
  }
});
</script>

<style scoped>
/* Custom scrollbar for the question area */
main::-webkit-scrollbar {
  width: 4px;
}
main::-webkit-scrollbar-track {
  background: transparent;
}
main::-webkit-scrollbar-thumb {
  background: #f1f5f9;
  border-radius: 10px;
}

@keyframes zoom-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-in {
  animation: zoom-in 0.3s ease-out forwards;
}
</style>
