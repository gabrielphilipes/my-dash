const env = process.env

export default defineAppConfig({
  site_name: env.SITE_NAME ?? 'MyDash',
  ui: {
    colors: {
      neutral: 'neutral'
    },
    icons: {
      loading: 'line-md:loading-loop'
    },
    slideover: {
      slots: {
        overlay: 'backdrop-blur-xs'
      }
    }
  }
})
