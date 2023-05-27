const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());
app.post("/compile", async (req, res) => {
  console.log(req);
  console.log(req.body);
  const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions", {
    method: "POST",
    headers: {
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "x-rapidapi-key": "47dd06e763msh7a21f967ee85a7dp1831c1jsnff4b61e3b556", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      source_code: req.body.source_code,
      stdin: req.body.stdin,
      language_id: req.body.language,
    }),
  });

  const jsonResponse = await response.json();
  console.log(jsonResponse);
  let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

  const getSolution = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "x-rapidapi-key": "47dd06e763msh7a21f967ee85a7dp1831c1jsnff4b61e3b556", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
      "content-type": "application/json",
    },
  });

  jsonGetSolution = await getSolution.json();
  out = atob(jsonGetSolution.stdout);
  console.log(jsonGetSolution);
  console.log(out);
  res.send({ output: out });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
