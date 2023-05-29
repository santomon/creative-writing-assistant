from fastapi import FastAPI

app = FastAPI()

@app.get("/api/meme")
def meme():
    """"""
    return "Hello World"


@app.get("/api/")
def api_home():
    return "API Home"