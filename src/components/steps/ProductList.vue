<template>
  <el-card
  class="box-card" shadow="always">
    <div slot="header" class="clearfix">
      <h2 class="title">Información de productos</h2>
    </div>
    <div class="card-content">

      <el-table :data="productList" style="width: 100%" height="150">
        <el-table-column prop="standar_reference" label="Referencia" width="200">
        </el-table-column>
        <el-table-column prop="type_reference" label="Tipo de referencia" width="200">
        </el-table-column>
        <el-table-column prop="download_inventory" label="Descargue de inventario" width="200">
        </el-table-column>
        <el-table-column fixed="right" label="Operaciones" min-width="120">
          <template #default="scope">
            <el-button type="danger" size="small" @click.prevent="deleteRow(scope.$index)">
              Eliminar
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </el-card>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  productList: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['delete']);

const deleteRow = (index: number) => {
  emit('delete', index);
};
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 20px 0;
}

.box-card {
  margin-top: 10px;
  padding: 20px;
}
</style>