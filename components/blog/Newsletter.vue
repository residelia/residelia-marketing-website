<template>
    <section id="newsletter-1" class="pt-50 newsletter-section">
        <div class="newsletter-overlay">
            <div class="container">
                <div class="row d-flex align-items-center row-cols-1 row-cols-lg-2">
                    <!-- NEWSLETTER TEXT -->
                    <div class="col">
                        <div class="newsletter-txt">
                            <h4 class="s-34 w-700">{{ data[0]?.heading.find(t => t._key === locale).value }}</h4>
                        </div>
                    </div>
                    <!-- NEWSLETTER FORM -->
                    <div class="col">
                        <FormsSimple form="newsletter" location="callToAction" textColor="dark" color="dark"/>
                    </div>
                    <!-- END NEWSLETTER FORM -->
                </div>
                <!-- End row -->
            </div>
            <!-- End container -->
        </div>
        <!-- End newsletter-overlay -->
    </section>
    <hr class="divider" />
</template>

<script setup lang="js">
import { formSectionQuery } from '../../queries/helperQueries';

const {locale} = useI18n()
const data = await useSanityData({
    query: formSectionQuery,
    params: { formType: 'newsletter' },
});
</script>
