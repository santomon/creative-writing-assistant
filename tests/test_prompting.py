import openai


def test_find_contradiction():
    # Note: you need to be using OpenAI Python v0.27.0 for the code below to work

    openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Who won the world series in 2020?"},
            {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
            {"role": "user", "content": "Where was it played?"}
        ]
    )
    pass

def test_find_contradiction_with_ada():
    result = openai.Completion.create(
        model="ada",
        prompt="give me a meme"

    )
    pass