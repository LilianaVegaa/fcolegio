<template>
  <div class="container">
    <modal-grid
      :title="'Lista de Seleccionados'"
      :visible="visibleModal"
      :data="itemsAttendee"
      :alert_message="'Realmente desea eliminar estos datos?'"
      @hide="visibleModal = !visibleModal"
      @deleted="deleted"
    ></modal-grid>
    <modal-form :title="addSubtitle" :visible="visibleForm" @hide="closeModalForm">
      <a-spin :spinning="success">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <strong>
                <label for="nit">NIT/CI * :</label>
              </strong>
              <b-form-group label-for="nit" :invalid-feedback="errors.first('nit')" :state="!errors.has('nit')">
                <b-form-input 
                  v-model="attendee.nit" 
                  :state="errors.has('nit') ? false : null"
                  v-validate="'required'"
                  data-vv-name="nit"
                  data-vv-as="nit / ci"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <strong>
                <label for="description">Descripción * :</label>
              </strong>
              <b-form-group label-for="description" :invalid-feedback="errors.first('description')" :state="!errors.has('description')">
                <b-form-input 
                  v-model="attendee.description" 
                  :state="errors.has('description') ? false : null"
                  v-validate="'required'"
                  data-vv-name="description"
                  data-vv-as="description"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <small><strong>Los campos con (*) son obligatorios.</strong></small>
            </div>
            <div class="col-12 col-md-12 col-lg-6 col-xl-6">
              <b-button
                @click="submit" 
                type="submit" 
                class="float-right" 
              >{{ attendee.id ? 'ACTUALIZAR' : 'REGISTRAR' }}</b-button>
            </div>
          </div>
        </div>
      </a-spin>
    </modal-form>
    <div class="row">
      <div class="table-responsive">
        <div class="d-flex flex-sm-row flex-column bg-secondary">
          <div class="mr-auto p-2">
            <b-button @click="visibleModal = true" v-if="itemsAttendee.length > 0" squared variant="outline-danger" class="mr-2">
              <i class="fa fa-check-square"></i>
              ({{ itemsAttendee.length }}) Seleccionados
            </b-button>
            <b-button @click="visibleForm = true" variant="warning" class="mr-2">
              <i class="fa fa-plus-circle"></i> Nuevo Registro
            </b-button>
            <b-button title="Quitar Seleccionados" @click="emptyGridSelected" variant="outline-dark">
              <i class="fa fa-check-square-o"></i>
            </b-button>
          </div>
          <div class="p-2">
            <b-button title="Actualizar Tabla" @click="reloadTable" variant="dark" class="mr-2">
              <i class="fa fa-repeat"></i> Recargar
            </b-button>
            <div class="menu" style="border-radius: 4px; float: right; background: #f6f6f6; padding: 0.2em;"/>
          </div>
        </div>
        <kendo-datasource
          ref="data-attendee"
          :schema-total="'meta.total'"
          :schema-data="'data'"
          :transport-read="{ url: `${url}/attendees`, beforeSend: readData }"
          :transport-parameter-map="parameterMap"
          :page-size="10"
          :server-paging="true"
          :server-filtering="true"
          :server-sorting="true"
          :schema-model-fields="dsSchemaFields"
        ></kendo-datasource>
        <kendo-grid
          ref="gridAttendee"
          :data-source-ref="'data-attendee'"
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
          :scrollable="true"
          @change="onChange"
          @databound="dataBound"
        >
          <kendo-grid-column :selectable="true" :width="45"></kendo-grid-column>
          <kendo-grid-column
            :field="'nit'"
            :title="'NIT/CI'"
            :width="120"
            :filterable="false"
          ></kendo-grid-column>
          <kendo-grid-column
            :field="'description'"
            :title="'DESCRIPCIÓN'"
            :width="120"
            :filterable="false"
          ></kendo-grid-column>
          <kendo-grid-column
            :field="'step'"
            :title="'GESTIÓN'"
            :width="120"
            :filterable-cell-show-operators="false"
            :filterable-cell-template="stepFilter"
          ></kendo-grid-column>
          <kendo-grid-column
            :field="'created'"
            :title="'REGISTRADO'"
            :width="120"
            :format="'{0:dd/MM/yyyy}'"
            :filterable="false"
          ></kendo-grid-column>
          <kendo-grid-column
            :field="'updated'"
            :title="'ACTUALIZADO'"
            :width="120"
            :format="'{0:dd/MM/yyyy}'"
            :filterable="false"
          ></kendo-grid-column>
          <kendo-grid-column
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
import permission from '../../../mixins/permission'
import { mapGetters } from "vuex"
import { API_URL } from "../../../services/config"
import Attendee from '../../../models/Attendee'
import AttendeeService from "../../../services/attendee.service"
import ModalGrid from "../../widgets/Modals/ModalGridSelected.vue"
import '@progress/kendo-ui/js/kendo.upload'
import {VMoney} from 'v-money'
import ModalForm from '../../../components/widgets/Modals/ModalForm.vue'

