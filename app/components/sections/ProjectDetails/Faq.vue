<template>
    <section id="faqs-resource" class="py-70 faqs-section division">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10 col-xl-9">
                    <div class="inner-page-title mb-50 text-center">
                        <h2 class="s-40 w-700">{{ $t('faqHeading') }}</h2>
                    </div>
                    <div class="accordion-wrapper">
                        <ul>
                            <ElementsAccordionItem2
                                v-for="(item, i) in localizedFaq"
                                :key="i"
                                :title="item.question"
                            >
                                <div class="accordion-panel-item">
                                    <div class="faqs-2-answer color--grey">
                                        <p>{{ item.answer }}</p>
                                    </div>
                                </div>
                            </ElementsAccordionItem2>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const props = defineProps<{ faq: Array<{ question: any[]; answer: any[] }> }>()
const { locale } = useI18n()

const localizedFaq = computed(() =>
    props.faq.map(item => ({
        question: item.question?.find((l: any) => l._key === locale.value)?.value ?? '',
        answer:   item.answer?.find((l: any) => l._key === locale.value)?.value ?? '',
    }))
)
</script>
