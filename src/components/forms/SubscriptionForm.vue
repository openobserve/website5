<template>
  <div class="cta">
    <p>Want to stay in the loop? Get notified of upcoming live webinars and videos.</p>
    <form @submit.prevent="subscribe">
      <input type="email" v-model="email" placeholder="Enter your email address" required />
      <button type="submit">Subscribe</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const email = ref('')

function subscribe() {
  alert(`Subscribed with email: ${email.value}`)
  email.value = ''
}
</script>

<style scoped>
.image-wrapper {
  z-index: 0;
  position: relative;
}

.image-wrapper img {
  display: block;
  width: 100%;
  border-radius: 6px;
}

.badge {
  z-index: -1;
  z-index: 0;
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: #ef4444;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-weight: bold;
  font-size: 0.75rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.badge img {
  height: 16px;
  width: 16px;
}

.left-feature-content {
  position: relative;
  z-index: 0;
  position: relative;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f8fafc;
  margin: 0;
  padding: 0;
  color: #1e293b;
}

.container {
  position: relative;
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.intro {
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #475569;
}

.video-layout {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.left-feature {
  flex: 2;
  background: #fefce8;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  display: block;
}

.left-feature:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.left-feature-content {
  display: block;
  color: #1e293b;
}

.left-feature img {
  position: relative;
  z-index: 0;
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.left-feature h2 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
}

.left-feature p {
  margin: 0.25rem 0;
  line-height: 1.4;
}

.left-feature ul {
  padding-left: 1.25rem;
}

.left-feature li {
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

.right-videos {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.video-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  padding: 1rem;
  filter: brightness(0.95);
}

.video-card iframe {
  width: 100%;
  height: 150px;
  border: none;
  border-radius: 6px;
}

.video-card a {
  text-decoration: none;
  color: #2563eb;
  font-weight: bold;
}

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

.cta button {
  background-color: #1e40af;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.cta button:hover {
  background-color: #1e3a8a;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .video-layout {
    flex-direction: column;
  }
}
</style>

