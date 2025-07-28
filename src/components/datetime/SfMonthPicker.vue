<template>
  <q-field
    label-slot
    stack-label
    outlined
    :bottom-slots="hintProp != null && hintProp != ''"
    :readonly="props.readOnly"
    :error="props.error"
    :error-message="props.errorMessage"
  >
    <template v-slot:append>
      <q-icon name="event"></q-icon>
    </template>
    <template v-slot:label>
      <div class="row col">
        {{ props.label }}
        <div class="text-negative" v-if="props.required">*</div>
      </div>
    </template>
    <template v-slot:control>
      <div class="self-center full-width no-outline" tabindex="0">
        {{ displayMonth(model) }}
      </div>
    </template>
    <template v-slot:hint>
      <div class="text-red">{{ hintProp }}</div>
    </template>
    <q-popup-proxy
      :no-parent-event="props.readOnly"
      ref="dateProxy"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-date
        v-model="model"
        mask="YYYY-MM"
        color="primary"
        title
        minimal
        :years-in-month-view="true"
        default-view="Months"
        @update:model-value="onInputEmit"
        :emit-immediately="true"
      >
        <div class="row items-center justify-end">
          <q-btn v-close-popup :label="$t('close')" color="primary" flat />
        </div>
      </q-date>
    </q-popup-proxy>
  </q-field>
</template>
<script setup>
import {} from "quasar";
//import { defineComponent, ref, watch } from "vue";
import { ref, watch } from "vue";
import { displayMonth } from "/src/utils/dateutil";

const props = defineProps({
  readOnly: {
    type: Boolean,
    required: false,
    default: false,
  },
  error: {
    type: Boolean,
    required: false,
    default: null,
  },
  errorMessage: {
    type: String,
    required: false,
    default: "",
  },
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  hint: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: null,
  },
});
const emit = defineEmits(["update:modelValue"]);
const dateProxy = ref();
const model = ref(props.modelValue);
const labelProp = ref(props.label);
const hintProp = ref(props.hint);

watch(
  () => props.modelValue,
  (newModelValue, oldModelValue) => {
    model.value = newModelValue;
  },
);
function onInputEmit(value) {
  dateProxy.value.hide();

  emit("update:modelValue", value);
}
function clearValue() {
  dateProxy.value.hide();
  emit("update:modelValue", "");
}
</script>
