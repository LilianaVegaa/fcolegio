<template>
  <div class="container" v-if="success">
    <modal-tree
      :title="'Formulario Cuenta'"
      :visible="visibleModal"
      :item="itemSelected"
      :plan_types="plan_types"
      :plans="plans"
      :loading="loadingUpdate"
      @hide="hideModal"
      @store="storePlan"
      @update="updatePlan"
      @delete="deletePlan"
    ></modal-tree>
    <modal-form :size="'lg'" :title="'Importar Datos de otra gestión'" :visible="visibleModalImportData" @hide="closeModalImportData">
      <a-spin :spinning="loadingModalImportData">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <strong>
                <label for="step_selected">Elegir gestión para importar :</label>
              </strong>
              <b-form-group label-for="step_selected" :invalid-feedback="errors.first('step_selected')" :state="!errors.has('step_selected')">
                <v-select
                  label="title"
                  :reduce="type => type.id"
                  v-model="step_selected"
                  :state="errors.has('step_selected') ? false : null"
                  v-validate="'required'"
                  data-vv-name="step_selected"
                  data-vv-as="gestión"
                  :options="lastSteps"
                >
                  <template slot="no-options">Sin Registros</template>
                </v-select>
              </b-form-group>
            </div>
          </div>
          <strong><u>Datos a importar</u></strong>
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <input :disabled="config_plan" v-model="check_plan" id="plan" type="checkbox" class="k-checkbox">
              <label style="margin-bottom: 0;" for="plan" class="p-2">
                <strong>Plan de Cuentas</strong><small v-if="config_plan"> (Importado)</small>
              </label>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <input :disabled="config_project" v-model="check_project" id="project" type="checkbox" class="k-checkbox">
              <label style="margin-bottom: 0;" for="project" class="p-2">
                <strong>Proyectos</strong><small v-if="config_project"> (Importado)</small>
              </label>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <input :disabled="config_attendee" v-model="check_attendee" id="attendee" type="checkbox" class="k-checkbox">
              <label style="margin-bottom: 0;" for="attendee" class="p-2">
                <strong>Auxiliares</strong><small v-if="config_attendee"> (Importado)</small>
              </label>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <input :disabled="config_configs" v-model="check_configs" id="configs" type="checkbox" class="k-checkbox">
              <label style="margin-bottom: 0;" for="configs" class="p-2">
                <strong>Configuraciones</strong><small v-if="config_configs"> (Importado)</small>
              </label>
            </div>
          </div>
          <div class="pt-2">
            <button
              @click="importDataStep"
              type="submit"
              class="btn btn-danger btn-with-addon mr-auto text-nowrap"
            >
              <span class="btn-addon">
                <i class="btn-addon-icon fe fe-check-circle" />
              </span>
              IMPORTAR
            </button>
            <b-button @click="closeModalImportData" class="float-right" variant="dark"><i class="fa fa-times-circle" aria-hidden="true"></i> CANCELAR</b-button>
          </div>
        </div>
      </a-spin>
    </modal-form>
    <div class="row" v-if="!checkStep">
      <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="d-flex flex-sm-row flex-column shadow bg-light rounded mb-2">
          <div class="mr-auto p-2">
            <b-button v-if="!checkPlans" @click="setCollapseTrue()" variant="link" style="text-decoration: underline;">
              Expandir Todo
            </b-button>
            <b-button v-if="!checkPlans" @click="setCollapseFalse()" variant="link" style="text-decoration: underline;">
              Contraer Todo
            </b-button>
          </div>
          <div class="p-2">
            <button
              v-if="checkPlans || items.length > 0"
              type="button"
              class="btn btn-secondary btn-with-addon mr-auto text-nowrap"
              @click="openModalCreate"
            >
              <span class="btn-addon">
                <i class="btn-addon-icon fe fe-plus-circle" />
              </span>
              Registrar Nuevo
            </button>
            <b-button v-if="!checkPlans" title="Descargar PDF" variant="danger" class="ml-2">
              <i class="fa fa-file-pdf-o"></i>
            </b-button>
            <b-button v-if="!checkPlans" title="Descargar EXCEL" variant="success" class="ml-2">
              <i class="fa fa-file-excel-o"></i>
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="items.length > 0">
      <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="d-flex flex-sm-row flex-column shadow bg-custom rounded mt-4 p-3">
          <v-jstree 
            :data="items" 
            :collapse="collapseTree" 
            multiple
            allow-batch
            whole-row
            draggable
            @item-click="itemClick">
          </v-jstree>
        </div>
      </div>
    </div>
    <div v-if="checkPlans">
      <div class="text-center">
        <i class="fa fa-search-minus fa-3x" aria-hidden="true"></i>
        <h5>No tiene un plan de cuentas registrado</h5>
        <div>Puede ingresar manualmente uno o cargar datos desde una gestión anterior:</div>
        <hr>
        <button
          @click="openModalImportData"
          type="button"
          class="btn btn-dark btn-with-addon text-nowrap"
        >
          <span class="btn-addon">
            <i class="btn-addon-icon fa fa-external-link" />
          </span>
          Importar Datos
        </button>
      </div>
    </div>
    <div v-if="checkStep">
      <div class="text-center">
        <i class="fa fa-search-minus fa-3x" aria-hidden="true"></i>
        <h5>No se encontró ninguna gestión activa</h5>
        <div>Puede activar o abrir una nueva gestión ingresando al siguiente enlace:</div>
        <hr>
        <router-link :to="{ name: 'ListSteps' }">
          <button
            type="button"
            class="btn btn-danger btn-with-addon text-nowrap"
          >
            <span class="btn-addon">
              <i class="btn-addon-icon fa fa-external-link" />
            </span>
            Ir a gestiones
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import PlanService from "../../../services/plan.service"
import StepService from '../../../services/step.service'
import ModalTree from '../../../components/widgets/Modals/ModalTree.vue'
import ModalForm from "../../../components/widgets/Modals/ModalForm.vue"
import VJstree from 'vue-jstree' 

