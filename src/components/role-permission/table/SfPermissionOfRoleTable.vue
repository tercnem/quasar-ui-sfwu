<template>
  <q-table
    :title="$t('permission_of_role')"
    bordered
    :rows="rows"
    :columns="columns"
    :row-key="(row) => row.id"
    :wrap-cells="true"
    v-model:pagination="pagination"
    :loading="loading"
    :filter="filter"
    virtual-scroll
    separator="horizontal"
    @request="onRequest"
  >
    <template v-slot:top-left>
      <q-btn
        :label="$t('add')"
        size="sm"
        color="primary"
        @click="showAddDlg()"
        :disabled="!roleProp.role_id"
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
          @click="showConfirmDlg(props.row)"
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
  role: { type: Object },
});
const emit = defineEmits(["onSuccess"]);

const q = useQuasar();
const { t } = useI18n();
const loading = ref(false);
const rows = ref([]);
const selected = ref([]);
const route = useRoute();
const router = useRouter();
const api = sfapiStore();
const notification = notificationStore();

const columns = ref([
  { name: "index", align: "center", label: "#", field: "index" },
  {
    name: "permission_group",
    align: "left",
    label: t("permission_group"),
    field: "permission_group",
  },
  {
    name: "permission_name",
    align: "left",
    label: t("permission_name"),
    field: "permission_name",
  },
  {
    name: "action",
    align: "center",
    label: t("action"),
    field: "action",
    sortable: false,
  },
]);
const filter = ref({
  role_id: props.role?.role_id,
  keyword: "",
  active: "ALL",
});
const selectedItem = ref({});
const flgAddDlg = ref(false);
const flgConfirmationDlg = ref(false);
const roleProp = ref(props.role);
const addDlgSize = ref({
  height: q.screen.height * 0.6 + "px",
  width: q.screen.width * 0.6 + "px",
});

const pagination = ref({
  sortBy: "permission_group",
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
  if (filterProp?.role_id != null) {
    response = await api.call({
      param: param,
      apiName: "roleAndPermission/getPermissionOfRoleList",
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

async function deletePermissionOfRole() {
  const result = await api.delete({
    param: { id: selectedItem.value.id },
    apiName: "roleAndPermission/deletePermissionOfRole",
  });
  if (result.success) {
    notification.success("Success");
    flgConfirmationDlg.value = false;
    refresh();
  }
}

function showConfirmDlg(data) {
  selectedItem.value = data;
  let dataToShow = Object.assign({}, data);
  delete dataToShow["id"];
  delete dataToShow["role_name"];
  const dlg = q
    .dialog({
      component: "SfYesNoDlg",
      componentProps: {
        msg: t("are_you_sure_delete_this_data"),
        data: dataToShow,
      },
    })
    .onOk(() => {
      deletePermissionOfRole();
      dlg.hide();
    });
}

function showAddDlg() {
  const dlg = q
    .dialog({
      component: "SfAvailablePermissionForRoleDlg",
      componentProps: {
        role: roleProp,
      },
    })
    .onOk(() => {
      dlg.hide();
      refresh();
    });
}

onMounted(() => {
  refresh();
});
watch(
  () => props.role,
  (newParam, oldParam) => {
    roleProp.value = newParam;
    filter.value.role_id = roleProp.value?.role_id;
    refresh();
  },
);

function refresh() {
  //getData();
  onRequest({
    pagination: pagination.value,
    filter: filter.value,
  });
}

function onSuccessAddPermission() {
  flgAddDlg.value = false;
  refresh();
}
defineExpose({ refresh });
</script>
