<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
    style="margin-bottom: 2%; display: flex; background-color: #f3f7ec">
    <el-menu-item index="0" style="margin-right: auto; padding: 0 1rem">
      <img style="width: 70%" :src="logo" alt="Green plastic - Logo" />
    </el-menu-item>
    <el-menu-item index="1" style="color: #6aa84f; font-weight: 600">Cotizador</el-menu-item>
    <router-link to="/quoter/orderlist" custom v-slot="{ navigate }">
      <el-menu-item index="2" @click="navigate" style="color: #6aa84f; font-weight: 600">Órdenes</el-menu-item>
    </router-link>
  </el-menu>

  <div class="form-container">
    <FormWizard
    ref="wizardRef"
     shape="circle"
      color="#6aa84f" title=""
      subtitle=""
      next-button-text="Siguiente"
      back-button-text="Anterior"
      finish-button-text="Enviar"
      @on-change="onStepChange"
      :hide-buttons="true"
       >

    <TabContent title="Datos generales orden">
        <transition name="tab-fade" mode="out-in">
          <div>
            <OrderGeneralInfo :orderGeneralData="form.order_general_data" @next-step="onHandledOrderGeneralInfo" />
          </div>
        </transition>
      </TabContent>

      <TabContent title="Datos generales factura">
        <transition name="tab-fade" mode="out-in">
          <div>
            <InvoiceGeneralInfo @previous-step="goToPreviousStep" @next-step="onHandleInvoiceGeneralData" />
          </div>
        </transition>
      </TabContent>

      <TabContent title="Productos">
        <transition name="tab-fade" mode="out-in">
          <div>
            <ProductForm
              :downloadInventoryTypes="downloadInventoryTypes" :pieces="pieces"
              @next-step="onHandledSubmit"
              @previous-step="goToPreviousStep"
             />
          </div>
        </transition>
      </TabContent>


      <TabContent title="Resumen">
        <div v-if="currentTabIndex === 3">
          <Resumen :data="form" />
        </div>
      </TabContent>

    </FormWizard>
  </div>
</template>

<script lang="ts" setup>
import 'vue3-form-wizard/dist/style.css';
import { ref, onMounted } from 'vue';
import { FormWizard, TabContent } from 'vue3-form-wizard';

import { useQuoter } from '@/composables/useQuoter';
import OrderGeneralInfo from './steps/OrderGeneralInfo.vue';
import InvoiceGeneralInfo from './steps/InvoiceGeneralInfo.vue';
import ProductList from './steps/ProductList.vue';
import ProductForm from './steps/ProductForm.vue';
import Resumen from './steps/Resumen.vue';
import logo from '../assets/logo.png';
import { pieces, mapperInvoiceGeneralData, downloadInventoryTypes } from '@/composables/useData';
const {
  productList,
  form,
  onSubmit
} = useQuoter();

const wizardRef = ref();
const activeIndex = '0';
const currentTabIndex = ref(0);

const onHandledOrderGeneralInfo = (data) => {
  form.order_general_data= {...data};
  wizardRef.value?.nextTab();
};

const onHandleInvoiceGeneralData = (data) => {
  form.invoice_general_data = {
    ...mapperInvoiceGeneralData(data),
  };

  wizardRef.value?.nextTab();
};

const goToNextStep = () => {
  wizardRef.value?.nextTab();
};

const goToPreviousStep = () => {
  wizardRef.value?.prevTab();
};

const onHandledSubmit = () => {
  onSubmit();
  wizardRef.value?.nextTab();
};

const onStepChange = (prevIndex: number, nextIndex: number) => {
  currentTabIndex.value = nextIndex;
};

onMounted(() => {
  if (!form.order_terms) {
    form.order_terms = {
      subject_order: '',
      decription_for_service: '',
    };
  }
});

</script>

<style scoped>
.form-container {
  background: linear-gradient(145deg, #f6fdf6, #eef7ee);
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.07);
  max-width: 750px;
  margin: auto;
  transition: all 0.3s ease;
}

h1 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  color: #4b7143;
  font-weight: 600;
}

.vue-form-wizard .wizard-nav-buttons .btn {
  background-color: #6aa84f !important;
  border-color: #6aa84f !important;
  color: white !important;
  border-radius: 8px;
  padding: 0.6rem 1.4rem;
  transition: all 0.3s ease;
}

.vue-form-wizard .wizard-nav-buttons .btn:hover {
  background-color: #5c9445 !important;
  transform: scale(1.02);
}

.vue-form-wizard .wizard-tab-content {
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: inset 0 0 0 1px #eaeaea;
}

.vue-form-wizard .wizard-progress-bar {
  height: 8px;
  background-color: #d4e8d0;
  border-radius: 4px;
}

.vue-form-wizard .wizard-progress-bar span {
  background-color: #6aa84f !important;
}

.vue-form-wizard .wizard-icon-container {
  background-color: #eaf4e5;
  color: #6aa84f;
  border: none;
}

.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: all 0.4s ease-in-out;
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(15px) scale(0.98);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(0.98);
}

.tab-fade-enter-to,
.tab-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.summary-card {
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.summary-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
}

.summary-list li {
  font-size: 14px;
  color: #606266;
}

.summary-list .label {
  font-weight: 600;
  color: #303133;
}

</style>
