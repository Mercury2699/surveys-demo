import csv, time
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

class Input(BaseModel):
    name: str
    email: str
    scm: str
    people: str

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

filename = "records"+str(int(time.time()))+".csv"
csvfile = open(filename, 'w')
entrywriter = csv.writer(csvfile, delimiter=' ',
                            quotechar='|', quoting=csv.QUOTE_MINIMAL)
entrywriter.writerow(["Name", "Email", "SCM", "People"])

@app.post("/survey")
def process_survey(input: Input):
    print(input)
    entrywriter.writerow([input.name, input.email, input.scm, input.people])
    csvfile.flush()
    return {"status": "successfully received"}

