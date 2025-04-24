<template>
  <el-card shadow="always" class="box-card">
    <div slot="header" class="clearfix">
      <h1 class="title">Información general de la orden</h1>
    </div>

    <div>
      <el-form label-position="top"
      :model="formData"
      :rules="rules"
      ref="formRef">
        <el-form-item label="Tipo de orden" prop="type_order">
          <el-radio-group v-model="formData.type_order">
            <el-radio label="Fabricación" value="fabricacion" />
            <el-radio label="Descargue inventario" value="descargue_inventario" />
            <el-radio label="Servicio Post Venta" value="servicio_post_venta" />
          </el-radio-group>
        </el-form-item>

        <el-row :gutter="40" style="padding-top: 1%" >
          <el-col :span="12">
            <el-form-item label="Cliente" prop="client">
              <el-input v-model="formData.client" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Nit" prop="nit">
              <el-input v-model="formData.nit" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="padding-top: 1%" :gutter="40">
          <el-col :span="12">
            <el-form-item label="Dirección de Entrega" prop="delivery_address">
              <el-input v-model="formData.delivery_address" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Orden de compra" prop="purchase_order">
              <el-input v-model="formData.purchase_order" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="padding-top: 1%" :gutter="40">
          <el-col :span="12">
            <el-form-item label="Contacto comercial" prop="business_contact">
              <el-input v-model="formData.business_contact" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Teléfono contacto" prop="phone_contact">
              <el-input v-model="formData.phone_contact" />
            </el-form-item>
          </el-col>
        </el-row>

        <div class="button-container">
          <el-button type="success" class="button-primary" @click="submitForm">Siguiente</el-button>
        </div>
      </el-form>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, reactive, ref } from 'vue';
const emit = defineEmits(['next-step']);

const props = defineProps({
  orderGeneralData: {
    type: Object,
    required: true,
  },
});

const formData = reactive({
  type_order: '',
  client: '',
  nit: '',
  delivery_address: '',
  purchase_order: '',
  business_contact: '',
  phone_contact: '',
});

const formRef = ref();

const rules = reactive({
  type_order: [{ required: true, message: 'Debe seleccionar el tipo de orden', trigger: 'change' }],
  client: [{ required: true, message: 'El cliente es obligatorio', trigger: 'blur' }],
  nit: [{ required: true, message: 'El NIT es obligatorio', trigger: 'blur' }],
  delivery_address: [{ required: true, message: 'La dirección es obligatoria', trigger: 'blur' }],
  purchase_order: [{ required: true, message: 'La orden de compra es obligatoria', trigger: 'blur' }],
  business_contact: [{ required: true, message: 'El contacto comercial es obligatorio', trigger: 'blur' }],
  phone_contact: [{ required: true, message: 'El teléfono de contacto es obligatorio', trigger: 'blur' }],
});

const submitForm = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      emit('next-step', formData);
    }
  });
};
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: flex-end;
  padding-top: 1%;
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

.box-card {
  margin-top: 10px;
  padding: 20px;
}

.title {
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 40px 0;
}

</style>
