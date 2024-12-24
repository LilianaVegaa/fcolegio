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
            <div class="col-12 col-md-12 col-lg-6 col-xl-6">
              <strong>
                <label for="nombres">Nombres (s) * :</label>
              </strong>
              <b-form-group label-for="nombres" :invalid-feedback="errors.first('nombres')" :state="!errors.has('nombres')">
                <b-form-input
                  v-model="profesor.nombres"
                  :state="errors.has('nombres') ? false : null"
                  v-validate="'required|max:120'"
                  data-vv-name="nombres"
                  data-vv-as="nombres"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-12 col-md-12 col-lg-6 col-xl-6">
              <strong>
                <label for="apellidos">Apellidos * :</label>
              </strong>
              <b-form-group label-for="apellidos" :invalid-feedback="errors.first('apellidos')" :state="!errors.has('apellidos')">
                <b-form-input
                  v-model="profesor.apellidos"
                  :state="errors.has('apellidos') ? false : null"
                  v-validate="'required|max:120'"
                  data-vv-name="apellidos"
                  data-vv-as="apellidos"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-12 col-lg-6 col-xl-6">
              <strong>
                <label for="telefono">Teléfono * :</label>
              </strong>
              <b-form-group label-for="telefono" :invalid-feedback="errors.first('telefono')" :state="!errors.has('telefono')">
                <b-form-input
                  v-model="profesor.telefono"
                  :state="errors.has('telefono') ? false : null"
                  v-validate="'required|max:32'"
                  data-vv-name="telefono"
                  data-vv-as="teléfono"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-12 col-md-12 col-lg-6 col-xl-6">
              <strong>
                <label for="ci">CI * :</label>
              </strong>
              <b-form-group label-for="ci" :invalid-feedback="errors.first('ci')" :state="!errors.has('ci')">
                <b-form-input
                  v-model="profesor.ci"
                  :state="errors.has('ci') ? false : null"
                  v-validate="'required|max:16'"
                  data-vv-name="ci"
                  data-vv-as="ci"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-12 col-lg-12 col-xl-12">
              <strong>
                <label for="direccion">Dirección * :</label>
              </strong>
              <b-form-group label-for="direccion" :invalid-feedback="errors.first('direccion')" :state="!errors.has('direccion')">
                <b-form-input
                  v-model="profesor.direccion"
                  :state="errors.has('direccion') ? false : null"
                  v-validate="'max:128'"
                  data-vv-name="direccion"
                  data-vv-as="dirección"
                  type="text"
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
import Profesor from '../../models/Profesor'
import ProfesorService from '../../services/profesor.service'

export default {
  data() {
    return {
      success: false,
      retry: false,
      id: this.$route.params.id,
      profesor: new Profesor(),
    };
  },

  created() {
    if (this.id) {
      this.showProfesor()
    }
  },

  methods: {
    showProfesor:async function() {
      const response = await ProfesorService.showProfesor(`profesores/${this.id}/edit`)
      if (response.status === 200) {
        let obj =  {
          id: response.data.data.id,
          nombres: response.data.data.nombres,
          apellidos: response.data.data.apellidos,
          telefono: response.data.data.telefono,
          ci: response.data.data.ci,
          direccion: response.data.data.direccion,
        }
        this.profesor = obj
        this.success = false
      }
    },

    submit: async function() {
      const vm = this
      vm.success = true
      vm.$validator.errors.clear()
      try {
        if(vm.id) {
          vm._save = await ProfesorService.updateProfesor(vm.id, vm.profesor)
        } else {
          vm._save = await ProfesorService.storeProfesor(vm.profesor)
        }
        if (vm._save.status === 201 || vm._save.status === 200) {
          vm.success = false
          this.$emit("success", vm._save.data.data)
          this.$message.success(vm._save.data.message)
          if (vm.retry && !this.id) {
            vm.profesor = new Profesor()
          } else {
            vm.$router.push({ name: 'ListProfesores'})
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
