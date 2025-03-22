const env = process.env

export default defineAppConfig({
  site_name: env.SITE_NAME ?? 'MyDash',
  ui: {
    colors: {
      neutral: 'zinc'
    },
    icons: {
      loading: 'line-md:loading-loop'
    }
  }
})
