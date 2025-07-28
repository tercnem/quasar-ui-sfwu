<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $t("confirmation") }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-xm">
        <div class="row">
          <div class="col text-subtitle1">{{ msgProp }}</div>
        </div>
        <div class="row q-pa-sm" v-if="columns.length > 0">
          <div class="col">
            <q-table
              :rows="rows"
              :columns="columns"
              dense
              hide-pagination
              wrap-cells
              flat
              bordered
            >
              <template v-slot:body="props">
                <q-tr :props="props" no-hover>
                  <q-td
                    :props="props"
                    v-for="col in props.cols"
                    :key="col.field"
                  >
                    {{ props.row[col.field] }}
                  </q-td></q-tr
                >
              </template>
            </q-table>
          </div>
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn :label="$t('no')" color="warning" v-close-popup />
        <q-btn :label="$t('yes')" color="primary" @click="emitOk" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
  data: {
    type: Object || Array || String,
    required: false,
  },
});

const emit = defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome
const { t } = useI18n();
const columns = ref([]);
const rows = ref([]);
const msgProp = ref(props.msg);

if (typeof props.data === "object" && props.data !== null) {
  columns.value = [];
  rows.value = [];
  for (var key of Object.keys(props.data)) {
    columns.value.push({
      name: key,
      align: "left",
      label: t(key),
      field: key,
    });
  }
  columns.value.reverse();
  rows.value.push(props.data);
  rows.value.reverse();
}

if (Array.isArray(props.data) && props.data.length > 0) {
  columns.value = [];
  rows.value = [];
  for (var key of Object.keys(props.data[0])) {
    columns.value.push({
      name: key,
      align: "left",
      label: t(key),
      field: key,
    });
  }
  props.data.forEach(function (item, idx) {
    rows.value.push(item);
  });
  //columns.value.reverse();
  //rows.value.reverse();
}

if (typeof props.data === "string" || props.data instanceof String) {
  columns.value = [];
  rows.value = [];
  columns.value.push({
    name: "data",
    align: "left",
    label: t("data"),
    field: "data",
  });
  rows.value.push({ data: props.data });
  columns.value.reverse();
  rows.value.reverse();
}

function emitOk() {
  emit("ok");
}
</script>
