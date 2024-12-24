<template>
  <div class="container">
    <modal-grid
      :title="'Lista de Seleccionados'"
      :visible="visibleModal"
      :data="itemsQuote"
      :access="'quotes'"
      :alert_message="'Realmente desea eliminar estos datos?'"
      @hide="visibleModal = !visibleModal"
      @deleted="deleted"
    ></modal-grid>
    <modal-form :title="addSubtitle" :visible="visibleForm" @hide="closeModalForm">
      <a-spin :spinning="success">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-12 col-lg-4 col-xl-4">
              <strong>
                <label for="date">Fecha * :</label>
              </strong>
              <b-form-group label-for="date" :invalid-feedback="errors.first('date')" :state="!errors.has('date')">
                <b-form-input 
                  v-model="quote.date" 
                  :state="errors.has('date') ? false : null"
                  v-validate="'required'"
                  data-vv-name="date"
                  data-vv-as="fecha"
                  type="date"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-12 col-md-12 col-lg-4 col-xl-4">
              <strong>
                <label for="type_change">Tipo de Cambio * :</label>
              </strong>
              <b-form-group label-for="type_change" :invalid-feedback="errors.first('type_change')" :state="!errors.has('type_change')">
                <b-form-input 
                  class="text-right"
                  v-money="money"
                  v-model.lazy="quote.type_change" 
                  :state="errors.has('type_change') ? false : null"
                  v-validate="'required|max:10'"
                  data-vv-name="type_change"
                  data-vv-as="tipo de cambio"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-12 col-md-12 col-lg-4 col-xl-4">
              <strong>
                <label for="type_ufv">UFV * :</label>
              </strong>
              <b-form-group label-for="type_ufv" :invalid-feedback="errors.first('type_ufv')" :state="!errors.has('type_ufv')">
                <b-form-input 
                  class="text-right"
                  v-money="money_custom"
                  v-model.lazy="quote.type_ufv" 
                  :state="errors.has('type_ufv') ? false : null"
                  v-validate="'required|max:10'"
                  data-vv-name="type_ufv"
                  data-vv-as="ufv"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-12 col-lg-6 col-xl-6">
              <small><strong>Los campos con (*) son obligatorios.</strong></small>
            </div>
            <div class="col-12 col-md-12 col-lg-6 col-xl-6">
              <b-button
                @click="submit" 
                type="submit" 
                class="float-right" 
              >{{ quote.id ? 'ACTUALIZAR' : 'REGISTRAR' }}</b-button>
            </div>
          </div>
        </div>
      </a-spin>
    </modal-form>
    <div class="row">
      <!-- <upload ref="upload"
        name="files"
        :async-save-url="'custom-save-url'"
        :async-remove-url="'custom-remove-url'">
      </upload> -->
      <div class="table-responsive">
        <div class="d-flex flex-sm-row flex-column bg-secondary">
          <div class="mr-auto p-2">
            <b-button @click="visibleModal = true" v-if="itemsQuote.length > 0" squared variant="outline-danger" class="mr-2">
              <i class="fa fa-check-square"></i>
              ({{ itemsQuote.length }}) Seleccionados
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
        <div class="border border-light">
          <b-button
            :class="visibleCollapseImport ? null : 'collapsed'"
            :aria-expanded="visibleCollapseImport ? 'true' : 'false'"
            aria-controls="collapse-import-quote"
            @click="visibleCollapseImport = !visibleCollapseImport"
            variant="light"
            block
          >
            <i class="fa fa-upload" aria-hidden="true"></i> Importar Datos
          </b-button>
          <b-collapse id="collapse-import-quote" v-model="visibleCollapseImport" class="mt-2">
            <b-card>
              <div class="container">
                <div class="row">
                  <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <strong>
                      <label for="file">Archivo Excel * :</label>
                    </strong>
                    <b-form-group label-for="file" :invalid-feedback="errors.first('file')" :state="!errors.has('file')">
                      <div class="input-group">
                        <div class="custom-file">
                          <input 
                            type="file" 
                            name="filename" 
                            class="custom-file-input" 
                            id="inputFileUpload" 
                            v-on:change="onFileChange"
                            :state="errors.has('file') ? false : null"
                            v-validate="'required'"
                            data-vv-name="file"
                            data-vv-as="archivo">
                          <label class="custom-file-label" for="inputFileUpload">Buscar archivo..</label>
                        </div>
                      </div>
                    </b-form-group>
                    <p class="text-danger font-weight-bold">{{filename}}</p>
                  </div>
                </div>
                <div class="pt-2">
                  <button
                    @click="importExcelData"
                    type="submit"
                    class="btn btn-danger btn-with-addon mr-auto text-nowrap"
                  >
                    <span class="btn-addon">
                      <i class="btn-addon-icon fe fe-check-circle" />
                    </span>
                    CARGAR DATOS
                  </button>
                </div>
              </div>
            </b-card>
          </b-collapse>
        </div>
        <kendo-datasource
          ref="data-quote"
          :schema-total="'meta.total'"
          :schema-data="'data'"
          :transport-read="{ url: `${url}/quotes`, beforeSend: readData }"
          :transport-parameter-map="parameterMap"
          :page-size="10"
          :server-paging="true"
          :server-filtering="true"
          :server-sorting="true"
          :schema-model-fields="dsSchemaFields"
        ></kendo-datasource>
        <kendo-grid
          ref="gridQuote"
          :data-source-ref="'data-quote'"
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
            :field="'date'"
            :title="'FECHA'"
            :width="120"
            :format="'{0:dd/MM/yyyy}'"
            :filterable="false"
          ></kendo-grid-column>
          <kendo-grid-column
            :field="'type_change'"
            :title="'TIPO DE CAMBIO'"
            :width="120"
            :filterable="false"
          ></kendo-grid-column>
          <kendo-grid-column
            :field="'type_ufv'"
            :title="'UFV'"
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
import Quote from '../../../models/Quote'
import QuoteService from "../../../services/quote.service"
import ModalGrid from "../../widgets/Modals/ModalGridSelected.vue"
import { Upload } from '@progress/kendo-upload-vue-wrapper'
import '@progress/kendo-ui/js/kendo.upload'
import {VMoney} from 'v-money'
import Money from '../../../models/Money'
import ModalForm from '../../../components/widgets/Modals/ModalForm.vue'

