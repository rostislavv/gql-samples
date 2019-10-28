import { performance } from "perf_hooks";
import {
  ApolloServerPlugin,
  GraphQLRequestListener
} from "apollo-server-plugin-base";
import { GraphQLRequestContext } from "apollo-server-types";

export const PerformancePlugin: ApolloServerPlugin = {
  requestDidStart<TContext>(
    reqContext: GraphQLRequestContext<TContext>
  ): GraphQLRequestListener<TContext> {
    const operationName = reqContext.request.query;

    console.log("request", { operationName });

    return {
      parsingDidStart(
        requestContext: GraphQLRequestContext<TContext>
      ): (err?: Error) => void {
        const t1 = performance.now();
        return (): void => {
          const t2 = performance.now();
          console.log("parse", t2 - t1);
        };
      },
      validationDidStart(
        requestContext: GraphQLRequestContext<TContext>
      ): (err?: ReadonlyArray<Error>) => void {
        const t1 = performance.now();
        return (): void => {
          const t2 = performance.now();
          console.log("validate", t2 - t1);
        };
      },
      executionDidStart(
        requestContext: GraphQLRequestContext<TContext>
      ): (err?: Error) => void {
        const t1 = performance.now();
        return (): void => {
          const t2 = performance.now();
          console.log("execute", t2 - t1);
        };
      }
    };
  }
};
