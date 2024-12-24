<template>
  <div class="container">
    <b-modal
      v-model="isDetailModalVisible"
      :header-bg-variant="'secondary'"
      :size="'lg'"
      no-close-on-backdrop
      no-close-on-esc
      hide-footer
    >
      <template v-slot:modal-header="{ close }">
        <h5 class="text-white">Detalle de Asignación</h5>
        <b-button squared size="sm" variant="outline-danger" @click="isDetailModalVisible = false">X</b-button>
      </template>
      <vue-custom-scrollbar v-if="selectedAsignacion">
        <div style="height:450px;">
          <div class="mb-3">
            <h4>Gestión: {{ selectedAsignacion.gestion }} - Fecha de Asignación: {{ selectedAsignacion.fecha }}</h4>
          </div>

          <div v-for="curso in selectedAsignacion.cursos" :key="curso.id" class="mb-4">
            <h5>
              <i class="fa fa-graduation-cap mr-2"></i>Curso: {{ curso.nombre }}
            </h5>
            <div v-for="materia in curso.materias" :key="materia.id" class="ml-3">
              <h6>
                <i class="fa fa-book mr-2"></i>Materia: {{ materia.nombre }}
                <small class="text-muted">- Profesor: {{ materia.profesor || 'Sin asignar' }}</small>
              </h6>
            </div>
            <hr>
            <strong>Estudiantes Registrados:</strong>
            <ul class="list-group">
              <li
                v-for="alumno in curso.alumnos"
                :key="alumno.id"
                class="list-group-item"
              >
                <i class="fa fa-user mr-2"></i>{{ alumno.nombre || 'Nombre no disponible' }}
              </li>
            </ul>
          </div>
        </div>
      </vue-custom-scrollbar>
    </b-modal>
    <modal-grid
      :title="'Lista de Seleccionados'"
      :visible="visibleModal"
      :data="itemsAsignacion"
      :access="'asignaciones'"
      :alert_message="'Realmente desea eliminar estos datos?'"
      @hide="visibleModal = !visibleModal"
      @deleted="deleted"
    ></modal-grid>
    <div class="row">
      <div class="table-responsive">
        <div class="d-flex flex-sm-row flex-column bg-secondary">
          <div class="mr-auto p-2">
            <b-button @click="visibleModal = true" v-if="itemsAsignacion.length > 0" squared variant="outline-danger" class="mr-2">
              <i class="fa fa-check-square"></i>
              ({{ itemsAsignacion.length }}) Seleccionados
            </b-button>
            <b-button title="Quitar Seleccionados" @click="emptyGridSelected" variant="outline-dark">
              <i class="fa fa-check-square-o"></i>
            </b-button>
          </div>
          <div class="p-2">
            <b-button title="Actualizar Tabla" @click="reloadTable" variant="dark" class="mr-2">
              <i class="fa fa-repeat"></i> Recargar
            </b-button>
          </div>
        </div>
        <kendo-datasource
          ref="data-asignacion"
          :schema-total="'meta.total'"
          :schema-data="'data'"
          :transport-read="{ url: `${url}/asignaciones`, beforeSend: readData }"
          :transport-parameter-map="parameterMap"
          :page-size="10"
          :server-paging="true"
          :server-filtering="true"
          :server-sorting="true"
          :schema-model-fields="dsSchemaFields"
        ></kendo-datasource>
        <kendo-grid
          ref="gridAsignacion"
          :data-source-ref="'data-asignacion'"
          :no-records="true"
          :messages-no-records="'NO EXISTEN RESULTADOS'"
          :groupable="true"
          :filterable="filterableConfig"
          :navigatable="true"
          :pageable-always-visible="true"
          :pageable-page-sizes="[10, 20, 50, 100]"
          :pageable-button-count="3"
          :pageable-responsive="true"
          :pageable-refresh="true"
          :sortable="true"
          :resizable="true"
          @change="onChange"
          @databound="dataBound"
        >
          <kendo-grid-column :selectable="true" :width="45"></kendo-grid-column>
          <kendo-grid-column
            :field="'gestion'"
            :title="'GESTIÓN'"
            :width="100"
            :template="templateName"
            :filterable="false"
          ></kendo-grid-column>
          <kendo-grid-column
            :field="'fecha'"
            :title="'FECHA ASIGANCIÓN'"
            :width="100"
            :filterable="false"
          ></kendo-grid-column>
          <kendo-grid-column
            :field="'total_cursos_asignados'"
            :title="'TOTAL CURSOS'"
            :width="100"
            :filterable="false"
          ></kendo-grid-column>
          <kendo-grid-column
            :field="'total_materias_asignados'"
            :title="'TOTAL MATERIAS'"
            :width="100"
            :filterable="false"
          ></kendo-grid-column>
          <kendo-grid-column
            :field="'total_alumnos_asignados'"
            :title="'TOTAL ALUMNOS'"
            :width="100"
            :filterable="false"
          ></kendo-grid-column>
          <kendo-grid-column
            v-if="permission('asignaciones.update')"
            :command="[{name: ' ', iconClass: 'fa fa-edit', click: onUpdate}]"
            :width="45"
          ></kendo-grid-column>
          <!-- <kendo-grid-column
            :command="[{name: ' ', iconClass: 'fa fa-eye', click: onDetail}]"
            :width="55"
          ></kendo-grid-column> -->
        </kendo-grid>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery"
