<template>
  <div class="mt-4">
    <!-- <p>Want to stay in the loop? Get notified of upcoming live webinars and videos.</p> -->
    <form
      @submit.prevent="onSubmit"
      class="grid grid-cols-3 md:grid-cols-5 w-full gap-2 items-center"
    >
      <div class="flex flex-row w-full h-full gap-2 items-center col-span-2">
        <label for="email" class="contact-form-label sr-only"
          >Work Email <span class="text-red-500">*</span></label
        >
        <div class="w-full">
          <Field
            name="email"
            type="email"
            placeholder="your.name@company.com"
            as="input"
            :class="['contact-form-input', errors.email ? 'is-invalid' : '']"
          />
          <!-- <ErrorMessage name="email" class="contact-form-error" /> -->
        </div>
      </div>
      <CustomButton
        variant="secondary"
        type="submit"
        :disabled="isSubmitting"
        :loading="isSubmitting"
        class="cursor-pointer mt-1"
        >Register</CustomButton
      >
      <ErrorMessage name="email" class="contact-form-error col-span-4" />
    </form>
  </div>
  <Teleport to="body">
    <AddToCalenderPopup
      :visible="showPopup"
      :webinarDetail="popupDetails"
      @close="showPopup = false"
    />
  </Teleport>
</template>

<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";
import { useForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";
import AddToCalenderPopup from "@/components/webinars/AddToCalenderPopup.vue";

interface PopupDetails {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  email: string;
}
const props = defineProps<{
  popupDetails : PopupDetails
}>(); 
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
const showPopup = ref(false);
const onSubmit = handleSubmit(async (values) => {
  console.log(values, "values");
    // Inject email into popupDetails
   props.popupDetails.email = values.email;
  // Simulate successful registration
  setTimeout(() => {
    showPopup.value = true;
  }, 200);
  resetForm();
});
</script>

<style scoped></style>
