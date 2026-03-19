<template>
    <div class="row text-center pb-100 page-pagination theme-pagination">
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="currentPage"
                  :length="Math.round(50/3)"
                  class="my-4"
                  @next="handlePagination"
                  @prev="handlePagination"
                  @update="$emit('onPaginate', currentPage)"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
        <!-- <div class="pb-100 page-pagination theme-pagination">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <nav v-if="totalItems > 0 && totalPages > 1" aria-label="Page navigation">
                            <ul class="pagination ico-20 justify-content-center">
                                <li class="page-item" :class="{disabled: current === 1}" @click="prevPages"><a class="page-link" href="#" tabindex="-1"><span class="flaticon-back"></span></a></li>
                                <li v-for="num in shownPages" :key="num" class="page-item" :class="{active: num === current}" @click="$emit('onPaginate', num)" aria-current="page"><a class="page-link" href="#">{{ num }}</a></li>
                                <li class="page-item" :class="{disabled: current === total}" @click="nextPages"><a class="page-link" href="#" aria-label="Next"><span class="flaticon-next"></span></a></li>

                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div> -->
</template>

<script lang="ts" setup>
const props = defineProps<{
    limitPages: number,
    totalItems: number,
    limitItems: number,
    shownItems?: Array
}>();
defineEmits(['onPaginate'])

const totalPages = ref(props.totalItems > props.limitItems ? Math.round(props.totalItems / props.limitItems) : 1)
const prevPages = () => {
    console.log("showing previous pages")
}
const nextPages = () => {
    console.log("showing next pages")
}

let currentPage = ref(1)

watch(() => props.totalItems, (newValue, oldValue) => {
    if (newValue != oldValue) {
        totalPages.value = props.totalItems > props.limitItems ? Math.round(props.totalItems / props.limitItems) : 1
    }
})
</script>