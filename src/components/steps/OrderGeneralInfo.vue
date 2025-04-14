<template>
    <el-card shadow="always" class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 1.5em;">Información general de la orden</span>
      </div>
      <div>
        <el-row>
          <el-col>
            <h4>Tipo de orden</h4>
            <el-radio-group v-model="orderGeneralData.type_order">
              <el-radio label="Fabricación" value="fabricacion" />
              <el-radio label="Descargue inventario" value="descargue_inventario" />
              <el-radio label="Servicio Post Venta" value="servicio_post_venta" />
            </el-radio-group>
          </el-col>
        </el-row>
  
        <el-divider></el-divider>
  
        <el-form label-position="top">
          <el-row :gutter="6">
            <el-col :span="12">
              <el-form-item label="Cliente">
                <el-input v-model="orderGeneralData.client" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Nit">
                <el-input v-model="orderGeneralData.nit" />
              </el-form-item>
            </el-col>
          </el-row>
  
          <el-row style="padding-top: 1%" :gutter="6">
            <el-col :span="12">
              <el-form-item label="Dirección de Entrega (confirmada)">
                <el-input v-model="orderGeneralData.delivery_address" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Orden de compra">
                <el-input v-model="orderGeneralData.purchase_order" />
              </el-form-item>
            </el-col>
          </el-row>
  
          <el-row style="padding-top: 1%" :gutter="6">
            <el-col :span="12">
              <el-form-item label="Contacto comercial">
                <el-input v-model="orderGeneralData.business_contact" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Teléfono contacto">
                <el-input v-model="orderGeneralData.phone_contact" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </template>
  
  <script lang="ts" setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    orderGeneralData: {
      type: Object,
      required: true,
    },
  });
  </script>