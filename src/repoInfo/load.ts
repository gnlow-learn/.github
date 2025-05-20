import { Repo } from "./type.ts"

const getPage =
async (page: number) =>
    await fetch(`https://api.github.com/orgs/gnlow-learn/repos?page=${page}`)

const parseLink =
(link: string) => {
    const res: [string, string][] = []
    link.replace(/<(.*?)>; rel="(.*?)"/g,
        (_, url, rel) => res.push([rel, url])+""
    )
    return Object.fromEntries(res)
}

const load =
async () => {
    const repos: Repo[] = []
    let i = 1
    while (true) {
        console.log(`load page ${i}`)
        const res = await getPage(i)
        repos.push(...await res.json() as Repo[])

        const { next } = parseLink(res.headers.get("link") || "")
        if (!next) break
        if (i > 20) break

        i += 1
    }
    return repos
}

const repos = await load()

await Deno.writeTextFile("raw/repoInfos.json", JSON.stringify(repos))
