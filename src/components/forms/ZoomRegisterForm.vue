<template>
  <div>
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
        <label for="email" class="contact-form-label sr-only">
          Work Email <span class="text-red-500">*</span>
        </label>
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

    <!-- Success/Error Messages -->
    <div v-if="registrationMessage" class="mt-4">
      <div
        :class="[
          'p-4 rounded-md',
          registrationSuccess
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200',
        ]"
      >
        {{ registrationMessage }}
      </div>
    </div>
  </div>

  <!-- Calendar Popup -->
  <Teleport to="body">
    <AddToCalenderPopup
      :visible="showPopup"
      :webinarDetail="
        popupDetailsLocal || {
          eventTitle: '',
          eventDate: '',
          eventTime: '',
          email: '',
        }
      "
      @close="showPopup = false"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import CustomButton from "../core/CustomButton.vue";
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
  webinarId?: string;
  joinUrl?: string;
  registrantId?: string;
  startTime?: string;
  topic?: string;
}

const props = defineProps<{
  popupDetails: PopupDetails;
  buttonVariant?: string;
  buttonOnClick?: () => void;
  direction?: "row" | "col";
}>();

// Validation Schema
const schema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

type FormData = yup.InferType<typeof schema>;

// Form state
const showErrors = ref(false);
const showPopup = ref(false);
const popupDetailsLocal = ref<PopupDetails | null>(null);
const registrationMessage = ref("");
const registrationSuccess = ref(false);

const { handleSubmit, errors, resetForm, isSubmitting, validate, values } =
  useForm<FormData>({
    validationSchema: schema,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validateOnMount: false,
  });

const onSubmit = handleSubmit(async (formData) => {
  // Clear previous messages
  registrationMessage.value = "";
  registrationSuccess.value = false;
  showErrors.value = true;

  try {
    // Register with Zoom via secure API
    const response = await fetch("/api/webinar-register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        webinarId: props.popupDetails.webinarId,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      // Handle specific error cases
      let errorMessage = "Registration failed. Please try again.";

      if (response.status === 400) {
        errorMessage =
          result.error ||
          "Invalid registration data. Please check your information.";
      } else if (response.status === 404) {
        errorMessage = "Webinar not found or registration is closed.";
      } else if (response.status === 409) {
        errorMessage = "You are already registered for this webinar.";
      } else if (response.status === 500) {
        errorMessage = "Server error. Please try again later.";
      }

      throw new Error(errorMessage);
    }

    // Success - update popup with registration details from Zoom
    popupDetailsLocal.value = {
      ...props.popupDetails,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      joinUrl: result.join_url, // Zoom join URL from API
      registrantId: result.registrant_id, // Store registrant ID for future reference
      startTime: result.start_time, // Webinar start time
      topic: result.topic, // Webinar topic/title
    };

    // Track registration success
    try {
      await trackWebinarRegistration({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        webinarId: props.popupDetails.webinarId || "",
        webinarTitle: props.popupDetails.eventTitle,
        source: "webinar_registration",
      });
    } catch (trackingError) {
      console.warn("⚠️ Tracking failed (non-critical):", trackingError);
    }

    // Show success message
    registrationMessage.value =
      "Registration successful! Check your email for webinar details and join instructions.";
    registrationSuccess.value = true;

    // Show popup after short delay
    setTimeout(() => {
      showPopup.value = true;
      if (props.buttonOnClick) props.buttonOnClick();
    }, 200);

    // Reset form
    resetForm();
    showErrors.value = false;
  } catch (error) {
    console.error("❌ Registration error:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Registration failed. Please try again.";

    registrationMessage.value = errorMessage;
    registrationSuccess.value = false;
  }
});
</script>

<style scoped></style>
