<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  align: {
    type: String,
    default: "CENTER",
    validator: (value) => ["LEFT", "CENTER", "RIGHT"].includes(value),
  },
});

const alignClass = computed(() => {
  const alignment = {
    LEFT: "text-left",
    CENTER: "text-center",
    RIGHT: "text-right",
  };
  return alignment[props.align] || "text-center"; // default to 'text-center'
});
</script>