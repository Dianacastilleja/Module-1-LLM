from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
import uvicorn

app = FastAPI()
pipe = pipeline("text-generation", model="Qwen/Qwen2.5-0.5B-Instruct")

class GenRequest(BaseModel):
    text: str
    max_new_tokens: int = 150
    do_sample: bool = False  # set True if you want to use temperature/top_p, etc.

@app.post("/generate")
def generate(req: GenRequest):
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
