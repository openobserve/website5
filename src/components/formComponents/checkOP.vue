<form
@submit.prevent="handleSubmit"
class="bg-zinc-800 p-6 rounded-lg shadow-md w-full max-w-lg"
>


<!-- Name Input -->
<FormInput
  id="name"
  label="Name"
  placeholder="Enter your name"
  v-model="form.name"
/>

<!-- Email Input -->
<FormInput
  id="email"
  label="Email"
  type="email"
  placeholder="Enter your email"
  v-model="form.email"
/>

<!-- Password Input -->
<FormInput
  id="password"
  label="Password"
  type="password"
  placeholder="Enter your password"
  v-model="form.password"
/>

<!-- Submit Button -->
<button
  type="submit"
  class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  Submit
</button>
</form>