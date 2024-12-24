<template>
  <div>
    <a-spin :spinning="loading">
    <strong>Seleccione las cuentas correspondientes.</strong>
    <!-- <pre>{{ $data }}</pre> -->
    <table>
      <thead>
        <tr>
          <th scope="col">CUENTAS DE RESULTADOS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Resultado de la Gestión:</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_resul_gestion"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select 
                          v-model="cta_resul_gestion"
                          :options="plans"
                          :selectable="(option) => option.selectable" 
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Resultados Acumulados:</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_resul_acum"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select
                          v-model="cta_resul_acum" 
                          :options="plans" 
                          :selectable="(option) => option.selectable"
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th scope="col">CUENTAS PARA EL AJUSTE POR INFLACIÓN Y TENENCIA DE BIENES (AITB)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Cuenta de AITB Ingreso:</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_aitb_ingreso"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select 
                          v-model="cta_aitb_ingreso"
                          :options="plans"
                          :selectable="(option) => option.selectable" 
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Cuenta de AITB Egreso:</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_aitb_egreso"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select
                          v-model="cta_aitb_egreso" 
                          :options="plans" 
                          :selectable="(option) => option.selectable"
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th scope="col">DESCUENTOS Y BONIFICACIONES</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Descuento Sobre Compras:</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_descto_compras"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select 
                          v-model="cta_descto_compras"
                          :options="plans" 
                          :selectable="(option) => option.selectable"
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Descuento Sobre Ventas:</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_descto_ventas"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select 
                          v-model="cta_descto_ventas"
                          :options="plans" 
                          :selectable="(option) => option.selectable"
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th scope="col">CUENTAS DE DÉBITO Y CRÉDITO</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Crédito Fiscal IVA:</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_credito_fiscal"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select 
                          v-model="cta_credito_fiscal"
                          :options="plans" 
                          :selectable="(option) => option.selectable" 
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Débito Fiscal IVA:</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_debito_fiscal"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select 
                          v-model="cta_debito_fiscal"
                          :options="plans"
                          :selectable="(option) => option.selectable" 
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Impuesto a las Transacciones por pagar:</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_it_pagar"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select 
                          v-model="cta_it_pagar"
                          :options="plans" 
                          :selectable="(option) => option.selectable" 
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Impuesto a las transacciones:</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_impto_trans"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select 
                          v-model="cta_impto_trans"
                          :options="plans"
                          :selectable="(option) => option.selectable" 
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th scope="col">FACTURACIÓN (COMPRAS Y VENTAS)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Cuenta de ventas (DEBE):</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_pagos_fac"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select 
                          v-model="cta_pagos_fac"
                          :options="plans" 
                          :selectable="(option) => option.selectable"
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Cuenta de Ventas (HABER):</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_ventas_fac"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select 
                          v-model="cta_ventas_fac"
                          :options="plans" 
                          :selectable="(option) => option.selectable"
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Cuenta de compras (DEBE):</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_pagos_fac_co"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select 
                          v-model="cta_pagos_fac_co"
                          :options="plans" 
                          :selectable="(option) => option.selectable"
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Cuenta de compras (HABER):</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_compras_fac"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select 
                          v-model="cta_compras_fac"
                          :options="plans" 
                          :selectable="(option) => option.selectable"
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th scope="col">NOTAS DE REMISIÓN</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Cuenta de ventas (DEBE):</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_debe_nota"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select 
                          v-model="cta_debe_nota"
                          :options="plans" 
                          :selectable="(option) => option.selectable"
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Cuenta de Ventas (HABER):</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_haber_nota"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select 
                          v-model="cta_haber_nota"
                          :options="plans" 
                          :selectable="(option) => option.selectable"
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th scope="col">CUENTAS DE DIFERENCIA DE CAMBIO</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Diferencia de Cambio (INGRESO):</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_ajuste_cambio_in"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select 
                          v-model="cta_ajuste_cambio_in"
                          :options="plans" 
                          :selectable="(option) => option.selectable"
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="container">
              <div class="row">
                <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <legend>Diferencia de Cambio (EGRESO):</legend>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                        <b-form-input
                          v-model="p_cta_ajuste_cambio_eg"
                          size="sm"
                          disabled 
                          type="text"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2">
                        <v-select 
                          v-model="cta_ajuste_cambio_eg"
                          :options="plans" 
                          :selectable="(option) => option.selectable"
                          label="text"
                        >
                          <template slot="no-options">Seleccionar cuenta..</template>
                          <template slot="option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="plan">
                            <div>
                              <span v-html="plan.text"></span>
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="p-2">
      <button
        @click="submit"
        type="button"
        class="btn btn-danger btn-with-addon mr-auto text-nowrap"
      >
        <span class="btn-addon">
          <i class="btn-addon-icon fe fe-check-circle" />
        </span>
        GUARDAR CAMBIOS
      </button>
    </div>
    </a-spin>
  </div>
