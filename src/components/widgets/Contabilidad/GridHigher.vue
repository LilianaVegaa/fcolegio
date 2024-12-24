<template>
  <div class="container">
    <div class="row my-2">
      <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4">
        <b-form-group label-for="date" :invalid-feedback="errors.first('date')" :state="!errors.has('date')">
          <a-range-picker 
            v-model="date" 
            :locale="locale" 
            :format="dateFormat" 
            :state="errors.has('date') ? false : null"
            v-validate="'required'"
            data-vv-name="date"
            data-vv-as="fecha"
          />
        </b-form-group>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4">
        <v-select
          v-model="office"
          label="description"
          :options="offices"
          :reduce="office => office.id"
          placeholder="Sucursal.."
        ></v-select>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4">
        <v-select
          :reduce="project => project.id"
          label="title"
          v-model="project" 
          :options="projects"
          placeholder="Proyecto.."
        >
          <template slot="no-options">Sin Registros</template>
        </v-select>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-10 col-lg-10 col-xl-10">
        <strong>
          <label for="state">Seleccione la Cuenta :</label>
        </strong>
        <b-form-group label-for="plan" :invalid-feedback="errors.first('plan')" :state="!errors.has('plan')">
          <div class="d-table-cell w-100">
            <v-select
              v-model="plan" 
              :options="plans" 
              :selectable="(option) => option.selectable"
              label="text"
              :state="errors.has('plan') ? false : null"
              v-validate="'required'"
              data-vv-name="plan"
              data-vv-as="cuenta"
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
          <div class="d-table-cell align-middle">
            <b-button @click="getBookHigher" class="ml-1" size="sm" style="height: 2.5em;">
              <i class="fa fa-search"></i>
            </b-button>
          </div>
        </b-form-group>
      </div>
    </div>
    <hr>
    <vue-custom-scrollbar v-if="items.length > 0" :style="{ width: '100%' }">
      <table>
        <thead>
          <tr>
            <th width="50px">FECHA</th>
            <th width="40px">N° DOC.</th>
            <th width="200px">TÍTULO/RAZÓN SOCIAL</th>
            <th width="250px">GLOSA</th>
            <th width="120px">REFERENCIA</th>
            <th width="70px">DEBE Bs.</th>
            <th width="70px">HABER Bs.</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.date | formatDate('DD/MM/YYYY') }}</td>
            <td><b-button @click="showReceipt(item.id)" variant="link">{{ item.number }}</b-button></td>
            <td>{{ item.title }}</td>
            <td>{{ item.glosa }}</td>
            <td>{{ item.reference }}</td>
            <td>{{ item.debe_bs | currency }}</td>
            <td>{{ item.haber_bs | currency }}</td>
          </tr>
          <tr style="background: #9b9898; color: #fff;">
            <td colspan="4"></td>
            <td>Total Periodo:</td>
            <td>{{ totalDebe | currency }}</td>
            <td>{{ totalHaber | currency }}</td>
          </tr>
          <tr v-if="type == 1 || type == 5" style="background: #5e6267; color: #fff;">
            <td colspan="4"></td>
            <td>Saldo a la Fecha:</td>
            <td>{{ saldoTotal | currency }}</td>
            <td></td>
          </tr>
          <tr v-else style="background: #5e6267; color: #fff;">
            <td colspan="4"></td>
            <td>Saldo a la Fecha:</td>
            <td></td>
            <td>{{ saldoTotal | currency }}</td>
          </tr>
        </tbody>
      </table>
    </vue-custom-scrollbar>
    <div v-else class="d-flex justify-content-center" style="background-color: #e8e8e8;">
      <div class="text-center p-2">
        <i class="fa fa-search-minus fa-3x" aria-hidden="true"></i>
        <h6>Sin Datos Disponibles</h6>
      </div>
    </div>
  </div>
</template>
<script>
import locale from 'ant-design-vue/es/date-picker/locale/es_ES'
import moment from 'moment'
import 'moment/locale/es'
import PlanService from "../../../services/plan.service"
import ReceiptService from "../../../services/receipt.service"
import OfficeService from '../../../services/office.service'
import ProjectService from "../../../services/project.service"
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"

export default {
  data() {
    return {
      plans: [],
      plan: null,
      offices: [],
      office: null,
      projects: [],
      project: null,
      locale,
      moment,
      dateFormat: 'YYYY/MM/DD',
      date: null,
      items: [],
      type: null,
    }
  },

  components: { vueCustomScrollbar },

  computed: {
    totalDebe() {
      return this.items.reduce((acc, item) => acc + Number(item.debe_bs), 0)
    },

    totalHaber() {
      let total = this.items.reduce(function(acc, item) {
        return acc + item.haber_bs
      }, 0)
      return isNaN(total) ? 0 : total
    },

    saldoTotal() {
      if (this.type == 1 || this.type == 5) {
        return this.totalDebe - this.totalHaber
      } else {
        return this.totalHaber - this.totalDebe
      }
    },
  },

  created () {
    this.getPlansChild()

    Promise.all([this.getPlansChild(), this.listOffices(), this.listProjects()])
    .then(() =>{
      this.$emit("higher", false)
    })
  },

  methods: {
    showReceipt(id) {
      let routeData = this.$router.resolve({name: 'EditReceipt', params: {id: 1}});
      window.open(routeData.href, '_blank');
    },

    listOffices: async function() {
      const offices = await OfficeService.listOffices()
      if (offices.status === 200) {
        this.offices = offices.data
      }
    },

    listProjects: async function() {
      const projects = await ProjectService.listProjects()
      if (projects.status === 200) {
        this.projects = projects.data
      }
    },

    async getPlansChild() {
      const request = await PlanService.getPlansChild()
      if (request.status === 200) {
        this.plans = request.data.new
      }
    },

    async getBookHigher() {
      this.$validator.validate().then(async isTrue => {
        if (isTrue) {
          this.$store.dispatch("showLoader")
          try {
            let dateFormat = null
            if (this.date) {
              if (this.date.length > 0) {
                dateFormat = [
                  moment(this.date[0]).format('YYYY-MM-DD'),
                  moment(this.date[1]).format('YYYY-MM-DD')
                ]
              } else {
                dateFormat = null
              }
            } 
            let data = { date: dateFormat, office: this.office, project: this.project, plan: this.plan.id }
            const request = await ReceiptService.getBookHigher(data)
            if (request.status === 200) {
              this.items = request.data
              this.type = request.data[0].type_id
              this.$store.dispatch("hideLoader")
            }
          } catch (err) {
            this.$store.dispatch("hideLoader")
          }
        }
      })
    },
  }
}
</script>

<style scoped src="../../../assets/css/table_higher.css"></style>
