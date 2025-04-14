<template>
    <el-card shadow="always" class="box-card">
      <div style="margin-bottom: 2%;" slot="header" class="clearfix">
        <span style="font-size: 1.5em;">Agregar producto</span>
      </div>
      <el-form label-position="top">
        <el-row :gutter="6">
          <el-col :span="8">
            <el-form-item label="Ref. Estándar">
              <el-autocomplete v-model="formProduct.standar_reference" :fetch-suggestions="searchProducts" placeholder="Buscar producto por la referencia" @select="handleSelect" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="Unidad estándar">
              <el-input v-model="formProduct.quantity_manufact" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Descargue de inventario">
              <el-select v-model="formProduct.download_inventory" placeholder="Selecciona la forma de pago">
                <el-option v-for="item in downloadInventoryTypes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="Unidad de descargue">
              <el-input v-model="formProduct.quantity_download_inventory" />
            </el-form-item>
          </el-col>
        </el-row>
  
        <h4>Referencia a medida</h4>
        <el-row :gutter="3">
          <el-col :span="4">
            <el-form-item label="Tipo">
              <el-select v-model="formProduct.type_reference" placeholder="Selecciona la forma de pago">
                <el-option label="EPTL" value="EPTL"></el-option>
                <el-option label="EPTP" value="EPTP"></el-option>
                <el-option label="LP" value="LP"></el-option>
                <el-option label="PP" value="PP"></el-option>
                <el-option label="CP" value="CP"></el-option>
                <el-option label="POSTE" value="POSTE"></el-option>
                <el-option label="POSTE REDONDO" value="POSTE_REDONDO"></el-option>
                <el-option label="Cuña" value="cuña"></el-option>
                <el-option label="CARACOL" value="CARACOL"></el-option>
                <el-option label="ANGULO" value="ANGULO"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="Ancho">
              <el-input v-model="formProduct.width" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="Largo">
              <el-input v-model="formProduct.length" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="Alto">
              <el-input v-model="formProduct.height" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="C1">
              <el-input v-model="formProduct.c1" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="C2">
              <el-input v-model="formProduct.c2" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="C3">
              <el-input v-model="formProduct.c3" />
            </el-form-item>
          </el-col>
        </el-row>
  
        <h4>Cómo se debe fabricar</h4>
        <el-row :gutter="3" v-for="(item, index) in formProduct.product_items_manufact" :key="index">
          <el-col :span="6">
            <el-form-item :label="`Tipo de pieza ${index + 1}`">
              <el-select v-model="item.type_of_piece" placeholder="Selecciona la forma de pago">
                <el-option v-for="piece in pieces" :key="piece.value" :label="piece.label" :value="piece.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
  
          <el-col :span="2">
            <el-form-item label="Cantidad">
              <el-input v-model="item.quantity_type_of_piece" />
            </el-form-item>
          </el-col>
  
          <el-col :span="4">
            <el-form-item label="Tipo">
              <el-input v-model="item.type_caracterist_manu" />
            </el-form-item>
          </el-col>
  
          <el-col :span="4">
            <el-form-item label="Largo">
              <el-input v-model="item.manu_length" />
            </el-form-item>
          </el-col>
  
          <el-col :span="3">
            <el-form-item label="Peso UNIT">
              <el-input v-model="item.manu_weight" />
            </el-form-item>
          </el-col>
  
          <el-col :span="3">
            <el-form-item label="Total UND">
              <el-input v-model="item.manu_total_und" />
            </el-form-item>
          </el-col>
        </el-row>
  
        <el-row>
          <el-col>
            <el-form-item label="Descripción del producto, condiciones especiales de fabricación">
              <el-input type="textarea" v-model="formProduct.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
  
        <h4>Información para facturación</h4>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="Forma de pago">
              <el-select v-model="formProduct.product_invoice_data.paid_method" placeholder="Selecciona la forma de pago">
                <el-option label="Crédito" value="credito"></el-option>
                <el-option label="Plazo en días" value="plazo_en_dias"></el-option>
                <el-option label="Contado" value="Contado"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Valor de venta unitario sin descuento">
              <el-input v-model="formProduct.product_invoice_data.value_total_without_discount" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Valor total a facturar por ítem">
              <el-input v-model="formProduct.product_invoice_data.value_for_item" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="Cantidad">
              <el-input v-model="formProduct.product_invoice_data.quantity_total" />
            </el-form-item>
          </el-col>
        </el-row>
  
        <el-form-item>
          <el-button type="success" @click="addProductInList(formProduct)">Agregar producto</el-button>
          <el-button>Limpiar</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits, reactive } from 'vue';
  import axios from 'axios';
  
  const props = defineProps({
    downloadInventoryTypes: {
      type: Array,
      required: true,
    },
    pieces: {
      type: Array,
      required: true,
    },
  });
  
  const emit = defineEmits(['add']);
  
  const formProduct = reactive({
    standar_reference: '',
    type_reference: '',
    quantity_manufact: 0,
    quantity_download_inventory: 0,
    width: '',
    length: '',
    height: '',
    c1: '',
    c2: '',
    c3: '',
    download_inventory: '',
    description: '',
  
    product_items_manufact: Array(1).fill(null).map(() => ({
      type_of_piece: '',
      quantity_type_of_piece: '',
      type_caracterist_manu: '',
      manu_length: '',
      manu_weight: '',
      manu_total_und: '',
    })),
  
    product_invoice_data: {
      paid_method: '',
      value_total_without_discount: 0,
      quantity_total: 0,
      value_for_item: 0,
    },
  });
  
  const searchProducts = async (query: string, cb: (data: any[]) => void) => {
    if (!query) {
      cb([]);
      return;
    }
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/searchProduct?search=${query}`);
      const suggestions = response.data.map((item: any) => ({
        value: item.name,
        id: item.id,
        name: item.name,
        description: item.description,
        reference: item.reference,
        intern_description: item.intern_description,
        warranty: item.warranty,
        export: item.export,
        product_features_list: item.product_features_list,
      }));
      cb(suggestions);
    } catch (error) {
      console.error('Error al buscar productos', error);
      cb([]);
    }
  };
  
  const handleSelect = (item: any) => {
    formProduct.standar_reference = item.value;
  
    const productItemsPiecesCount = item.product_features_list;
  
    const productSintax = formProduct.standar_reference.split(/[\s*]+/);
    formProduct.type_reference = productSintax[0];
    formProduct.width = productSintax[1];
    formProduct.length = productSintax[2];
    formProduct.height = productSintax[3];
    formProduct.c1 = productSintax[4];
    formProduct.c2 = productSintax[5] !== undefined ? productSintax[5] : '';
    formProduct.c3 = productSintax[6] !== undefined ? productSintax.slice(6).join(' ') : '';
  
    formProduct.product_items_manufact = Array(productItemsPiecesCount.length)
      .fill(null)
      .map((_, index) => ({
        type_of_piece: productItemsPiecesCount[index]?.type_of_piece ?? '',
        quantity_type_of_piece: productItemsPiecesCount[index]?.quantity_type_of_piece ?? '',
        type_caracterist_manu: productItemsPiecesCount[index]?.type_caracterist_manu ?? '',
        manu_length: '',
        manu_weight: '',
        manu_total_und: '',
      }));
  };
  
  const addProductInList = (productData: any) => {
    emit('add', productData);
    Object.assign(formProduct, {
      standar_reference: '',
      type_reference: '',
      quantity_manufact: 0,
      quantity_download_inventory: 0,
      width: '',
      length: '',
      height: '',
      c1: '',
      c2: '',
      c3: '',
      download_inventory: '',
      description: '',
  
      product_items_manufact: Array(1).fill(null).map(() => ({
        type_of_piece: '',
        quantity_type_of_piece: '',
        type_caracterist_manu: '',
        manu_length: '',
        manu_weight: '',
        manu_total_und: '',
      })),
  
      product_invoice_data: {
        paid_method: '',
        value_total_without_discount: 0,
        quantity_total: 0,
        value_for_item: 0,
      },
    });
  };
  </script>