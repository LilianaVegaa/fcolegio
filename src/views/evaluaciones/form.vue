<template>
  <div class="container" v-show="success">
    <a-spin :spinning="loading">
      <b-card v-if="curso && gestion">
        <h3>Evaluaciones del curso {{ curso.nombre }} - Gestión {{ gestion.año }}</h3>
        <hr>
        <!-- Selección de Materia -->
        <div class="row">
          <div class="col-12 col-md-12 col-lg-6 col-xl-6">
            <b-form-group label="Seleccionar Materia:" class="font-weight-bold">
              <b-form-select v-model="materiaSeleccionada" :options="materias"></b-form-select>
            </b-form-group>
          </div>
          <div class="col-12 col-md-12 col-lg-6 col-xl-6">
            <button
              type="button"
              class="btn btn-danger btn-with-addon mr-auto text-nowrap"
              @click="obtenerEstructuraEvaluaciones"
              style="margin-top: 2rem;"
            >
              <span class="btn-addon">
                <i class="btn-addon-icon fe fe-search" />
              </span>
              Obtener Lista
            </button>
          </div>
        </div>

        <!-- Tabla de Evaluaciones -->
        <vue-custom-scrollbar v-if="Object.keys(evaluaciones).length > 0">
          <div style="overflow-x: auto;">
            <b-table :items="estudiantes" :fields="camposTabla" bordered>
              <template #thead-top="data">
                <b-tr>
                  <b-th><span class="sr-only">Estudiante</span></b-th>
                  <template v-for="(periodo, index) in periodosDinamicos">
                    <b-th
                      :colspan="periodo.colspan"
                      :variant="obtenerColorPeriodo(periodo, index)"
                      class="text-center align-middle"
                    >
                      {{ periodo.label }}
                    </b-th>
                  </template>
                </b-tr>
              </template>
              <template #cell(fullname)="data">
                <!-- Nombre del estudiante -->
                {{ data.item.fullname }}
              </template>

              <template #cell()="data">
                <b-form-input
                  v-model="evaluaciones[materiaSeleccionada][data.item.id][data.field.periodo][data.field.key]"
                  type="number"
                  size="sm"
                  class="w-100"
                ></b-form-input>
              </template>
            </b-table>
          </div>
        </vue-custom-scrollbar>

        <div class="row mt-2" v-if="Object.keys(evaluaciones).length > 0">
          <div class="col-12">
            <button
              type="button"
              class="btn btn-secondary btn-with-addon mr-auto text-nowrap pull-right"
              @click="guardarEvaluaciones"
            >
              <span class="btn-addon">
                <i class="btn-addon-icon fe fe-save" />
              </span>
              Guardar Notas
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
import EvaluacionService from "../../services/evaluacion.service";

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
      materiaSeleccionada: null,
      materias: [],
      evaluaciones: {}
    };
  },

  components: { vueCustomScrollbar },

  computed: {
    camposTabla() {
      const primerEstudiante = Object.values(this.evaluaciones)[0];
      const primerPeriodo = Object.values(primerEstudiante)[0];

      const camposTabla = [
        { key: "fullname", label: "Estudiante" },
        ...Object.keys(primerPeriodo).flatMap((periodoId, index) => {
          const calificaciones = Object.keys(primerPeriodo[periodoId]);
          const periodoNumero = index + 1;
          return calificaciones.map((calificacionKey, calificacionIndex) => ({
            periodo: periodoId,
            key: `${calificacionKey}`,
            label: `Evaluación ${calificacionIndex + 1}`,
          }));
        }),
      ];

      return camposTabla;
    },

    periodosDinamicos() {
      const periodos = [];
      let periodoActual = null;

      this.camposTabla.forEach((campo) => {
        if (campo.key === "fullname") {
          return;
        }

        const match = campo.key.match(/periodo_(\d+)_/);
        if (match) {
          const periodoNumero = parseInt(match[1], 10);

          if (!periodoActual || periodoActual.numero !== periodoNumero) {
            if (periodoActual) {
              periodos.push({
                label: `Periodo ${periodoActual.numero}`,
                colspan: periodoActual.count,
                calificaciones: Array(periodoActual.count).fill({ key: `calificacion_${periodoActual.numero}` }),
              });
            }

            periodoActual = { numero: periodoNumero, count: 1 };
          } else {
            periodoActual.count++;
          }
        }
      });

      if (periodoActual) {
        periodos.push({
          label: `Periodo ${periodoActual.numero}`,
          colspan: periodoActual.count,
          calificaciones: Array(periodoActual.count).fill({ key: `calificacion_${periodoActual.numero}` }),
        });
      }

      return periodos;
    },
  },

  methods: {
    obtenerColorPeriodo(periodo, index) {
      const colores = ["primary", "secondary", "success", "danger", "warning", "info"];
      return colores[index % colores.length];
    },

    async obtenerEstructuraEvaluaciones() {
      this.loading = true;
      try {
        const response = await EvaluacionService.getEvaluacionesByCurso({
          curso_id: this.curso.id,
          materia_id: this.materiaSeleccionada,
          gestion: this.gestion ? this.gestion.id : 1,
        });
        this.evaluaciones = response.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },

    async guardarEvaluaciones() {
      this.loading = true
      try {
        const response = await EvaluacionService.storeEvaluacion({evaluaciones: this.evaluaciones})
        if (response.status === 201 || response.status === 200) {
          this.$message.success(response.data.message)
          this.loading = false
          // vm.$router.push({ name: 'ListAsistencias'})
        }
      } catch (err) {
        this.loading = false
      }
    },
  },

  async created() {
    const response = await AsistenciaService.getAsistenciasDetalle({ id: this.id, gestion: this.año });
    if (response.status === 200) {
      const materias = response.data.materias;
      this.curso = response.data.curso;
      this.gestion = response.data.gestion;
      this.estudiantes = response.data.estudiantes;
      this.materias = materias.map((item) => ({
        value: item.id,
        text: item.nombre,
      }));
    }
  },
};
</script>

<style scoped>
  >>> .ant-spin-dot-item {
    background-color: #9e0207;
  }
</style>
