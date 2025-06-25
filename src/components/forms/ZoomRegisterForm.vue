<template>
  <div>
    <form
      @submit.prevent="onSubmit"
      :class="[
        'flex flex-col w-full gap-2 h-full',
        props.direction === 'row' ? 'md:flex-row' : 'md:flex-col'
      ]"
      ref="formRef"
      novalidate
    >
      <!-- First Name & Last Name -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="w-full">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            class="contact-form-input"
            v-model="formValues.firstName"
            required
            :title="'First name is required'"
            maxlength="20"
            minlength="3"
          />
        </div>
        <div class="w-full">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            class="contact-form-input"
            v-model="formValues.lastName"
            required
            :title="'Last name is required'"
            maxlength="20"
            minlength="3"
          />
        </div>
      </div>

      <!-- Email Field -->
      <div class="flex flex-row w-full h-full gap-2 items-center col-span-1 md:col-span-2">
        <label for="email" class="contact-form-label sr-only">
          Work Email <span class="text-red-500">*</span>
        </label>
        <div class="w-full">
          <input
            type="email"
            name="email"
            placeholder="your.name@company.com"
            class="contact-form-input"
            v-model="formValues.email"
            required
            :title="'A valid email is required'"
          />
        </div>
      </div>

      <!-- Submit Button -->
      <CustomButton
        :variant="buttonVariant"
        type="submit"
        :disabled="isSubmitting"
        :loading="isSubmitting"
        :class="[
          'cursor-pointer mt-1 w-full md:w-auto col-span-1',
          props.direction === 'row' ? 'md:ml-2' : ''
        ]"
      >
        Register
      </CustomButton>
    </form>
  </div>

  <!-- Calendar Popup -->
  <Teleport to="body">
    <AddToCalenderPopup
        v-if="popupDetailsLocal !== null"
      :visible="showPopup"
      :webinarDetail="popupDetailsLocal"
      @close="showPopup = false"
    />
  </Teleport>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import CustomButton from "../core/CustomButton.vue";
import AddToCalenderPopup from "@/components/webinars/AddToCalenderPopup.vue";

interface PopupDetails {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  email: string;
  firstName?: string;
  lastName?: string;
}
interface FormValues {
  [key: string]: string;
}
const props = defineProps<{
  popupDetails: PopupDetails;
  buttonVariant?: string;
  buttonOnClick?: () => void;
  direction?: "row" | "col";
}>();

const formRef = ref<HTMLFormElement | null>(null);
const showPopup = ref(false);
const popupDetailsLocal = ref<PopupDetails | null>(null);
const isSubmitting = ref(false);

const formValues = ref<FormValues>({
  firstName: "",
  lastName: "",
  email: ""
})

const onSubmit = async () => {
  if (!formRef.value?.checkValidity()) {
    formRef.value?.reportValidity(); // show tooltips
    return;
  }
 // Trim all string values in formValues
  Object.keys(formValues.value).forEach((key) => {
    const val = formValues.value[key];
    if (typeof val === "string") {
      formValues.value[key] = val.trim();
    }
  });
  isSubmitting.value = true;

  popupDetailsLocal.value = {
    ...props.popupDetails,
    ...formValues.value
  };

  setTimeout(() => {
    showPopup.value = true;
    if (props.buttonOnClick) props.buttonOnClick();
    isSubmitting.value = false;
  }, 200);
};
</script>


<!-- <template>
  <div class="">
    <form @submit.prevent="onSubmit" :class="[
      'flex flex-col w-full gap-2 h-full',
      props.direction === 'row' ? 'md:flex-row' : 'md:flex-col'
    ]">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="w-full">
          <Field name="firstName" type="text" placeholder="First Name"
            :class="['contact-form-input', showErrors && errors.firstName ? 'is-invalid' : '']" />
          <ErrorMessage v-if="showErrors" name="firstName" class="contact-form-error" />
        </div>
        <div class="w-full">
          <Field name="lastName" type="text" placeholder="Last Name"
            :class="['contact-form-input', showErrors && errors.lastName ? 'is-invalid' : '']" />
          <ErrorMessage v-if="showErrors" name="lastName" class="contact-form-error" />
        </div>
      </div>

     
      <div class="flex flex-row w-full h-full gap-2 items-center col-span-1 md:col-span-2">
        <label for="email" class="contact-form-label sr-only">Work Email <span class="text-red-500">*</span></label>
        <div class="w-full">
          <Field name="email" type="email" placeholder="your.name@company.com"
            :class="['contact-form-input', showErrors && errors.email ? 'is-invalid' : '']" />
          <ErrorMessage v-if="showErrors" name="email" class="contact-form-error" />
        </div>
      </div>

     
      <CustomButton :variant="buttonVariant" type="submit" :disabled="isSubmitting" :loading="isSubmitting" :class="[
        'cursor-pointer mt-1 w-full md:w-auto col-span-1',
        showErrors && errors.email ? 'md:mb-5' : 'md:mb-0',
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
import { ref } from "vue";
import AddToCalenderPopup from "@/components/webinars/AddToCalenderPopup.vue";

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

const { handleSubmit, errors, resetForm, isSubmitting, validate, values } = useForm<FormData>({
  validationSchema: schema,
  initialValues: {
    firstName: "",
    lastName: "",
    email: "",
  },
  validateOnMount: false,
  validateOnChange: false,
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

<style scoped></style> -->