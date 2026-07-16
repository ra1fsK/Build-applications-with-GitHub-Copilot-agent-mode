import express, { type Express } from 'express';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models';

function createResourceRouter(resourceName: string, model: any) {
  const router = express.Router();

  router.get('/', async (_req, res) => {
    const items = await model.find({}).lean();
    res.json({ resource: resourceName, items, count: items.length });
  });

  router.post('/', async (req, res) => {
    const created = await model.create(req.body);
    res.status(201).json(created);
  });

  router.get('/:id', async (req, res) => {
    const item = await model.findById(req.params.id).lean();

    if (!item) {
      res.status(404).json({ error: `${resourceName} not found` });
      return;
    }

    res.json(item);
  });

  return router;
}

export function registerRoutes(app: Express, apiBaseUrl: string) {
  app.get('/api/config', (_req, res) => {
    res.json({
      apiBaseUrl,
      codespaceName: process.env.CODESPACE_NAME || null,
    });
  });

  app.use('/api/users', createResourceRouter('users', UserModel));
  app.use('/api/teams', createResourceRouter('teams', TeamModel));
  app.use('/api/activities', createResourceRouter('activities', ActivityModel));
  app.use('/api/leaderboard', createResourceRouter('leaderboard', LeaderboardModel));
  app.use('/api/workouts', createResourceRouter('workouts', WorkoutModel));
}