export default {
  data() {
    return {
      success: false,
      visibleModal: false,
      collapseTree: false,
      plan_types: [],
      plans: [],
      items: [],
      itemSelected: null,
      itemCreate: {
        number: 0,
        name: '',
        type_id: null,
        parent_id: null,
        level: null,
      },
      loadingUpdate: false,
      checkStep: false,
      checkPlans: false,
      //modal import
      visibleModalImportData: false,
      loadingModalImportData: false,
      step_selected: null,
      check_plan: true,
      check_project: true,
      check_attendee: true,
      check_configs: true,
      config_plan: false,
      config_project: false,
      config_attendee: false,
      config_configs: false,
      step_current: null,
      lastSteps: [],
    }
  },

  components: {
    VJstree,
    "modal-tree": ModalTree,
    'modal-form': ModalForm,
  },

  created() {
    this.getTreePlans()
  },

  methods: {
    async openModalImportData() {
      this.visibleModalImportData = true
      this.loadingModalImportData = true
      try {
        const request = await StepService.getLastSteps()
        if (request.status === 200) {
          this.lastSteps = request.data
          this.loadingModalImportData = false
        }
      } catch (err) {
        this.loadingModalImportData = false
        this.visibleModalImportData = false
      }
    },

    closeModalImportData() {
      this.visibleModalImportData = false
      this.step_selected = null
      // this.step_current = null
    },

    async importDataStep() {
      this.loadingModalImportData = true
      try {
        let data = {
          'step_current': this.step_current,
          'step_selected': this.step_selected,
          'check_plan': this.check_plan,
          'check_project': this.check_project,
          'check_attendee': this.check_attendee,
          'check_configs': this.check_configs,
          'config_plan': this.config_plan,
          'config_project': this.config_project,
          'config_attendee': this.config_attendee,
          'config_configs': this.config_configs,
        }
        const request = await StepService.importDataStep(data)
        if (request.status === 201) {
          this.loadingModalImportData = false
          this.visibleModalImportData = false
          window.location.reload()
        }
      } catch (err) {
        if(err.response.status === 422) this.$setErrorsFromResponse(err.response.data)
        this.loadingModalImportData = false
      }
    },
    
    getTreePlans: async function() {
      try {
        const request = await PlanService.getTreePlans()
        if (request.status === 200) {
          this.items = request.data.plans
          this.step_current = request.data.step.id
          this.config_plan = request.data.step.config_plan === 0 ? false : true
          this.config_project = request.data.step.config_project === 0 ? false : true
          this.config_attendee = request.data.step.config_attendee === 0 ? false : true
          this.config_configs = request.data.step.config_configs === 0 ? false : true
          if (!this.items.length > 0) {
            this.checkPlans = true
          }
          this.success = true
          this.$emit("general", false)
        }
      } catch (err) {
        if (err.response.status === 406) {
          this.checkStep = true
          this.success = true
          this.$emit("check", true)
          this.$emit("general", false)
        }
      }
    },

    getPlansParent: async function() {
      const plans = await PlanService.getPlansParent()
      if (plans.status === 200) {
        this.plans = plans.data.data
      }
    },

    getPlanTypes: async function() {
      const plan_types = await PlanService.getPlanTypes()
      if (plan_types.status === 200) {
        this.plan_types = plan_types.data
      }
    },

    setCollapseTrue() {
      const closeAll = (obj) => {
        obj.opened = true
        obj.children.forEach(closeAll)
      }
      this.items.forEach(closeAll)
    },

    setCollapseFalse() {
      const closeAll = (obj) => {
        obj.opened = false
        obj.children.forEach(closeAll)
      }
      this.items.forEach(closeAll)
    },

    itemClick (node) {
      this.getPlanTypes()
      this.itemSelected = {
        id: node.model.id,
        number: node.model.number,
        name: node.model.name,
        // type: node.model.type,
        type: node.model.type_id,
        level: node.model.level,
        higher: node.model.higher ? node.model.higher : node.model.parent_id,
      }
      this.visibleModal = true
    },

    hideModal() {
      this.itemSelected = null
      this.visibleModal = false
    },

    openModalCreate() {
      this.getPlanTypes()
      this.getPlansParent()
      this.visibleModal = true
    },

    async storePlan(data) {
      this.loadingUpdate = true
      this.$validator.errors.clear()

      let plan = {
        number: data.number,
        name: data.name,
        type_id: data.type_id,
        parent_id: data.parent,
        level: data.level,
        order: data.order,
        selectable: data.level == 5 ? 1 : 0,
      }
      try {
        const request = await PlanService.storePlan(plan)
        if (request.status === 201) {
          this.loadingUpdate = false
          this.hideModal()
          this.getTreePlans()
          this.$bus.$emit('store_plan')
          this.$message.success(request.data.message)
        }
      } catch (err) {
        if(err.response.status === 422) this.$setErrorsFromResponse(err.response.data)
        if (err.response.status === 406) {
          this.$notification.warning({
            message: 'Nota',
            description: err.response.data,
            duration: 10,
            placement: 'bottomRight'
          })
        }
        this.loadingUpdate = false
      }
    },

    async updatePlan() {
      this.loadingUpdate = true
      this.$validator.errors.clear()
      try {
        const request = await PlanService.updatePlan(this.itemSelected.id, this.itemSelected)
        if (request.status === 200) {
          this.getTreePlans()
          this.loadingUpdate = false
          this.visibleModal = false
        }
      } catch (err) {
        if(err.response.status === 422) this.$setErrorsFromResponse(err.response.data)
        this.loadingUpdate = false
      }
    },

    async deletePlan() {
      this.loadingUpdate = true
      try {
        const request = await PlanService.deletePlan(this.itemSelected.id)
        if (request.status === 200) {
          this.getTreePlans()
          this.loadingUpdate = false
          this.hideModal()
          this.$bus.$emit('success')
          this.$message.success(request.data.message)
          if (request.data.data) {
            this.$notification.warning({
              message: 'Nota',
              description: 'No se puede eliminar, por que la cuenta seleccionada tiene subcuentas.',
              duration: 10,
            })
          }
        }
      } catch (err) {
        this.loadingUpdate = false
      }
    }
  }
}
</script>

<style scoped>
  .bg-custom {
    background-color: #fbfbfb;  
  }

  >>> .tree-node .tree-anchor:hover {
    background-color: rgb(233, 233, 233); 
    width: 100%;
  }
</style>