<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/"><span><img id="navIcon" src="../assets/logo.png" alt="PMS"></span></a>
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
          <li class="nav-item" :class="{ active : setActiveItem('dashboard') }">
            <a class="nav-link" href="/dashboard">Dashboard</a>
          </li>
          <li class="nav-item" :class="{ active : setActiveItem('projects') }">
            <a class="nav-link" href="/projects">Projects</a>
          </li>
          <li class="nav-item" :class="{ active : setActiveItem('issues') }">
            <a class="nav-link" href="/issues">Issues</a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" :class="{ active : setActiveItem('signUp') }">
            <a class="nav-link" href="/signUp">SignUp</a>
          </li>
          <li class="nav-item" :class="{ active : setActiveItem('signIn') }">
            <a class="nav-link" href="/signIn">SignIn</a>
          </li>
          <li class="nav-item" :class="{ active : setActiveItem('profile') }">
            <a class="nav-link" href="/profile">Profile</a>
          </li>
          <li class="nav-item" :class="{ active : setActiveItem('logout') }">
            <a class="nav-link" href="/logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods: {
    setActiveItem: function(item){
      if(window.location.href.split('/')[window.location.href.split('/').length-1] == item){
        return true;
      }
    }
  }
}
</script>