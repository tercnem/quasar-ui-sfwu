<template>
  <q-field
    label-slot
    stack-label
    outlined
    :readonly="props.readOnly"
    :error="props.error"
    :error-message="props.errorMessage"
  >
    <template v-slot:append>
      <q-icon name="access_time"></q-icon>
    </template>
    <template v-slot:label>
      <div class="row col">
        {{ props.label }}
        <div class="text-negative" v-if="props.required">*</div>
      </div>
    </template>
    <template v-slot:control>
      <div class="self-center full-width no-outline" tabindex="0">
        {{ model }}
      </div>
    </template>
    <q-popup-proxy
      :no-parent-event="props.readOnly"
      transition-show="scale"
      transition-hide="scale"
      ref="timePickerProxy"
    >
      <q-time
        v-model="model"
        format24h
        @update:model-value="onInputEmit(model)"
        color="primary"
      >
        <div class="row items-center justify-end">
          <q-btn
            v-close-popup
            @click="clearValue"
            :label="$t('clear')"
            color="primary"
            flat
          />
          <q-btn v-close-popup :label="$t('close')" color="primary" flat />
        </div>
      </q-time>
    </q-popup-proxy>
  </q-field>
</template>
<script setup>
import { watch, ref } from "vue";
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
  required: {
    type: Boolean,
    default: null,
  },
});
const emit = defineEmits(["update:modelValue"]);
const qDateProxy = ref();
const timePickerProxy = ref();
const model = ref(props.modelValue);
const labelProp = ref(props.label);

watch(
  () => props.modelValue,
  (newModelValue, oldModelValue) => {
    model.value = newModelValue;
  },
);
function onInputEmit(value) {
  //timePickerProxy.value.hide();

  emit("update:modelValue", value);
}
function clearValue() {
  timePickerProxy.value.hide();
  emit("update:modelValue", "");
}
</script>
