"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_koa_1 = require("apollo-server-koa");
const apollo_server_core_1 = require("apollo-server-core");
const koa_1 = __importDefault(require("koa"));
const http_1 = __importDefault(require("http"));
const fs_1 = require("fs");
const port = 4000;
const typeDefs = (0, fs_1.readFileSync)('./schema.graphql');
const resolvers = {
    Query: {
        user: (f, s, c) => {
            console.log(f, s, c);
        },
    },
};
function main(typeDefs, resolvers) {
    return __awaiter(this, void 0, void 0, function* () {
        const httpServer = http_1.default.createServer();
        const server = new apollo_server_koa_1.ApolloServer({
            typeDefs,
            resolvers,
            csrfPrevention: true,
            cache: 'bounded',
            plugins: [
                (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
                (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true }),
            ],
            context: ({ ctx }) => {
                const request = ctx.request;
                return {
                    request,
                };
            },
        });
        yield server.start();
        const app = new koa_1.default();
        server.applyMiddleware({ app });
        app.listen(port, () => {
            console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
        });
        return { server, app };
    });
}
main(typeDefs, resolvers);
