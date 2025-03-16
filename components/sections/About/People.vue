<template>
    <section v-if="people" id="team-1" class="pt-100 team-section">
        <div class="container">
            <!-- SECTION TITLE -->
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-9">
                    <div class="section-title mb-80">
                        <!-- Title -->
                        <h2 class="s-36 w-700">{{ people.heading.find(t => t._key === locale).value }}</h2>
                        <!-- Text -->
                        <p class="s-18 color--grey">{{ people.subHeading?.find(t => t._key === locale).value }}</p>
                    </div>
                </div>
            </div>
            <!-- TEAM MEMBERS WRAPPER -->
            <div class="team-members-wrapper">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                    <!-- TEAM MEMBER -->
                    <div v-for="member in people.team" class="col">
                        <a :href="member.linkedin" target="_blank" rel="noopener">
                        <div class="team-member mb-50 wow fadeInUp">
                            <!-- Team Member Photo -->
                            <div class="team-member-photo r-14">
                                <div class="hover-overlay">
                                    <img class="img-fluid" :src="member.pic.url+'?sat=-100'" :alt="member.image.alt" />
                                    <div class="item-overlay"></div>
                                </div>
                            </div>
                            <!-- Team Member Data -->
                            <div class="team-member-data">
                                <h6 class="s-20 w-700 color--black">{{ member.name }}</h6>
                                <p class="color--grey">{{ member.role.find(t => t._key === locale).value }}</p>
                            </div>
                        </div>
                        </a>
                    </div>
                    <!-- END TEAM MEMBER -->
                    <!-- TEAM MEMBER #8 -->
                    <div class="col">
                        <NuxtLink
                            :to="localePath(`${people.callToAction.link.slug.find(t => t._key === locale).value.current}${people.callToAction.button.queryString ? people.callToAction.button.queryString : ''}`)"
                            @click="handleClick('Job Application Started','blind-team-member-button')"
                        >
                        <div class="team-member mb-50 wow fadeInUp">
                            <!-- Team Member Photo -->
                            <div class="team-member-photo r-14">
                                <div class="hover-overlay">
                                    <img class="img-fluid" src="/assets/images/team-13.jpg" alt="team-member-foto" />
                                    <div class="item-overlay"></div>
                                </div>
                            </div>
                            <!-- Team Member Data -->
                            <div class="team-member-data">
                                <h6 class="s-20 w-700 color--black">{{ $t('growWithUs') }}</h6>
                                <!-- <p class="color--grey"><NuxtLink :to="localePath(`${people.callToAction.link.slug.find(t => t._key === locale).value.current}${people.callToAction.button.queryString ? people.callToAction.button.queryString : ''}`)">hireme@domain.com</NuxtLink></p> -->
                            </div>
                        </div>
                        </NuxtLink>
                    </div>
                    <!-- END TEAM MEMBER #8 -->
                </div>
                <!-- End row -->
            </div>
            <!-- TEAM MEMBERS WRAPPER -->
            <!-- MORES BUTTON -->
            <div v-if="people.callToAction" class="row">
                <div class="col">
                    <div class="more-btn text-center mt-20 wow fadeInUp">
                        <NuxtLink :to="localePath(`${people.callToAction.link.slug.find(t => t._key === locale).value.current}${people.callToAction.button.queryString ? people.callToAction.button.queryString : ''}`)" class="btn btn--tra-black hover--theme">{{ people.callToAction.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <!-- End container -->
    </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const props = defineProps<{
    people: Object
}>();

const route = useRoute()
const { trackEvent } = useTracking()

function handleClick(eventName, buttonId) {
  const params = {
    clickedOnPage: route.path,
    buttonId
  }

  trackEvent(eventName, params)
}
</script>