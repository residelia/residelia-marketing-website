<template>
    <section id="banner-7" class="banner-section bg--primary-300">
        <div class="banner-overlay py-100">
            <div class="container">
                <div class="banner-7-wrapper">
                    <div class="row justify-content-center">
                        <div class="col-md-8">
                            <div class="banner-7-txt text-center">
                                <span class="section-id color--white">{{ $t('ctaDefaultSubheading') }}</span>
                                <h2 class="s-36 w-700 color--white">{{ $t('ctaDefaultHeading') }}</h2>
                                <div class="btns-group">
                                    <NuxtLink
                                        :to="$localePath('/')"
                                        class="btn r-04 btn--theme-secondary hover--theme"
                                    >{{ $t('ctaDefaultButton') }}</NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <hr class="divider" />
</template>
