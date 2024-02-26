const express = require('express');
const { BardAPI } = require('bard-api-node');

const app = express();
const port = 3000; // Set the desired port number

app.use(express.json());

// Handling both GET and POST requests at /bard-query
app.all('/bard-query', async (req, res) => {
  try {
    const { query } = req.method === 'POST' ? req.body : req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const assistant = new BardAPI();

    // Set session information for authentication
     await assistant.setSession('__Secure-3PSID', 'g.a000gwiHOnk5U6X3bztO5FvVkCAkf7edI5LKBixDZW-jl_dlrLA0cNTfkH6aM2vuSy86GN1wkAACgYKAXsSAQASFQHGX2MiqamkaGLON273B9LWtVNVUBoVAUF8yKrdfDx-80igen8Vp4CeWmy80076'); // or '__Secure-3PSID'


    // Send a query to Bard
    const response = await assistant.getBardResponse(query);

    return res.json({ bardResponse: response.content });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
