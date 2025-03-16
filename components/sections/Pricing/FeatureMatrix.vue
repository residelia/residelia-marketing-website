<template>
    <hr class="divider"/>
    <section id="comp-table" class="pt-100 pb-60 pricing-section division">
        <div class="container">
            <!-- SECTION TITLE -->
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-9">
                    <div class="section-title mb-70">
                        <!-- Title -->
                        <h2 class="s-52 w-700">{{ $t('comparePlans')}}</h2>
                        <!-- Text -->
                        <!-- <p class="p-xl">Complete list of features available in our pricing plans</p> -->
                    </div>
                </div>
            </div>
            <!-- PRICING COMPARE GENERAL -->
            <div v-if="matrixGeneral" class="comp-table">
                <div class="row">
                    <div class="col">
                        <div class="table-responsive mb-50">
                            <table class="table text-center pricing-matrix">
                                <thead class="product-header">
                                    <tr>
                                        <th style="width: 32%" class="main-column" v-html="matrixGeneral.rows[0].cells[0]"></th>
                                        <th v-for="(cell,index) in matrixGeneral.rows[0].cells.slice(1)" style="width: 17%">
                                            <span v-if="cell === 'N'" class="flaticon-cancel"></span>
                                            <span v-else-if="cell === 'Y'" class="flaticon-check"></span>
                                            <span v-else>{{ cell }}</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row, index) in matrixGeneral.rows.slice(1)">
                                        <th scope="row" class="text-start main-cell">
                                            <span v-html="getInfoText(row.cells[0])[0]"></span>
                                            <v-tooltip v-if="getInfoText(row.cells[0]).length > 1" :text="getInfoText(row.cells[0])[1]" class="s-8">
                                                <template v-slot:activator="{ props }">
                                                    <v-icon v-bind="props" class="ml-1" color="ligthgrey" size="x-small">mdi-information-outline</v-icon>
                                                </template>
                                            </v-tooltip>
                                        </th>
                                        <td v-for="cell in row.cells.slice(1)" class="color--black cell">
                                            <span v-if="cell === 'N'" class="flaticon-cancel color--red-500 s-14"></span>
                                            <span v-else-if="cell === 'Y'" class="flaticon-check color--green-500"></span>
                                            <span v-else v-html="cell"></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- PRICING COMPARE EXPLORER -->
            <div v-if="matrixExplorer" class="comp-table">
                <div class="row">
                    <div class="col">
                        <div class="table-responsive mb-50">
                            <table class="table text-center pricing-matrix">
                                <thead class="product-header">
                                    <tr>
                                        <th style="width: 32%" class="main-column" v-html="matrixExplorer.rows[0].cells[0]"></th>
                                        <th v-for="(cell,index) in matrixExplorer.rows[0].cells.slice(1)" style="width: 17%">{{ cell }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row, index) in matrixExplorer.rows.slice(1)">
                                        <th scope="row" class="text-start main-cell">
                                            <span v-html="getInfoText(row.cells[0])[0]"></span>
                                            <v-tooltip v-if="getInfoText(row.cells[0]).length > 1" :text="getInfoText(row.cells[0])[1]" class="s-8">
                                                <template v-slot:activator="{ props }">
                                                    <v-icon v-bind="props" class="ml-1" color="ligthgrey" size="x-small">mdi-information-outline</v-icon>
                                                </template>
                                            </v-tooltip>
                                        </th>
                                        <td v-for="cell in row.cells.slice(1)" class="color--black cell">
                                            <span v-if="cell === 'N'" class="flaticon-cancel color--red-500 s-14"></span>
                                            <span v-else-if="cell === 'Y'" class="flaticon-check color--green-500"></span>
                                            <span v-else v-html="cell"></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- PRICING COMPARE VALUATION -->
            <div v-if="matrixValuation" class="comp-table">
                <div class="row">
                    <div class="col">
                        <div class="table-responsive mb-50">
                            <table class="table text-center pricing-matrix">
                                <thead class="product-header">
                                    <tr>
                                        <th style="width: 32%" class="main-column" v-html="matrixValuation.rows[0].cells[0]"></th>
                                        <th v-for="(cell,index) in matrixValuation.rows[0].cells.slice(1)" style="width: 17%">{{ cell }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row, index) in matrixValuation.rows.slice(1)">
                                        <th scope="row" class="text-start main-cell">
                                            <span v-html="getInfoText(row.cells[0])[0]"></span>
                                            <v-tooltip v-if="getInfoText(row.cells[0]).length > 1" :text="getInfoText(row.cells[0])[1]" class="s-8">
                                                <template v-slot:activator="{ props }">
                                                    <v-icon v-bind="props" class="ml-1" color="ligthgrey" size="x-small">mdi-information-outline</v-icon>
                                                </template>
                                            </v-tooltip>
                                        </th>
                                        <td v-for="cell in row.cells.slice(1)" class="color--black cell">
                                            <span v-if="cell === 'N'" class="flaticon-cancel color--red-500 s-14"></span>
                                            <span v-else-if="cell === 'Y'" class="flaticon-check color--green-500"></span>
                                            <span v-else v-html="cell"></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- PRICING COMPARE LEGAL -->
            <div v-if="matrixLegal" class="comp-table">
                <div class="row">
                    <div class="col">
                        <div class="table-responsive mb-50">
                            <table class="table text-center pricing-matrix">
                                <thead class="product-header">
                                    <tr>
                                        <th style="width: 32%" class="main-column" v-html="matrixLegal.rows[0].cells[0]"></th>
                                        <th v-for="(cell,index) in matrixLegal.rows[0].cells.slice(1)" style="width: 17%">{{ cell }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row, index) in matrixLegal.rows.slice(1)">
                                        <th scope="row" class="text-start main-cell">
                                            <span v-html="getInfoText(row.cells[0])[0]"></span>
                                            <v-tooltip v-if="getInfoText(row.cells[0]).length > 1" :text="getInfoText(row.cells[0])[1]" class="s-8">
                                                <template v-slot:activator="{ props }">
                                                    <v-icon v-bind="props" class="ml-1" color="ligthgrey" size="x-small">mdi-information-outline</v-icon>
                                                </template>
                                            </v-tooltip>
                                        </th>
                                        <td v-for="cell in row.cells.slice(1)" class="color--black cell">
                                            <span v-if="cell === 'N'" class="flaticon-cancel color--red-500 s-14"></span>
                                            <span v-else-if="cell === 'Y'" class="flaticon-check color--green-500"></span>
                                            <span v-else v-html="cell"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" class="text-start main-cell"></th>
                                        <td class="color--black cell">
                                            <NuxtLink
                                                :to="localePath('/contactar?reason=sales&plan=starter')"
                                                class="btn r-04 btn--theme hover--theme" data-bs-toggle="modal" data-bs-target="#modal-3"
                                                @click="handleClick(message.button.id,'product-cta-button')"
                                            >Contratar
                                            </NuxtLink>
                                        </td>
                                        <td class="color--black cell">
                                            <NuxtLink
                                                :to="localePath('/contactar?reason=sales&plan=advanced')"
                                                class="btn r-04 btn--theme hover--theme" data-bs-toggle="modal" data-bs-target="#modal-3"
                                                @click="handleClick(message.button.id,'product-cta-button')"
                                            >Contratar
                                            </NuxtLink>
                                        </td>
                                        <td class="color--black cell">
                                            <NuxtLink
                                                :to="localePath('/contactar?reason=sales&plan=profesional')"
                                                class="btn r-04 btn--theme hover--theme" data-bs-toggle="modal" data-bs-target="#modal-3"
                                                @click="handleClick(message.button.id,'product-cta-button')"
                                            >Contratar
                                            </NuxtLink>
                                        </td>
                                        <td class="color--black cell">
                                            <NuxtLink
                                                :to="localePath('/contactar?reason=sales&plan=corporate')"
                                                class="btn r-04 btn--theme hover--theme" data-bs-toggle="modal" data-bs-target="#modal-3"
                                                @click="handleClick(message.button.id,'product-cta-button')"
                                            >Contratar
                                            </NuxtLink>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- PRICING COMPARE MANAGEMENT -->
            <div v-if="matrixManagement" class="comp-table">
                <div class="row">
                    <div class="col">
                        <div class="table-responsive mb-50">
                            <table class="table text-center pricing-matrix">
                                <thead class="product-header">
                                    <tr>
                                        <th style="width: 32%" class="main-column" v-html="matrixManagement.rows[0].cells[0]"></th>
                                        <th v-for="(cell,index) in matrixManagement.rows[0].cells.slice(1)" style="width: 17%">{{ cell }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row, index) in matrixManagement.rows.slice(1)">
                                        <th scope="row" class="text-start main-cell">
                                            <span v-html="getInfoText(row.cells[0])[0]"></span>
                                            <v-tooltip v-if="getInfoText(row.cells[0]).length > 1" :text="getInfoText(row.cells[0])[1]" class="s-8">
                                                <template v-slot:activator="{ props }">
                                                    <v-icon v-bind="props" class="ml-1" color="ligthgrey" size="x-small">mdi-information-outline</v-icon>
                                                </template>
                                            </v-tooltip>
                                        </th>
                                        <td v-for="cell in row.cells.slice(1)" class="color--black cell">
                                            <span v-if="cell === 'N'" class="flaticon-cancel color--red-500 s-14"></span>
                                            <span v-else-if="cell === 'Y'" class="flaticon-check color--green-500"></span>
                                            <span v-else v-html="cell"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" class="text-start main-cell"></th>
                                        <td class="color--black cell">
                                            <NuxtLink
                                                :to="localePath('/contactar')"
                                                class="btn r-04 btn--theme-secondary hover--theme" data-bs-toggle="modal" data-bs-target="#modal-3"
                                                @click="handleClick(message.button.id,'product-cta-button')"
                                            >Contratar
                                            </NuxtLink>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END PRICING COMPARE -->
        </div>
        <!-- End container -->
    </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const props = defineProps<{
    matrixGeneral?: Object
    matrixExplorer?: Object
    matrixValuation?: Object
    matrixLegal?: Object
    matrixManagement?: Object
    matrixMaintenance?: Object
    matrixBroker?: Object
}>();

function getInfoText(text) {
    const regex = /^(.*?)(?:\[(.*?)\])?$/;
    const match = text.match(regex);

    if (match) {
        const prev = match[1].trim();
        const tooltip = match[2] ? match[2].trim() : null;
        return tooltip ? [prev, tooltip] : [prev];
    }
    return [text];
}
</script>

<style scoped>
.pricing-matrix .product-header {
    border-bottom: solid;
    border-top: solid;
}
.pricing-matrix .product-header .main-column {
    display: flex !important;
    justify-content: flex-start !important;
}
.pricing-matrix .product-header .odd {
    background-color: #B4B9C4 !important;
}
.pricing-matrix .main-cell {
    font-weight: 300 !important;
}
.pricing-matrix .cell {
    font-weight: 600 !important;
}

tbody tr:nth-child(odd) {
  background-color: #4C8BF5;
  color: #fff;
}

.v-tooltip__content {
  font-size: 50px !important;
  opacity: 0.9 !important;
  display: block !important;
  background-color: transparent !important;
}

</style>