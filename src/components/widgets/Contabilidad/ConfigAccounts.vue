<template>
  <div>
    <a-spin :spinning="loading">
      <h4 class="modal-title text-center font-weight-bold "><u>CONFIGURACIÓN DE PLAN DE CUENTAS</u></h4>
      <b-card no-body>
        <!-- <pre>{{ $data.plans }}</pre> -->
        <b-tabs v-model="tabIndex" card>
          <b-tab title="Flujo de Efectivo" :title-link-class="linkClass(0)">
            <vue-custom-scrollbar v-if="plans.length > 0">
              <div style="height:500px;">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">CUENTA</th>
                      <th scope="col">NOMBRE DE CUENTA</th>
                      <th scope="col">CLASIFICACIÓN</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(plan, index) in plans" :key="index">
                      <td data-label="CUENTA">{{ plan.number }}</td>
                      <td data-label="NOMBRE DE CUENTA">
                        <span v-if="plan.current_level == 1" v-html="plan.text"></span>
                        <span v-else-if="plan.current_level == 2" class="pl-1" v-html="plan.text"></span>
                        <span v-else-if="plan.current_level == 3" class="pl-2" v-html="plan.text"></span>
                        <span v-else-if="plan.current_level == 4" class="pl-3" v-html="plan.text"></span>
                        <span v-else class="pl-4" v-html="plan.text"></span>
                      </td>
                      <td data-label="CLASIFICACIÓN">
                        <div v-if="plan.current_level != 1">
                          <v-select
                            :clearable="false" 
                            @option:selected="changeCashFlow(plan)"
                            v-model="plan.cash_flow"
                            :options="cash_flow"
                          ></v-select>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </vue-custom-scrollbar>
            <div v-else class="text-center">
              <i class="fa fa-search-minus fa-3x" aria-hidden="true"></i>
              <h5>No tiene un plan de cuentas registrado</h5>
            </div>
          </b-tab>
          <b-tab title="Moneda" :title-link-class="linkClass(1)">
            <vue-custom-scrollbar v-if="plans.length > 0">
              <div style="height:500px;">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">CUENTA</th>
                      <th scope="col">NOMBRE DE CUENTA</th>
                      <th scope="col">MONEDA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(plan, index) in plans" :key="index">
                      <td data-label="CUENTA">{{ plan.number }}</td>
                      <td data-label="NOMBRE DE CUENTA">
                        <span v-if="plan.current_level == 1" v-html="plan.text"></span>
                        <span v-else-if="plan.current_level == 2" class="pl-1" v-html="plan.text"></span>
                        <span v-else-if="plan.current_level == 3" class="pl-2" v-html="plan.text"></span>
                        <span v-else-if="plan.current_level == 4" class="pl-3" v-html="plan.text"></span>
                        <span v-else class="pl-4" v-html="plan.text"></span>
                      </td>
                      <td data-label="MONEDA">
                        <v-select
                          :clearable="false" 
                          @option:selected="changeCurrency(plan)"
                          v-model="plan.currency"
                          :options="currency"
                        ></v-select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </vue-custom-scrollbar>
            <div v-else class="text-center">
              <i class="fa fa-search-minus fa-3x" aria-hidden="true"></i>
              <h5>No tiene un plan de cuentas registrado</h5>
            </div>
          </b-tab>
          <b-tab title="Rubro de Ajuste" :title-link-class="linkClass(2)">
            <vue-custom-scrollbar v-if="plans.length > 0">
              <div style="height:500px;">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">CUENTA</th>
                      <th scope="col">NOMBRE DE CUENTA</th>
                      <th scope="col">RUBRO AJUSTE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(plan, index) in plans" :key="index">
                      <td data-label="CUENTA">{{ plan.number }}</td>
                      <td data-label="NOMBRE DE CUENTA">
                        <span v-if="plan.current_level == 1" v-html="plan.text"></span>
                        <span v-else-if="plan.current_level == 2" class="pl-1" v-html="plan.text"></span>
                        <span v-else-if="plan.current_level == 3" class="pl-2" v-html="plan.text"></span>
                        <span v-else-if="plan.current_level == 4" class="pl-3" v-html="plan.text"></span>
                        <span v-else class="pl-4" v-html="plan.text"></span>
                      </td>
                      <td data-label="RUBRO AJUSTE">
                        <v-select
                          :clearable="false" 
                          @option:selected="changeAdjustment(plan)"
                          v-model="plan.adjustment"
                          :options="adjustment"
                        ></v-select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </vue-custom-scrollbar>
            <div v-else class="text-center">
              <i class="fa fa-search-minus fa-3x" aria-hidden="true"></i>
              <h5>No tiene un plan de cuentas registrado</h5>
            </div>
          </b-tab>
          <b-tab title="Detalle Plan de Cuentas" :title-link-class="linkClass(3)">
            <vue-custom-scrollbar v-if="plans.length > 0">
              <div style="height:500px;">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">CUENTA</th>
                      <th scope="col">NOMBRE DE CUENTA</th>
                      <th scope="col">FLUJO EFECTIVO</th>
                      <th scope="col">MONEDA</th>
                      <th scope="col">RUBRO AJUSTE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(plan, index) in plans" :key="index">
                      <td data-label="CUENTA">{{ plan.number }}</td>
                      <td data-label="NOMBRE DE CUENTA">
                        <span v-if="plan.current_level == 1" v-html="plan.text"></span>
                        <span v-else-if="plan.current_level == 2" class="pl-1" v-html="plan.text"></span>
                        <span v-else-if="plan.current_level == 3" class="pl-2" v-html="plan.text"></span>
                        <span v-else-if="plan.current_level == 4" class="pl-3" v-html="plan.text"></span>
                        <span v-else class="pl-4" v-html="plan.text"></span>
                      </td>
                      <td data-label="FLUJO EFECTIVO">
                        {{ plan.cash_flow }}
                      </td>
                      <td data-label="MONEDA">
                        {{ plan.currency }}
                      </td>
                      <td data-label="RUBRO AJUSTE">
                        {{ plan.adjustment }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </vue-custom-scrollbar>
            <div v-else class="text-center">
              <i class="fa fa-search-minus fa-3x" aria-hidden="true"></i>
              <h5>No tiene un plan de cuentas registrado</h5>
            </div>
          </b-tab>
        </b-tabs>
        <div class="p-2">
          <button
            v-if="plans.length > 0"
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
      </b-card>
    </a-spin>
  </div>
</template>
<script>
import PlanService from "../../../services/plan.service"
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"

export default {
  data() {
    return {
      tabIndex: 0,
      loading:false,
      plans: [],
      cash_flow: ['EFECTIVO','OPERACIÓN','INVERSIÓN','FINANCIACIÓN','N/A'],
      currency: ['BOLIVIANOS','DÓLARES'],
      adjustment: ['MONETARIO','NO MONETARIO'],
    }
  },

  oldPlans: [],

  components: { vueCustomScrollbar },

  created() {
    this.getPlansChild()
  },

  methods: {
    async submit() {
      this.loading = true
      this.$validator.errors.clear()
      try {
        let data = this.plans.filter(i => {
          let item = this.oldPlans.find(o => o.id === i.id) 
          return !item || item.cash_flow != i.cash_flow || item.currency != i.currency || item.adjustment != i.adjustment
        })

        const request = await PlanService.updateConfigsPlan(this.plans)
        if (request.status === 200) {
          this.loading = false
        }
      } catch (err) {
        if(err.response.status === 422) this.$setErrorsFromResponse(err.response.data)
        this.loading = false
      }
    },

    changeCashFlow(plan) {
      let data = this.plans.filter(v => new RegExp(`^${plan.number.toString()}`).test(v.number.toString())).map(i => i.id)
      this.plans = this.plans.map(obj =>
        data.includes(obj.id) ? { ...obj, cash_flow: plan.cash_flow } : obj
      )
    },

    changeCurrency(plan) {
      let data = this.plans.filter(v => new RegExp(`^${plan.number.toString()}`).test(v.number.toString())).map(i => i.id)
      this.plans = this.plans.map(obj =>
        data.includes(obj.id) ? { ...obj, currency: plan.currency } : obj
      )
    },

    changeAdjustment(plan) {
      let data = this.plans.filter(v => new RegExp(`^${plan.number.toString()}`).test(v.number.toString())).map(i => i.id)
      this.plans = this.plans.map(obj =>
        data.includes(obj.id) ? { ...obj, adjustment: plan.adjustment } : obj
      )
    },

    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['bg-danger', 'text-white']
      } else {
        return ['bg-light', 'text-danger']
      }
    },

    getPlansChild: async function() {
      const request = await PlanService.getPlansChild()
      if (request.status === 200) {
        this.plans = request.data.new
        this.oldPlans = request.data.old
        this.$emit("configuracion", false)
      }
    },
  }
}
</script>
<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

table th,
table td {
  border: 1px solid #807979;
  padding: 1em;
  font-weight: bold;
}

table tbody tr {
  background-color: rgb(252, 252, 252);
  border: 1px solid #ddd;
  padding: 0.35em;
  font-size: 0.80em;
}

table tfoot tr {
  background-color: #fff;
}

table tr:hover {background-color: #f7f7f7;}

table thead th {
  padding-top: 2px;
  padding-bottom: 2px;
  background-color: #9e0207;
  color: white;
  text-transform: uppercase;
  text-align: center;
  font-size: 1em;
}

@media screen and (max-width: 800px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tfoot th {
    border: none;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }

  table td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>