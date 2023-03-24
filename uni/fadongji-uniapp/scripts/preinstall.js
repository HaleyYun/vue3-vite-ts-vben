if (!/yarn/.test(process.env.npm_execpath || '')) {
  console.warn(`Please install using yarn`)
  process.exit(1)
}
