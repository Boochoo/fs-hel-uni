export const compose = (...fns) => fns.reduceRight((_, fn) => fn(), fns)
