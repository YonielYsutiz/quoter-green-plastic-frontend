<template>
  <div v-if="productList && productList.length > 0">
    <ProductList :productList="productList" @delete="deleteRow" />
  </div>

  <el-card shadow="always" class="box-card">
    <div slot="header" class="clearfix">
      <h2 class="title">Agregar producto</h2>
    </div>

    <div class="card-content">
      <el-form label-position="top" :model="formProduct" :rules="rules" ref="formRef">

        <!-- Referencia -->
        <div>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="Referencia estándar" prop="standar_reference">
                <el-autocomplete v-model="formProduct.standar_reference" :fetch-suggestions="searchProducts"
                  placeholder="Buscar producto por la referencia" @select="handleSelect" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="Unidad estándar" prop="quantity_manufact">
                <el-input-number v-model="formProduct.quantity_manufact" :min="1" controls-position="right"
                  style="width: 70%;" />
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="Descargue de inventario" prop="download_inventory"
                :rules="[{ required: true, message: 'Forma de pago requerida', trigger: 'change' }]">
                <el-select v-model="formProduct.download_inventory" placeholder="Selecciona la forma de pago">
                  <el-option v-for="item in downloadInventoryTypes" :key="item.value" :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Unidad de descargue" prop="quantity_manufact">
                <el-input-number v-model="formProduct.quantity_manufact" :min="1" controls-position="right"
                  style="width: 70%;" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- Referencia a medida -->
        <div>
          <h2 class="section-title">Referencia a medida</h2>
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item label="Tipo" prop="type_reference">
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
            <el-col :span="5">

              <el-form-item label="Ancho" prop="width">
                <el-input-number :min="1" v-model="formProduct.width" controls-position="right" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Largo" prop="length">
                <el-input-number :min="1" v-model="formProduct.length" controls-position="right" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Alto" prop="height">
                <el-input-number :min="1" v-model="formProduct.height" controls-position="right" />
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item label="C1" prop="c1">
                <el-input v-model="formProduct.c1" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="C2" prop="c2">
                <el-input v-model="formProduct.c2" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="C3" prop="c3">
                <el-input v-model="formProduct.c3" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- Metodo de fabricacion -->
        <div>
          <h2 class="section-title">Cómo se debe fabricar</h2>

          <el-row :gutter="40" v-for="(item, index) in formProduct.product_items_manufact" :key="index">
            <el-col :span="8">
              <el-form-item :label="`Tipo de pieza ${index + 1}`">
                <el-select v-model="item.type_of_piece" placeholder="Selecciona la forma de pago">
                  <el-option v-for="piece in pieces" :key="piece.value" :label="piece.label" :value="piece.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label="Cantidad">
                <el-input-number v-model="item.quantity_type_of_piece" :min="1" controls-position="right" />
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label="Tipo">
                <el-input v-model="item.type_caracterist_manu" />
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label="Largo">
                <el-input v-model="item.manu_length" />
              </el-form-item>
            </el-col>

            <div style="margin: 15px 23px;">
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="Peso UNIT">
                    <el-input v-model="item.manu_weight" />
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="Total UND">
                    <el-input v-model="item.manu_total_und" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-row>

          <el-row :gutter="40">
            <el-col>
              <el-form-item label="Descripción del producto, condiciones especiales de fabricación" prop="description">
                <el-input type="textarea" v-model="formProduct.description"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </div>

        <!-- Información para facturación -->
        <div>
          <h2 class="section-title">Información para facturación</h2>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="Forma de pago" prop="product_invoice_data.paid_method">
                <el-select v-model="formProduct.product_invoice_data.paid_method"
                  placeholder="Selecciona la forma de pago">
                  <el-option label="Crédito" value="credito"></el-option>
                  <el-option label="Plazo en días" value="plazo_en_dias"></el-option>
                  <el-option label="Contado" value="Contado"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="Cantidad" prop="product_invoice_data.quantity_total">
                <el-input-number v-model="formProduct.product_invoice_data.quantity_total" :min="1"
                  controls-position="right" style="width: 70%;" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="Valor de venta unitario sin descuento"
                prop="product_invoice_data.value_total_without_discount">
                <el-input-number v-model="formProduct.product_invoice_data.value_total_without_discount" :min="1"
                  controls-position="right" style="width: 100%;" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Valor total a facturar por ítem 1" prop="product_invoice_data.value_for_item">
                <el-input-number v-model="formProduct.product_invoice_data.value_for_item" :min="1"
                  controls-position="right" style="width: 70%;" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="button-container-add">
          <el-button type="success" class="button-secondary" @click="onAddProduct(formProduct)">Agregar
            producto</el-button>
        </div>
        <div class="button-container">
          <el-button type="success" class="button-primary" @click="onBack">Anterior</el-button>
          <el-button type="success" class="button-primary" @click="onSubmit">Enviar</el-button>
        </div>

      </el-form>
    </div>
  </el-card>

</template>

<script lang="ts" setup>
import { defineProps, defineEmits, reactive, ref } from 'vue';
import axios from 'axios';
// import { useQuoter } from '@/composables/useQuoter';
// const { addProductInList, productList, deleteRow } = useQuoter();
const formRef = ref();
import ProductList from './ProductList.vue';