export default {
  data() {
    return {
      url: API_URL,
      dsSchemaFields: {
        nit: { type: "string" },
        description: { type: "string" },
        step: { from: "step.description" },
        created: { type: "date", format: "{0:dd/MM/yyyy}" },
        updated: { type: "date", format: "{0:dd/MM/yyyy}" },
      },

      filterableConfig: {
        mode: "row",
        // extra: false,
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
      visibleForm: false,
      success: false,
      attendee: new Attendee(),
    }
  },

  computed: {
    ...mapGetters(["itemsAttendee"]),
    addSubtitle () {
      if(this.attendee.id) {
        return 'Editar Auxiliar'
      }
      return 'Registrar Auxiliar'
    }
  },

  components: {
    "modal-grid": ModalGrid,
    "modal-form": ModalForm
  },

  directives: {
    money: VMoney,
  },

  mixins: [permission],

  mounted() {
    let grid = this.$refs.gridAttendee.kendoWidget()
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

    $(".menu").kendoMenu({
      dataSource: [
        {
          text: "Columnas",
          items: ds
        }
      ],
      openOnClick: {
        rootMenuItems: true
      },
      closeOnClick: true,
      open: function() {
        let selector
        $.each(grid.columns, function() {
          if (this.hidden) {
            selector = "input[data-field='" + this.field + "']"
            $(selector).prop("checked", false)
          }
        })
      },
      select: function(e) {
        if ($(e.item).parent().filter("div").length) return
        let input = $(e.item).find("input.check")
        let field = $(input).data("field")
        if ($(input).is(":checked")) {
          grid.showColumn(field)
        } else {
          grid.hideColumn(field)
        }
      }
    })
  },

  methods: {
    reloadTable() {
      this.$refs.gridAttendee.kendoWidget().dataSource.filter({})
    },

    closeModalForm() {
      this.visibleForm = false
      this.attendee = new Attendee()
    },

    update(ev) {
      ev.preventDefault()
      let gridWidget = this.$refs.gridAttendee.kendoWidget()
      let tr = $(ev.target).closest('tr')
      let data = gridWidget.dataItem(tr)
      let {created, updated, parent, dirty, dirtyFields, _events, _handlers, uid,...obj} = data
      obj.date = kendo.toString(obj.date, "yyyy-MM-dd")
      this.attendee = obj
      this.visibleForm = true
    },

    async deleted() {
      let data = this.itemsAttendee.map(item => item.id)
      const response = await AttendeeService.deleteAttendee(data)
      if (response.status === 200) {
        this.$store.dispatch("emptyAttendee")
        this.$refs.gridAttendee.kendoWidget().dataSource.read()
        this.visibleModal = false
        this.$bus.$emit('success')
        this.$message.success(response.data.message)
        if (response.data.data.length > 0) {
          this.$notification.warning({
            message: 'Nota',
            description: 'Alguno de los items seleccionados no se eliminaron, por que son de gestiones pasadas.',
            duration: 10,
          })
        }
      }
    },

    readData: function(xhr) {
      let self = this
      xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("access_token"))
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
      xhr.setRequestHeader("Accept-Language", "en")
      xhr.setRequestHeader("Accept", "application/json")
      xhr.done(function(data) {
        self.$emit("attendee", false)
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

    stepFilter(element) {
      let dataSource = new kendo.data.DataSource({
        transport: {
          read: {
            url: `${API_URL}/steps/listing`,
            dataType: "json"
          }
        }
      })

      element.element.kendoDropDownList({
        filter: "contains",
        dataSource: dataSource,
        dataTextField: "title",
        change: function(e) {},
        valuePrimitive: true,
        dataValueField: "id",
        optionLabel: {
          title: "-Seleccione-",
          id: ""
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
      this.$store.dispatch("emptyAttendee")
      .then(() => {
        let grid = this.$refs.gridAttendee.kendoWidget()
        grid.clearSelection()
      })
    },

    onChange(e) {
      let vm = this
      let grid = e.sender
      let items = grid.items()
      items.each(function(idx, row) {
        let idValue = grid.dataItem(row).get("id")
        let index = vm.itemsAttendee.findIndex(x => x.id == idValue)
        if (row.className.indexOf("k-state-selected") >= 0) {
          let {parent, dirty, dirtyFields, _events, _handlers, uid,...obj} = grid.dataItem(row)
          obj.created = kendo.toString(obj.created, "dd/MM/yyyy")
          obj.updated = kendo.toString(obj.updated, "dd/MM/yyyy")
          vm.$store.dispatch("setItemAttendee", obj)
        } else if (index > -1) {
          vm.$store.dispatch("deleteItemAttendee", index)
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
        let index = vm.itemsAttendee.some(item => item.id === dataItem)
        if (index) {
          itemsToSelect.push(row)
        }
      })

      e.sender.select(itemsToSelect)
    },

    submit: async function() {
      this.success = true
      this.$validator.errors.clear()
      try {
        if(this.attendee.id) {
          this._save = await AttendeeService.updateAttendee(this.attendee.id, this.attendee)
        } else {
          this._save = await AttendeeService.storeAttendee(this.attendee)
        }
        if (this._save.status === 201 || this._save.status === 200) {
          this.$refs.gridAttendee.kendoWidget().dataSource.read()
          this.$message.success(this._save.data.message)
          this.success = false
          this.closeModalForm()
        }
      } catch (err) {
        if(err.response.status === 422) this.$setErrorsFromResponse(err.response.data)
        if (err.response.status === 406) {
          this.closeModalForm()
          this.$notification.warning({
            message: 'Nota',
            description: err.response.data,
            duration: 10,
            placement: 'bottomRight'
          })
        }
        this.success = false
      }
    },
  }
}
</script>

<style scoped src="../../../assets/css/grid.css"></style>
