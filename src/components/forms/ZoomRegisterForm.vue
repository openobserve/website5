<template>
  <div class="">
    <form
      @submit.prevent="onSubmit"
      :class="[
        'flex flex-col w-full gap-2 h-full',
        props.direction === 'row' ? 'md:flex-row' : 'md:flex-col',
      ]"
    >
      <!-- First Name and Last Name: Always in Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="w-full">
          <Field
            name="firstName"
            type="text"
            placeholder="First Name"
            :class="[
              'contact-form-input',
              showErrors && errors.firstName ? 'is-invalid' : '',
            ]"
          />
          <ErrorMessage
            v-if="showErrors"
            name="firstName"
            class="contact-form-error"
          />
        </div>
        <div class="w-full">
          <Field
            name="lastName"
            type="text"
            placeholder="Last Name"
            :class="[
              'contact-form-input',
              showErrors && errors.lastName ? 'is-invalid' : '',
            ]"
          />
          <ErrorMessage
            v-if="showErrors"
            name="lastName"
            class="contact-form-error"
          />
        </div>
      </div>

      <!-- Email Field: Controlled by props.direction -->
      <div
        class="flex flex-row w-full h-full gap-2 items-center col-span-1 md:col-span-2"
      >
        <label for="email" class="contact-form-label sr-only"
          >Work Email <span class="text-red-500">*</span></label
        >
        <div class="w-full">
          <Field
            name="email"
            type="email"
            placeholder="your.name@company.com"
            :class="[
              'contact-form-input',
              showErrors && errors.email ? 'is-invalid' : '',
            ]"
          />
          <ErrorMessage
            v-if="showErrors"
            name="email"
            class="contact-form-error"
          />
        </div>
      </div>

      <!-- Submit Button: Controlled by props.direction -->
      <CustomButton
        :variant="buttonVariant"
        type="submit"
        :disabled="isSubmitting"
        :loading="isSubmitting"
        :class="[
          'cursor-pointer mt-1 w-full md:w-auto col-span-1',
          showErrors && errors.email ? 'md:mb-5' : 'md:mb-0',
          props.direction === 'row' ? 'md:ml-2' : '',
        ]"
      >
        Register
      </CustomButton>
    </form>
  </div>

  <Teleport to="body">
    <AddToCalenderPopup
      :visible="showPopup"
      :webinarDetail="popupDetailsLocal"
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
import { useSegment } from "@/composables/useSegment";

// Segment tracking
const { trackWebinarRegistration } = useSegment();

interface PopupDetails {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

const props = defineProps<{
  popupDetails: PopupDetails;
  buttonVariant?: string;
  buttonOnClick?: () => void;
  direction?: "row" | "col";
}>();

// Validation Schema
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
});

type FormData = yup.InferType<typeof schema>;

const showErrors = ref(false);
const showPopup = ref(false);
const popupDetailsLocal = ref<PopupDetails | null>(null);

const { handleSubmit, errors, resetForm, isSubmitting, validate, values } =
  useForm<FormData>({
    validationSchema: schema,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validateOnMount: false,
    validateOnBlur: false,
  });

const onSubmit = async () => {
  // First validate the form
  const { valid } = await validate();

  // Always show errors after submit button is clicked
  showErrors.value = true;

  if (!valid) {
    return; // Don't proceed if validation fails
  }

  await trackWebinarRegistration({
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    source: "webinar_registration",
  });

  // If validation passed, proceed with form submission
  popupDetailsLocal.value = {
    ...props.popupDetails,
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
  };

  setTimeout(() => {
    showPopup.value = true;
    if (props.buttonOnClick) props.buttonOnClick();
  }, 200);

  resetForm();
  showErrors.value = false; // Hide errors after successful submission
};
</script>

<style scoped></style>
