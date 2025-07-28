<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col">
        <q-card>
          <q-card-section>
            <div class="row q-pb-sm q-gutter-sm">
              <div class="column">
                <q-btn
                  :label="$t('search')"
                  color="primary"
                  @click="tableRef.refresh()"
                />
              </div>
              <div class="column">
                <q-btn
                  :label="$t('add')"
                  color="positive"
                  @click="ShowAddDlg()"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <sf-user-table ref="tableRef" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const q = useQuasar();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const selectedRole = ref({});
const tableRef = ref();

function ShowAddDlg() {
  q.dialog({ component: "SfAddUserDlg" }).onOk(() => {
    tableRef.value.refresh();
  });
}

watch(
  () => {},
  (newParam, oldParam) => {},
);

onMounted(() => {
  //getData();
});
</script>
