/**
 * The few lines every check script here shares: run named checks in order, print one line
 * each, and exit non-zero if any failed.
 *
 * These scripts run through `sanity exec` rather than a test runner. It already ships with the
 * project, compiles TypeScript, resolves the `@/` alias and loads `.env`, so the checks need no
 * dependency of their own.
 */
export type Check = [name: string, run: () => void | Promise<void>]

export async function runChecks(checks: Check[]): Promise<never> {
  let failed = 0

  for (const [name, run] of checks) {
    try {
      await run()
      console.log(`ok      ${name}`)
    } catch (error) {
      failed++
      const message = String((error as Error).message).split('\n').join('\n        ')
      console.log(`NOT OK  ${name}\n        ${message}`)
    }
  }

  console.log(failed ? `\n${failed} of ${checks.length} failed` : `\nall ${checks.length} passed`)
  process.exit(failed ? 1 : 0)
}
