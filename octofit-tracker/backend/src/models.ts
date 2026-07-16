import mongoose, { Schema, type Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: string;
  fitnessLevel: string;
}

export interface ITeam {
  name: string;
  sport: string;
  members: number;
  focus: string;
}

export interface IActivity {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  intensity: string;
  date: Date;
}

export interface ILeaderboardEntry {
  userId: mongoose.Types.ObjectId;
  name: string;
  score: number;
  streak: number;
}

export interface IWorkout {
  title: string;
  durationMinutes: number;
  level: string;
  focus: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  fitnessLevel: { type: String, required: true },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  members: { type: Number, required: true },
  focus: { type: String, required: true },
});

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  intensity: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
  streak: { type: Number, required: true },
});

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  level: { type: String, required: true },
  focus: { type: String, required: true },
});

export const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export const TeamModel: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);
export const ActivityModel: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardModel: Model<ILeaderboardEntry> = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const WorkoutModel: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);
