import Home from './views/Home.vue';
import Dashboard from './views/Dashboard.vue'
import Projects from './views/Projects.vue'; 
import Issues from './views/Issues.vue'; 
import SignUp from './views/Account/SignUp.vue';
import SignIn from './views/Account/SignIn.vue';
import Profile from './views/Account/Profile.vue';
import Admin from './views/Admin/index.vue';

const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/projects',
        name: 'projects',
        component: Projects
    },
    {
        path: '/issues',
        name: 'issues',
        component: Issues
    },
    {
        path: '/signUp',
        name: 'signUp',
        component: SignUp
    },
    {
        path: '/',
        name: 'signIn',
        component: SignIn
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },{
        path: '/admin',
        name: 'admin',
        component: Admin
    }
];

export default routes;