<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link activeClass="active" class="nav-link" to="/">
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
          <router-link activeClass="active" class="nav-link" to="/dashboard">Dashboard</router-link>
          <router-link activeClass="active" class="nav-link" to="/projects">Projects</router-link>
          <router-link activeClass="active" class="nav-link" to="/issues">Issues</router-link>
        </ul>
        <ul class="navbar-nav ml-auto">
          <router-link activeClass="active" class="nav-link" to="/signUp">SignUp</router-link>
          <router-link activeClass="active" class="nav-link" to="/signIn">SignIn</router-link>
          <router-link activeClass="active" class="nav-link" to="/profile">Profile</router-link>
          <li class="nav-item">
            <a class="nav-link" href="/logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>