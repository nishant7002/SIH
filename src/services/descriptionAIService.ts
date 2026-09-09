import { DescriptionGenerationInput, DescriptionGenerationResult } from '../types';

/**
 * AI Product Description Generator Service.
 * Transforms artisan inputs, regional language descriptions, and AI vision metadata into professional e-commerce product listings.
 * 
 * CRITICAL ANTI-HALLUCINATION ENFORCEMENT:
 * - Does NOT invent unverified GI tags, awards, or cultural claims unless explicitly supplied or verified in input.
 * 
 * Ready for future Google Gemini 1.5 Multimodal / LLM API integration.
 * API Endpoint readiness: POST /api/v1/ai/generate-description
 */
export async function generateProductListingDescription(
  input: DescriptionGenerationInput
): Promise<DescriptionGenerationResult> {
  // Simulate LLM text generation delay (500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));

  const {
    productName,
    category = 'Handicrafts',
    subcategory = 'Textiles & Craft',
    craft = 'Traditional Indian Craft',
    material = 'Natural Artisan Materials',
    region = 'India',
    artisanNotes = '',
    regionalVoiceInput = '',
    dimensions = '18 x 18 inches'
  } = input;

  // Process regional voice/text input if provided
  const combinedContext = [artisanNotes, regionalVoiceInput].filter(Boolean).join(' ');

  // 1. Build concise marketplace title
  const generatedTitle = productName && productName.trim().length > 3
    ? productName
    : `Handcrafted ${craft} ${category.split('&')[0].trim()}`;

  // 2. Short description suitable for marketplace product cards
  const shortDescription = `Authentic ${craft} handcrafted in ${region} using ${material}. ${
    combinedContext ? `Artisan details: "${combinedContext.slice(0, 100)}..."` : 'Crafted with traditional handwork techniques.'
  }`;

  // 3. Detailed e-commerce description
  const detailedDescription = `This exquisite ${generatedTitle.toLowerCase()} is handcrafted using traditional ${craft} techniques originating from ${region}. Built with ${material}, each piece represents painstaking manual skill and cultural craftsmanship.

What makes this piece special:
${combinedContext ? `• Artisan Insights: ${combinedContext}\n` : ''}• Handcrafted Construction: Carefully assembled and finished by hand, ensuring unique character in every item.
• Premium Quality: Made with ${material} selected for strength and aesthetic elegance.
• Versatile Appeal: Perfect as a centerpiece for ${category.toLowerCase()} or as a thoughtful gift for lovers of authentic Indian handicrafts.

Product Dimensions & Specifications:
• Category: ${category} (${subcategory})
• Material Base: ${material}
• Craft Region: ${region}
• Dimensions: ${dimensions}`;

  // 4. Generate 4 key feature bullet points
  const keyFeatures = [
    `Handcrafted using authentic ${craft} methods in ${region}`,
    `Constructed from high-grade ${material}`,
    `Dimensions: ${dimensions} — ideal for ${category.toLowerCase()}`,
    `Handmade artisan finish with natural textural variations`
  ];

  // 5. Relevant search tags
  const searchTags = Array.from(
    new Set([
      ...generatedTitle.toLowerCase().split(' ').filter((w) => w.length > 3),
      craft.toLowerCase(),
      material.toLowerCase(),
      category.toLowerCase(),
      region.toLowerCase().split(',')[0],
      'handmade',
      'artisan',
      'craft'
    ])
  ).slice(0, 7);

  // 6. Anti-hallucination note
  const antiHallucinationNote =
    'AI Rule Enforced: Unverified GI tags, certifications, and awards were excluded as they were not explicitly provided.';

  return {
    title: generatedTitle,
    shortDescription,
    detailedDescription,
    keyFeatures,
    searchTags,
    structuredMetadata: {
      category,
      craft,
      material,
      region,
      dimensions,
      productionMethod: `Traditional ${craft} Handwork`
    },
    antiHallucinationNote
  };
}
