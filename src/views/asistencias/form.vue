<template>
  <div class="container" v-show="success">
    <a-spin :spinning="loading">
      <b-card v-if="curso && gestion">
        <h3>Asistencia del curso {{ curso.nombre }} - Gestión {{ gestion.año }}</h3>
        <hr>
        <!-- Selección de Mes y Materia -->
        <div class="row">
          <div class="col-12 col-md-12 col-lg-4 col-xl-4">
            <b-form-group label="Seleccionar Mes:" class="me-3 font-weight-bold">
              <b-form-select v-model="mesSeleccionado" :options="meses"></b-form-select>
            </b-form-group>
          </div>
          <div class="col-12 col-md-12 col-lg-4 col-xl-4">
            <b-form-group label="Seleccionar Materia:" class="font-weight-bold">
              <b-form-select v-model="materiaSeleccionada" :options="materias"></b-form-select>
            </b-form-group>
          </div>
          <div class="col-12 col-md-12 col-lg-4 col-xl-4">
            <button
              type="button"
              class="btn btn-danger btn-with-addon mr-auto text-nowrap"
              @click="obtenerEstructuraAsistencias"
              style="margin-top: 2rem;"
            >
              <span class="btn-addon">
                <i class="btn-addon-icon fe fe-search" />
              </span>
              Obtener Lista
            </button>
          </div>
        </div>

        <!-- <pre>{{ $data }}</pre> -->

        <!-- Tabla de Asistencia -->
        <vue-custom-scrollbar v-if="Object.keys(asistencias).length > 0">
          <div style="overflow-x: auto;">
            <b-table :items="estudiantes" :fields="camposTabla" bordered>
              <template #cell()="data">
                <div v-if="data.field.key.startsWith('day_')" style="text-align: center;">
                  <b-form-radio
                    v-for="opcion in opcionesAsistencia"
                    :key="opcion.value"
                    v-model="asistencias[materiaNombre][data.item.id][`mes_${mesSeleccionado}`][data.field.key]"
                    :value="opcion.value"
                  >
                    {{ opcion.value }}
                  </b-form-radio>
                </div>
                <div v-else>{{ data.value }}</div>
              </template>
            </b-table>
          </div>
        </vue-custom-scrollbar>
        <div class="row mt-2" v-if="Object.keys(asistencias).length > 0">
          <div class="col-12 col-md-12 col-lg-12 col-xl-12">
            <button
              type="button"
              class="btn btn-secondary btn-with-addon mr-auto text-nowrap pull-right"
              @click="store"
            >
              <span class="btn-addon">
                <i class="btn-addon-icon fe fe-plus-circle" />
              </span>
              Guardar Asistencias
            </button>
          </div>
        </div>
      </b-card>
    </a-spin>
  </div>
</template>

<script>
import vueCustomScrollbar from "vue-custom-scrollbar";
import AsistenciaService from "../../services/asistencia.service";

export default {
  data() {
    return {
      id: this.$route.params.id,
      año: this.$route.params.gestion,
      success: true,
      loading: false,
      curso: null,
      gestion: null,
      estudiantes: [],
      mesSeleccionado: new Date().getMonth() + 1,
      materiaSeleccionada: null,
      materias: [],
      meses: [
        { value: 1, text: "Enero" },
        { value: 2, text: "Febrero" },
        { value: 3, text: "Marzo" },
        { value: 4, text: "Abril" },
        { value: 5, text: "Mayo" },
        { value: 6, text: "Junio" },
        { value: 7, text: "Julio" },
        { value: 8, text: "Agosto" },
        { value: 9, text: "Septiembre" },
        { value: 10, text: "Octubre" },
        { value: 11, text: "Noviembre" },
        { value: 12, text: "Diciembre" },
      ],
      diasDelMes: [],
      asistencias: {},
      opcionesAsistencia: [
        { value: "P", text: "Presente" },
        { value: "R", text: "Retraso" },
        { value: "F", text: "Falta" },
      ],
    };
  },

  components: { vueCustomScrollbar },

  computed: {
    camposTabla() {
      return [
        { key: "fullname", label: "Estudiante" },
        ...this.diasDelMes.map((dia) => ({
          key: `day_${dia}`,
          label: `${dia}/${this.mesSeleccionado}`,
        })),
      ];
    },
    materiaNombre() {
      const materia = this.materias.find((m) => m.value === this.materiaSeleccionada);
      return materia ? materia.text : null;
    },
  },

  created() {
    Promise.all([this.getAsistenciasDetalle()])
    .then(() =>{
      this.success = true
    })
  },

  methods: {
    async store() {
      this.loading = true
      const transformedData = this.transAsistencias(this.asistencias)
      try {
        const response = await AsistenciaService.storeAsistencia(transformedData)
        if (response.status === 201 || response.status === 200) {
          this.$message.success(response.data.message)
          this.loading = false
          // vm.$router.push({ name: 'ListAsistencias'})
        }
      } catch (err) {
        this.loading = false
      }
    },

    getAsistenciasDetalle: async function() {
      const response = await AsistenciaService.getAsistenciasDetalle({id: this.id, gestion:this.año})
      if (response.status === 200) {
        const materias = response.data.materias
        this.curso = response.data.curso
        this.gestion = response.data.gestion
        this.estudiantes = response.data.estudiantes
        this.materias = materias.map(item => ({
            value: item.id,
            text: item.nombre
        }));
      }
    },

    async obtenerEstructuraAsistencias() {
      this.loading = true
      try {
        const response = await AsistenciaService.getAsistenciasByCurso({
          curso_id: this.curso.id,
          materia_id: this.materiaSeleccionada,
          gestion: this.gestion ? this.gestion.año : '2024',
          mes: this.mesSeleccionado,
        });
        this.asistencias = response.data;
        this.actualizarDias();
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    actualizarDias() {
      if (this.gestion) {
        const ultimoDia = new Date(this.gestion.año, this.mesSeleccionado, 0).getDate();
        this.diasDelMes = Array.from({ length: ultimoDia }, (_, i) => i + 1);
      }
    },

    transAsistencias(data) {
        // Crear un mapeo de "text" a "value"
        const materiaMap = this.materias.reduce((map, materia) => {
            map[materia.text] = materia.value;
            return map;
        }, {});

        // Reemplazar las claves según el mapeo
        const transformed = Object.keys(data).reduce((result, key) => {
            const newKey = materiaMap[key] || key; // Obtener el nuevo valor o conservar el original
            result[newKey] = data[key];
            return result;
        }, {});

        return transformed;
    }
  },

  mounted() {
    this.actualizarDias();
  },
};
</script>

<style scoped>
  >>> .ant-spin-dot-item {
    background-color: #9e0207;
  }
</style>
