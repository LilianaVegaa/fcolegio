<template>
  <b-card no-body>
    <a-spin :spinning="loadingConfig">
      <div class="container">
        <h5 class="text-center font-weight-bold mt-2"><u>Códigos Fijos</u></h5>
        <hr>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <strong>
              <label for="cf">Crédito Fiscal % * :</label>
            </strong>
            <b-form-group label-for="cf" :invalid-feedback="errors.first('cf')" :state="!errors.has('cf')">
              <b-form-input 
                v-model="config.cf"
                :state="errors.has('cf') ? false : null"
                v-validate="'required'"
                data-vv-name="cf"
                data-vv-as="crédito fiscal"
                v-money="money"
                class="text-right"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <strong>
              <label for="df">Débito Fiscal % * :</label>
            </strong>
            <b-form-group label-for="df" :invalid-feedback="errors.first('df')" :state="!errors.has('df')">
              <b-form-input
                v-model="config.df" 
                :state="errors.has('df') ? false : null"
                v-validate="'required'"
                data-vv-name="df"
                data-vv-as="débito fiscal"
                v-money="money"
                class="text-right"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <strong>
              <label for="it">Impuesto a las Transacciones % * :</label>
            </strong>
            <b-form-group label-for="it" :invalid-feedback="errors.first('it')" :state="!errors.has('it')">
              <b-form-input 
                v-model="config.it"
                :state="errors.has('it') ? false : null"
                v-validate="'required'"
                data-vv-name="it"
                data-vv-as="Impuesto a las transacciones"
                v-money="money"
                class="text-right"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <strong>
              <label for="itp">Impuesto a las Transacciones por Pagar % * :</label>
            </strong>
            <b-form-group label-for="itp" :invalid-feedback="errors.first('itp')" :state="!errors.has('itp')">
              <b-form-input 
                v-model="config.itp"
                :state="errors.has('itp') ? false : null"
                v-validate="'required'"
                data-vv-name="itp"
                data-vv-as="Impuesto a las transacciones por pagar"
                v-money="money"
                class="text-right"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <strong>
              <label for="asiento_apertura">Seleccionar Asiento de Apertura * :</label>
            </strong>
            <b-form-group label-for="asiento_apertura" :invalid-feedback="errors.first('asiento_apertura')" :state="!errors.has('asiento_apertura')">
              <v-select
                v-model="config.asiento_apertura" 
                :options="receipts" 
                :reduce="receipt => receipt.id"
              >
                <template slot="no-options">Sin Datos..</template>
                <template slot="option" slot-scope="receipt">
                <div>
                    N° <span v-html="receipt.number"></span> | <span v-html="receipt.type"></span> | <span v-html="receipt.glosa"></span>
                </div>
                </template>
                <template slot="selected-option" slot-scope="receipt">
                <div>
                    N° <span v-html="receipt.number"></span> | <span v-html="receipt.type"></span> | <span v-html="receipt.glosa"></span>
                </div>
                </template>
              </v-select>
            </b-form-group>
          </div>
        </div>
      </div>
      <div class="p-2">
        <button
          @click="submit"
          type="button"
          class="btn btn-danger btn-with-addon mr-auto text-nowrap"
        >
          <span class="btn-addon">
            <i class="btn-addon-icon fe fe-check-circle" />
          </span>
          GUARDAR CAMBIOS
        </button>
      </div>
    </a-spin>
  </b-card>
</template>
<script>
import {VMoney} from 'v-money'
import Money from "../../../models/Money"
import ConfigService from "../../../services/config.service"
import Receiptervice from "../../../services/receipt.service"

export default {
  data() {
    return {
      money: new Money(),
      loadingConfig: false,
      configId: null,
      config: {
        cf: null,
        df: null,
        it: null,
        itp: null,
        asiento_apertura: null,
      },
      receipts: [],
    }
  },

  directives: {
    money: VMoney,
  },

  created() {
    Promise.all([this.getStepConfig(), this.listReceipts()])
      .then(() =>{
        this.$emit("config", false)
      })
  },

  methods: {
    listReceipts: async function() {
      const request = await Receiptervice.listReceipts();
      if (request.status === 200) {
        this.receipts = request.data
      }
    },

    getStepConfig:async function() {
      const request = await ConfigService.getStepConfig('configs/step')
      if (request.status === 200) {
        this.configId = request.data.data.id
        this.config.cf = request.data.data.cf
        this.config.df = request.data.data.df
        this.config.it = request.data.data.it
        this.config.itp = request.data.data.itp
        this.config.asiento_apertura = request.data.data.asiento_apertura
      }
    },

    async submit() {
      this.loadingConfig = true
      this.$validator.errors.clear()
      try {
        const request = await ConfigService.updateConfig(this.configId, this.config)
        if (request.status === 200) {
          this.loadingConfig = false
        }
      } catch (err) {
        if(err.response.status === 422) this.$setErrorsFromResponse(err.response.data)
        this.loadingConfig = false
      }
    },
  }
}
</script>
