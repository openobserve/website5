<template>
  <div class="rounded-lg text-center mx-auto">
    <form @submit.prevent="onSubmit">
      <h2 class="text-white font-medium text-xl mb-2 relative inline-block">
        Stay Updated
        <span
          class="absolute bottom-[-5px] left-0 w-full h-0.5 bg-white block"
        ></span>
      </h2>
      <p class="text-gray-300 text-base transition duration-300 mb-6">
        Get the latest OpenObserve insights
      </p>

      <div class="flex flex-col gap-2.5 mb-4">
        <Field
          name="email"
          type="email"
          placeholder="Enter your email"
          :class="[
            'flex-1 px-4 py-3 rounded-full border border-[#4a90e2] bg-transparent text-white text-base outline-none placeholder-[rgba(255,255,255,0.6)]',
            errors.email ? 'is-invalid' : '',
          ]"
          aria-label="Email address"
          as="input"
        />
        <ErrorMessage name="email" class="contact-form-error text-left ml-2" />
        <button
          type="submit"
          class="px-6 py-3 rounded-full bg-[#7782FF] text-white text-base font-medium cursor-pointer transition hover:bg-[#6672fa] active:scale-98"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Subscribing..." : "Subscribe" }}
        </button>
      </div>

      <p class="text-sm text-[rgba(255,255,255,0.6)]">
        By subscribing, you agree to receive product related updates.
      </p>
    </form>
  </div>
  <transition name="fade">
    <div
      v-if="showToast"
      class="fixed bottom-5 right-2 transform  bg-primary-purple text-white p-6 rounded-lg shadow-lg z-50"
    >
      {{ toastMessage }}
    </div>
  </transition>
</template>
<script setup lang="ts">
import { useForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";
// Form validation
const schema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
});
type FormData = yup.InferType<typeof schema>;
const { handleSubmit, errors, resetForm, isSubmitting, submitCount } =
  useForm<FormData>({
    validationSchema: schema,
    validateOnMount: false, // default
    initialValues: {
      email: "",
    },
  });
// Toast state
const toastMessage = ref("");
const showToast = ref(false);
const onSubmit = handleSubmit(async (values) => {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log(values.email, "submitted data");

    // Show success toast
    toastMessage.value = `Subscribed successfully with: ${values.email}`;
    showToast.value = true;

    // Hide toast after 3 seconds
    setTimeout(() => {
      showToast.value = false;
    }, 3000);

    // Reset form if needed
    resetForm();
  } catch (error) {
    // Show error toast or handle error here
    toastMessage.value = "Something went wrong, please try again.";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  }
});
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
