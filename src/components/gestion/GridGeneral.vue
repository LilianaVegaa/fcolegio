<template>
  <div class="container">
    <modal-grid
      :title="'Lista de Seleccionados'"
      :visible="visibleModal"
      :data="itemsGestion"
      :access="'gestiones'"
      :alert_message="'Realmente desea eliminar estos datos?'"
      @hide="visibleModal = !visibleModal"
      @deleted="deleted"
    ></modal-grid>
    <div class="row">
      <div class="table-responsive">
        <div class="d-flex flex-sm-row flex-column bg-secondary">
          <div class="mr-auto p-2">
            <b-button @click="visibleModal = true" v-if="itemsGestion.length > 0" squared variant="outline-danger" class="mr-2">
              <i class="fa fa-check-square"></i>
              ({{ itemsGestion.length }}) Seleccionados
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
          ref="data-gestion"
          :schema-total="'meta.total'"
          :schema-data="'data'"
          :transport-read="{ url: `${url}/gestiones`, beforeSend: readData }"
          :transport-parameter-map="parameterMap"
          :page-size="10"
          :server-paging="true"
          :server-filtering="true"
          :server-sorting="true"
          :schema-model-fields="dsSchemaFields"
        ></kendo-datasource>
        <kendo-grid
          ref="gridGestion"
          :data-source-ref="'data-gestion'"
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
            :field="'año'"
            :title="'AÑO'"
            :width="120"
            :template="templateName"
            :filterable-cell-operator="'contains'"
            :filterable-cell-suggestion-operator="'contains'"
          ></kendo-grid-column>
          <kendo-grid-column
            :field="'fecha_inicio'"
            :title="'FECHA INICIO'"
            :width="100"
            :filterable="false"
          ></kendo-grid-column>
          <kendo-grid-column
            :field="'fecha_fin'"
            :title="'FECHA FIN'"
            :width="100"
            :filterable="false"
          ></kendo-grid-column>
          <kendo-grid-column
            :field="'registrado'"
            :title="'REGISTRADO'"
            :width="100"
            :filterable="false"
          ></kendo-grid-column>
          <kendo-grid-column
            :field="'actualizado'"
            :title="'ACTUALIZADO'"
            :width="100"
            :filterable="false"
          ></kendo-grid-column>
          <kendo-grid-column
            v-if="permission('gestiones.update')"
            :command="[{name: ' ', iconClass: 'fa fa-pencil', click: update}]"
            :width="45"
          ></kendo-grid-column>
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
import GestionService from "../../services/gestion.service"
import ModalGrid from "../widgets/Modals/ModalGridSelected.vue"

export default {
  data() {
    return {
      url: API_URL,
      dsSchemaFields: {
        año: { type: "string" },
        fecha_inicio: { type: "string" },
        fecha_fin: { type: "string" },
        registrado: { type: "string" },
        actualizado: { type: "string" },
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
    }
  },

  computed: {
    ...mapGetters(["itemsGestion"])
  },

  components: {
    "modal-grid": ModalGrid
  },

  mixins: [permission],

  mounted() {
    let grid = this.$refs.gridGestion.kendoWidget()
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
      this.$refs.gridGestion.kendoWidget().dataSource.filter({})
    },

    update(ev) {
      ev.preventDefault()
      let gridWidget = this.$refs.gridGestion.kendoWidget()
      let tr = $(ev.target).closest('tr')
      let data = gridWidget.dataItem(tr)
      this.$router.push({name: "EditGestion", params: { id: data.id }})
    },

    async deleted() {
      let data = this.itemsGestion.map(item => item.id)
      const response = await GestionService.deleteGestion(data)
      if (response.status === 200) {
        this.$store.dispatch("emptyGestion")
        this.$refs.gridGestion.kendoWidget().dataSource.read()
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
        kendo.htmlEncode(dataItem.año) +
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
      this.$store.dispatch("emptyGestion")
      .then(() => {
        let grid = this.$refs.gridGestion.kendoWidget()
        grid.clearSelection()
      })
    },

    onChange(e) {
      let vm = this
      let grid = e.sender
      let items = grid.items()
      items.each(function(idx, row) {
        let idValue = grid.dataItem(row).get("id")
        let index = vm.itemsGestion.findIndex(x => x.id == idValue)
        if (row.className.indexOf("k-state-selected") >= 0) {
          let {parent, dirty, dirtyFields, _events, _handlers, uid,...obj} = grid.dataItem(row)
          vm.$store.dispatch("setItemGestion", obj)
        } else if (index > -1) {
          vm.$store.dispatch("deleteItemGestion", index)
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
        let index = vm.itemsGestion.some(item => item.id === dataItem)
        if (index) {
          itemsToSelect.push(row)
        }
      })

      e.sender.select(itemsToSelect)

      // grid.element.on("click", "tbody tr[data-uid] td:nth-child(2)", function(e) {
      //    let element = e.target || e.srcElement
      //    let data = grid.dataItem($(element).closest("tr"))
      //    vm.$router.push({name: "ShowCustomer", params: { id: data.id }})
      // })
    },
  }
}
</script>

<style scoped src="../../assets/css/grid.css"></style>
