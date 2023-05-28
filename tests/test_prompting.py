import openai
import pytest


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
    text = f"""
    
    
    """
    instruction = f"""
    the goal is to find contradictions in the following text
    
    
    """

    result = openai.Completion.create(
        model="ada",
        prompt="give me a meme"

    )
    pass


def test_infer_rules_with_ada():

    instruction = f"""
    
    """

    result = openai.Completion.create(
        model="ada",
        prompt=""

    )


def test_put_things_into_a_timeline_():
    pass


def test_put_things_into_a_local_space():
    pass


def test_infer_world_rules():
    text = f"""
    n the golden days of yore, when the Republic stood tall like a mighty oak, its branches reaching far and wide, few could fathom the imminent fall that would shatter its grandeur. It was an age where the whispers of corruption danced on the winds, and the tendrils of power coiled around the hearts of those entrusted with safeguarding the ideals of democracy.

From the heights of the Senate chambers to the humblest corners of the commonfolk, discontent brewed like a storm gathering strength. Beneath the surface, the seeds of division took root, watered by greed and nurtured by ambition. The noblest intentions crumbled beneath the weight of self-interest, as the Republic's foundation cracked.

A chorus of dissent echoed through marble halls, their pleas for unity drowned by the cacophony of personal gain. As the people grew disillusioned, their faith eroded like sand slipping through desperate fingers. A once proud nation became a battlefield, where words became weapons and allies turned to enemies.

Yet, amidst the chaos, a flicker of hope remained. For in the ashes of the fallen Republic, seeds of change were sown. From every corner of the land, a chorus of voices rose, proclaiming a collective yearning for renewal. The fall of the Republic became the catalyst for a rebirth, a chance to rebuild and redefine what it meant to be a united people.

As the sun set on the remnants of a shattered dream, a new dawn awaited, pregnant with possibility. The fall of the Republic would forever be etched in history, a cautionary tale of the fragility of power and the unwavering resilience of the human spirit.
    
    """

    prompt = f"""
    
    
    
    
    Text:
    
    {text}
    """
    openai.Completion.create(
        model="gpt-3.5-turbo"
    )


def test_infer_events():
    text = f"""
    The discovery of a hidden underground bunker in Fardi reveals ancient war machinery covered in lush vegetation, indicating a rich history of conflict and technological advancements.
A group of archaeologists uncovers a series of ancient battle maps within the overgrown ruins of Fardi, leading to the speculation of a lost civilization that once thrived in the area.
The annual Fardi Beach Festival celebrates the region's unique blend of picturesque beaches and ancient war machinery, with locals and tourists enjoying live music, art exhibitions, and reenactments of historic battles.
A team of scientists accidentally activates an ancient defense mechanism hidden within the war machinery, causing a temporary disruption of modern technology in Fardi and leading to an investigation into the origins and purpose of these ancient devices.
Local legends come to life as a mysterious group of warriors, believed to be the spirits of ancient soldiers, emerge from the overgrown ruins of Fardi to protect the area from a modern-day threat, showcasing their combat skills and utilizing the ancient war machinery.
A group of adventurers embarks on a perilous journey through the dense forests of Fardi, encountering forgotten temples, hidden treasures, and encounters with mythical creatures linked to the ancient war machinery.
Fardi becomes a popular destination for historians and researchers studying ancient warfare, attracting international conferences and symposiums focused on unraveling the mysteries surrounding the unique integration of war machinery within the natural landscape.
A famous filmmaker chooses Fardi as the backdrop for a blockbuster movie, highlighting the scenic beauty of the beaches juxtaposed with epic battle sequences using restored ancient war machinery, reigniting public interest in the area's history.
The local government of Fardi initiates a preservation and restoration project to maintain the delicate balance between the overgrown ruins and the natural environment, establishing strict regulations for exploration and limiting access to sensitive areas.
A group of teenagers accidentally stumble upon an ancient artifact hidden in the sand dunes of Fardi, triggering a chain of events that uncovers a long-forgotten prophecy tied to the war machinery, and the youngsters must navigate the past and present to prevent an impending catastrophe.
    """

    prompt = f"""
    
Prompt:

Please extract the events from my creative text about the world and the story i am currently working on as a list

the output should look like so (JSON Object model)

Output format:
[
  {{
    "id": "string",
    "name": "string",
    "description": "string",
    "begin": float,
    "end": float,
    "timeframe": "string"
    "significance": int  // value between 1 and 100
  }}
]

Example JSON output:
json
[
  {{
    "id": "event_1",
    "name": "The Great War",
    "description": "A devastating war breaks out between two powerful nations, resulting in widespread destruction and loss of life.",
    "begin": 14353,
    "end": 14355,
    "timeframe": "20th century",
    "significance": 90
  }},
  {{
    "id": "event_2",
    "name": "Discovery of a New Continent",
    "description": "Explorers stumble upon an uncharted continent, rich in resources and inhabited by unknown civilizations.",
    "begin": 1587,
    "end": 1590,
    "timeframe": "16th century",
    "significance": 100,
  }}
]

further explanations:
- the time_begin and time_end are arbitrary integer; the only rule here is that if a number is lower than the other, that
means it happened before.

- for the significance, rate the impact of the event with respect to the world. events like large scale wars are considered
significant, characters travelling might be considered less significant.

- the event_id can be left undefined

the text is given in the following inside "```"

    ```{text}```
    
    """

    result = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user",
             "content": prompt}
        ]
    )
    pass
