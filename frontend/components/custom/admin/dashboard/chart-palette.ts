/**
 * Nature-inspired palette for the Production dashboard charts, aligned with the
 * Vanilla Product Management theme (earthy browns, leaf greens, ochre, clay).
 *
 * Colors are assigned by SEMANTIC ROLE and reused across every trend chart so
 * the same concept (e.g. "good", "lost", "total") always looks identical.
 */
export const chartPalette = {
  /** Healthy / good / remaining (harvestable) outcomes. */
  leafGreen: "#3a835d",
  /** Bad / lost outcomes. */
  terracotta: "#b0553c",
  /** Removed / secondary loss. */
  goldenOchre: "#c99a3f",
  /** Totals / emphasis (vanilla-pod brown, matches the theme primary). */
  vanillaBrown: "#6b4423",
  /** Extra / second-round series. */
  sageOlive: "#7a8452",
  /** Neutral bar fill (e.g. total flowers). */
  tan: "#a67c52",
} as const;
