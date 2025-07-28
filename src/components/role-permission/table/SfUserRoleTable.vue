<template>
  <q-table
    :title="$t('user_role')"
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
        :disabled="!userProp?.user_id"
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
  <!-- <q-dialog v-model="flgAddDlg">
    <q-card :style="addDlgSize">
      <q-card-section class="text-h6">
        {{ $t("please_choose_permission") }}
      </q-card-section>
      <q-separator />
      <q-card-section>
        <ws-available-role-for-user-role-table
          :user="userProp"
          @onSuccess="onSuccessAddPermission"
        />
      </q-card-section>
    </q-card>
  </q-dialog> -->
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { notificationStore } from "/src/stores/notification";
import { sfapiStore } from "/src/stores/sfapi";

const props = defineProps({
  user: { type: Object },
});
const emit = defineEmits(["onSuccess", "update:selected"]);
const q = useQuasar();
const { t } = useI18n();
const loading = ref(false);
const rows = ref([]);

const route = useRoute();
const router = useRouter();
const api = sfapiStore();
const notification = notificationStore();

const columns = ref([
  { name: "index", align: "center", label: "#", field: "index" },
  {
    name: "role_name",
    align: "left",
    label: t("role_name"),
    field: "role_name",
  },
  {
    name: "action",
    align: "center",
    label: t("action"),
    field: "action",
    sortable: false,
  },
]);
const userProp = ref(props.user);
const selectedList = ref([]);
const filter = ref({
  keyword: "",
  active: "ALL",
  user_id: userProp.value?.user_id,
});
const selectedItem = ref({});
const flgAddDlg = ref(false);
const flgConfirmationDlg = ref(false);

const addDlgSize = ref({
  height: q.screen.height * 0.6 + "px",
  width: q.screen.width * 0.6 + "px",
});

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
      apiName: "roleAndPermission/getUserRoleList",
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

async function deleteUserRole() {
  const result = await api.delete({
    param: { user_role_id: selectedItem.value.user_role_id },
    apiName: "roleAndPermission/deleteUserRole",
  });
  if (result.success) {
    notification.success("Success");
    refresh();
  }
  return result?.success;
}

function showConfirmDeleteDlg(data) {
  selectedItem.value = data;
  let dataToShow = { role_name: data.role_name };
  const dlg = q
    .dialog({
      component: "SfYesNoDlg",
      componentProps: {
        msg: t("are_you_sure_delete_this_data"),
        data: dataToShow,
      },
    })
    .onOk(async () => {
      if (await deleteUserRole()) {
        dlg.hide();
      }
    });
}

function showAddDlg() {
  const dlg = q
    .dialog({
      component: "SfAvailableRoleForUserRoleDlg",
      componentProps: {
        user: userProp,
      },
    })
    .onOk(async () => {
      dlg.hide();
      refresh();
    });
}

onMounted(() => {
  refresh();
});
watch(
  () => props.user,
  (newParam, oldParam) => {
    userProp.value = newParam;
    filter.value.user_id = newParam?.user_id;
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
</script>
