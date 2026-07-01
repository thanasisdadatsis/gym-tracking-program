interface GymSession {
    exercises: number; 
    steps: number; 
    kcal: number;
    day: 'Legs' | 'Back' | 'Rest' | 'None';
    date: string;
}

interface Membership {
    paidPlan: '1st Tier' | '2nd Tier';
    monthsAvailable: 2 | 4 | 6 | 8 | 10 | 12 | 24;
}

interface User {
    username: string;
    passwordHash: string; 
    dateStreak: number;
    membership?: Membership;
    session?: GymSession;
}


const demoMembership: Membership = {
    paidPlan: '1st Tier',
    monthsAvailable: 6
};

const demoUser: User = {
    username: 'AlexDev',
    passwordHash: 'SECURE_HASH_883MSK099JSk',
    dateStreak: 0,
    membership: demoMembership
};

const demoGymSession: GymSession = {
    exercises: 0,
    steps: 9_000, 
    kcal: 600,
    day: 'Rest',
    date: '03-04-2026',
};

// --- Core Helper Functions ---
const checkForMembership = (user: User): boolean => {
    const hasMembership: boolean = !!user.membership;
    if (!hasMembership) {
        console.log(`\nNo membership found. Please go to the shop to buy one.`);
    }
    return hasMembership;
};

const logGymSession = (session: GymSession, user: User): boolean => {
    if (session.date === user.session?.date) { 
        console.log("\nSession already logged.");
        return false;
    } else {
        console.log("\nLogging new session...");
        user.session = session;
        return true;
    }
};

// --- Metrics Evaluation ---
const returnStepsRating = (session: GymSession): string => {
    if (session.steps >= 20_000) return "excellent";
    if (session.steps >= 10_000) return "very Good";
    if (session.steps >= 5_000) return "mid";
    return "bad";
};

const returnKcalRating = (session: GymSession): string => {
    if (session.kcal >= 1000) return "excellent";
    if (session.kcal >= 500) return "good";
    if (session.kcal >= 150) return "average";
    return "bad";
};

const evaluateExercisesStatus = (session: GymSession): string => {
    return session.exercises >= 5 ? 'enough' : 'not enough';
};

// --- System Engine ---
const calculateStreak = (user: User): string => {
    const currentSession = user.session;

    if (currentSession && currentSession.day !== 'Rest' && currentSession.day !== 'None') {
        const today = new Date();
        const parts = currentSession.date.split('-');
        const d = Number(parts[0]);
        const m = Number(parts[1]);
        const y = Number(parts[2]);
        const sessionDate = new Date(y, m - 1, d);

        const diffDays = Math.round(
            (today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays > 1) {
            user.dateStreak = 1; 
            return `\nStreak reset — gap detected. Starting fresh at 1.`;
        }

        user.dateStreak += 1;
        return `\nStreak updated! Current Streak: ${user.dateStreak}`;
    } else {
        return "\nNo active workout session found for tracking streak.";
    }
};

const generateCompleteSummary = (
    user: User, 
    session: GymSession, 
    includeSteps?: string, 
    includeKcal?: string, 
    includeExercises?: string
): string => {

    if (checkForMembership(user) === false) {
         return "\nOperation cancelled: Active membership required.";
    }

    if (logGymSession(session, user) === false) {
        return "\nOperation cancelled: Target session already processed.";
    }

    let report = `\n--- DAILY PROGRESS REPORT ---\n\n`;
   
    if (includeSteps) {
        if (session.steps < 10_000) { 
            report += `Steps: ${session.steps}. \nPerformance: ${returnStepsRating(session)}. \nWalk ${10_000 - session.steps} more steps to hit goal.\n`;
        } else {
            report += `Steps: ${session.steps}. \nPerformance: ${returnStepsRating(session)}! \nYou crushed the goal by ${session.steps - 10_000}.\n\n`;
        }
    } 
    
    if (includeKcal) {
        if (session.kcal < 500) {
            report += `\nEnergy Burned: ${session.kcal} kcal (${returnKcalRating(session)}). Target deficit missing by: ${500 - session.kcal} kcal.\n`;
        } else {
            report += `\nEnergy Burned: ${session.kcal} kcal (${returnKcalRating(session)}). \n${session.kcal - 500} kcal over the average!\n`;
        }
    } 

    if (includeExercises && session.day !== 'None' && session.day !== 'Rest') {
        if (evaluateExercisesStatus(session) === "enough") {
            report += `\nExercises Tracked: ${session.exercises} (Target volume met).\n`;
        } else { 
            report += `\nExercises Tracked: ${session.exercises}. \nRequires ${5 - session.exercises} more exercises to meet baseline.\n`;
        }
    }

    report += calculateStreak(user);
    report += `\n\n --- END OF DAILY PROGRESS REPORT ---\n`;
    
    return report;
};

// Execute Demo Execution
console.log(generateCompleteSummary(demoUser, demoGymSession, 'step', 'kcal', 'exercise'));