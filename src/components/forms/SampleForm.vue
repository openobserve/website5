<script>
import { Field } from "vee-validate";
import * as yup from "yup";
import BaseForm from "./BaseForm.vue";
import CustomInput from "./CustomInput.vue";
import CustomSelect from "./CustomSelect.vue";
import CustomButton from "../core/CustomButton.vue";

export default {
  name: "SampleForm",
  components: {
    BaseForm,
    CustomInput,
    CustomSelect,
    CustomButton,
    Field,
  },
  setup() {
    const schema = yup.object({
      name: yup.string().required("Name is required"),
      companyName: yup.string().required("Company name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      phone: yup.string().required("Phone number is required"),
      jobTitle: yup.string().required("Job title is required"),
      deployment: yup.string().required("Please select deployment interest"),
      dataVolume: yup.string().required("Please select expected data volume"),
      help: yup.string(),
      terms: yup
        .boolean()
        .oneOf([true], "You must accept the terms and conditions"),
    });

    const deploymentOptions = [
      { value: "cloud", label: "Cloud" },
      { value: "self-hosted", label: "Self Hosted" },
    ];

    const dataVolumeOptions = [
      { value: "small", label: "< 100GB/day" },
      { value: "medium", label: "100GB - 1TB/day" },
      { value: "large", label: "> 1TB/day" },
    ];

    const handleSubmit = (values) => {
      console.log("Form submitted:", values);
    };

    return {
      schema,
      deploymentOptions,
      dataVolumeOptions,
      handleSubmit,
    };
  },
};
</script>
<!-- SampleForm.vue -->
<template>
  <div class="">
    <BaseForm :schema="schema" :onSubmit="handleSubmit" class="">
      <CustomInput name="name" label="Name" placeholder="Enter here" />

      <CustomInput
        name="companyName"
        label="Company Name"
        placeholder="Enter here"
      />

      <CustomInput
        name="email"
        label="Email address"
        type="email"
        placeholder="Enter here"
      />

      <CustomInput
        name="phone"
        label="Phone Number"
        type="tel"
        placeholder="Enter here"
      />

      <CustomInput name="jobTitle" label="Job Title" placeholder="Enter here" />

      <CustomSelect
        name="deployment"
        label="Deployment Interest"
        placeholder="Select deployment"
        :options="deploymentOptions"
      />

      <CustomSelect
        name="dataVolume"
        label="Expected Data Volume"
        placeholder="Select data volume"
        :options="dataVolumeOptions"
      />

      <div class="input-group">
        <label class="text-sm text-gray-200">How can we help?</label>
        <Field name="help" v-slot="{ field, errorMessage }">
          <textarea
            v-bind="field"
            class="w-full bg-[#23282C] text-white border border-[#43484C] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your use case, goals, or questions."
            rows="4"
          ></textarea>
          <span v-if="errorMessage" class="text-xs text-red-500">{{
            errorMessage
          }}</span>
        </Field>
      </div>

      <div class="flex items-center gap-2">
        <Field name="terms" type="checkbox" v-slot="{ field, errorMessage }">
          <div>
            <input
              type="checkbox"
              v-bind="field"
              class="rounded bg-gray-700 border-gray-600"
            />
            <span v-if="errorMessage" class="text-xs text-red-500 block">{{
              errorMessage
            }}</span>
          </div>
        </Field>
        <label class="text-sm text-gray-200">
          I confirm I have read and agree to OpenObserve's
          <a href="#" class="text-blue-500">Terms and Conditions</a>.
        </label>
      </div>

      <CustomButton variant="secondary" type="submit">
        SUBMIT REQUEST
      </CustomButton>
    </BaseForm>
  </div>
</template>
