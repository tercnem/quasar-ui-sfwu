<template>
  <q-table
    :title="$t('role')"
    bordered
    :rows="rows"
    :columns="columns"
    :row-key="(row) => row.role_id"
    :wrap-cells="true"
    v-model:pagination="pagination"
    :loading="loading"
    :filter="filterKeyword"
    virtual-scroll
    separator="horizontal"
    selection="multiple"
    v-model:selected="selectedList"
    @request="onRequest"
  >
    <template v-slot:top-left>
      <q-btn
        :label="$t('add')"
        size="sm"
        color="primary"
        @click="addPermission()"
        :disabled="selectedList.length == 0"
      />
    </template>
    <template v-slot:top-right>
      <q-input
        dense
        outlined
        debounce="300"
        v-model="filterKeyword"
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
  </q-table>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { notificationStore } from "/src/stores/notification";
import { sfapiStore } from "/src/stores/sfapi";
//import WsConfirmDialog from "../../dialog/WsConfirmDialog.vue";

const props = defineProps({
  user: { type: Object },
});
const emit = defineEmits(["success"]);

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
    name: "role_name",
    align: "left",
    label: t("role_name"),
    field: "role_name",
    sortable: true,
  },
  {
    name: "flg_system",
    align: "left",
    label: t("flg_system"),
    field: "flg_system",
  },
]);
const selectedList = ref([]);
const userProp = ref(props.user);
const filter = ref({
  keyword: "",
  active: "ALL",
  user_id: userProp.value?.user_id,
});
const selectedItem = ref({});
const flgConfirmationDlg = ref(false);

const pagination = ref({
  sortBy: "role_name",
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
  let response;
  if (filterProp?.user_id != null) {
    response = await api.call({
      param: param,
      apiName: "roleAndPermission/getAvailableRoleForUserRole",
      loading: false,
      showErrorNotification: true,
    });
    if (response.success) {
      pagination.value.rowsNumber = response.data.total_rows;
      rows.value.splice(0, rows.value.length, ...response.data.datalist);
    }
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

onMounted(() => {
  refresh();
});

async function addPermission() {
  let roleIdList = [];
  selectedList.value.forEach((element) => {
    roleIdList.push(element.role_id);
  });
  const param = {
    user_id: userProp.value.user_id,
    role_id_list: roleIdList,
  };
  const response = await api.add({
    param: param,
    apiName: "roleAndPermission/addUserRole",
  });
  if (response.success) {
    notification.success("Success");
    emit("success");
  }
}

function refresh() {
  //getData();
  onRequest({
    pagination: pagination.value,
    filter: filter.value,
  });
}
</script>
