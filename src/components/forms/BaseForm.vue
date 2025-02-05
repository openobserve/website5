<!-- BaseForm.vue -->
<template>
  <Form :validation-schema="schema" @submit="onSubmit" v-slot="{ errors }">
    <div class="space-y-4">
      <slot :errors="errors"></slot>
    </div>
  </Form>
</template>

<script>
import { Form } from "vee-validate";

export default {
  name: "BaseForm",
  components: {
    Form,
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
  },
};
</script>