</template>
<script>
import PlanService from "../../../services/plan.service"
import ConfigService from "../../../services/config.service"

export default {
  data() {
    return {
      loading: false,
      configId: null,
      cta_resul_gestion: null,
      cta_resul_acum: null,
      cta_credito_fiscal: null,
      cta_debito_fiscal: null,
      cta_it_pagar: null,
      cta_impto_trans: null,
      cta_pagos_fac: null,
      cta_ventas_fac: null,
      cta_pagos_fac_co: null,
      cta_compras_fac: null,
      cta_debe_nota: null,
      cta_haber_nota: null,
      cta_descto_compras: null,
      cta_descto_ventas: null,
      cta_aitb_ingreso: null,
      cta_aitb_egreso: null,
      cta_ajuste_cambio_in: null,
      cta_ajuste_cambio_eg: null,
      plans: [],
    }
  },

  computed: {
    p_cta_resul_gestion() {
      return this.cta_resul_gestion ? this.cta_resul_gestion.number : null
    },
    p_cta_resul_acum() {
      return this.cta_resul_acum ? this.cta_resul_acum.number : null
    },
    p_cta_capital_social() {
      return this.cta_capital_social ? this.cta_capital_social.number : null
    },
    p_cta_credito_fiscal() {
      return this.cta_credito_fiscal ? this.cta_credito_fiscal.number : null
    },
    p_cta_debito_fiscal() {
      return this.cta_debito_fiscal ? this.cta_debito_fiscal.number : null
    },
    p_cta_it_pagar() {
      return this.cta_it_pagar ? this.cta_it_pagar.number : null
    },
    p_cta_impto_trans() {
      return this.cta_impto_trans ? this.cta_impto_trans.number : null
    },
    p_cta_pagos_fac() {
      return this.cta_pagos_fac ? this.cta_pagos_fac.number : null
    },
    p_cta_ventas_fac() {
      return this.cta_ventas_fac ? this.cta_ventas_fac.number : null
    },
    p_cta_pagos_fac_co() {
      return this.cta_pagos_fac_co ? this.cta_pagos_fac_co.number : null
    },
    p_cta_compras_fac() {
      return this.cta_compras_fac ? this.cta_compras_fac.number : null
    },
    p_cta_debe_nota() {
      return this.cta_debe_nota ? this.cta_debe_nota.number : null
    },
    p_cta_haber_nota() {
      return this.cta_haber_nota ? this.cta_haber_nota.number : null
    },
    p_cta_descto_compras() {
      return this.cta_descto_compras ? this.cta_descto_compras.number : null
    },
    p_cta_descto_ventas() {
      return this.cta_descto_ventas ? this.cta_descto_ventas.number : null
    },
    p_cta_aitb_ingreso() {
      return this.cta_aitb_ingreso ? this.cta_aitb_ingreso.number : null
    },
    p_cta_aitb_egreso() {
      return this.cta_aitb_egreso ? this.cta_aitb_egreso.number : null
    },
    p_cta_ajuste_cambio_in() {
      return this.cta_ajuste_cambio_in ? this.cta_ajuste_cambio_in.number : null
    },
    p_cta_ajuste_cambio_eg() {
      return this.cta_ajuste_cambio_eg ? this.cta_ajuste_cambio_eg.number : null
    },
  },

  created() {
    Promise.all([this.getPlansChild(), this.getCurrentConfig()])
      .then(() =>{
        this.$emit("especifica", false)
      })
  },

  methods: {
    getPlansChild: async function() {
      const request = await PlanService.getPlansChild()
      if (request.status === 200) {
        this.plans = request.data.new
      }
    },

    getCurrentConfig:async function() {
      const request = await ConfigService.getCurrentConfig('configs/current')
      if (request.status === 200) {
        this.configId = request.data.data.id
        this.cta_resul_gestion = request.data.data.cta_resul_gestion
        this.cta_resul_acum = request.data.data.cta_resul_acum
        this.cta_credito_fiscal = request.data.data.cta_credito_fiscal
        this.cta_debito_fiscal = request.data.data.cta_debito_fiscal
        this.cta_it_pagar = request.data.data.cta_it_pagar
        this.cta_impto_trans = request.data.data.cta_impto_trans
        this.cta_pagos_fac = request.data.data.cta_pagos_fac
        this.cta_ventas_fac = request.data.data.cta_ventas_fac
        this.cta_pagos_fac_co = request.data.data.cta_pagos_fac_co
        this.cta_compras_fac = request.data.data.cta_compras_fac
        this.cta_debe_nota = request.data.data.cta_debe_nota
        this.cta_haber_nota = request.data.data.cta_haber_nota
        this.cta_descto_compras = request.data.data.cta_descto_compras
        this.cta_descto_ventas = request.data.data.cta_descto_ventas
        this.cta_aitb_ingreso = request.data.data.cta_aitb_ingreso
        this.cta_aitb_egreso = request.data.data.cta_aitb_egreso
        this.cta_ajuste_cambio_in = request.data.data.cta_ajuste_cambio_in
        this.cta_ajuste_cambio_eg = request.data.data.cta_ajuste_cambio_eg
      }
    },

    async submit() {
      this.loading = true
      this.$validator.errors.clear()
      try {
        let data = {
          cta_resul_gestion: this.cta_resul_gestion ? this.cta_resul_gestion.number : this.cta_resul_gestion,
          cta_resul_acum: this.cta_resul_acum ? this.cta_resul_acum.number : this.cta_resul_acum,
          cta_credito_fiscal: this.cta_credito_fiscal ? this.cta_credito_fiscal.number : this.cta_credito_fiscal,
          cta_debito_fiscal: this.cta_debito_fiscal ? this.cta_debito_fiscal.number : this.cta_debito_fiscal,
          cta_it_pagar: this.cta_it_pagar ? this.cta_it_pagar.number : this.cta_it_pagar,
          cta_impto_trans: this.cta_impto_trans ? this.cta_impto_trans.number : this.cta_impto_trans,
          cta_pagos_fac: this.cta_pagos_fac ? this.cta_pagos_fac.number : this.cta_pagos_fac,
          cta_ventas_fac: this.cta_ventas_fac ? this.cta_ventas_fac.number : this.cta_ventas_fac,
          cta_pagos_fac_co: this.cta_pagos_fac_co ? this.cta_pagos_fac_co.number : this.cta_pagos_fac_co,
          cta_compras_fac: this.cta_compras_fac ? this.cta_compras_fac.number : this.cta_compras_fac,
          cta_debe_nota: this.cta_debe_nota ? this.cta_debe_nota.number : this.cta_debe_nota,
          cta_haber_nota: this.cta_haber_nota ? this.cta_haber_nota.number : this.cta_haber_nota,
          cta_descto_compras: this.cta_descto_compras ? this.cta_descto_compras.number : this.cta_descto_compras,
          cta_descto_ventas: this.cta_descto_ventas ? this.cta_descto_ventas.number : this.cta_descto_ventas,
          cta_aitb_ingreso: this.cta_aitb_ingreso ? this.cta_aitb_ingreso.number : this.cta_aitb_ingreso,
          cta_aitb_egreso: this.cta_aitb_egreso ? this.cta_aitb_egreso.number : this.cta_aitb_egreso,
          cta_ajuste_cambio_in: this.cta_ajuste_cambio_in ? this.cta_ajuste_cambio_in.number : this.cta_ajuste_cambio_in,
          cta_ajuste_cambio_eg: this.cta_ajuste_cambio_eg ? this.cta_ajuste_cambio_eg.number : this.cta_ajuste_cambio_eg,
        }
        const request = await ConfigService.updateConfig(this.configId, data)
        if (request.status === 200) {
          this.$message.success(request.data.message)
          this.loading = false
        }
      } catch (err) {
        console.log(err)
        if(err.response.status === 422) this.$setErrorsFromResponse(err.response.data)
        this.loading = false
      }
    }
  }
}
</script>
<style scoped>
fieldset {
  background-color: #fff1f1;
  border-radius: 4px;
  border: 1px solid rgb(201, 201, 201);
}

legend {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #000;
  font-size: 13px;
  font-weight: bold;
  padding: 3px 5px 3px 7px;
  width: auto;
}

table {
  border-collapse: collapse;
  width: 100%;
}

table th,
table td {
  border: 1px solid #807979;
  padding: 1em;
  font-weight: bold;
}

table tbody tr {
  background-color: rgb(252, 252, 252);
  border: 1px solid #ddd;
  padding: 0.35em;
  font-size: 0.70em;
}

table tfoot tr {
  background-color: #fff;
}

table tr:hover {background-color: #f7f7f7;}

table thead th {
  padding-top: 2px;
  padding-bottom: 2px;
  background-color: #9e0207;
  color: white;
  text-transform: uppercase;
  font-size: 1em;
}

@media screen and (max-width: 800px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tfoot th {
    border: none;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }

  table td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>