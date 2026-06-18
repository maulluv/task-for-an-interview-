export const translateOptions = (options, t) =>
    options.map((o) => ({ value: o.value, label: t(o.labelKey) }))