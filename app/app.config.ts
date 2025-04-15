const env = process.env

export default defineAppConfig({
  site_name: env.SITE_NAME ?? 'MyDash',
  toaster: {
    position: 'top-center'
  },
  ui: {
    colors: {
      neutral: 'neutral'
    },
    icons: {
      loading: 'line-md:loading-loop'
    },
    button: {
      base: 'disabled:opacity-40'
    },
    slideover: {
      slots: {
        overlay: 'backdrop-blur-xs'
      }
    }
  }
})
