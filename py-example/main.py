import uvicorn
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer

class Prompt(BaseModel):
    model_name: str
    text: str

app = FastAPI()

def query_model(prompt: Prompt = Prompt(text = "Why is the sky blue?", model_name = "Qwen/Qwen2.5-0.5B-Instruct")):
    model = AutoModelForCausalLM.from_pretrained(
        prompt.model_name,
        torch_dtype="auto",
        device_map="auto"
    )

    tokenizer = AutoTokenizer.from_pretrained(prompt.model_name)

    messages = [
        {"role": "system", "content": "You are Qwen, created by Alibaba Cloud. You are a helpful assistant."},
        {"role": "user", "content": prompt.text}
    ]

    text = tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True
    )

    model_inputs = tokenizer([text], return_tensors="pt").to(model.device)

    generated_ids = model.generate(
        **model_inputs,
        max_new_tokens=512
    )

    generated_ids = [
        output_ids[len(input_ids):] for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)
    ]

    response = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]

    return response


@app.post("/")
async def prompt(prompt: Prompt):
    raw_response = query_model(prompt)
    return {"content": raw_response}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5555)