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
                <label for="nombre">Nombre* :</label>
              </strong>
              <b-form-group label-for="nombre" :invalid-feedback="errors.first('nombre')" :state="!errors.has('nombre')">
                <b-form-input
                  v-model="materia.nombre"
                  :state="errors.has('nombre') ? false : null"
                  v-validate="'required|max:120'"
                  data-vv-name="nombre"
                  data-vv-as="nombre"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-12 col-md-12 col-lg-6 col-xl-6">
              <strong>
                <label for="descripcion">Descripción :</label>
              </strong>
              <b-form-group label-for="descripcion" :invalid-feedback="errors.first('descripcion')" :state="!errors.has('descripcion')">
                <b-form-input
                  v-model="materia.descripcion"
                  :state="errors.has('descripcion') ? false : null"
                  v-validate="'max:128'"
                  data-vv-name="descripcion"
                  data-vv-as="descripción"
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
import Materia from '../../models/Materia'
import MateriaService from '../../services/materia.service'

export default {
  data() {
    return {
      success: false,
      retry: false,
      id: this.$route.params.id,
      materia: new Materia(),
    };
  },

  created() {
    if (this.id) {
      this.showMateria()
    }
  },

  methods: {
    showMateria:async function() {
      const response = await MateriaService.showMateria(`materias/${this.id}/edit`)
      if (response.status === 200) {
        let obj =  {
          id: response.data.data.id,
          nombre: response.data.data.nombre,
          descripcion: response.data.data.descripcion,
        }
        this.materia = obj
        this.success = false
      }
    },

    submit: async function() {
      const vm = this
      vm.success = true
      vm.$validator.errors.clear()
      try {
        if(vm.id) {
          vm._save = await MateriaService.updateMateria(vm.id, vm.materia)
        } else {
          vm._save = await MateriaService.storeMateria(vm.materia)
        }
        if (vm._save.status === 201 || vm._save.status === 200) {
          vm.success = false
          this.$emit("success", vm._save.data.data)
          this.$message.success(vm._save.data.message)
          if (vm.retry && !this.id) {
            vm.materia = new Materia()
          } else {
            vm.$router.push({ name: 'ListMaterias'})
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
