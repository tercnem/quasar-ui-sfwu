<template>
  <q-page>
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    /> -->
    <div class="row">
      <div class="column">
        <SfDatePicker v-model="date" label="tanggal" />
      </div>
    </div>
    <div class="row">
      <div class="column">
        <SfDatetimePicker v-model="datetime" label="tanggal" /> {{ datetime }}
      </div>
    </div>
    <div class="row">
      <div class="column">
        <SfMonthPicker v-model="month" label="tanggal" /> {{ month }}
      </div>
    </div>
    <div class="row">
      <div class="column"></div>
    </div>
    <div class="row">
      <div class="column">
        <q-btn label="show dlg" @click="tbl.refresh()" />
      </div>
      <div class="column">
        <q-btn label="show chenge role" @click="showDlg()" />
      </div>
      <div class="column">
        <q-btn label="login" @click="login()" />
      </div>
    </div>
    <SfUserTable ref="tbl" />
  </q-page>
</template>

<script setup>
import { Loading, useQuasar } from "quasar";
import { readonly, ref } from "vue";
import SfDatePicker from "src/components/datetime/SfDatePicker.vue";
import SfDatetimePicker from "src/components/datetime/SfDatetimePicker.vue";
import SfMonthPicker from "src/components/datetime/SfMonthPicker.vue";
import SfUserTable from "src/components/user/table/SfUserTable.vue";
import { authStore } from "src/stores/auth";

const q = useQuasar();
const date = ref("");
const datetime = ref("");
const month = ref("");
const time = ref("");
const auth = authStore();
const tbl = ref();

function showDlg() {
  q.dialog({ component: "SfChangeRoleDlg" });
}

async function login() {
  const res = auth.login({ username: "superadmin", password: "password" }, "");
}
</script>
