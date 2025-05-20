// deno-lint-ignore-file no-explicit-any

const repoInfos = JSON.parse(await Deno.readTextFile("raw/repoInfos.json")) as any[]

console.log(repoInfos
    .map(x =>
        Object.fromEntries(
            `
                name
                created_at
                pushed_at
            `
            .trim()
            .split("\n")
            .map(x => x.trim())
            .map(k => [k, x[k]])
        )
    )
    .map(({ name, created_at, pushed_at }) => {
        const a = created_at.slice(0, 4)
        const b = pushed_at.slice(0, 4)
        return `${name} (${created_at.slice(0, 4)}${
            a == b
                ? ""
                : `-${b}`
        })`
    })
    .join("\n")
)
