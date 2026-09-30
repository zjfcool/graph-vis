const GraphVisBubblingEventNames = [
  "click",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "mouseupoutside",
  "pointercancel",
  "pointerdown",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointertap",
  "pointerup",
  "pointerupoutside",
  "rightclick",
  "rightdown",
  "rightup",
  "rightupoutside",
  "tap",
  "touchcancel",
  "touchend",
  "touchendoutside",
  "touchmove",
  "touchstart",
  "wheel",
] as const;
const GraphVisNonBubblingEventNames = [
  "mouseenter",
  "mouseleave",
  "pointerenter",
  "pointerleave",
] as const;

const GraphVisEventNames = [
  ...GraphVisBubblingEventNames,
  ...GraphVisNonBubblingEventNames,
] as const;

export { GraphVisEventNames, GraphVisNonBubblingEventNames, GraphVisBubblingEventNames };
