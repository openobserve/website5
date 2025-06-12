<template>
  <div class="cta">
    <p>Want to stay in the loop? Get notified of upcoming live webinars and videos.</p>
    <form @submit.prevent="subscribe">
      <input type="email" v-model="email" placeholder="Enter your email address" required />
      <CustomButton variant="secondary" type="submit">Subscribe</CustomButton>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CustomButton from '../core/CustomButton.vue'
const email = ref('')

function subscribe() {
  alert(`Subscribed with email: ${email.value}`)
  email.value = ''
}
</script>

<style scoped>
.cta {
  background-color: #2563eb;
  color: white;
  padding: 1.5rem;
  text-align: center;
  border-radius: 8px;
}

.cta p {
  margin: 0 0 1rem;
  font-size: 1.1rem;
}

.cta form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.cta input[type="email"] {
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  width: 250px;
}
</style>
