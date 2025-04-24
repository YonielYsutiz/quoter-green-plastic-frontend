<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h2 class="title">Resumen de información</h2>
    </div>

    <div class="section">
      <h3 class="section-title">Datos del Cliente</h3>
      <ul class="summary-list">
        <li><span class="label">Cliente:</span> {{ data.order_general_data.client }}</li>
        <li><span class="label">NIT:</span> {{ data.order_general_data.nit }}</li>
        <li><span class="label">Dirección entrega:</span> {{ data.order_general_data.delivery_address }}</li>
        <li><span class="label">Orden compra:</span> {{ data.order_general_data.purchase_order }}</li>
        <li><span class="label">Contacto comercial:</span> {{ data.order_general_data.business_contact }}</li>
        <li><span class="label">Contacto telefónico:</span> {{ data.order_general_data.phone_contact }}</li>
        <li><span class="label">Tipo orden:</span> {{ data.order_general_data.type_order }}</li>
      </ul>
    </div>

    <div class="section">
      <h3 class="section-title">Datos de Factura</h3>
      <ul class="summary-list">
        <li><span class="label">Número factura:</span> {{ data.invoice_general_data.invoice_number }}</li>
        <li><span class="label">Número remesa:</span> {{ data.invoice_general_data.remission_number }}</li>
        <li><span class="label">Fecha OT:</span> {{ formatDate(data.invoice_general_data.ot_date) }}</li>
        <li><span class="label">Fecha entrega:</span> {{ formatDate(data.invoice_general_data.delivery_date) }}</li>
        <li><span class="label">Fecha producción:</span> {{ formatDate(data.invoice_general_data.date_of_manufacture) }}</li>
        <li><span class="label">Comercial responsable:</span> {{ data.invoice_general_data.commercial_in_charge }}</li>
      </ul>
    </div>

    <div class="section">
      <h3 class="section-title">Totales</h3>
      <ul class="summary-list">
        <li><span class="label">Unidades fabricación:</span> {{ data.invoice_general_data.invoice_totals.manufacturing_units }}</li>
        <li><span class="label">Unidades descargas:</span> {{ data.invoice_general_data.invoice_totals.units_downloads }}</li>
        <li><span class="label">Cotizador:</span> {{ data.invoice_general_data.invoice_totals.quoter }}</li>
        <li><span class="label">Valor total factura:</span> {{ data.invoice_general_data.invoice_totals.invoice_total_value }}</li>
      </ul>
    </div>

    <div class="section">
      <h3 class="section-title">Transporte</h3>
      <ul class="summary-list">
        <li><span class="label">Factura con IVA:</span> {{ data.invoice_general_data.transport_calculations.transport_invoice_with_iva ? 'Sí' : 'No' }}</li>
        <li><span class="label">OT sin transporte:</span> {{ data.invoice_general_data.transport_calculations.ot_without_transport_value ? 'Sí' : 'No' }}</li>
        <li><span class="label">Incluido en precio:</span> {{ data.invoice_general_data.transport_calculations.transport_include_in_price ? 'Sí' : 'No' }}</li>
        <li><span class="label">Valor incluido:</span> {{ data.invoice_general_data.transport_calculations.transport_include_in_price_value }}</li>
        <li><span class="label">Valor total transporte:</span> {{ data.invoice_general_data.transport_calculations.transport_total_value }}</li>
      </ul>
    </div>

    <div class="section">
      <h3 class="section-title">Términos de la Orden</h3>
      <ul class="summary-list">
        <li><span class="label">Objeto orden:</span> {{ data.invoice_general_data.order_terms.subject_order || 'N/A' }}</li>
        <li><span class="label">Descripción servicio:</span> {{ data.invoice_general_data.order_terms.decription_for_service || 'N/A' }}</li>
      </ul>
    </div>

    <div class="button-container">
      <el-button type="success" class="button-primary">Anterior</el-button>
    </div>
  </el-card>
</template>

<script lang="ts" setup>

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}
</script>

<style scoped>
.box-card {
  margin-top: 10px;
  padding: 20px;
}

.title {
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 20px;
}

.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: rgb(106, 168, 79);
  margin-bottom: 20px;
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

.button-container {
  display: flex;
  justify-content: flex-start;
  padding-top: 30px;
}

.button-primary {
  background-color: rgb(106, 168, 79);
  border-color: rgb(106, 168, 79);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  padding: 6px 12px;
  min-width: 140px;
}
</style>
