<template>
  <div>
    <modal-invoice
      :invoice="invoiceItem" 
      :visible="visibleInvoice" 
      @hide="closeModalInvoice" 
    ></modal-invoice>
    <b-modal
      v-model="visible"
      :header-bg-variant="'secondary'"
      size="xl"
      no-close-on-backdrop
      no-close-on-esc
      hide-footer
      scrollable
    >
      <template v-slot:modal-header="{ close }">
        <h5 class="text-white">Editar Datos de Factura</h5>
        <b-button squared size="sm" variant="outline-danger" @click="onClose">X</b-button>
      </template>
      <a-spin :spinning="success">
        <div class="container">
          <div class="row">
            <div class="col-md-3">
              <span class="font-weight-bold h3">Nº: {{ invoice.number }}</span>
            </div>
            <div class="col-md-6">
              <div class="text-center"><h1 class="font-weight-bold">FACTURA</h1></div>
            </div>
          </div>
          <small class="float-right font-weight-bold"><i class="fa fa-exclamation-circle fa-lg" style="color:#9e0207"></i> Solo podrá editar la fecha y datos del detalle en la factura emitida.</small>
          <fieldset class="fieldset col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-2">
            <legend class="legend">Datos Generales:</legend>
            <div class="container">
              <div class="row bg-secondary">
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 border">
                  <div class="d-flex justify-content-between my-2">
                    <span class="text-white font-weight-bold">Registrado:</span>
                    <span class="text-white font-weight-bold">{{ invoice.created | formatDate('DD/MM/YYYY') }}</span>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 border">
                  <div class="d-flex justify-content-between my-2">
                    <span class="text-white font-weight-bold">Actualizado:</span>
                    <span class="text-white font-weight-bold">{{ invoice.updated | formatDate('DD/MM/YYYY') }}</span>
                  </div>
                </div>
              </div>
              <div class="row bg-light">
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="font-weight-bold pt-2 list">Sucursal:</div>
                  <p>{{ invoice.license.office.city }}</p>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <strong>
                    <label for="name">Fecha Emisión * :</label>
                  </strong>
                  <b-form-group :invalid-feedback="errors.first('invoice.date')" :state="!errors.has('invoice.date')">
                    <b-form-input
                      v-model="invoice.date" 
                      :state="errors.has('invoice.date') ? false : null"
                      v-validate="'required'"
                      data-vv-name="invoice.date"
                      data-vv-as="fecha"
                      type="date"
                    ></b-form-input>
                  </b-form-group>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="font-weight-bold pt-2 list">Cliente:</div>
                  <p>{{ invoice.customer_data.business_name }}
                    <input v-model="checkNitName" type="checkbox" id="set_image_support" class="k-checkbox ml-2" checked="checked">
                    <label style="margin-bottom: 0;" for="set_image_support" class="p-2 font-weight-bold">Cambiar Razón Social</label>
                    <i v-b-popover.hover.top="'Para agregar o cambiar la razón social, marque la casilla.'" title="Nota" class="fa fa-question-circle fa-lg" style="color:#1a1c1f"></i>
                    <b-form-group v-if="checkNitName" label-for="invoice.nit_name" :invalid-feedback="errors.first('invoice.nit_name')" :state="!errors.has('invoice.nit_name')">
                      <b-input-group>
                        <b-form-input 
                          v-model="invoice.nit_name"
                          :state="errors.has('invoice.nit_name') ? false : null"
                          v-validate="'min:3|max:120'"
                          data-vv-name="invoice.nit_name"
                          data-vv-as="nombre factura"
                          type="text"
                          placeholder="Señor(es)"
                        ></b-form-input>
                        <b-input-group-append>
                          <b-input-group-text>
                            <i @click=cleanNitName class="close-icon fa fa-times-circle-o"></i>
                          </b-input-group-text>
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </p>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <strong>
                    <label for="invoice.nit">NIT / C.I. * :</label>
                  </strong>
                  <b-form-group :invalid-feedback="errors.first('invoice.nit')" :state="!errors.has('invoice.nit')">
                    <b-input-group class="mb-2">
                      <b-form-input
                        :disabled="CheckNIT"
                        v-model="invoice.nit"
                        :state="errors.has('invoice.nit') ? false : null"
                        v-validate="'required|min:3|max:16'"
                        data-vv-name="invoice.nit"
                        data-vv-as="nit/ci"
                        type="text"
                      ></b-form-input>
                      <b-input-group-prepend is-text>
                        <input v-b-tooltip.hover title="Click para editar NIT" v-model="CheckNIT" type="checkbox" class="k-checkbox" checked="checked">
                      </b-input-group-prepend>
                    </b-input-group>
                  </b-form-group>
                </div>
              </div>
            </div>          
          </fieldset>
          <div class="row mt-2">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="border border-dark">
                <div class="container">
                  <div class="row">
                    <div class="col-sm-8 my-2">
                      <div class="d-table-cell w-100">
                        <v-select
                          label="name"
                          :filterable="false"
                          :options="productsList"
                          v-model="product"
                          @search="onSearchProduct"
                        >
                          <template slot="no-options">Buscar productos..</template>
                          <template slot="option" slot-scope="product">
                            <div>
                              <strong>{{ product.name }}</strong>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="product">
                            <div>
                              <strong>{{ product.name }}</strong>
                            </div>
                          </template>
                        </v-select>
                      </div>
                      <div class="d-table-cell align-middle">
                        <b-button title="Agregar Producto" @click="addProduct" style="height: 2.5em;" size="sm" class="ml-2" variant="dark">
                          <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        </b-button>
                      </div>
                      <div class="d-table-cell align-middle">
                        <b-button title="Recargar Datos" @click="getProductsInvoice" style="height: 2.5em;" size="sm" class="mx-2" variant="success">
                          <i class="fa fa-refresh" aria-hidden="true"></i>
                        </b-button>
                      </div>
                      <div class="d-table-cell align-middle">
                        <b-button title="Borrar Todos" @click="removeAllProducts" style="height: 2.5em;" size="sm" variant="danger">
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </b-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div id="light-table"  class="table-responsive" style="margin-top: 5px;">
                <table id="invoice-table" class="table" >
                  <tr class="invoice_line" style="background-color: #FFDBDC;">
                    <th style="color: #9e0207; padding:10px; width: 100px; font-weight: bold; font-size: 20px;">CANTIDAD</th>
                    <th style="color: #9e0207; letter-spacing: 0.5em; padding:10px; width: 340px; font-weight: bold; font-size: 20px;">DETALLE</th>
                    <th style="color: #9e0207; padding:10px; width: 100px; font-weight: bold; font-size: 20px;">P. UNIT.</th>
                    <th style="color: #9e0207; padding:10px; width: 120px; font-weight: bold; font-size: 20px;">SUB TOTAL</th>
                  </tr>
                  <tr v-for="(product, index) in products" :key="index" class="invoice_line" style="text-align: center;">
                    <td style="color: #000000; font-size: 15px; font-weight: bold;">
                      <p style="margin-bottom: 0;">&nbsp;</p>
                      <!-- <span>{{ product.quantity }}</span> -->
                      <b-form-input 
                        style="font-size: 16px; font-weight: bold;"
                        v-model="product.quantity" 
                        @focus="$event.target.select()" 
                        class="text-center" 
                        type="number" 
                        min="1" 
                        @keydown="filterKey" 
                        @keyup="change(product)">
                      </b-form-input>
                    </td>
                    <td style="color: #000000; text-align: justify; font-size: 15px;">
                      <p style="text-align: center; margin-bottom: 0; font-weight: bold;">{{ product.name }}</p>
                      <b-form-textarea
                        rows="3"
                        style="font-size: 12px; font-weight: bold;border-color: #9e0207;outline: 0px;box-shadow: rgba(0, 0, 0, 0.075) 0px 1px 1px inset, #9e020761 0px 0px 8px;"
                        v-model="product.description">
                      </b-form-textarea>
                    </td>
                    <td style="color: #000000; font-size: 15px; font-weight: bold;">
                      <p style="margin-bottom: 0;">&nbsp;</p>
                      <!-- <span>{{ product.price }}</span> -->
                      <b-form-input style="font-size: 16px; font-weight: bold;" class="text-center" v-model.lazy="product.price" v-money="money"></b-form-input>
                    </td>
                    <td style="color: #000000; font-size: 16px; font-weight: bold;">
                      <p style="margin-bottom: 0; ">&nbsp;</p>
                      <span>{{ total(product) | currency }}</span>
                      <b-button pill class="ml-2 btn-close" @click="removeItem(index)" size="sm" variant="dark"><i class="fa fa-close"></i></b-button>
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr class="invoice_line">
                    <td colspan="3" style="text-align: right; border-top: 2px solid #9e0207; color: #474747; font-size: 20px; font-weight: bold; padding:16px;">TOTAL Bs.</td>
                    <td style="text-align: center; border-top: 2px solid #9e0207; font-size: 20px; color: #000000; font-weight: bold; padding:16px; background: #FFDBDC;">{{ grandTotal | currency }}</td>
                  </tr>
                </table>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <strong>
                    <label for="invoice.summary">Resumen (Glosa para reporte):</label>
                  </strong>
                  <b-form-group label-for="invoice.summary" :invalid-feedback="errors.first('invoice.summary')" :state="!errors.has('invoice.summary')">
                    <b-form-textarea
                      v-model="invoice.summary"
                      :state="errors.has('invoice.summary') ? false : null"
                      v-validate="'min:3|max:500'"
                      data-vv-name="invoice.summary"
                      data-vv-as="resumen"
                      placeholder="Ésta descripción solo será visible en los reportes contables."
                      rows="2"
                      style="font-size: 12px; font-weight: bold;border-color: #9e0207;outline: 0px;box-shadow: rgba(0, 0, 0, 0.075) 0px 1px 1px inset, #9e020761 0px 0px 8px;"
                    ></b-form-textarea>
                  </b-form-group>
                </div>
              </div>
              <div class="pt-2" v-if="error">
                <b-alert show variant="warning">
                  <h4 class="alert-heading">Revisa los siguientes errores!</h4>
                  <ul id="v-for-object">
                    <li v-for="value in error">
                      {{ value[0] }}
                    </li>
                  </ul>
                </b-alert>
              </div>
            </div>
          </div>
          <div class="row pt-2">
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <strong>
                <label for="invoice.title">Título:</label>
              </strong>
              <b-form-group label-for="invoice.title" :invalid-feedback="errors.first('invoice.title')" :state="!errors.has('invoice.title')">
                <b-form-input 
                  v-model="invoice.title"
                  :state="errors.has('invoice.title') ? false : null"
                  v-validate="'max:120'"
                  data-vv-name="invoice.title"
                  data-vv-as="titulo"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <strong>
                <label for="invoice.footer">Pie de página:</label>
              </strong>
              <b-form-group label-for="invoice.footer" :invalid-feedback="errors.first('invoice.footer')" :state="!errors.has('invoice.footer')">
                <b-form-input 
                  v-model="invoice.footer"
                  :state="errors.has('invoice.footer') ? false : null"
                  v-validate="'max:120'"
                  data-vv-name="invoice.footer"
                  data-vv-as="pie de página"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div>
            <strong>Agregar detalle a la Factura</strong>
            <b-button @click="addItemDetail" class="ml-2" pill size="sm" variant="danger">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </b-button>
          </div><hr style="margin: 3px; border: 1px solid #6a7a84;">
          <div class="row">
            <div v-for="(detail, index) in invoice.details" :key="index" class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
              <b-input-group>
                <b-form-input 
                  v-model="detail.description"
                  type="text"
                ></b-form-input>
                <b-input-group-append>
                  <b-button @click="deleteItemDetail(index)" size="sm" text="Button" variant="dark">
                    <i class="fa fa-close" aria-hidden="true"></i>
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
          </div>
          <b-popover
            target="invoice-edit-confirm"
            triggers="click"
            :show.sync="popoverEditInvoice"
            placement="auto"
            container="my-container"
            ref="popover"
          >
            <template #title>
              Nota
            </template>
            <div>
              <p>Realmente desea modificar esta factura?</p>
              <b-button class="mr-2" @click="onClosePopoverInvoice" size="sm" variant="danger">NO</b-button>
              <b-button @click="submit" size="sm" variant="dark">SI</b-button>
            </div>
          </b-popover>
          <div class="row my-2">
            <div class="col-12 col-md-12 col-lg-6 col-xl-6">
            </div>
            <div class="col-12 col-md-12 col-lg-6 col-xl-6">
              <b-button 
                id="invoice-edit-confirm"
                ref="button"
                class="float-right mr-2"
              >Actualizar Factura</b-button>
              <b-button
                variant="dark" 
                @click="viewInvoice" 
                class="float-right mr-2"
              >Vista Previa <i class="fa fa-search-plus" aria-hidden="true"></i></b-button>
            </div>
          </div>
        </div>
      </a-spin>
    </b-modal>
  </div>
