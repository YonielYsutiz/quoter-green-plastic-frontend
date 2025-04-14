<template>
  <el-col :span="24">
    <el-card shadow="always" class="box-card">
      <h2 class="section-title">Datos de la factura</h2>

      <el-form-item label="Número de Factura">
        <el-input v-model="invoiceGeneralData.invoice_number" />
      </el-form-item>

      <el-form-item label="Número de Remisión">
        <el-input v-model="invoiceGeneralData.remission_number" />
      </el-form-item>

      <el-form-item label="Fecha de Orden de Trabajo (OT)">
        <el-date-picker v-model="invoiceGeneralData.ot_date" type="date" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="Fecha de Entrega">
        <el-date-picker v-model="invoiceGeneralData.delivery_date" type="date" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="Fecha de Fabricación">
        <el-date-picker v-model="invoiceGeneralData.date_of_manufacture" type="date" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="Comercial a Cargo">
        <el-input v-model="invoiceGeneralData.commercial_in_charge" />
      </el-form-item>

      <h2 class="section-title">Cálculos de transporte</h2>

      <el-form-item>
        <el-checkbox v-model="transportWithIVA">Facturar transporte con IVA</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="transportIncluded">Transporte incluido en el precio</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="OTWithoutTransport">Orden de Trabajo sin valor de transporte para cliente</el-checkbox>
      </el-form-item>

      <el-form-item label="Valor">
        <el-input v-model="transportValue" />
      </el-form-item>

      <el-form-item label="Cotización o estimado a pagar por el transporte">
        <el-input v-model="transportEstimate" />
      </el-form-item>

      <h2 class="section-title">Totales</h2>

      <el-form-item label="Unidades de Fabricación">
        <el-input v-model="invoiceGeneralData.manufacturing_units" />
      </el-form-item>

      <el-form-item label="Unidades de Descargue">
        <el-input v-model="invoiceGeneralData.units_downloads" />
      </el-form-item>

      <el-form-item label="Cotización">
        <el-input v-model="invoiceGeneralData.quoter" />
      </el-form-item>

      <el-form-item label="Valor total en factura">
        <el-input v-model="invoiceGeneralData.invoice_total_value" />
      </el-form-item>

      <h2 class="section-title">Tipo de trabajo</h2>

      <el-form-item>
        <el-radio-group v-model="workType">
          <el-radio label="POST VENTA">POST VENTA</el-radio>
          <el-radio label="GARANTIA">GARANTÍA</el-radio>
          <el-radio label="CALIDAD">CALIDAD</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Describa el trabajo a realizar y la razón">
        <el-input v-model="workDescription" type="textarea" />
      </el-form-item>

      <div class="button-group">
        <el-button type="success" @click="createOrder">Crear orden</el-button>
        <el-button @click="clearForm">Limpiar</el-button>
      </div>
    </el-card>
  </el-col>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  invoiceGeneralData: {
    type: Object,
    required: true,
  },
  orderTerms: {
    type: Object,
    default: null,
  },
});

const transportWithIVA = ref(false);
const OTWithoutTransport = ref(false);
const transportIncluded = ref(false);
const transportValue = ref(0);
const transportEstimate = ref(0);
const workType = ref('POST VENTA');
const workDescription = ref('');

const createOrder = () => {
  // lógica para crear orden
};

const clearForm = () => {
  // lógica para limpiar formulario
};
</script>

<style scoped>
.box-card {
  margin-top: 20px;
  padding: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin: 30px 0 15px;
}

.button-group {
  margin-top: 30px;
  text-align: right;
}

@media (max-width: 768px) {
  .button-group {
    text-align: center;
  }
}
</style>


