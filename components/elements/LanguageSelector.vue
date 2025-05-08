<template>
  <div>
    <v-avatar
      id="language-selector"
      :image="currentLanguageIcon"
      color="grey-lighten-1"
      size="x-small"
    >
    </v-avatar>
    <v-menu activator="#language-selector">
      <v-list>
        <v-list-item
          v-for="language in mainStore.locales"
          :key="language._id"
          :title="language.language"
          @click="changeLanguage(language.localeCode)"
        >
          <template v-slot:prepend>
            <v-avatar
              :image="language.icon"
              size="x-small"
              color="grey-lighten-1"
            >
            </v-avatar>
          </template>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts" setup>
import { useMainStore } from "../../stores/mainStore";

const emit = defineEmits<{
  (e: "languageChanged", locale: string): void;
}>();

const router = useRouter();
const mainStore = useMainStore();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath()

const languages = mainStore.locales
const currentLanguage = mainStore.currentLocale

const currentLanguageIcon = computed(() => {
  if (!mainStore.currentLocale) {
    return null;
  }
  return mainStore.currentLocale.icon;
});

function changeLanguage(locale) {
  console.log("switching language ====> " + locale);
  mainStore.setLocale(locale);
  emit("languageChanged", locale);
  router.push(switchLocalePath(locale));
}
</script>

<style></style>
