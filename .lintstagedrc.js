const getLintStagedSetting = ( packageName) => {
  return Object.fromEntries([
    [
      `${packageName}/**/*.+(ts|tsx)`,
      [() => `yarn tsc -p ${packageName}/tsconfig.json --noEmit`],
    ],
  ])
}

module.exports = {
  ...getLintStagedSetting("libs/http"),
  ...getLintStagedSetting("packages/admin"),
  ...getLintStagedSetting("packages/web"),
}
