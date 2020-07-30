const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(cors());

app.use(express.urlencoded());

app.get('/api/jobs', async (req, res) => {
  console.log(req.query);
  const { page, description, location, full_time } = req.query;
  const response = await axios.get('https://jobs.github.com/positions.json', {
    params: { markdown: true, page, description, location, full_time },
  });
  res.json(response.data);
});

app.listen(5000, () => {
  console.log('App listening on port 5000');
});
