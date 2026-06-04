import { RenderPlugin } from "@11ty/eleventy";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { DateTime } from "luxon";
import markdownit from "markdown-it";
import markfootnote from "markdown-it-footnote";
import markabbrev from "markdown-it-abbr";

export default async function(eleventyConfig) {
    eleventyConfig.setInputDirectory("src");
    eleventyConfig.setLayoutsDirectory("_layouts");
    
    eleventyConfig.setTemplateFormats("liquid,md,webc");

    eleventyConfig.addPassthroughCopy("src/robots.txt")
    // neocities deployment
    eleventyConfig.addPassthroughCopy("assets/font");
    eleventyConfig.addPassthroughCopy("assets/img");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addWatchTarget("src/js");

    // in-case of neocities deployment
    eleventyConfig.addGlobalData("vid_dir", "https://github.com/stamp-cmd/website/raw/refs/heads/main/assets/vid/"); // use github as video storage
    eleventyConfig.addGlobalData("full_url", "https://raw.githubusercontent.com/stamp-cmd/website/refs/heads/main/");

    eleventyConfig.addPlugin(RenderPlugin);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(pluginWebc, { components: "src/_components/*.webc" });

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    })

    eleventyConfig.addFilter("machineDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
    })

    let md = markdownit();
    md.use(markfootnote);
    md.use(markabbrev);
    md.renderer.rules.link_open = (token, idx, options, env, self) => {
        token[idx].attrSet("target", "_blank");
        return self.renderToken(token, idx, options);
    }

    md.renderer.rules.footnote_block_open = () => (
        "<hr class=\"footnotes-sep\">" + 
        "<h4 class=\"mt-3\">Footnotes</h4>\n" +
        "<div class=\"footnotes\">\n" +
        "<ol class=\"footnotes-list\">\n"
    );

    md.renderer.rules.footnote_block_close = () => { return "</ol>\n</div>\n"; }

    eleventyConfig.setLibrary("md", md);

    eleventyConfig.addWatchTarget("CHANGELOG.md")
}