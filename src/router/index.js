import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/views/LandingPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import EmployerDashboard from '@/views/EmployerDashboard.vue';
import EditJobDetails from '@/views/EditJobDetails.vue';
import JobDetails from '@/views/JobDetails.vue';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/dashboard',
    name: 'EmployerDashboard',
    component: EmployerDashboard,
    meta: { requiresAuth: true, requiresEmployer: true },
  },
  { path: '/edit-job/:id?',
    name: 'EditJobDetails',
    component: EditJobDetails,
    props: true,
    meta: { requiresAuth: true, requiresEmployer: true }
  },
  {
    path: '/job/:id',
    name: 'JobDetails',
    component: JobDetails,
    props: true,
  },
  { path: '/:catchAll(.*)',
    redirect: {
      name: 'LandingPage'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Redirect unauthorized users from protected routes
router.beforeEach((to, from, next) => {

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresEmployer = to.matched.some(record => record.meta.requiresEmployer);
  const requiresApplicant = to.matched.some(record => record.meta.requiresApplicant);

  console.log('Navigating to:', to.name);
  console.log('Logged in user:', loggedInUser);

  if (requiresAuth && !loggedInUser) {
    next({ name: 'Login' });
  } else if (requiresEmployer && loggedInUser.type !== 'employer') {
    next({ name: 'EmployeeDashboard' });
  } else if (requiresApplicant && loggedInUser.type !== 'applicant') {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
