<template>
  <div class="container" v-if="success">
    <a-spin :spinning="loading">
      <b-card no-body header-bg-variant="light">
        <template v-slot:header>
          <div>
            <span class="text-dark font-size-24 font-weight-bold">
              REGISTRAR ASIGNACIONES POR GESTION
            </span>
          </div>
        </template>
        <b-tabs card active-nav-item-class="font-weight-bold text-uppercase text-black">
          <b-tab title="ASIGNAR" :title-link-class="'text-black'" lazy>
            <!-- Selección de Gestión -->
            <b-form-group label="Selecciona una gestión" label-class="font-weight-bold">
              <v-select
                label="año"
                v-model="selectedGestion"
                :options="gestiones"
                :reduce="gestion => gestion.id"
                :disabled="disabledGestion"
              >
                <template slot="no-options">No se encontraron resultados..</template>
              </v-select>
            </b-form-group>

            <button
              type="button"
              class="btn btn-dark btn-with-addon mr-auto text-nowrap"
              @click="showCourseModal"
              :disabled="!selectedGestion"
            >
              <span class="btn-addon">
                <i class="btn-addon-icon fa fa-check-circle-o" />
              </span>
              Seleccionar Cursos
            </button>

            <!-- <pre>{{ $data }}</pre> -->

            <!-- Tabla de Cursos Seleccionados -->
            <b-table striped hover :items="selectedCourses" :fields="courseTableFields" class="mt-3" responsive="sm" small>
              <template #cell(materiasProfesores)="{ item }">
                <b-button size="sm" variant="success" @click="showAssignModal(item)">Asignar Materias y Profesores</b-button>
              </template>
              <template #cell(estudiantes)="{ item }">
                <b-button size="sm" variant="success" @click="showStudentModal(item)">Asignar Estudiantes</b-button>
              </template>
              <template #cell(opciones)="{ item }">
                <b-button @click="removeCourse(item.id)" squared size="sm" variant="danger"><i class="fa fa-trash"></i></b-button>
              </template>
            </b-table>

            <button
              type="button"
              class="btn btn-secondary btn-with-addon mr-auto text-nowrap"
              @click="saveRecords"
              :disabled="!canSaveRecords || !selectedGestion"
            >
              <span class="btn-addon">
                <i class="btn-addon-icon fe fe-plus-circle" />
              </span>
              Guardar Registros
            </button>

            <!-- Modal Selección de Cursos -->
            <b-modal
              v-model="isCourseModalVisible"
              :header-bg-variant="'secondary'"
              :size="'ml'"
              no-close-on-backdrop
              no-close-on-esc
              hide-footer
            >
              <template v-slot:modal-header="{ close }">
                <h5 class="text-white">Seleccionar Cursos</h5>
                <b-button squared size="sm" variant="outline-danger" @click="isCourseModalVisible = false">X</b-button>
              </template>
              <vue-custom-scrollbar v-if="courses.length > 0">
                <div style="height:400px;">
                  <b-table striped hover :items="courses" :fields="['nombre', 'seleccionar']" responsive="sm" small>
                    <template #cell(seleccionar)="{ item }">
                      <input v-model="item.selected" type="checkbox" class="k-checkbox">
                    </template>
                  </b-table>
                </div>
              </vue-custom-scrollbar>
              <div class="d-flex flex-sm-row flex-column">
                <div class="mr-auto p-2">
                  <button
                    type="button"
                    class="btn btn-danger btn-with-addon mr-auto text-nowrap"
                    @click="isCourseModalVisible = false"
                  >
                    <span class="btn-addon">
                      <i class="btn-addon-icon fe fe-x-circle" />
                    </span>
                    CANCELAR
                  </button>
                </div>
                <div class="p-2">
                  <button
                    type="button"
                    class="btn btn-secondary btn-with-addon mr-auto text-nowrap"
                    @click="selectCourses"
                  >
                    <span class="btn-addon">
                      <i class="btn-addon-icon fe fe-check-circle" />
                    </span>
                    ACEPTAR
                  </button>
                </div>
              </div>
            </b-modal>

            <!-- Modal Asignación de Materias y Profesores -->
            <b-modal
              v-model="isAssignModalVisible"
              :header-bg-variant="'secondary'"
              :size="'lg'"
              no-close-on-backdrop
              no-close-on-esc
              hide-footer
            >
              <template v-slot:modal-header="{ close }">
                <h5 class="text-white">Asignar Materias y Profesores</h5>
                <b-button squared size="sm" variant="outline-danger" @click="isAssignModalVisible = false">X</b-button>
              </template>
              <vue-custom-scrollbar v-if="courses.length > 0">
                <div style="height:400px;">
                  <b-button variant="dark" size="sm" class="mt-2" @click="addAssignment">
                    <i class="fa fa-plus-circle"></i> Agregar Fila
                  </b-button>
                  <hr>
                  <b-table striped hover :items="assignments" :fields="assignmentTableFields" responsive="sm" small>
                    <template #cell(materia)="{ item }">
                      <b-form-select v-model="item.materia" :options="materias" value-field="id" text-field="nombre" />
                    </template>
                    <template #cell(profesor)="{ item }">
                      <b-form-select v-model="item.profesor" :options="profesores" value-field="id" text-field="nombre" />
                    </template>
                    <template #cell(opciones)="{ item }">
                      <b-button @click="removeAssignment(item)" squared size="sm" variant="danger"><i class="fa fa-trash"></i></b-button>
                    </template>
                  </b-table>
                </div>
              </vue-custom-scrollbar>
              <div class="d-flex flex-sm-row flex-column">
                <div class="mr-auto p-2">
                  <button
                    type="button"
                    class="btn btn-danger btn-with-addon mr-auto text-nowrap"
                    @click="isAssignModalVisible = false"
                  >
                    <span class="btn-addon">
                      <i class="btn-addon-icon fe fe-x-circle" />
                    </span>
                    CANCELAR
                  </button>
                </div>
                <div class="p-2">
                  <button
                    type="button"
                    class="btn btn-secondary btn-with-addon mr-auto text-nowrap"
                    @click="saveAssignments"
                  >
                    <span class="btn-addon">
                      <i class="btn-addon-icon fe fe-check-circle" />
                    </span>
                    ACEPTAR
                  </button>
                </div>
              </div>
            </b-modal>

            <!-- Modal Asignación de Estudiantes -->
            <b-modal
              v-model="isStudentModalVisible"
              :header-bg-variant="'secondary'"
              :size="'ml'"
              no-close-on-backdrop
              no-close-on-esc
              hide-footer
            >
              <template v-slot:modal-header="{ close }">
                <h5 class="text-white">Asignar Estudiantes</h5>
                <b-button squared size="sm" variant="outline-danger" @click="isStudentModalVisible = false">X</b-button>
              </template>
              <vue-custom-scrollbar v-if="courses.length > 0">
                <div style="height:400px;">
                  <b-table striped hover :items="students" :fields="['nombre', 'seleccionar']" responsive="sm" small>
                    <template #cell(seleccionar)="{ item }">
                      <input v-model="item.selected" type="checkbox" class="k-checkbox">
                    </template>
                  </b-table>
                </div>
              </vue-custom-scrollbar>
              <div class="d-flex flex-sm-row flex-column">
                <div class="mr-auto p-2">
                  <button
                    type="button"
                    class="btn btn-danger btn-with-addon mr-auto text-nowrap"
                    @click="isStudentModalVisible = false"
                  >
                    <span class="btn-addon">
                      <i class="btn-addon-icon fe fe-x-circle" />
                    </span>
                    CANCELAR
                  </button>
                </div>
                <div class="p-2">
                  <button
                    type="button"
                    class="btn btn-secondary btn-with-addon mr-auto text-nowrap"
                    @click="saveStudentAssignments"
                  >
                    <span class="btn-addon">
                      <i class="btn-addon-icon fe fe-check-circle" />
                    </span>
                    ACEPTAR
                  </button>
                </div>
              </div>
            </b-modal>
          </b-tab>
        </b-tabs>
      </b-card>
    </a-spin>
  </div>
