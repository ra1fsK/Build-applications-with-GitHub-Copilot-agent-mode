"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
function createResourceRouter(resourceName, model) {
    const router = express_1.default.Router();
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
function registerRoutes(app, apiBaseUrl) {
    app.get('/api/config', (_req, res) => {
        res.json({
            apiBaseUrl,
            codespaceName: process.env.CODESPACE_NAME || null,
        });
    });
    app.use('/api/users', createResourceRouter('users', models_1.UserModel));
    app.use('/api/teams', createResourceRouter('teams', models_1.TeamModel));
    app.use('/api/activities', createResourceRouter('activities', models_1.ActivityModel));
    app.use('/api/leaderboard', createResourceRouter('leaderboard', models_1.LeaderboardModel));
    app.use('/api/workouts', createResourceRouter('workouts', models_1.WorkoutModel));
}
