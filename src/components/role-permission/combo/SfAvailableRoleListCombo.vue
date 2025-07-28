<template>
  <q-select
    dense
    class="bg-grey-2"
    outlined
    v-model="selectedItem"
    input-debounce="300"
    :label="$t('role')"
    :options="options"
    :option-label="
      (opt) =>
        Object(opt) === opt && 'role_name' in opt ? opt.role_name : null
    "
    :option-value="
      (opt) => (Object(opt) === opt && 'role_id' in opt ? opt.role_id : -99)
    "
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">No results</q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, watch, onMounted } from "vue";
import { sfapiStore } from "/src/stores/sfapi";

const props = defineProps({
  modelValue: {
    type: Object,
  },
});
const emit = defineEmits(["update:modelValue", "onChangeRole"]);

const api = sfapiStore();
//const userData = userDataStore();
const options = ref([]);
//const keyword = ref("");
const selectedItem = ref(props.modelValue);

async function getData() {
  const result = await api.call({
    param: { active: "Y" },
    apiName: "roleAndPermission/getAvailableRoleListForCombo",
    loading: false,
    showErrorNotification: false,
  });
  if (result.success) {
    options.value = result.data;

    let selected = result.data.find((data) => {
      return data.flg_current_role == "Y";
    });

    selectedItem.value =
      selected != null
        ? selected
        : result.data.length > 0
          ? result.data?.[0]
          : {};
  } else {
    options.value = [];
  }
}

watch(
  () => selectedItem.value,
  async (newParam, oldParam) => {
    emit("update:modelValue", newParam);
  },
);
onMounted(() => {
  getData();
});
</script>
