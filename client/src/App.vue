<template>
  <div>
    <template v-if="!isSignInUpView">
      <app-header />
    </template>
    <main>
      <router-view />
    </main>
    <template v-if="!isSignInUpView">
      <app-footer />
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import routes from "./routes";

export default {
  data() {
    return {
      isSignInUpView: false,
    };
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    ...mapActions("account", ["login", "logout"]),
    isLoggedIn() {
      return this.$store.state.account.status.loggedIn;
    },
  },
  watch: {
    $route(to, from) {
      if (routes.filter((r) => r.path === to.path).length === 0) {
        this.$router.push("/");
      } else {
        if (to.name === "signIn" || to.name === "signUp") {
          this.isSignInUpView = true;
          if (this.isLoggedIn()) this.$router.push("/home");
        } else {
          this.isSignInUpView = false;
          if (!this.isLoggedIn()) this.$router.push("/");
        }
      }
    },
  },
};
</script>

<style>
@import url("./assets/css/index.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
