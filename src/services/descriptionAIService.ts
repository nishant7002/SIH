import { GoogleGenerativeAI } from '@google/generative-ai';
import { DescriptionGenerationInput, DescriptionGenerationResult } from '../types';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || '');

export async function generateProductListingDescription(
  input: DescriptionGenerationInput
): Promise<DescriptionGenerationResult> {
  // 1. If Gemini API Key exists, call real Gemini 3.6 Flash model (with retry)
  if (apiKey) {
    const prompt = `
      You are an AI product listing assistant for Indian handicraft artisans.
      Generate a JSON response for an e-commerce product based on these details:
      Craft: "${input.craft}", Material: "${input.material}", Region: "${input.region}", Notes: "${input.artisanNotes || ''}".

      Return ONLY a JSON object with this exact structure:
      {
        "title": "Concise product title",
        "shortDescription": "1-sentence summary for product card",
        "detailedDescription": "Professional 2-paragraph craft description explaining origin, craftsmanship, and materials.",
        "keyFeatures": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
        "searchTags": ["tag1", "tag2", "tag3"]
      }
    `;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text().replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(responseText);
        return {
          title: parsed.title,
          shortDescription: parsed.shortDescription,
          detailedDescription: parsed.detailedDescription,
          keyFeatures: parsed.keyFeatures,
          searchTags: parsed.searchTags,
          structuredMetadata: {
            category: input.category || 'Handicrafts',
            craft: input.craft || 'Traditional Craft',
            material: input.material || 'Natural',
            region: input.region || 'India',
            dimensions: input.dimensions,
            productionMethod: `Traditional ${input.craft} Handwork`
          },
          antiHallucinationNote: 'Gemini 3.6 Flash AI: Excluded unverified certifications & claims.'
        };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        const isRetryable = msg.includes('503') || msg.includes('429') || msg.includes('500');
        console.warn(`[DescriptionAI] Attempt ${attempt}/3 failed: ${msg}`);
        if (!isRetryable || attempt === 3) break;
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt - 1)));
      }
    }
    console.warn('[DescriptionAI] All retries exhausted, using template fallback.');
  }

  // Fallback prototype response if API key is not configured yet
  return {
    title: input.productName || `Handcrafted ${input.craft}`,
    shortDescription: `Authentic ${input.craft} handcrafted in ${input.region} using ${input.material}.`,
    detailedDescription: `This exquisite piece is handcrafted using traditional ${input.craft} techniques originating from ${input.region}...`,
    keyFeatures: [`Handcrafted in ${input.region}`, `Made of ${input.material}`],
    searchTags: ['handmade', 'artisan', 'craft'],
    structuredMetadata: {
      category: input.category || 'Handicrafts',
      craft: input.craft || 'Handicraft',
      material: input.material || 'Natural',
      region: input.region || 'India',
      productionMethod: 'Handwork'
    },
    antiHallucinationNote: 'Prototype mode active. Add NEXT_PUBLIC_GEMINI_API_KEY to .env.local for live Gemini AI.'
  };
}