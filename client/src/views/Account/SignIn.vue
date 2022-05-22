<template>
  <div class="container-fluid row">
    <div class="d-none d-lg-block col-lg-7 cover"></div>
    <div class="col-lg-5 form-content">
      <div id="form">
        <form @submit.prevent="handleSubmit">
          <div class="logo">
            <img src="../../assets/logo.png" width="200"/>
          </div>
          <div class="mb-3" style="margin-top:50px">
            <input
              type="text"
              v-model="username"
              name="username"
              class="form-control form-control-lg"
              :class="{ 'is-invalid': submitted && !username }"
              placeholder="username"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              v-model="password"
              name="password"
              class="form-control form-control-lg"
              :class="{ 'is-invalid': submitted && !password }"
              placeholder="password"
            />
          </div>
          <button type="submit" class="btn btn-dark btn-lg w-100">SignIn</button>
        </form>
      </div>
    </div>
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
    };
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    ...mapActions("account", ["login", "logout"]),
    handleSubmit(e) {
      this.submitted = true;
      const { username, password } = this;
      if (username && password) {
        this.login({ username, password });
      }
    },
  },
};
</script>

<style scoped>
.cover {
  background-color: #252525;
  height: 100vh;
  padding: 20px;
}

.form {
  background-color: rgb(230, 230, 230);
  padding: 50px;
  height: 100vh;
}

.row {
  padding: 0;
  margin: 0;
}

.form-content {
  position: relative;
  height: 50vh;
}

.form-content #form {
  width: 100%;
  padding: 50px;
  margin: 0;
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>