<template>
  <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
    <legend>Datos Generales:</legend>
    <a-spin :spinning="success">
      <div class="container">
        <div class="d-flex flex-row-reverse bd-highlight">
          <small><strong>Los campos con (*) son obligatorios.</strong></small>
        </div>
        <b-form @submit.stop.prevent="submit">
          <div class="row">
            <div class="col-12 col-md-12 col-lg-4 col-xl-4">
              <strong>
                <label for="año">Año * :</label>
              </strong>
              <b-form-group label-for="año" :invalid-feedback="errors.first('año')" :state="!errors.has('año')">
                <b-form-input
                  v-model="gestion.año"
                  :state="errors.has('año') ? false : null"
                  v-validate="'required|max:16'"
                  data-vv-name="año"
                  data-vv-as="año"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-12 col-md-12 col-lg-4 col-xl-4">
              <strong>
                <label for="fecha_inicio">Fecha Inicio :</label>
              </strong>
              <b-form-group label-for="fecha_inicio" :invalid-feedback="errors.first('fecha_inicio')" :state="!errors.has('fecha_inicio')">
                <b-form-input
                  v-model="gestion.fecha_inicio"
                  :state="errors.has('fecha_inicio') ? false : null"
                  v-validate="'required'"
                  data-vv-name="fecha_inicio"
                  data-vv-as="fecha inicio"
                  type="date"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-12 col-md-12 col-lg-4 col-xl-4">
              <strong>
                <label for="fecha_fin">Fecha Fin :</label>
              </strong>
              <b-form-group label-for="fecha_fin" :invalid-feedback="errors.first('fecha_fin')" :state="!errors.has('fecha_fin')">
                <b-form-input
                  v-model="gestion.fecha_fin"
                  :state="errors.has('fecha_fin') ? false : null"
                  v-validate="'required'"
                  data-vv-name="fecha_fin"
                  data-vv-as="fecha fin"
                  type="date"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row my-2">
            <div class="col-12 col-md-12 col-lg-6 col-xl-6">
              <b-form-checkbox v-model="retry">
                Quedarme en la página después de registrar los datos.
              </b-form-checkbox>
            </div>
            <div class="col-12 col-md-12 col-lg-6 col-xl-6">
              <b-button
                type="submit"
                class="float-right"
              >{{ id == null ? 'REGISTRAR' : 'ACTUALIZAR' }}</b-button>
            </div>
          </div>
        </b-form>
      </div>
    </a-spin>
  </fieldset>
</template>

<script>
import Gestion from '../../models/Gestion'
import GestionService from '../../services/gestion.service'

export default {
  data() {
    return {
      success: false,
      retry: false,
      id: this.$route.params.id,
      gestion: new Gestion(),
    };
  },

  created() {
    if (this.id) {
      this.showGestion()
    }
  },

  methods: {
    showGestion:async function() {
      const response = await GestionService.showGestion(`gestiones/${this.id}/edit`)
      if (response.status === 200) {
        let obj =  {
          id: response.data.data.id,
          año: response.data.data.año,
          fecha_inicio: response.data.data.fecha_inicio,
          fecha_fin: response.data.data.fecha_fin,
        }
        this.gestion = obj
        this.success = false
      }
    },

    submit: async function() {
      const vm = this
      vm.success = true
      vm.$validator.errors.clear()
      try {
        if(vm.id) {
          vm._save = await GestionService.updateGestion(vm.id, vm.gestion)
        } else {
          vm._save = await GestionService.storeGestion(vm.gestion)
        }
        if (vm._save.status === 201 || vm._save.status === 200) {
          vm.success = false
          this.$emit("success", vm._save.data.data)
          this.$message.success(vm._save.data.message)
          if (vm.retry && !this.id) {
            vm.gestion = new Gestion()
          } else {
            vm.$router.push({ name: 'ListGestiones'})
          }
        }
      } catch (err) {
        if(err.response.status === 422) vm.$setErrorsFromResponse(err.response.data)
        vm.success = false
      }
    },
  }
}
</script>
<style scoped>
  >>> .ant-spin-dot-item {
    background-color: #9e0207;
  }

  fieldset {
    background-color: #e9e4e6;
    border-radius: 4px;
  }

  legend {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #000;
    font-size: 17px;
    font-weight: bold;
    padding: 3px 5px 3px 7px;
    width: auto;
  }
</style>
