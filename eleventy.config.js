import { RenderPlugin } from "@11ty/eleventy";

export default async function(eleventyConfig) {
    eleventyConfig.setInputDirectory("src");
    eleventyConfig.setLayoutsDirectory("_layouts");
    
    eleventyConfig.setTemplateFormats("liquid,md");

    eleventyConfig.addPassthroughCopy("src/robots.txt")
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addWatchTarget("src/js");

    eleventyConfig.addPlugin(RenderPlugin);
}