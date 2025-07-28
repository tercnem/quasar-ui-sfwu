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
    :filter="filter"
    virtual-scroll
    separator="horizontal"
    selection="single"
    v-model:selected="selectedList"
    @request="onRequest"
  >
    <template v-slot:top-left>
      <q-btn
        :label="$t('add')"
        size="sm"
        color="primary"
        @click="showAddDlg()"
      />
    </template>
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
        <q-btn
          :label="$t('delete')"
          size="sm"
          color="negative"
          @click="showConfirmDeleteDlg(props.row)"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { notificationStore } from "/src/stores/notification";
import { sfapiStore } from "/src/stores/sfapi";

const props = defineProps({
  selected: { type: Object },
});
const emit = defineEmits(["onSuccess", "update:selected"]);

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
  },
  {
    name: "flg_system",
    align: "left",
    label: t("flg_system"),
    field: "flg_system",
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
    label: "ACTION",
    field: "action",
    sortable: false,
  },
]);
const selectedList = ref([]);
const filter = ref({ keyword: "", active: "ALL" });
const selectedItem = ref({});
const flgAddDlg = ref(false);
const flgConfirmationDlg = ref(false);
const roleName = ref();

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
  const response = await api.call({
    param: param,
    apiName: "roleAndPermission/getRoleList",
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

async function deleteRole() {
  const result = await api.delete({
    param: { role_id: selectedItem.value.role_id },
    apiName: "roleAndPermission/deleteRole",
  });
  if (result.success) {
    flgConfirmationDlg.value = false;
    notification.success("Success");
    refresh();
  }
}

function showAddDlg() {
  q.dialog({
    component: "SfAddRoleDlg",
    componentProps: {
      msg: t("are_you_sure_delete_this_data"),
      data: selectedItem.value,
    },
  }).onOk(() => refresh());
}
function showConfirmDeleteDlg(data) {
  selectedItem.value = data;
  let dataToShow = Object.assign({}, data);
  delete dataToShow["role_id"];
  const dlg = q
    .dialog({
      component: "SfYesNoDlg",
      componentProps: {
        msg: t("are_you_sure_delete_this_data"),
        data: dataToShow,
      },
    })
    .onOk(() => {
      deleteRole();
      dlg.hide();
    });
}

watch(
  () => selectedList.value,
  (newParam, oldParam) => {
    emit("update:selected", newParam[0] == null ? {} : newParam[0]);
  },
);

onMounted(() => {
  refresh();
});

function refresh() {
  //getData();
  onRequest({
    pagination: pagination.value,
    filter: filter.value,
  });
}
defineExpose({ refresh });
</script>
