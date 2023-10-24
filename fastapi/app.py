from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import openai
import tiktoken
from dotenv import find_dotenv, load_dotenv
from os import environ as env
import json

# Loading env variables
ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

openai.api_key = env.get("OPENAI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        # AND your production domain
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.post("/gen-setup")
async def gen_setup(request: Request):

    SYSTEM_MESSAGE = '''You are an assistant helps build a scene from a film. Your job is to pick out the ideal aspects of the scene based on a specific request of the user. You will return a JSON object with each of the parameters of your choice. Return only the JSON object with no additional comments. The first parameter is the scene subject action, and here are the prompts: walk, kick, dance, crouch. The second parameter is the environment, and here are the options: neon_bedroom, empty_old_garage, castle_dungeon, scifi_tron, backrooms_long_hall. The third parameter is the lighting color, and you will return a color in hexadecimal format that will go to the main light in the scene. The fourth parameter is the music beat, and the options are: romantic, kung_fu, hiphop, dungeon, lobby. Example: user: give me a dramatic scene. you:"{"action": "walk", "empty_old_garage", "lighting": "#ff0000", "music": "dramatic"}"'''

    try:
        data = await request.json()
        sentence = data.get("sentence")

        if not sentence:
            raise HTTPException(status_code=400, detail="Input string is required")

        # Making request to OpenAI GPT-4 API for chat completion
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": SYSTEM_MESSAGE},
                {"role": "user", "content": sentence},
            ],
        )
        setup = response["choices"][0]["message"]["content"]

        # print(f"Generated shader: {shader}")

        setup = json.loads(setup, strict=False)
        print(f'setup to json: {setup}')

        return JSONResponse(content=setup)

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))