import { RenderPlugin } from "@11ty/eleventy";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import { DateTime } from "luxon";

export default async function(eleventyConfig) {
    eleventyConfig.setInputDirectory("src");
    eleventyConfig.setLayoutsDirectory("_layouts");
    
    eleventyConfig.setTemplateFormats("liquid,md,webc");

    eleventyConfig.addPassthroughCopy("src/robots.txt")
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addWatchTarget("src/js");

    // in-case of neocities deployment
    eleventyConfig.addGlobalData("vid_dir", "/assets/vid/");
    eleventyConfig.addGlobalData("full_url", "");

    eleventyConfig.addPlugin(RenderPlugin);
    eleventyConfig.addPlugin(pluginWebc, { components: "src/_components/*.webc" });

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    })

    eleventyConfig.addFilter("machineDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
    })
}