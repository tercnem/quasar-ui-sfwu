<template>
  <q-list bordered dense>
    <q-item>
      <q-item-section>
        <q-item-label>{{ label }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item tag="label" v-ripple>
      <q-item-section avatar>
        <q-radio v-model="form.active" val="Y" color="teal" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("yes") }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item tag="label" v-ripple>
      <q-item-section avatar>
        <q-radio v-model="form.active" val="N" color="teal" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("no") }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  label: { type: String, Required },
  options: { type: Array, Required },
  vertical: { type: Boolean },
});
</script>
