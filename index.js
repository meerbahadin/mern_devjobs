const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const path = require('path');

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

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
