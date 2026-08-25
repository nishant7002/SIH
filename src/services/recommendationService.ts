import { Product, RecommendationPreferences } from '../types';
import { MOCK_PRODUCTS } from '../data/mockData';

/**
 * Service boundary for Buyer AI Personalization Recommendations.
 * Currently uses deterministic filtering and similarity scoring.
 * Ready for future Python ML model integration (e.g. Cosine Similarity / Collaborative Filtering API).
 */
export async function getBuyerRecommendations(
  prefs?: RecommendationPreferences
): Promise<{ recommendations: Product[]; reason: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  let filtered = [...MOCK_PRODUCTS];
  let reason = 'Curated based on trending demand and authentic GI craft verification.';

  if (prefs?.productId) {
    const sourceProd = MOCK_PRODUCTS.find((p) => p.id === prefs.productId);
    if (sourceProd) {
      filtered = MOCK_PRODUCTS.filter(
        (p) => p.id !== sourceProd.id && (p.craft === sourceProd.craft || p.category === sourceProd.category)
      );
      reason = `Recommended because you explored "${sourceProd.name}" (${sourceProd.craft}).`;
    }
  } else if (prefs?.crafts && prefs.crafts.length > 0) {
    filtered = MOCK_PRODUCTS.filter((p) => prefs.crafts?.includes(p.craft));
    reason = `Recommended based on your preference for ${prefs.crafts.join(', ')}.`;
  } else if (prefs?.maxPrice) {
    filtered = MOCK_PRODUCTS.filter((p) => p.price <= prefs.maxPrice!);
    reason = `Recommended handcrafted products under ₹${prefs.maxPrice.toLocaleString('en-IN')}.`;
  }

  // Fallback if results are fewer than 4
  if (filtered.length < 4) {
    const ids = new Set(filtered.map((p) => p.id));
    const extras = MOCK_PRODUCTS.filter((p) => !ids.has(p.id));
    filtered = [...filtered, ...extras];
  }

  return {
    recommendations: filtered.slice(0, 6),
    reason
  };
}
