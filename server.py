from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
import uvicorn

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Lazy-load pipelines to avoid blocking startup
_pipe = None

def get_pipeline():
    global _pipe
    if _pipe is None:
        # Using a smaller model for faster loading
        _pipe = pipeline("text-generation", model="gpt2")
    return _pipe

class GenRequest(BaseModel):
    text: str
    max_new_tokens: int = 150
    do_sample: bool = False  # set True if you want to use temperature/top_p, etc.

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/generate")
def generate(req: GenRequest):
    pipe = get_pipeline()
    out = pipe(
        req.text,
        max_new_tokens=req.max_new_tokens,
        do_sample=req.do_sample,
        truncation=True,
        return_full_text=False,
    )
    return {"generated_text": out[0]["generated_text"]}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
