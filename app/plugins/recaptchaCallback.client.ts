import useGoogleRecaptcha, { RecaptchaAction } from "~/composables/useGoogleRecaptcha"

// Registra window.getRecaptchaToken en ámbito GLOBAL para que los formularios
// embebidos (lead-capture / embed.js) puedan obtener un token reCAPTCHA v3.
// Se ejecuta solo en cliente y después de recaptcha.client.ts (que instala VueReCaptcha).
export default defineNuxtPlugin(() => {
  const { executeRecaptcha } = useGoogleRecaptcha()

  window.getRecaptchaToken = async () =>
    (await executeRecaptcha(RecaptchaAction.login)).token
})