import permission from '../../mixins/permission'
import { mapGetters } from "vuex"
import { API_URL } from "../../services/config"
import AsignacionService from "../../services/asignacion.service"
import ModalGrid from "../widgets/Modals/ModalGridSelected.vue"
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"

export default {
  data() {
    return {
      url: API_URL,
      dsSchemaFields: {
        gestion: { type: "string" },
        fecha: { type: "string" },
        total_cursos_asignados: { type: "string" },
        total_materias_asignados: { type: "string" },
        total_alumnos_asignados: { type: "string" },
      },

      filterableConfig: {
        mode: "row",
        operators: {
          string: {
            qe: "Es igual a",
            neq: "No es igual a",
            contains: "Contiene",
            doesnotcontain: "No contiene",
            startswitch: "Comienza con",
            endswitch: "Termina en"
          },
          date: {
            lte: "Antes o igual a",
            gte: "Después o igual a"
          }
        }
      },
      visibleModal: false,
      isDetailModalVisible: false, // Controla el modal
      selectedAsignacion: null, // Almacena la fila seleccionada
    }
  },

  computed: {
    ...mapGetters(["itemsAsignacion"])
  },

  components: {
    "modal-grid": ModalGrid,
    vueCustomScrollbar,
  },

  mixins: [permission],

  mounted() {
    let grid = this.$refs.gridAsignacion.kendoWidget()
    let ds = []
    for (let i = 1, max = grid.columns.length; i < max; i++) {
      if (grid.columns[i].field) {
        ds.push({
          encoded: false,
          text:
            "<label class='k-checkbox-label' for='"+ i +"'><input id='"+ i +"' type='checkbox' checked='checked' " +
            " class='check k-checkbox' data-field='" +
            grid.columns[i].field +
            "'/>" +
            "<strong class='ml-2'> "+ grid.columns[i].title + "</strong>" +
            "</label>"
        })
      }
    }
  },

  methods: {
    reloadTable() {
      this.$refs.gridAsignacion.kendoWidget().dataSource.filter({})
    },

    onUpdate(ev) {
      ev.preventDefault();
      const gridWidget = this.$refs.gridAsignacion.kendoWidget();
      const tr = $(ev.target).closest('tr');
      const data = gridWidget.dataItem(tr);

      this.$router.push({ name: "EditAsignacion", params: { id: data.gestion_id } });
    },

    onDetail(ev) {
      ev.preventDefault();
      const gridWidget = this.$refs.gridAsignacion.kendoWidget();
      const tr = $(ev.target).closest('tr');
      const data = gridWidget.dataItem(tr);

      this.selectedAsignacion = data;
      this.isDetailModalVisible = true;
    },

    async deleted() {
      let data = this.itemsAsignacion.map(item => item.id)
      const response = await AsignacionService.deleteAsignacion(data)
      if (response.status === 200) {
        this.$store.dispatch("emptyAsignacion")
        this.$refs.gridAsignacion.kendoWidget().dataSource.read()
        this.visibleModal = false
        this.$bus.$emit('success')
        this.$message.success(response.data.message)
        if (response.data.data.length > 0) {
          this.$notification.warning({
            message: 'Nota',
            description: 'Alguno de los items seleccionados no se eliminaron, por que son utilizados en otros registros.',
            duration: 10,
          })
        }
      }
    },

    templateName(dataItem) {
      return (
        "<span class='btn btn-link' style='font-size: 13px;'>" +
        kendo.htmlEncode(dataItem.gestion) +
        "</span>"
      )
    },

    readData: function(xhr) {
      let self = this
      xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("access_token"))
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
      xhr.setRequestHeader("Accept-Language", "en")
      xhr.setRequestHeader("Accept", "application/json")
      xhr.done(function(data) {
        self.$emit("general", false)
      })
      xhr.fail(function(data) {
        if (data.status === 403) self.$router.push({ path: '/system/403' })
        if (data.status === 401 || data.responseJSON.message == "Unauthenticated.") {
          self.$store.dispatch('responseMessage', {
            type: 'warning',
            text: 'No tiene una sesión activa, por favor vuelva a iniciar sesión.',
            title: 'Sesión Expirada!',
            modal: true
          })
          .then(async() => {
            await self.$store.dispatch('cleanSession')
            self.$router.push({ path: '/system/login' })
          })
        }
      })
    },

    parameterMap: function(data, type) {
      if (type == "read" && data.filter) {
        let dates = data.filter.filters.filter(
          e => e.operator == "lte" || e.operator == "gte"
        )
        if (dates.length > 0) {
          data.filter.filters.forEach(item => {
            if (dates.includes(item)) {
              item.value = kendo.toString(item.value, "yyyy-MM-dd")
            }
          })
        }
        return data
      } else return data
    },

    emptyGridSelected() {
      this.$store.dispatch("emptyAsignacion")
      .then(() => {
        let grid = this.$refs.gridAsignacion.kendoWidget()
        grid.clearSelection()
      })
    },

    onChange(e) {
      let vm = this
      let grid = e.sender
      let items = grid.items()
      items.each(function(idx, row) {
        let idValue = grid.dataItem(row).get("id")
        let index = vm.itemsAsignacion.findIndex(x => x.id == idValue)
        if (row.className.indexOf("k-state-selected") >= 0) {
          let {parent, dirty, dirtyFields, _events, _handlers, uid,...obj} = grid.dataItem(row)
          vm.$store.dispatch("setItemAsignacion", obj)
        } else if (index > -1) {
          vm.$store.dispatch("deleteItemAsignacion", index)
        }
      })
    },

    dataBound(e) {
      let vm = this
      let grid = e.sender
      let items = grid.items()
      let itemsToSelect = []
      items.each(function(idx, row) {
        let dataItem = grid.dataItem(row).get("id")
        let index = vm.itemsAsignacion.some(item => item.id === dataItem)
        if (index) {
          itemsToSelect.push(row)
        }
      })

      e.sender.select(itemsToSelect)

      grid.element.on("click", "tbody tr[data-uid] td:nth-child(2)", function(e) {
         let element = e.target || e.srcElement
         let data = grid.dataItem($(element).closest("tr"))
         vm.selectedAsignacion = data;
         vm.isDetailModalVisible = true;
      })
    },
  }
}
</script>

<style scoped src="../../assets/css/grid.css"></style>
