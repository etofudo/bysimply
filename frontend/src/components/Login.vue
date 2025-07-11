<template>
  <div class="login-mobile-container">
    <img src="@/assets/logo.png" alt="Logo" class="logo-mobile" />
    <h1 class="brand-mobile">Team Achieve</h1>
    <h2 class="welcome-mobile">Welcome Back</h2>
    <p class="desc-mobile">Enter your email address and password to access your account.</p>
    <form class="form-mobile" @submit.prevent="onLogin">
      <div class="form-group-mobile">
        <label for="email">Email Address <span class="required">*</span></label>
        <input type="email" id="email" v-model="email" required placeholder="Enter your email" :disabled="loading" />
      </div>
      <div class="form-group-mobile">
        <label for="password">Password <span class="required">*</span></label>
        <div class="password-row">
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required placeholder="Enter your password" :disabled="loading" />
          <span class="eye-icon" @click="showPassword = !showPassword">
            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#888" stroke-width="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3" stroke="#888" stroke-width="2"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#888" stroke-width="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3" stroke="#888" stroke-width="2"/><line x1="3" y1="21" x2="21" y2="3" stroke="#888" stroke-width="2"/></svg>
          </span>
        </div>
      </div>
      <div class="row-mobile">
        <label class="remember-mobile">
          <input type="checkbox" v-model="rememberMe" :disabled="loading" /> Remember me
        </label>
        <a href="#" class="forgot-mobile">Forgot Password?</a>
      </div>
      <button type="submit" class="sign-in-mobile" :disabled="loading">
        <span v-if="loading">Signing in...</span>
        <span v-else>Sign in</span>
      </button>
      <div v-if="error" class="error-message">{{ error }}</div>
      <div v-if="success" class="success-message">Login successful!</div>
    </form>
    <div class="signup-mobile">
      Don’t have an account? <a href="#">Sign up</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      loading: false,
      error: '',
      success: false,
    };
  },
  methods: {
    async onLogin() {
      this.error = '';
      this.success = false;
      this.loading = true;
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        });
        const data = await response.json();
        if (!response.ok) {
          this.error = data.message || 'Login failed. Please try again.';
        } else {
          localStorage.setItem('token', data.token);
          this.success = true;
          // Optionally redirect or emit event here
        }
      } catch (err) {
        this.error = 'Network error. Please try again.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-mobile-container {
  max-width: 420px;
  margin: 0 auto;
  padding: 32px 16px 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #000;
}
.logo-mobile {
  width: 120px;
  margin-bottom: 12px;
  margin-top: 16px;
}
.brand-mobile {
  color: #bdbdbd;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 32px;
  letter-spacing: 1px;
  text-align: center;
}
.welcome-mobile {
  color: #7c3aad;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
  text-align: center;
}
.desc-mobile {
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 32px;
  text-align: center;
}
.form-mobile {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.form-group-mobile {
  margin-bottom: 18px;
}
.form-group-mobile label {
  color: #bdbdbd;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 6px;
  display: block;
}
.required {
  color: #c0392b;
  font-size: 1.1em;
}
.form-group-mobile input[type="email"],
.form-group-mobile input[type="password"] {
  width: 100%;
  padding: 14px 16px;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  background: #181818;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-top: 6px;
  outline: none;
}
.password-row {
  display: flex;
  align-items: center;
  background: #181818;
  border-radius: 10px;
  margin-top: 6px;
}
.password-row input {
  border: none;
  background: transparent;
  flex: 1;
  color: #fff;
  padding: 14px 16px;
  font-size: 1.1rem;
  border-radius: 10px 0 0 10px;
}
.eye-icon {
  display: flex;
  align-items: center;
  padding: 0 14px;
  cursor: pointer;
}
.row-mobile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.remember-mobile {
  color: #bdbdbd;
  font-size: 1rem;
  display: flex;
  align-items: center;
}
.remember-mobile input[type="checkbox"] {
  margin-right: 8px;
  accent-color: #7c3aad;
}
.forgot-mobile {
  color: #7c3aad;
  font-size: 1rem;
  text-decoration: none;
  font-weight: 500;
}
.forgot-mobile:hover {
  text-decoration: underline;
}
.sign-in-mobile {
  width: 100%;
  padding: 16px 0;
  background: #7c3aad;
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 18px;
  cursor: pointer;
  transition: background 0.2s;
}
.sign-in-mobile:hover {
  background: #5a277a;
}
.signup-mobile {
  color: #bdbdbd;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 32px;
}
.signup-mobile a {
  color: #7c3aad;
  text-decoration: none;
  font-weight: 600;
}
.signup-mobile a:hover {
  text-decoration: underline;
}
.error-message {
  color: #c0392b;
  background: #fff0f0;
  border-radius: 8px;
  padding: 10px 14px;
  margin: 10px 0 0 0;
  text-align: center;
  font-size: 1rem;
}
.success-message {
  color: #27ae60;
  background: #eafaf1;
  border-radius: 8px;
  padding: 10px 14px;
  margin: 10px 0 0 0;
  text-align: center;
  font-size: 1rem;
}
@media (max-width: 600px) {
  .login-mobile-container {
    padding: 24px 4vw 0 4vw;
    min-height: 100vh;
  }
  .logo-mobile {
    width: 90px;
    margin-bottom: 8px;
  }
  .brand-mobile {
    font-size: 1.5rem;
    margin-bottom: 18px;
  }
  .welcome-mobile {
    font-size: 1.3rem;
    margin-bottom: 6px;
  }
  .desc-mobile {
    font-size: 1rem;
    margin-bottom: 18px;
  }
  .form-group-mobile label {
    font-size: 1rem;
  }
  .form-group-mobile input[type="email"],
  .form-group-mobile input[type="password"],
  .password-row input {
    font-size: 1rem;
    padding: 12px 10px;
  }
  .sign-in-mobile {
    font-size: 1.1rem;
    padding: 12px 0;
  }
  .signup-mobile {
    font-size: 1rem;
    margin-bottom: 18px;
  }
}
</style> 