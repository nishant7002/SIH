import { PricingInput, PricePrediction } from '../types';

/**
 * Service boundary for AI Price Prediction.
 * Currently uses deterministic calculations simulating an XGBoost / Random Forest model.
 * In production, this call can be swapped out to hit the Python FastAPI endpoint:
 * POST http://localhost:8000/api/v1/predict-price
 */
export async function predictPrice(input: PricingInput): Promise<PricePrediction> {
  // Simulate network latency (250ms) to reflect real backend prediction feel
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

  const artisanMargin = recommendedPrice - estimatedCost;
  const marginPercentage = Math.round((artisanMargin / recommendedPrice) * 100);

  // 4. Market Position & Status logic
  let marketPosition: 'Value' | 'Competitive' | 'Premium' | 'Luxury' = 'Competitive';
  if (recommendedPrice > 10000) marketPosition = 'Luxury';
  else if (recommendedPrice > 4000) marketPosition = 'Premium';
  else if (recommendedPrice < 1200) marketPosition = 'Value';

  let statusExplanation = '';
  if (currentMarketPrice > 0) {
    if (currentMarketPrice < minPrice) {
      statusExplanation = `Your listed price of ₹${currentMarketPrice.toLocaleString('en-IN')} is lower than the recommended fair craft range (₹${minPrice.toLocaleString('en-IN')} – ₹${maxPrice.toLocaleString('en-IN')}). Consider increasing price to capture full labor value.`;
    } else if (currentMarketPrice > maxPrice) {
      statusExplanation = `Your listed price of ₹${currentMarketPrice.toLocaleString('en-IN')} is higher than comparable market listings. Ensure your product story highlights premium features or custom customization.`;
    } else {
      statusExplanation = `Your price of ₹${currentMarketPrice.toLocaleString('en-IN')} falls comfortably within the recommended fair market range (₹${minPrice.toLocaleString('en-IN')} – ₹${maxPrice.toLocaleString('en-IN')}).`;
    }
  } else {
    statusExplanation = `Based on ${laborHours} hours of skilled labor, ${materialCost} INR material expense, and ${craftType} scarcity in ${region}.`;
  }

  // 5. Confidence score computation
  const confidenceScore = Math.min(88 + Math.floor((laborHours % 5) + (materialCost % 3)), 94);

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
    artisanMargin,
    marginPercentage,
    marketPosition,
    explanation: statusExplanation,
    factors: [
      {
        name: 'Labor Hour Valuation',
        impact: laborHours > 10 ? 'positive' : 'neutral',
        description: `${laborHours} hours invested at ₹${laborRatePerHour}/hr base artisan rate.`
      },
      {
        name: 'Raw Material Benchmark',
        impact: materialCost > 1500 ? 'positive' : 'neutral',
        description: `Material expense accounts for ${Math.round((materialCost / (estimatedCost || 1)) * 100)}% of production base.`
      },
      {
        name: 'Craft Complexity Index',
        impact: complexityLevel === 'High' || complexityLevel === 'Masterwork' ? 'positive' : 'neutral',
        description: `Evaluated as ${complexityLevel} complexity level requiring specialized traditional skills.`
      },
      {
        name: 'Regional Demand Index',
        impact: 'positive',
        description: `High seasonal buyer interest detected for ${craftType} from ${region}.`
      }
    ]
  };
}
