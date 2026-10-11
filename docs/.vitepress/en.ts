import type { LocaleSpecificConfig, DefaultTheme } from "vitepress";
type LocaleConfig = LocaleSpecificConfig<DefaultTheme.Config> & {
  label: string;
  link?: string;
};
export const en: LocaleConfig = {
  label: "English",
  lang: "en-US",
  link: "/en/",
  description:
    "A PixiJS-based graph visualization library that supports rendering tens of thousands of nodes and edges",
  themeConfig: {
    outline: {
      label: "On this page",
      level: "deep",
    },
    docFooter: { prev: "Previous", next: "Next" },
    lastUpdated: {
      text: "Last updated at",
      formatOptions: { dateStyle: "short", timeStyle: "short" },
    },
    sidebarMenuLabel: "Menu",
    returnToTopLabel: "Return to top",
    darkModeSwitchTitle: "Switch to dark mode",
    lightModeSwitchTitle: "Switch to light mode",
    darkModeSwitchLabel: "Appearance",
    langMenuLabel: "Change language",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Guide", link: "/en/guide/introduction/", activeMatch: "^/en/guide/" },
      { text: "API", link: "/en/api/graph/", activeMatch: "^/en/api/" },
      { text: "Examples", link: "/en/demos/", activeMatch: "^/en/demos/" },
    ],

    sidebar: {
      "/en/api/": {
        base: "/en/api",
        items: [
          { text: "Graph Instance", link: "/graph/" },
          { text: "Node Instance", link: "/node/" },
          { text: "Edge Instance", link: "/edge/" },
          { text: "Layout Instance", link: "/layout/" },
          { text: "Global API", link: "/global/" },
        ],
      },
      "/en/guide/": {
        base: "/en/guide",
        items: [
          {
            text: "Getting Started",
            items: [
              { text: "Introduction", link: "/introduction/" },
              { text: "Quick Start", link: "/quick-start/" },
              { text: "Installation", link: "/installation/" },
            ],
          },
          {
            text: "Configuration",
            items: [
              { text: "Graph GraphVis", link: "/graph/" },
              { text: "Node Configuration", link: "/node/" },
              { text: "Edge Configuration", link: "/edge/" },
              { text: "Link Configuration", link: "/link/" },
              { text: "Layout Configuration", link: "/layout/" },
              { text: "Zoom Configuration", link: "/zoom/" },
              { text: "Drag Configuration", link: "/drag/" },
              { text: "Theme Configuration", link: "/theme/" },
            ],
          },
          {
            text: "Reference",
            items: [{ text: "Type Declarations", link: "/types/" }],
          },
        ],
      },
      "/en/demos/": {
        base: "/en/demos",
        items: [
          {
            text: "Basics",
            collapsed: true,
            items: [{ text: "Basic Example", link: "/" }],
          },
          {
            text: "Elements",
            collapsed: true,
            items: [
              {
                text: "Node",
                collapsed: true,
                items: [
                  { text: "Overview", link: "/element/node/" },
                  { text: "Circle", link: "/element/node/circle/" },
                  { text: "Rectangle", link: "/element/node/rect/" },
                  { text: "Ellipse", link: "/element/node/ellipse/" },
                  { text: "Image", link: "/element/node/image/" },
                  { text: "Polygon", link: "/element/node/polygon/" },
                  { text: "Star", link: "/element/node/star/" },
                  { text: "Text", link: "/element/node/text/" },
                  { text: "Bitmap Text", link: "/element/node/bitmap-text/" },
                  { text: "Custom Node", link: "/element/node/custom/" },
                ],
              },
              {
                text: "Edge",
                collapsed: true,
                items: [
                  { text: "Adaptive", link: "/element/edge/" },
                  { text: "Self-loop Edge", link: "/element/edge/selfloop/" },
                  { text: "Quadratic Bezier", link: "/element/edge/quadratic/" },
                  { text: "Cubic Bezier", link: "/element/edge/cubic/" },
                ],
              },
              {
                text: "Link",
                collapsed: true,
                items: [{ text: "Create Edge", link: "/element/link/" }],
              },
            ],
          },
          {
            text: "Theme",
            collapsed: true,
            items: [{ text: "Theme Switching", link: "/theme/" }],
          },
          {
            text: "Layout",
            collapsed: true,
            items: [
              { text: "Overview", link: "/layout/" },
              { text: "d3-force", link: "/layout/d3-force/" },
              { text: "random", link: "/layout/random/" },
            ],
          },
          {
            text: "Interactions",
            collapsed: true,
            items: [
              { text: "CRUD", link: "/interactions/" },
              { text: "Drag", link: "/interactions/drag/" },
              { text: "Zoom", link: "/interactions/zoom/" },
            ],
          },
          {
            text: "Performance",
            collapsed: true,
            items: [
              { text: "5000 Elements", link: "/performance/5000/" },
              { text: "20000 Elements", link: "/performance/20000/" },
              { text: "60000 Elements", link: "/performance/60000/" },
            ],
          },
        ],
      },
    },
  },
};
