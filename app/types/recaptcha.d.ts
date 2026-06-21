export {}

declare global {
  interface Window {
    // Callback reCAPTCHA v3 global, registrado por recaptchaCallback.client.ts.
    // Lo consumen los formularios embebidos (lead-capture / embed.js).
    getRecaptchaToken?: () => Promise<string | undefined>
  }
}
