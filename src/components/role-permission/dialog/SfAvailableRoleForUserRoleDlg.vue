<template>
  <!-- <q-page> gunakan jika sebagai page -->
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card>
      <!-- <q-card-section>
        <div class="text-h5">{{ $t("add_user") }}</div>
      </q-card-section> -->
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $t("available_role") }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-gutter-sm">
        <div class="row">
          <div class="col">
            <SfAvailableRoleForUserRoleTable
              :user="userProp"
              @success="onDialogOK()"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn :label="$t('cancel')" color="warning" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- </q-page> -->
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { userDataStore } from "/src/stores/userData";
import { notificationStore } from "/src/stores/notification";
import { sfapiStore } from "/src/stores/sfapi";
import { useDialogPluginComponent } from "quasar";

const props = defineProps({
  user: {
    type: Object,
    required: true,
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
const q = useQuasar();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const api = sfapiStore();
const userData = userDataStore();
const notification = notificationStore();
const userProp = ref(props.user);

watch(
  () => {},
  (newParam, oldParam) => {},
);

onMounted(() => {});
</script>
