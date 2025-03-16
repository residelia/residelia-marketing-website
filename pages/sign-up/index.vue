<template>
    <div>
        <SectionsSignupHero :hero="data[0].hero" :formData="data[0].form" :query="route.query"/>
        <!-- <SectionsSignUpHero /> -->
    </div>
</template>

<script setup>
import { pageQuery } from '../../queries/contentQueries';
import { useMainStore } from "../../stores/mainStore";

defineI18nRoute({
    paths: {
      en: '/sign-up',
      es: '/registro'
    }
})

const route = useRoute();
const router = useRouter();
const localePath = useLocalePath()
const { locale } = useI18n()
const mainStore = useMainStore()

const data = await useSanityData({
  query: pageQuery,
  params: {
    slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
    language: locale._value
  }
})
const headerColor = data.value[0].headerColor === 'dark' ? 'navbar-light' : 'navbar-dark'
const textColor = data.value[0].headerColor === 'dark' ? 'color--white' : 'color--dark'
const prefillData = ref({})

console.log(
        "%cStop!",
        "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
      );
console.log(route)
console.log(locale)
console.log(data)

// setting header and hero colors

definePageMeta({
  layout: 'no-header-footer'
})
useHead({
  title: `${data.value[0].title.find(l => l._key === locale._value).value}`,
  description: `${data.value[0].description.find(l => l._key === locale._value).value}`,
  bodyAttrs: {
      class: `${headerColor} scheme-residelia`
  },
})
useServerSeoMeta({
  title: `${data.value[0].title.find(l => l._key === locale.value).value}`,
  ogTitle: `${data.value[0].title.find(l => l._key === locale.value).value}`,
  description: `${data.value[0].description.find(l => l._key === locale.value).value}`,
  ogDescription: `${data.value[0].description.find(l => l._key === locale.value).value}`,
  ogImage: `${data.value[0]?.hero?.image}`,
  twitterCard: 'summary_large_image',
})

onMounted(() => {
  const storedData = JSON.parse(localStorage.getItem("signupData"));
  // const finishedWizard = localStorage.getItem("finishedSignupWizard") ? true : false;
  const signupCompleted = useCookie('signup_completed')
  const query = route.query;
  if (signupCompleted.value === 'true') {
    // enviamos a la app
    navigateTo('https://app.residelia.com', { external: true })
  }
});

// tracking
const { trackPage } = useTracking();
const trackPageView = () => {
  trackPage('Page View', {
    title: `${data.value[0].title.find(l => l._key === locale._value).value}`,
    path: route.fullPath,
  })
};

// Detecta cambios en la ruta y envía evento `page`

onMounted(trackPageView);
watch(() => route.fullPath, trackPageView);

</script>