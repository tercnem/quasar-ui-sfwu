<template>
  <q-page>
    <div class="row">
      <div class="col-6 q-pa-sm">
        <div class="row">
          <div class="col text-center text-h5 text-weight-medium">
            {{ $t("user") }}
          </div>
        </div>
        <div class="row">
          <div class="col">
            <sf-user-for-user-role-table v-model:selected="selected" />
          </div>
        </div>
      </div>
      <div class="col-6 q-pa-sm">
        <div class="row">
          <div class="col text-center text-h5 text-weight-medium">
            {{ $t("role") }}
          </div>
        </div>
        <div class="row">
          <div class="col">
            <sf-user-role-table v-model:user="selected" />
          </div>
        </div>
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
const selected = ref({});

watch(
  () => {},
  (newParam, oldParam) => {},
);

onMounted(() => {
  //getData();
});
</script>
