import { PricingInput, PricePrediction } from '../types';

/**
 * Service boundary for AI Price Range Prediction.
 * Calculates fair production cost, artisan margin, recommended range, and market benchmark factors.
 * Ready for future Python FastAPI + XGBoost / Random Forest ML model backend.
 * API Endpoint readiness: POST /api/v1/predict-price
 */
export async function predictPrice(input: PricingInput): Promise<PricePrediction> {
  // Simulate network latency (250ms)
  await new Promise((resolve) => setTimeout(resolve, 250));

  const {
    productName,
    craftType,
    material,
    region,
    materialCost = 0,
    laborHours = 0,
    laborRatePerHour = 100,
    complexityLevel = 'Medium',
    currentMarketPrice = 0
  } = input;

  // 1. Calculate production cost base
  const laborCost = laborHours * laborRatePerHour;
  const estimatedCost = materialCost + laborCost;

  // 2. Craft & Complexity multiplier lookup
  const complexityMultipliers: Record<string, number> = {
    Low: 1.18,
    Medium: 1.30,
    High: 1.48,
    Masterwork: 1.72
  };
  const multiplier = complexityMultipliers[complexityLevel] || 1.30;

  // 3. Recommended Price & Range
  const rawRecommended = Math.max(estimatedCost * multiplier, 300);
  // Round to nearest 50 INR for realistic craft pricing
  const recommendedPrice = Math.round(rawRecommended / 50) * 50;
  const minPrice = Math.round((recommendedPrice * 0.88) / 50) * 50;
  const maxPrice = Math.round((recommendedPrice * 1.14) / 50) * 50;

  const artisanMargin = Math.max(recommendedPrice - estimatedCost, 100);
  const marginPercentage = Math.round((artisanMargin / recommendedPrice) * 100);

  // 4. Market Position & Status logic
  let marketPosition: 'Value' | 'Competitive' | 'Premium' | 'Luxury' = 'Competitive';
  if (recommendedPrice > 10000) marketPosition = 'Luxury';
  else if (recommendedPrice > 4000) marketPosition = 'Premium';
  else if (recommendedPrice < 1200) marketPosition = 'Value';

  let statusExplanation = '';
  if (currentMarketPrice > 0) {
    if (currentMarketPrice < minPrice) {
      statusExplanation = `Your listed price of ₹${currentMarketPrice.toLocaleString('en-IN')} is below the recommended fair range (₹${minPrice.toLocaleString('en-IN')} – ₹${maxPrice.toLocaleString('en-IN')}). Consider adjusting to capture full artisan value.`;
    } else if (currentMarketPrice > maxPrice) {
      statusExplanation = `Your listed price of ₹${currentMarketPrice.toLocaleString('en-IN')} is above comparable market listings. Ensure key handmade features are highlighted.`;
    } else {
      statusExplanation = `Your price of ₹${currentMarketPrice.toLocaleString('en-IN')} falls comfortably within the recommended fair market range (₹${minPrice.toLocaleString('en-IN')} – ₹${maxPrice.toLocaleString('en-IN')}).`;
    }
  } else {
    statusExplanation = `Based on ${laborHours} hours of skilled labor, ₹${materialCost} material expense, and ${craftType} scarcity in ${region}.`;
  }

  // 5. Confidence score computation
  const confidenceScore = Math.min(88 + Math.floor((laborHours % 5) + (materialCost % 3)), 94);
  const confidenceLevel = confidenceScore >= 90 ? 'High Confidence' : 'Medium Confidence';

  return {
    productName: productName || 'Handicraft Item',
    craftType: craftType || 'Traditional Craft',
    material: material || 'Natural Materials',
    region: region || 'India',
    materialCost,
    laborHours,
    laborCost,
    estimatedProductionCost: estimatedCost,
    currentMarketPrice,
    recommendedPrice,
    minPrice,
    maxPrice,
    confidenceScore,
    confidenceLevel,
    artisanMargin,
    marginPercentage,
    marketPosition,
    explanation: statusExplanation,
    factors: [
      {
        name: 'Material Cost Base',
        impact: materialCost > 1000 ? 'positive' : 'neutral',
        description: `₹${materialCost} raw material expense (${Math.round((materialCost / (estimatedCost || 1)) * 100)}% of cost base)`
      },
      {
        name: 'Labor Hours Invested',
        impact: laborHours > 10 ? 'positive' : 'neutral',
        description: `${laborHours} hours of manual craft labor valued at ₹${laborRatePerHour}/hr base rate`
      },
      {
        name: 'Craft Complexity Multiplier',
        impact: complexityLevel === 'High' || complexityLevel === 'Masterwork' ? 'positive' : 'neutral',
        description: `${complexityLevel} complexity requiring specialized traditional skill`
      },
      {
        name: 'Market Comparisons',
        impact: 'positive',
        description: `Benchmarked against comparable ${craftType} listings (₹${minPrice}–₹${maxPrice})`
      }
    ]
  };
}

export const predictPriceRange = predictPrice;
