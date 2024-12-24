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
      <h5 class="text-white">{{ title }}</h5>
      <b-button squared size="sm" variant="outline-danger" @click="onClose">X</b-button>
    </template>
    <a-spin :spinning="loading">
      <div v-if="item">
        <h4 class="modal-title text-center font-weight-bold "><u>DETALLES DE CUENTA</u></h4>
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <strong>
              <label for="number">Número :</label>
            </strong>
            <b-form-group label-for="number">
              <b-form-input
                disabled 
                v-model="item.number" 
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <strong>
              <label for="name">Nombre de Cuenta :</label>
            </strong>
            <b-form-group label-for="name" :invalid-feedback="errors.first('name')" :state="!errors.has('name')">
              <b-form-input
                v-model="item.name" 
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <strong>
              <label for="type">Tipo :</label>
            </strong>
            <b-form-group label-for="type">
              <!-- <b-form-input
                disabled 
                v-model="item.type" 
                type="text"
              ></b-form-input> -->
              <v-select
                disabled
                :clearable="false"
                label="name"
                v-model="item.type"
                :reduce="type => type.id"
                :options="plan_types"
              >
                <template slot="no-options">Seleccionar tipo..</template>
              </v-select>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <strong>
              <label for="level">Nivel :</label>
            </strong>
            <b-form-group label-for="level">
              <b-form-input
                disabled 
                v-model="item.level" 
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <strong>
              <label for="higher">Cuenta Mayor :</label>
            </strong>
            <b-form-group label-for="higher">
              <b-form-input
                disabled 
                v-model="item.higher" 
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="container">
          <div class="d-flex flex-sm-row flex-column">
            <div class="mr-auto p-2">
              <b-popover
                target="delete-plan"
                triggers="click"
                :show.sync="popoverShow"
                placement="auto"
                ref="popover"
              >
                <a-alert
                  message="Alerta"
                  description="Realmente desea eliminar esta cuenta?"
                  type="warning"
                  showIcon
                />
                <br /> 
                <div>
                  <b-button  class="mr-2" squared size="sm" @click="popoverShow = false" variant="outline-secondary">Cancelar</b-button>
                  <b-button squared size="sm" @click="deletePlan" variant="danger">Aceptar</b-button>
                </div>
              </b-popover>
              <button
                id="delete-plan"
                type="button"
                class="btn btn-warning btn-with-addon mr-auto text-nowrap"
              >
                <span class="btn-addon">
                  <i class="btn-addon-icon fe fe-trash" />
                </span>
                ELIMINAR CUENTA
              </button>
            </div>
            <div class="p-2">
              <button
                type="button"
                class="btn btn-secondary btn-with-addon mr-auto text-nowrap"
                @click="updatePlan"
              >
                <span class="btn-addon">
                  <i class="btn-addon-icon fe fe-check-circle" />
                </span>
                GUARDAR
              </button>
              <button
                type="button"
                class="btn btn-danger btn-with-addon mr-auto text-nowrap ml-2"
                @click="onClose"
              >
                <span class="btn-addon">
                  <i class="btn-addon-icon fe fe-x-circle" />
                </span>
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h4 class="modal-title text-center font-weight-bold "><u>REGISTRO DE CUENTA</u></h4>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <strong>
              <label for="number">Cuenta padre :</label>
            </strong>
            <b-form-group label-for="number" :invalid-feedback="errors.first('number')" :state="!errors.has('number')">
              <v-select
                :disabled="flag_account"
                label="text"
                v-model="selected"
                :options="plans"
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
              <label style="margin-bottom: 0;" for="set_mayor_account" class="pr-2">Agregar una cuenta mayor</label>
              <input v-model="chk_account" type="checkbox" id="set_mayor_account" class="k-checkbox">
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <strong>
              <label for="number">Número :</label>
            </strong>
            <b-form-group label-for="number">
              <b-form-input
                v-model="plan.number"
                disabled 
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <strong>
              <label for="number">Nombre de Cuenta * :</label>
            </strong>
            <b-form-group label-for="number">
              <b-form-input
                v-model="plan.name"
                @keyup="uppercase"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <strong>
              <label for="number">Tipo :</label>
            </strong>
            <b-form-group label-for="number">
              <!-- <b-form-input
                disabled
                v-model="plan.type"
                type="text"
              ></b-form-input> -->
              <v-select
                :disabled="!flag_account"
                :clearable="false"
                v-model="plan.type_id"
                label="name"
                :reduce="type => type.id"
                :options="plan_types"
              >
                <template slot="no-options">Seleccionar tipo..</template>
              </v-select>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <strong>
              <label for="number">Nivel :</label>
            </strong>
            <b-form-group label-for="number">
              <b-form-input
                disabled
                v-model="plan.level"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <strong>
              <label for="number">Cuenta Mayor :</label>
            </strong>
            <b-form-group label-for="number">
              <b-form-input
                disabled
                v-model="plan.higher"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="container">
          <!-- <pre>{{ $data }}</pre> -->
          <div class="d-flex flex-sm-row flex-column">
            <div class="mr-auto p-2">
              <button
                type="button"
                class="btn btn-secondary btn-with-addon mr-auto text-nowrap"
                @click="storePlan"
              >
                <span class="btn-addon">
                  <i class="btn-addon-icon fe fe-check-circle" />
                </span>
                GUARDAR
              </button>
            </div>
            <div class="p-2">
              <button
                type="button"
                class="btn btn-danger btn-with-addon mr-auto text-nowrap"
                @click="onClose"
              >
                <span class="btn-addon">
                  <i class="btn-addon-icon fe fe-x-circle" />
                </span>
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </a-spin>
  </b-modal>
