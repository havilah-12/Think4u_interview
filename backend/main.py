from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from test_api import router as test_router
from llm import router as llm_router

app = FastAPI()

# Enable CORS for frontend or API testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(test_router)
app.include_router(llm_router)

@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}
