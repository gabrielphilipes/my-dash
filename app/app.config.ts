export default defineAppConfig({
  ui: {
    gray: 'cool',
    icons: {
      loading: 'line-md:loading-loop'
    },
    button: {
      base: 'font-heading',
      default: {
        size: 'md',
        variant: 'solid'
      },
      padding: {
        '2xs': 'p-1 !pt-0.5',
        xs: 'p-1.5 !pt-1',
        sm: 'p-1.5 !pt-1',
        md: 'p-2 !pt-1.5',
        lg: 'p-2.5 !pt-2',
        xl: 'p-2.5 !pt-2'
      }
    }
  }
})
