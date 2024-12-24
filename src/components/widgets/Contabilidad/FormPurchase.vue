<template>
  <b-modal
    v-model="visible"
    :header-bg-variant="'secondary'"
    size="xl"
    no-close-on-backdrop
    no-close-on-esc
    hide-footer
  >
    <template v-slot:modal-header="{ close }">
      <h5 class="text-white">Registro Factura de Compra</h5>
      <b-button squared size="sm" variant="outline-danger" @click="onClose">X</b-button>
    </template>
    <a-spin :spinning="loadingPurchase">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <strong>
              <label for="purchase.specification">Especificación * :</label>
            </strong>
            <b-form-group label-for="purchase.specification" :invalid-feedback="errors.first('purchase.specification')" :state="!errors.has('purchase.specification')">
              <b-form-input 
                disabled
                v-model="purchase.specification"
                :state="errors.has('purchase.specification') ? false : null"
                v-validate="'required'"
                data-vv-name="purchase.specification"
                data-vv-as="especificación"
                class="text-center"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <strong>
              <label for="purchase.date">Fecha * :</label>
            </strong>
            <b-form-group label-for="purchase.date" :invalid-feedback="errors.first('purchase.date')" :state="!errors.has('purchase.date')">
              <b-form-input 
                v-model="purchase.date"
                :state="errors.has('purchase.date') ? false : null"
                v-validate="'required'"
                data-vv-name="purchase.date"
                data-vv-as="fecha"
                type="date"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <strong>
              <label for="purchase.nit">Nit * :</label>
            </strong>
            <b-form-group label-for="purchase.nit" :invalid-feedback="errors.first('purchase.nit')" :state="!errors.has('purchase.nit')">
              <b-form-input 
                v-model="purchase.nit"
                :state="errors.has('purchase.nit') ? false : null"
                v-validate="'required'"
                data-vv-name="purchase.nit"
                data-vv-as="nit"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <strong>
              <label for="purchase.business_name">Nombre / Razón Social * :</label>
            </strong>
            <b-form-group label-for="purchase.business_name" :invalid-feedback="errors.first('purchase.business_name')" :state="!errors.has('purchase.business_name')">
              <b-form-input
                v-model="purchase.business_name" 
                :state="errors.has('purchase.business_name') ? false : null"
                v-validate="'required'"
                data-vv-name="purchase.business_name"
                data-vv-as="nombre/razón social"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <strong>
              <label for="purchase.number">Número de Factura * :</label>
            </strong>
            <b-form-group label-for="purchase.number" :invalid-feedback="errors.first('purchase.number')" :state="!errors.has('purchase.number')">
              <b-form-input 
                v-model="purchase.number" 
                :state="errors.has('purchase.number') ? false : null"
                v-validate="'required'"
                data-vv-name="purchase.number"
                data-vv-as="número factura"
                class="text-right"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <strong>
              <label for="purchase.dui">Número de DUI * :</label>
            </strong>
            <b-form-group label-for="purchase.dui" :invalid-feedback="errors.first('purchase.dui')" :state="!errors.has('purchase.dui')">
              <b-form-input 
                v-model="purchase.dui" 
                :state="errors.has('purchase.dui') ? false : null"
                v-validate="'required'"
                data-vv-name="purchase.dui"
                data-vv-as="dui"
                class="text-right"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <strong>
              <label for="purchase.authorization">N° Autorización * :</label>
            </strong>
            <b-form-group label-for="purchase.authorization" :invalid-feedback="errors.first('purchase.authorization')" :state="!errors.has('purchase.authorization')">
              <b-form-input
                v-model="purchase.authorization"  
                :state="errors.has('purchase.authorization') ? false : null"
                v-validate="'required'"
                data-vv-name="purchase.authorization"
                data-vv-as="n° autorización"
                class="text-right"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <strong>
              <label for="purchase.total">Importe Total * :</label>
            </strong>
            <b-form-group label-for="purchase.total" :invalid-feedback="errors.first('purchase.total')" :state="!errors.has('purchase.total')">
              <b-form-input 
                v-money="money"
                v-model="purchase.total"
                :state="errors.has('purchase.total') ? false : null"
                v-validate="'required'"
                data-vv-name="purchase.total"
                data-vv-as="importe total"
                class="text-right"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <strong>
              <label for="purchase.no_cf">Importe no Sujeto a Crédito Fiscal * :</label>
            </strong>
            <b-form-group label-for="purchase.no_cf" :invalid-feedback="errors.first('purchase.no_cf')" :state="!errors.has('purchase.no_cf')">
              <b-form-input 
                v-money="money"
                v-model="purchase.no_cf"
                :state="errors.has('purchase.no_cf') ? false : null"
                v-validate="'required'"
                data-vv-name="purchase.no_cf"
                data-vv-as="no sujeto a crédito fiscal"
                class="text-right"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <strong>
              <label for="purchase.subtotal">Sub Total * :</label>
            </strong>
            <b-form-group label-for="purchase.subtotal" :invalid-feedback="errors.first('purchase.subtotal')" :state="!errors.has('purchase.subtotal')">
              <b-form-input
                disabled
                v-money="money"
                v-model="purchase.subtotal" 
                :state="errors.has('purchase.subtotal') ? false : null"
                v-validate="'required'"
                data-vv-name="purchase.subtotal"
                data-vv-as="subtotal"
                class="text-right"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <strong>
              <label for="purchase.discounts">Descuentos y Rebajas * :</label>
            </strong>
            <b-form-group label-for="purchase.discounts" :invalid-feedback="errors.first('purchase.discounts')" :state="!errors.has('purchase.discounts')">
              <b-form-input
                v-money="money"
                v-model="purchase.discounts" 
                :state="errors.has('purchase.discounts') ? false : null"
                v-validate="'required'"
                data-vv-name="purchase.discounts"
                data-vv-as="descuentos y rebajas"
                class="text-right"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <strong>
              <label for="purchase.base_cf">Importe Base para Crédito Fiscal * :</label>
            </strong>
            <b-form-group label-for="purchase.base_cf" :invalid-feedback="errors.first('purchase.base_cf')" :state="!errors.has('purchase.base_cf')">
              <b-form-input 
                disabled
                v-money="money"
                v-model="purchase.base_cf" 
                :state="errors.has('purchase.base_cf') ? false : null"
                v-validate="'required'"
                data-vv-name="purchase.base_cf"
                data-vv-as="base para crédito fiscal"
                class="text-right"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <strong>
              <label for="purchase.cf">Crédito Fiscal IVA * :</label>
            </strong>
            <b-form-group label-for="purchase.cf" :invalid-feedback="errors.first('purchase.cf')" :state="!errors.has('purchase.cf')">
              <b-form-input
                disabled 
                v-money="money"
                v-model="purchase.cf"
                :state="errors.has('purchase.cf') ? false : null"
                v-validate="'required'"
                data-vv-name="purchase.cf"
                data-vv-as="crédito fiscal IVA"
                class="text-right"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <strong>
              <label for="purchase.control_code">Código de Control * :</label>
            </strong>
            <b-form-group label-for="purchase.control_code" :invalid-feedback="errors.first('purchase.control_code')" :state="!errors.has('purchase.control_code')">
              <b-form-input 
                v-model="purchase.control_code"
                :state="errors.has('purchase.control_code') ? false : null"
                v-validate="'required'"
                data-vv-name="purchase.control_code"
                data-vv-as="código de control"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8">
            <strong>
              <label for="purchase.type">Tipo de Compra * :</label>
            </strong>
            <b-form-group label-for="purchase.type" :invalid-feedback="errors.first('purchase.type')" :state="!errors.has('purchase.type')">
              <v-select 
                v-model="purchase.type"
                :reduce="purchase => purchase.value"
                :state="errors.has('purchase.type') ? false : null"
                v-validate="'required'"
                data-vv-name="purchase.type"
                data-vv-as="tipo"
                :options="types"
              >
                <template slot="option" slot-scope="option">
                  <div class="d-center">
                    {{ option.label }}
                  </div>
                </template>
              </v-select>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12 pb-3">
            <legend>Contabilización:</legend>
            <div class="container">
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <strong>
                    <label for="step">Gestión  :</label>
                  </strong>
                  <b-form-group label-for="step" :invalid-feedback="errors.first('step')" :state="!errors.has('step')">
                    <v-select
                      label="title"
                      :reduce="step => step.id"
                      v-model="step"
                      :options="steps"
                      placeholder="Seleccionar"
                      :state="errors.has('step') ? false : null"
                      v-validate="'required'"
                      data-vv-name="step"
                      data-vv-as="gestión"
                    >
                      <template slot="option" slot-scope="option">
                        <div class="d-center">
                          {{ option.title }} <strong v-if="option.state">(Actual)</strong>
                        </div>
                      </template>
                    </v-select>
                  </b-form-group>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <strong>
                    <label for="office">Sucursal  :</label>
                  </strong>
                  <b-form-group label-for="office" :invalid-feedback="errors.first('office')" :state="!errors.has('office')">
                    <v-select
                      v-model="office"
                      label="description"
                      :options="offices"
                      :reduce="office => office.id"
                      placeholder="Seleccionar"
                      :state="errors.has('office') ? false : null"
                      v-validate="'required'"
                      data-vv-name="office"
                      data-vv-as="sucursal"
                    ></v-select>
                  </b-form-group>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <v-select
                    v-model="receipt.cta_pagos_fac_co" 
                    :options="plans" 
                    :selectable="(option) => option.selectable"
                    label="text"
                  >
                    <template slot="no-options">Seleccionar cuenta..</template>
                    <template slot="option" slot-scope="plan">
                      <div>
                        <span v-html="plan.text"></span>
                      </div>
                    </template>
                    <template slot="selected-option" slot-scope="plan">
                      <div>
                        <span v-html="plan.text"></span>
                      </div>
                    </template>
                  </v-select>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <v-select
                    v-model="receipt.cta_compras_fac" 
                    :options="plans" 
                    :selectable="(option) => option.selectable"
                    label="text"
                  >
                    <template slot="no-options">Seleccionar cuenta..</template>
                    <template slot="option" slot-scope="plan">
                      <div>
                        <span v-html="plan.text"></span>
                      </div>
                    </template>
                    <template slot="selected-option" slot-scope="plan">
                      <div>
                        <span v-html="plan.text"></span>
                      </div>
                    </template>
                  </v-select>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="pt-2">
          <button
            @click="submit"
            class="btn btn-danger btn-with-addon mr-auto text-nowrap"
          >
            <span class="btn-addon">
              <i class="btn-addon-icon fe fe-check-circle" />
            </span>
            REGISTRAR
          </button>
          <b-button @click="onClose" class="mr-2 float-right" variant="dark"><i class="fa fa-times-circle" aria-hidden="true"></i> CANCELAR</b-button>
        </div>
      </div>
    </a-spin>
  </b-modal>
