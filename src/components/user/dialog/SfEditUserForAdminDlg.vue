<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card :style="cardStyle">
      <q-card-section class="text-h5 text-weight-medium text-center">
        {{ $t("edit_user") }}
      </q-card-section>
      <q-separator />
      <q-tabs
        v-model="tab"
        dense
        left-icon
        active-color="white"
        indicator-color="primary"
        active-class="bg-primary"
      >
        <q-tab
          name="profile"
          icon="fa-regular fa-user"
          :label="$t('profile')"
        />
        <q-tab
          name="password"
          icon="fa-solid fa-lock"
          :label="$t('password')"
        />
      </q-tabs>

      <q-separator />
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel name="profile" class="q-gutter-sm">
          <div class="row">
            <div class="col">
              <q-input
                outlined
                :label="$t('username')"
                v-model="form.username"
                readonly
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                outlined
                :label="$t('email')"
                v-model="form.email"
                readonly
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input outlined :label="$t('name')" v-model="form.name" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              {{ $t("active") }}
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-btn-toggle
                class="bordered"
                unelevated
                v-model="form.active"
                toggle-color="primary"
                :options="[
                  { label: $t('yes'), value: 'Y' },
                  { label: $t('no'), value: 'N' },
                ]"
              />
            </div>
          </div>

          <!-- <div class="row q-gutter-sm">
            <div class="column">
              <q-btn :label="$t('cancel')" color="warning" v-close-popup />
            </div>
            <div class="column">
              <q-btn :label="$t('save')" color="primary" @click="editUser" />
            </div>
          </div> -->
        </q-tab-panel>

        <q-tab-panel name="password" class="q-gutter-sm">
          <div class="row">
            <div class="col">
              <q-input
                outlined
                :label="$t('new_password')"
                v-model="form.newPassword"
                type="password"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                outlined
                :label="$t('confirm_password')"
                v-model="form.confirmPassword"
                type="password"
              />
            </div>
          </div>
          <!-- <div class="row q-gutter-sm">
            <div class="column">
              <q-btn :label="$t('cancel')" color="warning" v-close-popup />
            </div>
            <div class="column">
              <q-btn
                :label="$t('save')"
                color="primary"
                @click="changePassword"
              />
            </div>
          </div> -->
        </q-tab-panel>
      </q-tab-panels>
      <q-card-actions>
        <q-btn :label="$t('cancel')" color="warning" v-close-popup />
        <q-btn
          :label="$t('save')"
          color="primary"
          @click="changePassword()"
          v-if="tab == 'password'"
        />
        <q-btn
          :label="$t('save')"
          color="primary"
          @click="editUser()"
          v-if="tab == 'profile'"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useQuasar, useDialogPluginComponent, Loading } from "quasar";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import { userDataStore } from "/src/stores/userData";
import { notificationStore } from "/src/stores/notification";
import { sfapiStore } from "/src/stores/sfapi";
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

const q = useQuasar();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const api = sfapiStore();
const userData = userDataStore();
const notification = notificationStore();
const tab = ref("profile");
const splitter = ref(20);
const userProp = ref(props.user);
const cardStyle = ref({});
cardStyle.value.width = q.screen.sizes.md + "px";

const form = ref({
  username: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  newPassword: "",
});

async function editUser() {
  Loading.show();
  const result = await api.call({
    param: {
      name: form.value.name,
      user_id: userProp.value.user_id,
      active: form.value.active,
    },
    apiName: "user/editUserForAdmin",
    loading: true,
    showErrorNotification: true,
  });
  Loading.hide();
  if (result.success) {
    emit("ok");
    onDialogOK();
    notification.success("Success");
  }
}

async function changePassword() {
  Loading.show();
  const result = await api.call({
    param: {
      new_password: form.value.newPassword,
      confirm_password: form.value.confirmPassword,
      user_id: userProp.value.user_id,
    },
    apiName: "user/changePasswordForAdmin",
    loading: true,
    showErrorNotification: true,
  });
  Loading.hide();
  if (result.success) {
    emit("ok");
    onDialogOK();
    notification.success("Success");
  }
}

async function findUserById() {
  if (userProp.value?.user_id) {
    const result = await api.call({
      param: { user_id: userProp.value.user_id },
      apiName: "user/findUserById",
      loading: true,
      showErrorNotification: true,
    });
    if (result.success) {
      form.value.username = result.data.username;
      form.value.name = result.data.name;
      form.value.email = result.data.email;
      form.value.active = result.data.active;
      //notification.showSuccess("Success");
    }
  }
}

watch(
  () => {},
  (newParam, oldParam) => {},
);

onMounted(() => {
  findUserById();
});
</script>