</template>
<script>
import Plan from "../../../models/Plan"

export default {
  props: {
    visible: Boolean,
    title: String,
    item: Object,
    plan_types: Array,
    plans: Array,
    loading: Boolean,
  },

  data() {
    return {
      popoverShow: false,
      selected: null,
      flag_account: false,
      chk_account: false,
      plan: new Plan(),
    }
  },

  watch: {
    chk_account: function (value) {
      if (value) {
        this.restartData()
        this.flag_account = true
        // let numbers = this.plans.filter(v => v.current_level == 1).map(i => i.number)
        // this.plan.number = Math.max(...numbers) + 1
        if (this.plans.length > 0) {
          let numbers = this.plans.filter(v => v.current_level == 1).map(i => i.number)
          this.plan.number = Math.max(...numbers) + 1
          this.plan.order = Math.max(...numbers) + 1
        } else {
          this.plan.number = 1
          this.plan.order = 1
        }
        this.plan.level = 1
        this.plan.parent = 0
        this.plan.higher = 0
        // this.plan.order = Math.max(...numbers) + 1
      } else {
        this.restartData()
        this.flag_account = false
      }
    },

    selected: function (value) {
      if (value) {
        if (value.last) {
          this.plan.number = value.last + 1
        } else {
          this.plan.number = value.level == 5 ? `${value.number}001` : `${value.number}01` 
        }

        if (value.order) {
          let num = Number(value.order.substr(-1)) + 1
          this.plan.order = value.order.slice(0, -1) + num
        } else {
          this.plan.order = `${value.set_order}.1`
        }

        this.plan.parent = value.number
        this.plan.type = value.type.name
        this.plan.type_id = value.type.id
        this.plan.level = value.level
        this.plan.higher = value.number
      } else {
        this.plan = new Plan()
      }
    },
  },

  created() {
    this.$bus.$on('store_plan', () => {
      this.restartData()
    })
  },
  
  methods: {
    restartData() {
      this.selected = null
      this.plan = new Plan()
    },

    onClose() {
      this.chk_account = false
      this.restartData()
      this.$emit("hide")
    },

    storePlan() {
      this.$emit("store", this.plan)
    },

    updatePlan() {
      this.$emit("update")
    },

    deletePlan() {
      this.popoverShow = false
      this.$emit("delete")
    },

    uppercase() {
      this.plan.name = this.plan.name.toUpperCase()
    }
  }
}
</script>
<style scoped>
  >>> .k-checkbox:checked, .k-checkbox.k-checked {
    border-color: #ffdedf;
    color: white;
    background-color: #9e0207;
  }

  >>> .vs__dropdown-option--disabled {
    font-weight: bold;
    background: #ededed;
    color: #000000;
  }
</style>