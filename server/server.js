import express from 'express'; // Keep express as it's fundamental
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Server is alive!');
});

app.listen(PORT, () => {
    console.log(`Minimal server running on port ${PORT}`);
});