</template>

<script>
import GestionService from '../../services/gestion.service'
import CursoService from '../../services/curso.service'
import MateriaService from '../../services/materia.service'
import ProfesorService from '../../services/profesor.service'
import EstudianteService from '../../services/estudiante.service'
import AsignacionService from '../../services/asignacion.service'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"

export default {
  data() {
    return {
      id: this.$route.params.id,
      success: true,
      loading: false,
      selectedGestion: null,
      disabledGestion: false,
      // Datos estáticos
      gestiones: [],
      courses: [],
      materias: [],
      profesores: [],
      students: [],
      isStudentModalVisible: false,
      currentCourseForStudents: null,
      // Cursos seleccionados
      selectedCourses: [],
      // Modal visibility
      isCourseModalVisible: false,
      isAssignModalVisible: false,
      // Asignaciones actuales
      assignments: [],
      currentCourseId: null,
      // Columnas para tablas
      courseTableFields: ["nombre", "materiasProfesores", "estudiantes", "opciones"],
      assignmentTableFields: ["materia", "profesor", "opciones"],
    };
  },

  components: {
    vueCustomScrollbar,
  },

  computed: {
    // Verifica si hay al menos un curso seleccionado
    hasSelectedCourses() {
      return this.selectedCourses.length > 0;
    },
    // Verifica que todos los cursos seleccionados tengan asignaciones completas
    canSaveRecords() {
      return this.selectedCourses.every(course => {
        // Validar asignaciones de materias/profesores y estudiantes
        return course.assignments && course.assignments.length > 0 &&
              course.assignments.every(a => a.materia && a.profesor) &&
              course.students && course.students.length > 0;
      });
    }
  },

  created() {
    this.loading = true
    Promise.all([this.listGestiones(), this.listCursos(), this.listMaterias(), this.listProfesores(), this.listEstudiantes()])
    .then(() =>{
      this.success = true
      this.loading = false
    })
    if (this.id) {
      this.showAsignaciones()
    }
  },

  methods: {
    listGestiones: async function() {
      const gestiones = await GestionService.listGestiones()
      if (gestiones.status === 200) {
        this.gestiones = gestiones.data
      }
    },

    listCursos: async function() {
      const courses = await CursoService.listCursos()
      if (courses.status === 200) {
        this.courses = courses.data
      }
    },

    listMaterias: async function() {
      const materias = await MateriaService.listMaterias()
      if (materias.status === 200) {
        this.materias = materias.data
      }
    },

    listProfesores: async function() {
      const profesores = await ProfesorService.listProfesores()
      if (profesores.status === 200) {
        this.profesores = profesores.data
      }
    },

    listEstudiantes: async function() {
      const students = await EstudianteService.listEstudiantes()
      if (students.status === 200) {
        this.students = students.data
      }
    },

    showAsignaciones:async function() {
      const response = await AsignacionService.showAsignacion(`asignaciones/${this.id}/edit`)
      if (response.status === 200) {
        const gestiones = await GestionService.listingGeneral()
        if (gestiones.status === 200) {
          this.gestiones = gestiones.data
          const actualGestion = this.gestiones.find(gestion => gestion.id == this.id)
          this.selectedGestion = actualGestion.id
          this.selectedCourses = response.data.data
          const selectedIds = new Set(this.selectedCourses.map(course => course.id))
          this.courses.forEach(course => {
            if (selectedIds.has(course.id)) {
              this.$set(course, 'selected', true)
            } else {
              this.$set(course, 'selected', 0)
            }
          })
          this.disabledGestion = true
        }
      }
    },

    showCourseModal() {
      this.isCourseModalVisible = true;
    },

    removeCourse(courseId) {
      const course = this.selectedCourses.find(course => course.id === courseId);

      if (course && (course.assignments.length > 0 || course.students.length > 0)) {
        if (!confirm('Este curso tiene asignaciones o estudiantes. ¿Seguro que deseas eliminarlo?')) {
          return;
        }
      }

      const courseIndex = this.courses.findIndex(
          (course) => course.id == courseId
      );

      if (courseIndex !== -1) {
        this.courses[courseIndex].selected = false;
      }

      this.selectedCourses = this.selectedCourses.filter(course => course.id !== courseId);
    },

    showAssignModal(course) {
      this.currentCourseId = course.id;
      this.assignments = course.assignments || [];
      this.isAssignModalVisible = true;
    },

    addAssignment() {
      this.assignments.push({ materia: null, profesor: null });
    },

    removeAssignment(assignment) {
      this.assignments = this.assignments.filter((a) => a !== assignment);
    },

    saveAssignments() {
      const course = this.selectedCourses.find((c) => c.id === this.currentCourseId);
      if (course) {
        course.assignments = this.assignments;
      }
      this.isAssignModalVisible = false;
    },

    showStudentModal(course) {
      this.currentCourseForStudents = course.id;
      this.students.forEach(student => {
        student.selected = (course.students && course.students.includes(student.id)) || false;
      });
      this.isStudentModalVisible = true;
    },

    saveStudentAssignments() {
      const selectedStudents = this.students
        .filter(student => student.selected)
        .map(student => student.id);

      const course = this.selectedCourses.find(c => c.id === this.currentCourseForStudents);
      if (course) {
        course.students = selectedStudents;
      }
      this.isStudentModalVisible = false;
    },

    selectCourses() {
      // Crear un mapa para acceder rápidamente a los cursos ya seleccionados
      const existingCoursesMap = new Map(
        this.selectedCourses.map(course => [course.id, course])
      );

      // Crear una nueva lista de cursos seleccionados
      this.selectedCourses = this.courses
        .filter(course => course.selected) // Solo los cursos seleccionados
        .map(course => {
          if (existingCoursesMap.has(course.id)) {
            // Si ya existe, preservar asignaciones y estudiantes
            const existingCourse = existingCoursesMap.get(course.id);
            return {
              ...course,
              assignments: existingCourse.assignments || [],
              students: existingCourse.students || []
            };
          }
          // Si es un curso nuevo, inicializar con listas vacías
          return {
            ...course,
            assignments: [],
            students: []
          };
        });

      // Ocultar el modal
      this.isCourseModalVisible = false;
    },

    saveRecords: async function() {
      if (!this.canSaveRecords) {
        this.$message.warning("Debe completar las asignaciones para cada curso!.");
        return;
      }
      this.loading = true

      const structuredData = this.selectedCourses.map(course => ({
        curso_id: course.id,
        gestion_id: this.selectedGestion,
        materias: course.assignments && course.assignments.map((assignment) => ({
          materia_id: assignment.materia,
          profesor_id: assignment.profesor,
        })) || [],
        estudiantes: course.students || [],
      }));

      const vm = this
      try {
        if(vm.id) {
          vm._save = await AsignacionService.storeAsignacion(structuredData)
        } else {
          vm._save = await AsignacionService.storeAsignacion(structuredData)
        }
        if (vm._save.status === 201 || vm._save.status === 200) {
          this.$message.success(vm._save.data.message)
          this.loading = false
          vm.$router.push({ name: 'ListAsignaciones'})
        }
      } catch (err) {
        this.loading = false
      }
    },
  },
};
</script>

<style scoped>
.table {
  margin-top: 1rem;
}

>>> .ant-spin-dot-item {
  background-color: #9e0207;
}

>>> .k-checkbox:checked, .k-checkbox.k-checked {
    border-color: #9e0207;
    color: white;
    background-color: #9e0207;
}
</style>
