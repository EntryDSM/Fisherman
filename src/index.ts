import "dotenv";
import Express from "express";
import bodyparser from "body-parser";
import sh from "shelljs";

interface IGithubEvent {
  repository: IGithubRepository;
}

interface IGithubRepository {
  name: string;
}

const DOCS_LIST = {
  Hermes: 4570,
  "Louis-Vuitton": 4571,
  Rolex: 4572,
  "Yves-Saint-Laurent": 4573,
  Chanel: 4567,
  Gucci: 4574,
  Cledor: 4568
};

const app = Express();

app.use(bodyparser.json());

app.post("/postreceive", (req, res) => {
  const event: IGithubEvent = req.body;
  const { name } = event.repository;

  if (name in DOCS_LIST) {
    console.info("[INFO] Repository " + name + " is updating...");
    sh.cd(`/home/entrydsm/docs/doc-source/${name}`);
    sh.exec("git pull");
    sh.cd("/home/entrydsm/docs/");
    sh.cp("-r", `./doc-source/${name}/docs/source`, `./${name}/source`);
    res.send("Good Request").status(200);
  } else {
    res.send("Bad Request").status(400);
  }
});

app.disable("x-powered-by");

app.listen(48080);
