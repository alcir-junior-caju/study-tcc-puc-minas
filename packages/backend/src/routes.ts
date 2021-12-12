import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => res.json({ message: 'New Post' }));

export default routes;
