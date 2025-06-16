<template>
  <div class="">
    <!-- <p>Want to stay in the loop? Get notified of upcoming live webinars and videos.</p> -->
    <form @submit.prevent="onSubmit" :class="[
      'flex flex-col w-full gap-2',
      props.direction === 'row' ? 'md:flex-row' : 'md:flex-col'
    ]">
      <div class="flex flex-row w-full h-full gap-2 items-center col-span-1 md:col-span-2">
        <label for="email" class="contact-form-label sr-only">Work Email <span class="text-red-500">*</span></label>
        <div class="w-full">
          <Field name="email" type="email" placeholder="your.name@company.com" as="input"
            :class="['contact-form-input', errors.email ? 'is-invalid' : '']" />
          <ErrorMessage name="email" class="contact-form-error" />
        </div>
      </div>
      <CustomButton :variant="buttonVariant" type="submit" :disabled="isSubmitting" :loading="isSubmitting" :class="[
        'cursor-pointer mt-1 w-full md:w-auto col-span-1',
        errors.email ? 'md:mb-5' : 'md:mb-0',
        props.direction === 'row' ? 'md:ml-2' : ''
      ]">
        Register
      </CustomButton>

    </form>
  </div>
  <Teleport to="body">
    <AddToCalenderPopup :visible="showPopup" :webinarDetail="popupDetailsLocal" @close="showPopup = false" />
  </Teleport>
</template>

<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";
import { useForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { reactive, ref } from "vue";
import AddToCalenderPopup from "@/components/webinars/AddToCalenderPopup.vue";

interface PopupDetails {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  email: string;
}
const props = defineProps<{
  popupDetails: PopupDetails;
  buttonVariant?: string;
  buttonOnClick?: () => void;
  direction?: "row" | "col"; // New prop for direction direction
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
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      email: "",
    },
  });
const showPopup = ref(false);
// Create a local copy for popup details
const popupDetailsLocal = ref<PopupDetails | null>(null);

const onSubmit = handleSubmit(async (values) => {
  // Only runs if validation passes
  // Create a new object for popup details with the submitted email
  popupDetailsLocal.value = {
    ...props.popupDetails,
    email: values.email,
  };
  setTimeout(() => {
    showPopup.value = true;
    if (props.buttonOnClick) props.buttonOnClick();
  }, 200);
  resetForm();
});
</script>

<style scoped></style>
