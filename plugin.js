const swc = require("@swc/core")

module.exports = function plugin(snowpackConfig, options = {}) {
  // options validation
  if (options) {
    if (typeof options !== "object")
      throw new Error(`options isn’t an object. Please see README.`)
    if (options.input && !Array.isArray(options.input))
      throw new Error(
        `options.input must be an array (e.g. ['.js', '.mjs', '.jsx', '.ts', '.tsx'])`
      )
    if (options.input && !options.input.length)
      throw new Error(`options.input must specify at least one filetype`)
  }

  return {
    name: "snowpack-plugin-swc",
    resolve: {
      input: options.input || [".js", ".mjs", ".jsx", ".ts", ".tsx"],
      output: [".js"], // always export JS
    },
    async load({ filePath }) {
      if (!filePath) return

      let { code, map } = await swc.transformFile(filePath)

      if (code) {
        // Some Babel plugins assume process.env exists, but Snowpack
        // uses import.meta.env instead. Handle this here since it
        // seems to be pretty common.
        // See: https://www.pika.dev/npm/snowpack/discuss/496

        // TODO investgate if this is needed
        code = code.replace(/process\.env/g, "import.meta.env")
      }

      return {
        ".js": {
          code,
          map,
        },
      }
    },
  }
}
