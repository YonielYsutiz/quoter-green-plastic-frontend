

export const mapperInvoiceGeneralData = (data) => {

  const transport_calculations = {
    transport_invoice_with_iva: data.transport_invoice_with_iva,
    ot_without_transport_value: data.ot_without_transport_value,
    transport_include_in_price: data.transport_include_in_price,
    transport_include_in_price_value: data.transport_include_in_price_value,
    transport_total_value: data.transport_total_value,
  }

  const invoice_totals = {
    manufacturing_units: data.manufacturing_units,
    units_downloads: data.units_downloads,
    quoter: data.quoter,
    invoice_total_value: data.invoice_total_value,
  };

  const order_terms = {
    subject_order: data.type_order,
    decription_for_service: data.decription_for_service,
  };

  return {
    invoice_number: data.invoice_number,
    remission_number: data.remission_number,
    ot_date: data.ot_date,
    delivery_date: data.delivery_date,
    date_of_manufacture: data.date_of_manufacture,
    commercial_in_charge: data.commercial_in_charge,
    transport_calculations: { ...transport_calculations },
    invoice_totals: { ...invoice_totals },
    order_terms: { ...order_terms },
  }
};

export const pieces = [
  { value: 'listones_superiores', label: 'Listones superiores' },
  { value: 'durmientes', label: 'Durmientes' },
  { value: 'listones_inferiores', label: 'Listones inferiores' },
  { value: 'listones_adicionales', label: 'Listones adicionales' },
  { value: 'tornillos', label: 'Tornillos' },
  { value: 'otros', label: 'Otros' },
];

export const downloadInventoryTypes = [
  { value: 'CANASTILLA  60 x 40 x 13', label: 'CANASTILLA  60 x 40 x 13' },
  { value: 'CANASTILLA  60 x 40 x 18', label: 'CANASTILLA  60 x 40 x 18' },
  { value: 'CANASTILLA  60 x 40 x 25', label: 'CANASTILLA  60 x 40 x 25' },
  { value: 'CANASTILLA 60 x 40 x 40', label: 'CANASTILLA 60 x 40 x 40' },
  { value: 'ESTIBA PLÁSTICA ER-100 NG LS', label: 'ESTIBA PLÁSTICA ER-100 NG LS' },
  { value: 'ESTIBA PLÁSTICA ER-100 NG V1', label: 'ESTIBA PLÁSTICA ER-100 NG V1' },
  { value: 'ESTIBA PLÁSTICA ER-100S NG', label: 'ESTIBA PLÁSTICA ER-100S NG' },
  { value: 'ESTIBA PLÁSTICA ER-100HD AM ALF', label: 'ESTIBA PLÁSTICA ER-100HD AM ALF' },
  { value: 'ESTIBA PLÁSTICA ER-100HD NG ALF ', label: 'ESTIBA PLÁSTICA ER-100HD NG ALF ' },
  { value: 'ESTIBA PLÁSTICA ER-100S 4E NG LS V1', label: 'ESTIBA PLÁSTICA ER-100S 4E NG LS V1' },
  { value: 'ESTIBA PLÁSTICA ER-100S 4E V1 TC ONE WAY', label: 'ESTIBA PLÁSTICA ER-100S 4E V1 TC ONE WAY' },
];