</template>
<script>
import Purchase from "../../../models/Purchase"
import {VMoney} from 'v-money'
import Money from "../../../models/Money"
import PlanService from "../../../services/plan.service"
import ConfigService from "../../../services/config.service"
import PurchaseService from "../../../services/purchase.service"

export default {
  props: {
    visible: Boolean,
    offices: Array,
    steps: Array,
  },

  data() {
    return {
      purchase: new Purchase(),
      money: new Money(),
      types: [
        { label: '1 | COMPRAS PARA MERCADO INTERNO CON DESTINO A ACTIVIDADES GRAVADAS', value: 1},
        { label: '2 | COMPRAS PARA MERCADO INTERNO CON DESTINO A ACTIVIDADES NO GRAVADAS', value: 2},
        { label: '3 | COMPRAS SUJETAS A PROPORCIONALIDAD', value: 3},
        { label: '4 | COMPRAS PARA EXPORTACIONES', value: 4},
        { label: '5 | COMPRAS TANTO PARA EL MERCADO INTERNO COMO PARA EXPORTACIONES', value: 5},
      ],
      plans: [],
      step: null,
      office: null,
      receipt: {
        cta_pagos_fac_co: null,
        cta_compras_fac: null,
      },
      loadingPurchase: false,
      purchaseSelected: null,
      error: null,
    }
  },

  directives: {
    money: VMoney,
  },

  created() {
    this.$bus.$on('getDataConta', () => {
      this.loadingPurchase = true
      Promise.all([this.getPlansChild(), this.getCurrentConfig()])
      .then(() =>{
        this.loadingPurchase = false
      })
    })

    this.$bus.$on('setFormEdit', (data) => {
      this.purchaseSelected = data

      this.purchase.specification = data.specification
      this.purchase.date = data.date
      this.purchase.nit = data.nit
      this.purchase.business_name = data.business_name
      this.purchase.number = data.number
      this.purchase.dui = data.dui
      this.purchase.authorization = data.authorization
      this.purchase.total = data.total
      this.purchase.no_cf = data.no_cf
      this.purchase.subtotal = data.subtotal
      this.purchase.discounts = data.discounts
      this.purchase.gift = data.gift 
      this.purchase.base_cf = data.base_cf 
      this.purchase.cf = data.cf 
      this.purchase.control_code = data.control_code
      this.purchase.type = data.type

      this.visible = true
    })
  },
  
  methods: {
    onClose() {
      this.$emit("hide")
    },

    async getPlansChild() {
      const request = await PlanService.getPlansChild()
      if (request.status === 200) {
        this.plans = request.data.new
      }
    },

    async getCurrentConfig() {
      const request = await ConfigService.getCurrentConfig('configs/current')
      if (request.status === 200) {
        this.receipt.cta_pagos_fac_co = request.data.data.cta_pagos_fac_co
        this.receipt.cta_compras_fac = request.data.data.cta_compras_fac
      }
    },

    async submit() {
      this.error = null
      this.$validator.errors.clear()

      try {
        this.loadingPurchase = true

        if(this.purchaseSelected) {
          this._request = await PurchaseService.updatePurchase(this.purchaseSelected.id, purchase)
        } else {
          this._request = await PurchaseService.storePurchase(purchase)
        }

        if (this._request.status === 201 || this._request.status === 200) {
          this.loadingPurchase = false
        }
      } catch (err) {
        if(err.response.status === 422) {
          this.$setErrorsFromResponse(err.response.data)
          this.error = err.response.data.errors
        }
        this.loadingPurchase = false
      }
    },
  }
}
</script>
<style scoped>
fieldset {
  background-color: #fff1f1;
  border-radius: 4px;
  border: 1px solid rgb(201, 201, 201);
}

legend {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #000;
  font-size: 13px;
  font-weight: bold;
  padding: 3px 5px 3px 7px;
  width: auto;
}
</style>