const aliases = (prefix = `src`) => ({
  "app/": `${prefix}/app`,
  "legacy-code": `${prefix}/legacy-code`,
  "app/main": `${prefix}/app/main`,
  "app/components": `${prefix}/app/components`,
});

module.exports = aliases;
