import { ref, reactive } from 'vue';
import axios from 'axios';

export function useQuoter() {
  const showAlert = ref(false);
  const alertMessage = ref('');
  const alertType = ref('error');
  const productList = ref<{ [key: string]: any }[]>([]);
  const form = reactive({
    order_general_data: {
      client: '',
      nit: '',
      delivery_address: '',
      purchase_order: '',
      business_contact: '',
      phone_contact: '',
      type_order: '',
    },
    invoice_general_data: {
      invoice_number: '',
      remission_number: '',
      ot_date: '',
      delivery_date: '',
      date_of_manufacture: '',
      commercial_in_charge: '',
      transport_calculations: {
        transport_invoice_with_iva: false,
        ot_without_transport_value: false,
        transport_include_in_price: false,
        transport_include_in_price_value: 0,
        transport_total_value: 0,
      },
      invoice_totals: {
        manufacturing_units: '',
        units_downloads: '',
        quoter: '',
        invoice_total_value: '',
      },
    },
    order_terms: {
      subject_order: '',
      decription_for_service: '',
    },
  });

  const onSubmit = async () => {
    console.log("[X] Se ejecuta")
    for (const clave in form.order_general_data) {
      const key = clave as keyof typeof form.order_general_data;
      if (form.order_general_data[key] === null || form.order_general_data[key] === undefined || form.order_general_data[key] === '') {
        console.log("[X] FALTA INFO GENERAL")
        alertMessage.value = 'Los campos de información general son obligatorios';
        alertType.value = 'error';
        showAlert.value = true;
        return;
      }
    }

    // if (productList.value) {
    //   console.log("[X] FALTA PRODUCTS", productList)
    //   alertMessage.value = 'Debe agregar al menos un producto';
    //   alertType.value = 'error';
    //   showAlert.value = true;
    //   return;
    // }
    try {
      console.log("[X] SUBMIT", productList.value)
      const response = await axios.post(
        'http://127.0.0.1:8000/api/quoter',
        {
          client: form.order_general_data.client,
          nit: form.order_general_data.nit,
          type_order: form.order_general_data.type_order,
          quoter:form.invoice_general_data.invoice_totals.quoter,
          delivery_address: form.order_general_data.delivery_address,
          purchase_order: form.order_general_data.purchase_order,
          business_contact: form.order_general_data.business_contact,
          phone_contact: form.order_general_data.phone_contact,
          product_general_data: productList.value,
          invoice_general_data: form.invoice_general_data,
          order_terms: form.order_terms,
        },
        {
          responseType: 'blob',
        }
      );
      console.log('Cotización creada con éxito', response);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quoter.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al crear cotización', error);
    }
  };

  const addProductInList = (productData: any) => {
    productList.value.push({ ...productData });
    console.log("[X] AGREGA PRODUCTO 1", productList.value)
  };

  const deleteRow = (index: number) => {
    productList.value.splice(index, 1);
  };

  return {
    showAlert,
    alertMessage,
    alertType,
    productList,
    form,
    onSubmit,
    addProductInList,
    deleteRow,
  };
}