</template>
<script>
import {VMoney} from 'v-money'
import Money from '../../../models/Money'
import formatter from '../../../mixins/formatter'
import ModalInvoice from "./ModalInvoice.vue"
import LicenseService from '../../../services/license.service'
import InvoiceService from '../../../services/invoice.service'
import ProductService from '../../../services/product.service'

export default {
  props: {
    visible: Boolean,
    invoice: Object,
  },

  data() {
    return {
      money: new Money(),
      success: false,
      invoiceItem: null,
      popoverEditInvoice: false,
      visibleInvoice: false,
      error: null,
      checkNitName: false,
      CheckNIT: true,
      products: Array.from(this.invoice.products),
      productsList: [],
      product: null,
    }
  },

  directives: {
    money: VMoney,
  },
 
  mixins: [formatter],

  components: {
    "modal-invoice": ModalInvoice,
  },

  watch: {
    product: function (value) {
      if(value) this.addProduct()
    }
  },

  computed: {
    subTotal() {
      let total = this.products.reduce((acc, item) => {
        let val = 0
        val = parseInt(item.quantity) * parseFloat(this.toFloat(item.price)).toFixed(2)
        item.subtotal = parseFloat(val).toFixed(2)
        return acc + val
      }, 0)
      return isNaN(total) ? 0 : total
    },

    grandTotal() 
    {
      let total = 0
      total = this.subTotal
      this.invoice.total = Number(parseFloat(total).toFixed(2))
      return isNaN(total) ? 0 : Number(parseFloat(total).toFixed(2))
    }
  },

  methods: {
    cleanNitName() {
      this.invoice.nit_name = ''
    },

    total(product) {
      return parseInt(product.quantity) * this.toFloat(product.price) 
    },

    filterKey(e){
      const key = e.key;
      if (key === '-') return e.preventDefault();
      if (key === '+') return e.preventDefault();
      if (key === '.') return e.preventDefault();
      if (key === 'e') return e.preventDefault();
    },

    change(product) {
      if (product.quantity == '' || product.quantity == 0) product.quantity = 1
    },

    removeItem(index) {
      if (index > -1) this.products.splice(index, 1)
    },

    closeModalInvoice() {
      this.visibleInvoice = false
    },

    onClosePopoverInvoice() {
      this.popoverEditInvoice = false
    },
    
    addItemDetail() {
      this.invoice.details.push({description: ''})
    },

    deleteItemDetail(index) {
      if (index > -1) this.invoice.details.splice(index, 1)
    },

    onSearchProduct(search, loading) {
      loading(true)
      this.searchProduct(loading, search, this)
    },

    addProduct() {
      if (this.product) {
        let obj = {
          id: this.product.id,
          name: this.product.name,
          description: '',
          quantity: 1,
          price: 0,
          subtotal: 0,
        }
        this.products.push(obj)
      }
    },

    removeAllProducts() {
      this.products = []
    },

    getProductsInvoice: async function() {
      try {
        this.success = true
        const response = await InvoiceService.showInvoice(`invoices/products/${this.invoice.id}`)
        if (response.status === 200) {
          this.products = response.data.data.products
          this.success = false
        }
      } catch (err) {
        this.success = false
      }
    },

    searchProduct: _.debounce(async (loading, search, vm) => {
      const data = {
        column: 'name',
        value: search
      }
      try {
        const products = await ProductService.searchProduct(data)
        if (products.status === 200) {
          vm.productsList = products.data
          loading(false)
        }
      } catch (err) {
        if (err.response.status === 404) {
          vm.productsList = []
          loading(false)
        }
      }
    }, 350),

    async viewInvoice() {
      try {
        let data = {office: this.invoice.license.office.id}
        const response = await LicenseService.getLicense(data)
        if (response.status === 200) {
          let invoice = {
            date: this.invoice.date,
            total: this.invoice.total,
            title: this.invoice.title,
            footer: this.invoice.footer,
            details: this.invoice.details,
            state_data: this.invoice.state,
            license: response.data.data,
            products: this.products,
            customer_data: {
              business_name: this.invoice.nit_name && this.invoice.nit_name != this.invoice.customer_data.business_name ? this.invoice.nit_name : this.invoice.customer_data.business_name,
              nit: this.invoice.customer_data.nit
            }
          }
          this.$bus.$emit('getCheckInvoice', invoice)
          this.visibleInvoice = true
        }
      } catch (err) {
        this.visibleInvoice = false
      }
    },

    async submit() {
      this.error = null
      this.success = true
      
      let invoice = {
        date: this.invoice.date,
        nit_name: this.invoice.nit_name,
        title: this.invoice.title,
        footer: this.invoice.footer,
        details: this.invoice.details.map(obj => obj.description).join('|'),
        summary: this.invoice.summary,
        number: this.invoice.number,
        license: this.invoice.license.id,
        total: this.invoice.total,
        nit: this.invoice.nit,
      }

      let products = this.products.map(item => {
        let obj = new Object()
        obj.id = item.item_id ? item.item_id : null
        obj.product_id = item.id
        obj.quantity = item.quantity
        obj.price = this.toFloat(item.price)
        obj.subtotal = item.subtotal
        obj.description = item.description
        return obj
      })
      this.onClosePopoverInvoice()
      try {
        const response = await InvoiceService.updateInvoice(this.invoice.id, {invoice: invoice, products: products})
        if (response.status === 200) {
          this.success = false
          this.onClose()
          this.$message.success(response.data.message)
        }
      } catch (err) {
        this.onClosePopoverInvoice()
        if (err.response.status === 422) {
          this.$setErrorsFromResponse(err.response.data)
          this.error = err.response.data.errors
        }
        this.success = false
      }
    },

    onClose() {
      this.error = null
      this.checkNitName = false
      this.CheckNIT = true
      this.$emit("hide")
    }
  }
}
</script>
<style scoped>
.close-icon { transition: all .2s ease-in-out; font-size: 20px; cursor: pointer; }
.close-icon:hover { transform: scale(1.1); }

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.fieldset {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid black;
}

.legend {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #000;
  font-size: 17px;
  font-weight: bold;
  padding: 3px 5px 3px 7px;
  width: auto;
}

#light-table {
  width: 100%;  
  padding-top: 0;
  padding-bottom: 0;
  text-align: left;
}

#invoice-table {
  border: 2px solid #9e0207;
  border-radius: 7px;
  border-spacing: 0;
  box-sizing: border-box;
  clear: both;
  margin: 2mm 0mm;
  height: 50mm;
  width: 100%;
}

#invoice-table th, td { border-left: 2px solid #9e0207; }
#invoice-table th:first-child, td:first-child { border-left: none; }
#invoice-table th { border-bottom: 2px solid #9e0207; }
#invoice-table td { vertical-align: top; font-size: 8pt; }
th { text-align: center; font-weight: normal; }
.amount { text-align: center; }
.invoice_line { height: 6mm; }
.invoice_line td, .invoice_line th { padding: 1mm; }
</style>