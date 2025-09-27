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
        const a = created_at.slice(0, 7).replace("-", ".")
        const b = pushed_at.slice(0, 7).replace("-", ".")
        return `${name} (${a}${
            a == b
                ? ""
                : `-${b}`
        })`
    })
    .join("\n")
)
