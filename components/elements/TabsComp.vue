<template>
    <div class="d-flex py-100" :class="{'flex-column': $vuetify.display.xs }">
      <v-tabs
        v-model="activeTab"
        :direction="$vuetify.display.xs ? 'horizontal' : 'vertical'"
        class="px-3"
        hide-slider="true"
      >
        <v-tab-item>
          <p class="pt-3 s-13">CREA TU CARTERA</p>
          <v-tabs direction="vertical" hide-slider="true" v-model="activeTab" color="blue">
            <v-tab color="blue" :ripple="false" prepend-icon="mdi-magnify" text="Explora el Mercado" value="option-1"></v-tab>
            <v-tab :ripple="false" prepend-icon="mdi-lock" text="Market Intelligence" value="option-2"></v-tab>
            <v-tab :ripple="false" prepend-icon="mdi-access-point" text="Análisis de Propiedades" value="option-3"></v-tab>
          </v-tabs>
        </v-tab-item>
        <v-tab-item>
          <p class="pt-3 s-13">GESTIONA PROPIEDADES</p>
          <v-tabs direction="vertical" hide-slider="true" v-model="activeTab">
            <v-tab :ripple="false" prepend-icon="mdi-account" text="Recuperación Legal" value="option-4"></v-tab>
            <v-tab :ripple="false" prepend-icon="mdi-lock" text="Contabilidad" value="option-5"></v-tab>
            <v-tab :ripple="false" prepend-icon="mdi-access-point" text="Tributos y Comuninidades" value="option-6"></v-tab>
            <v-tab :ripple="false" prepend-icon="mdi-access-point" text="Mantenimiento de Propiedades" value="option-7"></v-tab>
          </v-tabs>
        </v-tab-item>
        <v-tab-item>
          <p class="pt-3 s-13">VENDE O ALQUILA</p>
          <v-tabs direction="vertical" hide-slider="true" v-model="activeTab" color="blue">
            <v-tab :ripple="false" prepend-icon="mdi-account" text="Comercializa Propiedades" value="option-8"></v-tab>
            <v-tab :ripple="false" prepend-icon="mdi-access-point" text="Gestiona arrendamientos" value="option-9"></v-tab>
            <v-tab :ripple="false" prepend-icon="mdi-lock" text="CRM para agentes" value="option-10"></v-tab>
          </v-tabs>
        </v-tab-item>
        <v-tab-item>
          <p class="pt-3 s-13">OPTIMIZA TU OPERACIÓN</p>
          <v-tabs direction="vertical" hide-slider="true" v-model="activeTab" color="blue">
            <v-tab :ripple="false" prepend-icon="mdi-account" text="Analítica y Dashboards" value="option-11"></v-tab>
            <v-tab :ripple="false" prepend-icon="mdi-lock" text="Coordina equipos" value="option-12"></v-tab>
            <v-tab :ripple="false" prepend-icon="mdi-access-point" text="Flujos de trabajo" value="option-13"></v-tab>
          </v-tabs>
        </v-tab-item>
      </v-tabs>

      <v-tabs-window v-model="activeTab">
        <v-tabs-window-item value="option-1" rounded>
          <v-card flat class="mx-auto px-0">
            <v-card-title>
              <v-toolbar flat class="px-3">
                <v-icon size='md'>mdi-magnify</v-icon>
                <v-toolbar-title class="s-20">Title</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-toolbar-items class="align-items-center"><p class="my-0">Find the right leads and companies. Learn more.</p></v-toolbar-items>
              </v-toolbar>
            </v-card-title>
              <v-img
                src="../../assets/images/bg-03.jpg"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                cover
              >
              <v-card-text>
                <p>
                  Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
                </p>

                <p>
                  Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non nisl sit amet velit hendrerit rutrum.
                </p>

                <p class="mb-0">
                  Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Phasellus blandit leo ut odio.
                </p>
              </v-card-text>
            </v-img>
          </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="option-2">
          <v-card flat>
          <v-card-title>
              <v-toolbar flat class="px-3">
                <v-icon size='md'>mdi-magnify</v-icon>
                <v-toolbar-title class="s-20">Title</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-toolbar-items class="align-items-center"><p class="my-0">Find the right leads and companies. Learn more.</p></v-toolbar-items>
              </v-toolbar>
            </v-card-title>
            <v-img
                src="../../assets/images/bg-04.jpg"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                cover
              >
            <v-card-text>
              <p>
                Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
              </p>

              <p>
                Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
              </p>

              <p>
                Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
              </p>

              <p>
                Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
              </p>

              <p class="mb-0">
                Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
              </p>
            </v-card-text>
          </v-img>

          </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="option-3">
          <v-card flat>
            <v-card-text>
              <p>
                Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
              </p>

              <p class="mb-0">
                Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
              </p>
            </v-card-text>
          </v-card>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
</template>

<script lang="ts" setup>
const activeTab = ref('')

onMounted(() => {
  activeTab.value='option-1'
});
</script>

<style scoped>
.v-tab-item--selected {
  border-radius: 10px !important;
  border: 1px solid #1778FB !important;
  background-color: #DBE8FD80 ;/*#E4F3FF80*/;
}
.v-tab--selected {
  border: 0;
}
.v-tabs-window,
.v-tabs-window-item,
.v-card {
  background-color: #EEF2F7;
  border-radius: 15px;
}
.v-card-title {
  padding: 0;
}
.v-slide-group__next, .v-slide-group__prev {
    display: none !important;
}
.v-tabs--density-default {
    --v-tabs-height: auto;
}
</style>
