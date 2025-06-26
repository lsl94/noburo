import fs from 'fs'
import { DateTime } from 'luxon'
import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'

export default function(eleventyConfig) {
  // 處理靜態資源：將 src/public/ 下的內容直接複製到 _site/ 根目錄
  eleventyConfig.addPassthroughCopy({ "src/public": "/" })
  eleventyConfig.ignores.add("src/templates")

  // List all posts
  eleventyConfig.addCollection("articles", function(collection) {
    const all = collection.getFilteredByGlob([
      "**/articles/**/*.md"
    ])

    // console.log("📄 所有符合的文章路徑：")
    // console.log(all.map(i => i.inputPath))

    const filtered = all.filter(item => {
      const inputPath = item.inputPath

      // 只處理在 articles/ 底下的 .md 檔案
      if (!inputPath.includes("/articles/")) return false

      // 排除任何位於 articles/.../index.md 的檔案（深層也包含）
      if (inputPath.endsWith("/index.md")) return false;
      // if (/\/articles\/.*\/index\.md$/.test(inputPath)) return false

      return true
    })

    // console.log("✅ 已篩選後的文章：")
    // console.log(filtered.map(i => i.inputPath))

    return filtered
  })

  // check listening 
  eleventyConfig.addCollection("listening", function(collection) {
    const all = collection.getFilteredByGlob([
      "**/articles/rensei/n1n2/listening/*.md"
    ])

    console.log("📄 聽解下所有符合的文章路徑：")
    console.log(all.map(i => i.inputPath))

    const filtered = all.filter(item => {
      const inputPath = item.inputPath
      // 只處理在 articles/resei/n1n2/listening/ 底下的 .md 檔案
      if (!inputPath.includes("/articles/rensei/n1n2/listening/")) return false

      // 排除任何位於 articles/.../index.md 的檔案（深層也包含）
      if (inputPath.endsWith("/index.md")) return false;
      // if (/\/articles\/.*\/index\.md$/.test(inputPath)) return false

      return true
    })

    console.log("✅ 聽解已篩選後的文章：")
    console.log(filtered.map(i => i.inputPath))

    return filtered
  })

  // Customize date
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (dateObj instanceof Date) {
      return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
    }
    return ''
  })
  eleventyConfig.addFilter('readableDate', dateObj => {
    if (dateObj instanceof Date) {
      return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd LLL yyyy')
    }
    return ''
  })

  eleventyConfig.addFilter("filterTagList", function(tags) {
    // 範例邏輯：移除某些系統標籤
    if (!Array.isArray(tags)) return []

    return tags.filter(tag =>
      !["all", "nav", "post", "posts"].includes(tag)
    )
  })

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    linkify: true,
    breaks: true
  }).use(markdownItAnchor, {
    level: [1, 2, 3, 4, 5, 6],
    slugify: eleventyConfig.getFilter('slugify')
  })
  eleventyConfig.setLibrary('md', markdownLibrary)


  // Override Browsersync defaults (used only with --serve)
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html')

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' })
          res.write(content_404)
          res.end()
        })
      },
    },
    ui: false,
    ghostMode: false
  })


  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head', (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return []
    }
    if (n < 0) {
      return array.slice(n)
    }

    return array.slice(0, n)
  })

  // Return the smallest number argument
  eleventyConfig.addFilter('min', (...numbers) => {
    return Math.min.apply(null, numbers)
  })
  //  自訂輸出目錄
  return {
    pathPrefix: "/",
    dir: {
      input: "src",      // 原始碼放這裡
      output: "_site",   // 預設輸出資料夾
      includes: "_includes", // 基本模板
      layouts: "_layouts",   // 應用模板
      data: "_data"          // 資料檔案
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"]
  }
}

