import gulp from "gulp";
import newer from "gulp-newer";
import webp from "gulp-webp";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

import { deleteAsync as del } from "del";
import { resolve } from "path";
const { src, dest, watch, task, series } = gulp;

const input = {
  images: resolve("assets/images"),
  svg: resolve("assets/svg"),
  fonts: resolve("assets/fonts"),
};
const output = {
  images: resolve("src/assets/images"),
  svg: resolve("src/assets/svg"),
  fonts: resolve("src/assets/fonts"),
};

function images() {
  return src(resolve(input.images, "**/*"))
    .pipe(newer(output.images))
    .pipe(webp())
    .pipe(dest(output.images));
}

function svg() {
  return src(resolve(input.svg, "**/*")).pipe(dest(output.svg));
}

function fonts() {
  return src(resolve(input.fonts, "**/*.ttf"))
    .pipe(fonter({ formats: ["woff"] }))
    .pipe(dest(output.fonts))
    .pipe(src(resolve(input.fonts, "**/*.ttf")))
    .pipe(ttf2woff2())
    .pipe(dest(output.fonts));
}

function watcher() {
  watch(input.fonts, fonts);
  watch(input.images, images);
  watch(input.svg, svg);
}

function cleanDist() {
  return del(resolve("dist"));
}

function cleanAssets() {
  return del(resolve("src/assets/*"));
}

task("default", series(fonts, images, svg, watcher));
task("build", series(fonts, images, svg));
task("clean", series(cleanDist, cleanAssets));
