"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            models_1.UserModel.deleteMany({}),
            models_1.TeamModel.deleteMany({}),
            models_1.ActivityModel.deleteMany({}),
            models_1.LeaderboardModel.deleteMany({}),
            models_1.WorkoutModel.deleteMany({}),
        ]);
        const users = await models_1.UserModel.insertMany([
            {
                name: 'Ava Patel',
                email: 'ava.patel@example.com',
                role: 'captain',
                fitnessLevel: 'advanced',
            },
            {
                name: 'Liam Chen',
                email: 'liam.chen@example.com',
                role: 'member',
                fitnessLevel: 'intermediate',
            },
            {
                name: 'Mina Okafor',
                email: 'mina.okafor@example.com',
                role: 'member',
                fitnessLevel: 'beginner',
            },
        ]);
        await models_1.TeamModel.insertMany([
            {
                name: 'North Stars',
                sport: 'triathlon',
                members: 6,
                focus: 'endurance',
            },
            {
                name: 'Peak Crew',
                sport: 'crossfit',
                members: 5,
                focus: 'strength',
            },
        ]);
        await models_1.ActivityModel.insertMany([
            {
                userId: users[0]._id,
                type: 'run',
                durationMinutes: 35,
                intensity: 'moderate',
                date: new Date('2026-07-10T06:00:00.000Z'),
            },
            {
                userId: users[1]._id,
                type: 'cycling',
                durationMinutes: 50,
                intensity: 'high',
                date: new Date('2026-07-11T07:30:00.000Z'),
            },
        ]);
        await models_1.LeaderboardModel.insertMany([
            {
                userId: users[0]._id,
                name: 'Ava Patel',
                score: 980,
                streak: 6,
            },
            {
                userId: users[1]._id,
                name: 'Liam Chen',
                score: 915,
                streak: 4,
            },
        ]);
        await models_1.WorkoutModel.insertMany([
            {
                title: 'HIIT Intervals',
                durationMinutes: 25,
                level: 'advanced',
                focus: 'cardio',
            },
            {
                title: 'Mobility Flow',
                durationMinutes: 20,
                level: 'beginner',
                focus: 'recovery',
            },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
