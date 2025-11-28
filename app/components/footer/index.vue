<template>
  <footer id="footer-3" class="pt-100 footer ft-3-ntr">
    <div class="container">
      <!-- FOOTER CONTENT -->
      <div class="row">
        <!-- FOOTER LOGO -->
        <div class="col-xl-3 d-flex flex-column justify-content-between">
          <div class="footer-info logo-black">
            <img
              class="footer-logo"
              width="150px"
              :src="mainStore.footer.logo"
              alt="residelia-logo"
            />
          </div>
          <div class="footer-info logo-white">
            <img
              class="footer-logo"
              width="150px"
              :src="mainStore.footer.logo"
              alt="residelia-logo"
            />
          </div>

        </div>

        <!-- PRODUCT LINKS -->
        <div class="col-sm-4 col-lg-2">
          <div class="footer-links fl-2">
            <!-- Title -->
            <h6 class="s-17 w-700">{{ mainStore.footer.menuesGroup[0].title.find(l => l._key === locale).value}}</h6>
            <!-- Links -->
            <ul class="foo-links clearfix">
              <li v-for="menu in mainStore.footer.menuesGroup[0].menu">
                <!-- <p><NuxtLink v-if="!menu.next" :to="$localePath(menu.link.slug?.find(l => l._key === locale).value.current)">{{ menu.title?.find(l => l._key === locale).value }}</NuxtLink></p></li> -->
                <p><NuxtLink v-if="!menu.next" :to="$localePath({ name: 'product', params: { product: menu.link.slug.find(l => l._key === locale).value.current.split('/').filter(Boolean).pop() } })" v-follow >{{ menu.title?.find(l => l._key === locale).value }}</NuxtLink></p></li>
            </ul>
          </div>
        </div>
        <!-- END PRODUCT LINKS -->

        <!-- SOLUTIONS LINKS -->
        <div class="col-sm-4 col-lg-3">
          <div class="footer-links fl-2">
            <!-- Title -->
            <h6 class="s-17 w-700">{{ mainStore.footer.menuesGroup[1].title.find(l => l._key === locale).value}}</h6>
            <!-- Links -->
            <ul class="foo-links clearfix">
              <!-- <li v-for="menu in mainStore.footer.menuesGroup[1].menu"><p><NuxtLink :to="$localePath(menu.link.slug?.find(l => l._key === locale).value.current)">{{ menu.title?.find(l => l._key === locale).value }}</NuxtLink></p></li> -->
              <li v-for="menu in mainStore.footer.menuesGroup[1].menu"><p><NuxtLink :to="$localePath({ name: 'solutions-segment', params: { segment: menu.link.slug.find(l => l._key === locale).value.current.split('/').filter(Boolean).pop() } })" v-follow >{{ menu.title?.find(l => l._key === locale).value }}</NuxtLink></p></li>
            </ul>
          </div>
        </div>
        <!-- END SOLUTIONS LINKS -->

        <!-- COMPANY LINKS -->
        <div class="col-sm-4 col-lg-3 col-xl-2">
          <div class="footer-links fl-1">
            <!-- Title -->
            <h6 class="s-17 w-700">{{ mainStore.footer.menuesGroup[2].title.find(l => l._key === locale).value}}</h6>
            <!-- Links -->
            <ul class="foo-links clearfix">
              <li v-for="menu in mainStore.footer.menuesGroup[2].menu">
                <p>
                  <NuxtLink v-if="menu.pageType === 'legal'" :to="$localePath({ name: 'terms-item', params: { item: menu.link.slug.find(l => l._key === locale).value.current.split('/').filter(Boolean).pop() } })" v-follow >{{ menu.title?.find(l => l._key === locale).value }}</NuxtLink>
                  <NuxtLink v-else :to="$localePath(menu.link.slug?.find(l => l._key === locale).value.current)" v-follow >{{ menu.title?.find(l => l._key === locale).value }}</NuxtLink>
                </p>
              </li>
              <li>
                <p>
                  <NuxtLink :to="$localePath('/blog')" v-follow >Blog</NuxtLink>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <!-- END COMPANY LINKS -->

        <!-- RESOURCES LINKS -->
        <div v-if="mainStore.footer.menuesGroup[3]" class="col-sm-4 col-lg-2 col-xl-2">
          <div class="footer-links fl-3">
            <!-- Title -->
            <h6 class="s-17 w-700">{{ mainStore.footer.menuesGroup[3].title?.find(l => l._key === locale).value}}</h6>
            <!-- Links -->
            <ul class="foo-links clearfix">
              <li v-for="menu in mainStore.footer.menuesGroup[3].menu"><p><NuxtLink :to="$localePath(menu.link.slug.find(l => l._key === locale).value.current)" v-follow >{{ menu.title.find(l => l._key === locale).value }}</NuxtLink></p></li>
            </ul>
          </div>
        </div>
        <!-- END RESOURCES LINKS -->
      </div>
      <!-- END FOOTER CONTENT -->
      <hr />
      <!-- FOOTER DIVIDER LINE -->
      <!-- BOTTOM FOOTER -->
      <div class="bottom-footer">
        <div class="row row-cols-1 row-cols-md-2 d-flex align-items-center">
          <!-- FOOTER COPYRIGHT -->
          <div class="col-lg-5">
            <div class="footer-copyright">
              <p class="p-sm">
                &copy; {{new Date().getFullYear()}} RESIDELIA. <span>{{ $t('copyright')}}</span>
              </p>
            </div>
          </div>
          <!-- FOOTER SOCIALS -->
          <div class="col-lg-6">
            <ul class="bottom-footer-socials ico-20 text-end alignt-items-center">
              <li v-for="social in mainStore.footer.socials">
                <!-- <a :href="social.externalUrl" :target="social.newWindow ? '_blank' : '_self'"><span v-if="social.isIconLink" :class="`flaticon-${social.linkTextIcon}`"></span></a> -->
                <a :href="social.externalUrl" :target="social.newWindow ? '_blank' : '_self'"><span v-if="social.isIconLink" :class="social.linkTextIcon"></span></a>
              </li>
            </ul>
          </div>
          <!-- FOOTER LANGUAGE -->
          <div class="col-lg-1 text-end">
            <ElementsLanguageSelector />
          </div>
        </div>
        <div class="row mt-10 justify-content-end">
            <div class="footer-info logo-black d-flex align-items-center">
              <img
                class="footer-logo mr-10"
                src="/assets/images/icons/logo-cdti.jpg"
                alt="cdti-logo"
              />
              <a style="text-decoration:none;" target="_blank"  href="https://aplicaciones.ciencia.gob.es/pyiINFO/buscarPyi.mec?&nif=B88421920"  title="Ir a 'Sello Pyme Innovadora con validez 17/04/2026 ' en ventana nueva" >
                  <div>
                      <img width="100" alt="Sello PYME INNOVADORA 17/04/2026" src="/assets/images/pyme-innovadora.jpg" />
                  </div>
              </a>
              <!-- <img height="37" class="ml-2" alt="escudo de MEIC 17/04/2026" src="https://aplicaciones.ciencia.gob.es/pyiINFO/imagenes/escudo.jpg"/> -->
            </div>
          </div>
        <!-- End row -->
      </div>
      <!-- END BOTTOM FOOTER -->
    </div>
    <!-- End container -->
    <FooterGoToTop />
    <FooterCookiePreferencesLauncher />

  </footer>
</template>

<script setup>
import { useMainStore } from "../../../stores/mainStore";

const mainStore = useMainStore()
const { locale } = useI18n()

</script>

