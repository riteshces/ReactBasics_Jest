const aliases = (prefix = `src`) => ({
  "@app": `${prefix}/app`,
  "@legacy-code": `${prefix}/legacy-code`,
  "@main": `${prefix}/app/main`,
  "@src": `${prefix}`,
});

module.exports = aliases;
