export const compose = (...fns) => fns.reduceRight((_, fn) => fn(), fns)

export const sortByKey = (data, key) =>
  data.sort((b, a) => {
    return a[key] - b[key]
  })