const props = defineProps<{
  downloadInventoryTypes: { label: string; value: string }[];
  pieces: { label: string; value: string }[];
  addProductInList: (product: any) => void;
  productList: any[];
  deleteRow: (index: number) => void;
}>();
const emit = defineEmits(['next-step, previous-step']);


const formProduct = reactive({
  standar_reference: '',
  quantity_manufact: 0,
  download_inventory: '',
  quantity_download_inventory: 0,
  type_reference: '',
  width: '',
  length: '',
  height: '',
  c1: '',
  c2: '',
  c3: '',
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
    value_for_item: 0,
    quantity_total: 0,
  },
});

const rules = {
  standar_reference: [{ required: true, message: 'La referencia es obligatoria', trigger: 'blur' }],
  quantity_manufact: [{ required: true, message: 'La cantidad estándar es obligatoria', trigger: 'blur' }],
  download_inventory: [{ required: true, message: 'Este campo es obligatorio', trigger: 'change' }],
  quantity_download_inventory: [{ required: true, message: 'Este campo es obligatorio', trigger: 'blur' }],
  type_reference: [{ required: true, message: 'El tipo es obligatorio', trigger: 'change' }],
  width: [{ required: true, message: 'El ancho es obligatorio', trigger: 'blur' }],
  length: [{ required: true, message: 'El largo es obligatorio', trigger: 'blur' }],
  height: [{ required: true, message: 'El alto es obligatorio', trigger: 'blur' }],
  c1: [{ required: true, message: 'Campo obligatorio', trigger: 'blur' }],
  c2: [{ required: true, message: 'Campo obligatorio', trigger: 'blur' }],
  c3: [{ required: true, message: 'Campo obligatorio', trigger: 'blur' }],
  description: [{ required: true, message: 'La descripción es obligatoria', trigger: 'blur' }],

  'product_invoice_data.paid_method': [{ required: true, message: 'Requerido', trigger: 'change' }],
  'product_invoice_data.value_total_without_discount': [{ required: true, message: 'Requerido', trigger: 'blur' }],
  'product_invoice_data.value_for_item': [{ required: true, message: 'Requerido', trigger: 'blur' }],
  'product_invoice_data.quantity_total': [{ required: true, message: 'Requerido', trigger: 'blur' }],

  // Reglas para cada item del array product_items_manufact
  product_items_manufact: [
    {
      type: 'array',
      required: true,
      message: 'Debe tener al menos un item de fabricación',
      trigger: 'change',
    },
    {
      validator: (rule, value, callback) => {
        if (!Array.isArray(value)) return callback(new Error('Debe ser un arreglo'));
        for (let i = 0; i < value.length; i++) {
          const item = value[i];
          if (!item.type_of_piece) return callback(new Error(`El tipo de pieza es obligatorio en el ítem ${i + 1}`));
          if (!item.quantity_type_of_piece) return callback(new Error(`La cantidad por tipo de pieza es obligatoria en el ítem ${i + 1}`));
          if (!item.type_caracterist_manu) return callback(new Error(`El tipo de característica de fabricación es obligatorio en el ítem ${i + 1}`));
          if (!item.manu_length) return callback(new Error(`El largo de fabricación es obligatorio en el ítem ${i + 1}`));
          if (!item.manu_weight) return callback(new Error(`El peso de fabricación es obligatorio en el ítem ${i + 1}`));
          if (!item.manu_total_und) return callback(new Error(`El total de unidades es obligatorio en el ítem ${i + 1}`));
        }
        callback();
      },
      trigger: 'blur',
    },
  ],

};

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

const onAddProduct = (product: any) => {
  // formRef.value?.validate((valid) => {
  //   if (valid) {
  //     addProductInList(product);
  //     resetForm();
  //   }
  // });
  props.addProductInList(product);
  resetForm();
}

const resetForm = () => {
  Object.assign(formProduct, {
    standar_reference: '',
    quantity_manufact: 0,
    download_inventory: '',
    quantity_download_inventory: 0,
    type_reference: '',
    width: '',
    length: '',
    height: '',
    c1: 0,
    c2: 0,
    c3: 0,
    description: '',
    product_items_manufact: [
      {
        type_of_piece: '',
        quantity_type_of_piece: '',
        type_caracterist_manu: '',
        manu_length: '',
        manu_weight: '',
        manu_total_und: '',
      },
    ],
    product_invoice_data: {
      paid_method: '',
      value_total_without_discount: 0,
      value_for_item: 0,
      quantity_total: 0,
    },
  });

  formRef.value.resetFields();
}

const onSubmit = () => {
  emit('next-step');
  // if(productList && productList.length > 0){
  //   emit('next-step');
  // }

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
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  border-width: 2px;
  font-size: 14px;
  padding: 6px 12px;
  min-width: 140px;
}

.card-content {
  margin-top: 50px;
}

.title {
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 20px 0;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  margin: 30px 0 20px;
}

.button-container-add {
  text-align: right;
  display: flex;
  justify-content: flex-start;
  margin: 30px 0;
}

.button-secondary {
  background-color: "#409eff";
  border-color: "#409eff";
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  border-width: 2px;
  font-size: 14px;
  padding: 6px 12px;
}
</style>