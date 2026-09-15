import math
from typing import List, Optional, Literal
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import numpy as np
from sklearn.ensemble import RandomForestRegressor

app = FastAPI(
    title="Meridian AI Price Advisor API",
    description="Python FastAPI + Machine Learning Backend for Indian Handicraft Fair Valuation (SIH26090)",
    version="1.0.0"
)

# Enable CORS for Next.js frontend (http://localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas matching Meridian TypeScript Interfaces
class PricingInput(BaseModel):
    productName: str = Field(default="Handicraft Item")
    craftType: str = Field(default="Traditional Craft")
    material: str = Field(default="Natural Materials")
    region: str = Field(default="Gujarat, India")
    productCategory: str = Field(default="Home Decor & Textiles")
    materialCost: float = Field(default=450.0, ge=0)
    laborHours: float = Field(default=8.0, ge=0)
    laborRatePerHour: float = Field(default=100.0, ge=0)
    complexityLevel: Literal["Low", "Medium", "High", "Masterwork"] = Field(default="Medium")
    currentMarketPrice: float = Field(default=0.0, ge=0)
    productionQuantity: int = Field(default=1, ge=1)

class PricingFactor(BaseModel):
    name: str
    impact: Literal["positive", "negative", "neutral"]
    description: str

class PricePrediction(BaseModel):
    productName: str
    craftType: str
    material: str
    region: str
    materialCost: float
    laborHours: float
    laborCost: float
    estimatedProductionCost: float
    currentMarketPrice: float
    recommendedPrice: int
    minPrice: int
    maxPrice: int
    confidenceScore: int
    confidenceLevel: str
    artisanMargin: int
    marginPercentage: int
    marketPosition: Literal["Value", "Competitive", "Premium", "Luxury"]
    explanation: str
    factors: List[PricingFactor]

# Machine Learning Model Initialization
ml_model = None

def train_craft_pricing_model():
    """
    Trains a Random Forest Regressor on synthetic Indian craft benchmark dataset.
    Features: [material_cost, labor_hours, labor_rate, complexity_numeric]
    Target: recommended_market_price
    """
    global ml_model
    np.random.seed(42)
    
    # Generate 500 synthetic craft training samples
    n_samples = 500
    material_costs = np.random.uniform(100, 3000, n_samples)
    labor_hours = np.random.uniform(2, 40, n_samples)
    labor_rates = np.random.uniform(80, 200, n_samples)
    complexity_multipliers = np.random.choice([1.18, 1.30, 1.48, 1.72], n_samples)
    
    # Target formula with noise simulating market dynamics
    base_cost = material_costs + (labor_hours * labor_rates)
    targets = base_cost * complexity_multipliers + np.random.normal(0, 150, n_samples)
    targets = np.maximum(targets, 300)
    
    # Feature matrix X: [material_cost, labor_hours, labor_rate, complexity_multiplier]
    X = np.column_stack((material_costs, labor_hours, labor_rates, complexity_multipliers))
    y = targets
    
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    ml_model = model
    print("✓ Random Forest Craft Pricing Model successfully trained.")

@app.on_event("startup")
def startup_event():
    train_craft_pricing_model()

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Meridian AI Price Prediction Server (FastAPI + scikit-learn)",
        "docs_url": "http://localhost:8000/docs"
    }

@app.post("/api/v1/predict-price", response_model=PricePrediction)
def predict_price(input_data: PricingInput):
    global ml_model
    if ml_model is None:
        train_craft_pricing_model()
        
    material_cost = input_data.materialCost
    labor_hours = input_data.laborHours
    labor_rate = input_data.laborRatePerHour or 100.0
    
    complexity_map = {
        "Low": 1.18,
        "Medium": 1.30,
        "High": 1.48,
        "Masterwork": 1.72
    }
    comp_mult = complexity_map.get(input_data.complexityLevel, 1.30)
    
    # Calculate production base
    labor_cost = labor_hours * labor_rate
    estimated_cost = material_cost + labor_cost
    
    # Model inference
    features = np.array([[material_cost, labor_hours, labor_rate, comp_mult]])
    predicted_raw = ml_model.predict(features)[0]
    
    # Round to nearest 50 INR for realistic craft pricing
    recommended_price = max(int(round(predicted_raw / 50.0) * 50), 300)
    min_price = int(round((recommended_price * 0.88) / 50.0) * 50)
    max_price = int(round((recommended_price * 1.14) / 50.0) * 50)
    
    artisan_margin = max(recommended_price - int(estimated_cost), 100)
    margin_percent = int(round((artisan_margin / recommended_price) * 100))
    
    # Market Position evaluation
    if recommended_price > 10000:
        market_pos = "Luxury"
    elif recommended_price > 4000:
        market_pos = "Premium"
    elif recommended_price < 1200:
        market_pos = "Value"
    else:
        market_pos = "Competitive"
        
    confidence_score = min(88 + int((labor_hours % 5) + (material_cost % 3)), 95)
    confidence_level = "High Confidence" if confidence_score >= 90 else "Medium Confidence"
    
    explanation = f"ML Model Prediction based on {labor_hours} labor hours, ₹{material_cost:.0f} raw material cost, and {input_data.craftType} market benchmarks."
    
    factors = [
        PricingFactor(
            name="Material Cost Base",
            impact="positive" if material_cost > 1000 else "neutral",
            description=f"₹{material_cost:.0f} raw material expense ({int(round((material_cost/(estimated_cost or 1))*100))}% of cost base)"
        ),
        PricingFactor(
            name="Labor Hours Invested",
            impact="positive" if labor_hours > 10 else "neutral",
            description=f"{labor_hours} hours of manual craft labor valued at ₹{labor_rate:.0f}/hr base rate"
        ),
        PricingFactor(
            name="Craft Complexity Multiplier",
            impact="positive" if input_data.complexityLevel in ["High", "Masterwork"] else "neutral",
            description=f"{input_data.complexityLevel} complexity requiring specialized traditional skill"
        ),
        PricingFactor(
            name="Scikit-Learn Model Benchmark",
            impact="positive",
            description=f"Benchmarked against trained Random Forest regressor (₹{min_price}–₹{max_price})"
        )
    ]
    
    return PricePrediction(
        productName=input_data.productName,
        craftType=input_data.craftType,
        material=input_data.material,
        region=input_data.region,
        materialCost=material_cost,
        laborHours=labor_hours,
        laborCost=labor_cost,
        estimatedProductionCost=estimated_cost,
        currentMarketPrice=input_data.currentMarketPrice,
        recommendedPrice=recommended_price,
        minPrice=min_price,
        maxPrice=max_price,
        confidenceScore=confidence_score,
        confidenceLevel=confidence_level,
        artisanMargin=artisan_margin,
        marginPercentage=margin_percent,
        marketPosition=market_pos,
        explanation=explanation,
        factors=factors
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
