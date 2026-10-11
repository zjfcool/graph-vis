# Introduction

GraphVis is a graph visualization library built on top of [PixiJS](https://pixijs.com/), focused on high-performance rendering and interaction for graph data. It supports smooth drawing of tens of thousands of nodes and edges, making it suitable for scenarios that need to present complex relationship networks, such as social network analysis, knowledge graphs, topological structures, flowcharts, and more.

## Core Features

- **High-performance rendering**: Built on PixiJS's WebGL rendering pipeline, it easily supports real-time interaction with tens of thousands of nodes and edges.
- **Multiple graph types**: Supports directed, undirected, and mixed graphs to meet different relationship representation needs.
- **Rich nodes and edges**: Includes built-in node types such as circle, ellipse, rectangle, polygon, star, text, and image, as well as edge types such as straight lines, curves, and automatic edges.
- **Flexible layouts**: Integrates layouts such as `d3-force` and `random`, and supports custom extensions.
- **Complete interaction events**: Provides event listeners for pointers, mouse, touch, and drag on nodes, edges, and the stage, making it easy to implement interactions such as selection, hover, and linking.
- **Themes and styles**: Supports dynamic theme switching and can automatically generate color schemes based on a primary color.
- **Extensible architecture**: Register custom nodes, edges, layouts, and themes via the `register` method to easily extend the library's capabilities.
