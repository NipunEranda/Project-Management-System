<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link activeClass="active" class="nav-link" to="/home">
        <span>
          <img id="navIcon" src="../assets/logo.png" alt="PMS" />
        </span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <router-link activeClass="active" class="nav-link" to="/dashboard" v-if="isLoggedIn()">Dashboard</router-link>
          <router-link activeClass="active" class="nav-link" to="/projects" v-if="isLoggedIn()">Projects</router-link>
          <router-link activeClass="active" class="nav-link" to="/issues" v-if="isLoggedIn()">Issues</router-link>
        </ul>
        <ul class="navbar-nav ml-auto">
          <router-link activeClass="active" class="nav-link" to="/signUp" v-if="!isLoggedIn()">SignUp</router-link>
          <router-link activeClass="active" class="nav-link" to="/" v-if="!isLoggedIn()">SignIn</router-link>
          <router-link activeClass="active" class="nav-link" to="/profile" v-if="isLoggedIn()">Profile</router-link>
          <li class="nav-item">
            <a class="nav-link" @click="systemLogout()" style="cursor:pointer" v-if="isLoggedIn()">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
      loggedIn: false,
    };
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    ...mapActions("account", ["login", "logout"]),
    systemLogout(){
      this.logout();
    },
    isLoggedIn(){
      return this.$store.state.account.status.loggedIn;
    }
  }
};
</script>