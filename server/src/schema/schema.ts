import { 
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString
} from 'graphql';
import { tasks, steps } from './data';

const StepType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Step',
    description: 'This represents a step as milestone',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve: (parent, args) => {
                return tasks.filter(task => task.stepId === parent.id)
            }
        }
    })
});

const TaskType = new GraphQLObjectType({
    name: 'Task',
    description: 'Retrieve a task belongs to a step',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        complete: {type: GraphQLNonNull(GraphQLBoolean) },
        stepId: { type: GraphQLNonNull(GraphQLInt) },
        steps: {
            type: new GraphQLList(StepType),
            resolve: (task) => {
                return steps.filter(step => step.id === task.stepId)
            }
        }
    })
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: ({
        tasks: {
            type: new GraphQLList(TaskType),
            description: 'List all tasks',
            resolve: () => tasks
        },
        task: {
            type: TaskType,
            description: 'Retrieve a single task',
            args: {
                id: { type: GraphQLInt}
            },
            resolve: (parent, args) => tasks.find(task => task.id === args.id)
        },
        steps: {
            type: new GraphQLList(StepType),
            description: 'List all steps',
            resolve: () => steps
        },
        step: {
            type: StepType,
            description: 'Retrieve a single step',
            args: {
                id: { type: GraphQLInt}
            },
            resolve: (parent, args) => steps.find(step => step.id === args.id)
        }
    })
});

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        updateTask: {
            type: TaskType,
            description: 'Update a task',
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                complete: { type: GraphQLNonNull(GraphQLBoolean) }
            },
            resolve: (parent, args) => {
                const objIdx = tasks.findIndex((obj) => obj.id === args.id);
                tasks[objIdx].complete = args.complete;
                return tasks[objIdx];
            }
        }
    }),
});



const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

export default schema;


