<template>
    <el-card style="margin-bottom: 2%;" shadow="always" class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 1.5em;">Información de productos</span>
      </div>
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