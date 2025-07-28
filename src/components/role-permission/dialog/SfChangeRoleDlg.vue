<template>
  <!-- <q-page> gunakan jika sebagai page -->
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card>
      <!-- <q-card-section>
        <div class="text-h5">{{ $t("add_user") }}</div>
      </q-card-section> -->
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $t("change_role") }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-gutter-sm">
        <div class="row">
          <div class="col">
            <sf-available-role-list-combo v-model="selectedRole" />
          </div>
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn :label="$t('cancel')" color="warning" v-close-popup />
        <q-btn :label="$t('yes')" color="primary" @click="changeRole()" />
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
  modelValue: {
    type: Boolean,
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

// this is part of our example (so not required)
function onOKClick() {
  emit("ok");
  dialogRef.value.hide();
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  //onDialogOK();
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}

const q = useQuasar();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const api = sfapiStore();
const userData = userDataStore();
const notification = notificationStore();
const flgDlgProp = ref(props.flgDialog);
const selectedRole = ref({});

const form = ref({
  role_name: "",
});

async function changeRole() {
  const result = await api.call({
    param: { role_id: selectedRole.value.role_id },
    apiName: "roleAndPermission/changeRole",
    loading: true,
    showErrorNotification: true,
  });
  if (result.success) {
    userData.role = result.data.user.role_name;
    q.localStorage.set("permissions", result.data.user.permissions);
    q.cookies.set("role", result.data.user.role_name, {
      expires: userData.cookiesExpire,
      sameSite: "Strict",
      secure: true,
      path: "/",
    });
    onDialogOK();
    notification.showSuccess("Success");
  }
}

watch(
  () => {},
  (newParam, oldParam) => {},
);

onMounted(() => {});
</script>
