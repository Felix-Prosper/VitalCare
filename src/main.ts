import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './index.css';

// Views
import Home from './views/Home.vue';
import Profile from './views/Profile.vue';
import Events from './views/Events.vue';
import Leaderboard from './views/Leaderboard.vue';
import DailyTasks from './views/DailyTasks.vue';
import Assessments from './views/Assessments.vue';
import UserManagement from './views/UserManagement.vue';
import EventDetail from './views/EventDetail.vue';
import HealthReport from './views/HealthReport.vue';
import TeamJoinCreate from './views/TeamJoinCreate.vue';
import EventCreate from './views/EventCreate.vue';
import CertificateDesigner from './views/CertificateDesigner.vue';
import Questionnaire from './views/Questionnaire.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/profile', component: Profile },
  { path: '/events', component: Events },
  { path: '/event/create', component: EventCreate },
  { path: '/event/:id', component: EventDetail },
  { path: '/leaderboard', component: Leaderboard },
  { path: '/tasks', component: DailyTasks },
  { path: '/assessments', component: Assessments },
  { path: '/questionnaire/:topic', component: Questionnaire },
  { path: '/users', component: UserManagement },
  { path: '/report', component: HealthReport },
  { path: '/team/manage', component: TeamJoinCreate },
  { path: '/certificate', component: CertificateDesigner },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#root');
