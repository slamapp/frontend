const getPackagesLintStagedSetting = (packageName) => {
  return Object.fromEntries([[
    `packages/${packageName}/**/*.+(ts|tsx)`,
    [() => `yarn tsc -p packages/${packageName}/tsconfig.json --noEmit`],
  ]])
}

module.exports = {
  ...getPackagesLintStagedSetting("common"),
  ...getPackagesLintStagedSetting("web"),
}

