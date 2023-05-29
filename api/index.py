from fastapi import FastAPI

app = FastAPI()

@app.get("/api/meme")
def meme():
    """"""
    return "Hello World"