export default {
  data() {
    return {
      url: API_URL,
      dsSchemaFields: {
        date: { type: "date", format: "{0:dd/MM/yyyy}" },
        type_change: { type: "string" },
        type_ufv: { type: "string" },
        step: { from: "step.description" },
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
      money: new Money(),
      money_custom: {
        decimal: '.',
        thousands: ',',
        prefix: '',
        suffix: '',
        precision: 5,
        masked: false,
      },
      quote: new Quote(),
      visibleCollapseImport: false,
      filename: '',
      file: '',
    }
  },

  computed: {
    ...mapGetters(["itemsQuote"]),
    addSubtitle () {
      if(this.quote.id) {
        return 'Editar Cotización'
      }
      return 'Registrar Cotización'
    }
  },

  components: {
    'upload': Upload,
    "modal-grid": ModalGrid,
    "modal-form": ModalForm
  },

  directives: {
    money: VMoney,
  },

  mixins: [permission],

  mounted() {
    let grid = this.$refs.gridQuote.kendoWidget()
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

    // var upload = this.$refs.upload.kendoWidget();

    // upload._module.postFormData = function (url, data, fileEntry, xhr) {
    //     var module = this;
    //     fileEntry.data("request", xhr);
    //     setTimeout(function () {
    //         var e = { target: { responseText: '', statusText: "OK", status: 200 } };
    //         module.onRequestSuccess.call(module, e, fileEntry);
    //     }, 1000);
    // };

    // upload._submitRemove = function (fileNames, eventArgs, onSuccess, onError) {
    //     onSuccess();
    // };
  },

  methods: {
    onFileChange(e) {
      this.filename = "Archivo Seleccionado: " + e.target.files[0].name;
      this.file = e.target.files[0];
    },

    async importExcelData() {
      this.$store.dispatch("showLoader")

      this.$validator.errors.clear()

      let formData = new FormData()
      formData.append('file', this.file)

      try {
        const request = await QuoteService.importExcelData(formData)
        if (request.status === 200) {
          this.file = ''
          this.filename = ''
          this.reloadTable()
          this.$store.dispatch("hideLoader")
        }
      } catch (err) {
        if(err.response.status === 422) this.$setErrorsFromResponse(err.response.data)
        this.$store.dispatch("hideLoader")
      }
    },

    reloadTable() {
      this.$refs.gridQuote.kendoWidget().dataSource.filter({})
    },

    closeModalForm() {
      this.visibleForm = false
      this.quote = new Quote()
    },

    update(ev) {
      ev.preventDefault()
      let gridWidget = this.$refs.gridQuote.kendoWidget()
      let tr = $(ev.target).closest('tr')
      let data = gridWidget.dataItem(tr)
      let {created, updated, parent, dirty, dirtyFields, _events, _handlers, uid,...obj} = data
      obj.date = kendo.toString(obj.date, "yyyy-MM-dd")
      this.quote = obj
      this.visibleForm = true
    },

    async deleted() {
      let data = this.itemsQuote.map(item => item.id)
      const response = await QuoteService.deleteQuote(data)
      if (response.status === 200) {
        this.$store.dispatch("emptyQuote")
        this.$refs.gridQuote.kendoWidget().dataSource.read()
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
        self.$emit("quote", false)
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
      this.$store.dispatch("emptyQuote")
      .then(() => {
        let grid = this.$refs.gridQuote.kendoWidget()
        grid.clearSelection()
      })
    },

    onChange(e) {
      let vm = this
      let grid = e.sender
      let items = grid.items()
      items.each(function(idx, row) {
        let idValue = grid.dataItem(row).get("id")
        let index = vm.itemsQuote.findIndex(x => x.id == idValue)
        if (row.className.indexOf("k-state-selected") >= 0) {
          let {parent, dirty, dirtyFields, _events, _handlers, uid,...obj} = grid.dataItem(row)
          obj.date = kendo.toString(obj.date, "dd/MM/yyyy")
          vm.$store.dispatch("setItemQuote", obj)
        } else if (index > -1) {
          vm.$store.dispatch("deleteItemQuote", index)
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
        let index = vm.itemsQuote.some(item => item.id === dataItem)
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
        if(this.quote.id) {
          this._save = await QuoteService.updateQuote(this.quote.id, this.quote)
        } else {
          this._save = await QuoteService.storeQuote(this.quote)
        }
        if (this._save.status === 201 || this._save.status === 200) {
          this.$refs.gridQuote.kendoWidget().dataSource.read()
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
