<template>

  <el-card shadow="always" class="box-card">
    <div slot="header">
      <h1 class="title">Datos generales de la factura</h1>
    </div>

    <div class="card-content">
      <el-form label-position="top" :model="form" :rules="rules" ref="formRef">
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="Número de Factura" prop="invoice_number">
              <el-input v-model="form.invoice_number" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Número de Remisión" prop="remission_number">
              <el-input v-model="form.remission_number" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="Fecha de Orden de Trabajo (OT)" prop="ot_date">
              <el-date-picker v-model="form.ot_date" type="date" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Fecha de Entrega" prop="delivery_date">
              <el-date-picker v-model="form.delivery_date" type="date" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="Fecha de Fabricación" prop="date_of_manufacture">
              <el-date-picker v-model="form.date_of_manufacture" type="date" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Comercial a Cargo" prop="commercial_in_charge">
              <el-input v-model="form.commercial_in_charge" />
            </el-form-item>
          </el-col>
        </el-row>

        <div>
          <h2 class="section-title">Cálculos de transporte</h2>
          <div class="checkbox-group">
            <el-form-item prop="ot_without_transport_value">
              <el-checkbox v-model="form.ot_without_transport_value" value="1">
                Orden de Trabajo sin valor de transporte para cliente
              </el-checkbox>
            </el-form-item>
            <el-form-item prop="transport_invoice_with_iva">
              <el-checkbox v-model="form.transport_invoice_with_iva" value="1">
                Facturar transporte con IVA
              </el-checkbox>
            </el-form-item>
            <el-form-item prop="transport_include_in_price">
              <el-checkbox v-model="form.transport_include_in_price" value="1">
                Transporte incluido en el precio
              </el-checkbox>
            </el-form-item>
          </div>
          <div>

          </div>
        </div>

        <div>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="Valor" prop="transport_include_in_price_value">
                <el-input-number :min="1" v-model="form.transport_include_in_price_value" style="width: 100%;"
                  controls-position="right" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Cotización o estimado a pagar por el transporte" prop="transport_total_value">
                <el-input-number :min="1" v-model="form.transport_total_value" style="width: 100%;"
                  controls-position="right" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>


        <div>
          <h2 class="section-title">Totales</h2>
          <el-row :gutter="15">
            <el-col :span="7">
              <el-form-item label="Unidades de Fabricación" prop="manufacturing_units">
                <el-input-number :min="1" v-model="form.manufacturing_units" class="input-number"
                  controls-position="right" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Unidades de Descargue" prop="units_downloads">
                <el-input-number :min="1" v-model="form.units_downloads" class="input-number"
                  controls-position="right" />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="Valor total en factura" prop="invoice_total_value">
                <el-input-number :min="1" v-model="form.invoice_total_value" class="input-number"
                  controls-position="right" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Cotización" prop="quoter">
                <el-input v-model="form.quoter" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div>
          <h2 class="section-title">Tipo de orden</h2>
          <el-form-item prop="type_order">
            <el-radio-group v-model="form.type_order">
              <el-radio label="POST VENTA">POST VENTA</el-radio>
              <el-radio label="GARANTIA">GARANTÍA</el-radio>
              <el-radio label="CALIDAD">CALIDAD</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Describa el trabajo a realizar y la razón" prop="decription_for_service">
            <el-input v-model="form.decription_for_service" type="textarea" />
          </el-form-item>
        </div>
      </el-form>

    </div>

    <div class="button-container">
      <el-button type="success" class="button-primary" @click="onBack">Anterior</el-button>
      <el-button type="success" class="button-primary" @click="onCreateOrder">Siguiente</el-button>
    </div>
  </el-card>


</template>

<script lang="ts" setup>
import { ref, defineEmits, defineProps, watch } from 'vue';

const formRef = ref();
const emit = defineEmits(['next-step, previous-step']);

const props = defineProps({
  invoiceGeneralData: {
    type: Object,
    required: true,
  }
});


const form = ref({
  invoice_number: '',
  remission_number: '',
  ot_date: '',
  delivery_date: '',
  date_of_manufacture: '',
  commercial_in_charge: '',
  ot_without_transport_value: false,
  transport_invoice_with_iva: false,
  transport_include_in_price: false,
  transport_include_in_price_value: null,
  transport_total_value: null,
  manufacturing_units: null,
  units_downloads: null,
  invoice_total_value: null,
  decription_for_service: '',
  quoter: '',
  type_order: '',
});


const rules = {
  invoice_number: [{ required: true, message: 'Campo requerido', trigger: 'blur' }],
  remission_number: [{ required: true, message: 'Campo requerido', trigger: 'blur' }],
  ot_date: [{ required: true, message: 'Campo requerido', trigger: 'change' }],
  delivery_date: [{ required: true, message: 'Campo requerido', trigger: 'change' }],
  date_of_manufacture: [{ required: true, message: 'Campo requerido', trigger: 'change' }],
  commercial_in_charge: [{ required: true, message: 'Campo requerido', trigger: 'blur' }],
  ot_without_transport_value: [{ required: false, message: 'Campo requerido', trigger: 'change' }],
  transport_invoice_with_iva: [{ required: false, message: 'Campo requerido', trigger: 'change' }],
  transport_include_in_price: [{ required: false, message: 'Campo requerido', trigger: 'change' }],
  transport_include_in_price_value: [{ required: true, message: 'Campo requerido', trigger: 'blur' }],
  transport_total_value: [{ required: true, message: 'Campo requerido', trigger: 'blur' }],
  manufacturing_units: [{ required: true, message: 'Campo requerido', trigger: 'blur' }],
  invoice_total_value: [{ required: true, message: 'Campo requerido', trigger: 'blur' }],
  units_downloads: [{ required: true, message: 'Campo requerido', trigger: 'blur' }],
  quoter: [{ required: true, message: 'Campo requerido', trigger: 'blur' }],
  type_order: [{ required: true, message: 'Campo requerido', trigger: 'blur' }],
  decription_for_service: [{ required: true, message: 'Campo requerido', trigger: 'blur' }],
};

const onCreateOrder = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      emit('next-step', { ...form.value });
    }
    return
  });
};

const onBack = () => {
  emit('previous-step');
};

</script>

<style scoped>

.box-card {
  margin-top: 10px;
  padding: 20px;
}

.el-form-item__label {
  margin-top: 30px;
}

.input-number {
  width: 80%;
}

.button-container {
  text-align: right;
  display: flex;
  justify-content: space-between;
}

.button-primary {
  background-color: rgb(106, 168, 79);
  border-color: rgb(106, 168, 79);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  border-width: 2px;
  font-size: 14px;
  padding: 6px 12px;
  min-width: 140px;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
}

.card-content {
  margin-top: 50px;
}

.title{
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 20px 0;
  text-align: center;
}

.section-title {
  font-size: 1.5em;
  font-weight: 600;
  margin: 30px 0 20px;
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
