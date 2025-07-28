<template>
  <q-table
    :title="$t('user')"
    bordered
    :rows="rows"
    :columns="columns"
    :row-key="(row) => row.user_id"
    :wrap-cells="true"
    v-model:pagination="pagination"
    :loading="loading"
    :filter="filter"
    virtual-scroll
    separator="horizontal"
    selection="single"
    v-model:selected="selected"
    @request="onRequest"
  >
    <template v-slot:top-right>
      <q-input
        dense
        outlined
        debounce="300"
        v-model="filter.keyword"
        :placeholder="$t('keyword')"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:body-cell-index="props">
      <q-td :props="props">
        <div>{{ props.rowIndex + 1 }}</div>
      </q-td>
    </template>
    <template v-slot:body-cell-action="props">
      <q-td :props="props">
        <q-btn :label="$t('action')" size="sm" color="primary">
          <q-menu bordered>
            <q-list>
              <q-item clickable v-ripple @click="showEditDlg(props.row)">
                {{ $t("edit") }}
              </q-item>
              <q-separator />
              <q-item clickable v-ripple @click="confirmLogout(props.row)">
                {{ $t("logout") }}
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { sfapiStore } from "/src/stores/sfapi";
import { notificationStore } from "/src/stores/notification";
// import WsConfirmDialog from "../../dialog/WsConfirmDialog.vue";
// import WsEditUserForAdminDialog from "../../dialog/WsEditUserForAdminDialog.vue";
// const props = defineProps({
//   user: {
//     type: Object,
//     required: false,
//   },
// // });
const emit = defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
]);

const q = useQuasar();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const api = sfapiStore();
const notification = notificationStore();
const loading = ref(false);
const rows = ref([]);
const columns = ref([
  { name: "index", align: "center", label: "#", field: "index" },
  {
    name: "username",
    align: "left",
    label: t("username"),
    field: "username",
    sortable: true,
  },
  {
    name: "name",
    align: "left",
    label: t("name"),
    field: "name",
  },
  {
    name: "email",
    align: "left",
    label: t("email"),
    field: "email",
  },
  {
    name: "login_session",
    align: "left",
    label: t("login_session"),
    field: "login_session",
  },
  {
    name: "active",
    align: "left",
    label: t("active"),
    field: "active",
  },
  {
    name: "action",
    align: "center",
    label: t("action"),
    field: "action",
    sortable: false,
  },
]);
const selected = ref([]);
const filter = ref({ keyword: "", active: "ALL" });
const selectedItem = ref({});
const flgConfirmationDlg = ref(false);
const roleName = ref();

const pagination = ref({
  sortBy: "username",
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

async function onRequest(prm) {
  const { page, rowsPerPage, sortBy, descending } = prm.pagination;
  const filterProp = prm.filter;
  loading.value = true;

  const fetchCount =
    rowsPerPage == 0 ? pagination.value.rowsNumber : rowsPerPage;
  const startRow = (page - 1) * rowsPerPage;
  const defParam = {
    limit: fetchCount,
    offset: startRow,
    order_by: sortBy,
    order_by_type: descending ? "DESC" : "ASC",
  };
  const param = Object.assign({}, defParam, filterProp);
  const response = await api.call({
    param: param,
    apiName: "user/getUserList",
    loading: false,
    showErrorNotification: true,
  });
  if (response.success) {
    pagination.value.rowsNumber = response.data.total_rows;
    rows.value.splice(0, rows.value.length, ...response.data.datalist);
  }
  loading.value = false;

  pagination.value.page = page;

  pagination.value.rowsPerPage = rowsPerPage;
  if (!response?.data?.total_rows && response?.data?.total_rows == 0) {
    pagination.value.rowsPerPage = 10;
  }
  pagination.value.sortBy = sortBy;
  pagination.value.descending = descending;
}

function confirmLogout(data) {
  const dlg = q
    .dialog({
      componentProps: {
        data: { username: data.username },
        msg: t("are_you_sure_logout_this_user"),
      },
      component: "SfYesNoDlg",
    })
    .onOk(() => {
      console.log("anu");
      console.log("anu :");
      //dlg.hide();
    })
    .hide();
}

function showEditDlg(data) {
  selectedItem.value = data;
  q.dialog({
    component: "SfEditUserForAdminDlg",
    componentProps: { user: data },
  }).onOk(() => refresh());
}

function refresh() {
  //getData();
  onRequest({
    pagination: pagination.value,
    filter: filter.value,
  });
}

watch(
  () => selected.value,
  (newParam, oldParam) => {
    emit("update:selected", newParam[0] == null ? {} : newParam[0]);
  },
);

onMounted(() => {
  refresh();
});

defineExpose({ refresh });
</script>
