
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AuthenticatedUser
 * 
 */
export type AuthenticatedUser = $Result.DefaultSelection<Prisma.$AuthenticatedUserPayload>
/**
 * Model ProjectTicket
 * 
 */
export type ProjectTicket = $Result.DefaultSelection<Prisma.$ProjectTicketPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  VIEWER: 'VIEWER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const ServiceType: {
  WEB_DEVELOPMENT: 'WEB_DEVELOPMENT',
  DATA_SCIENCE: 'DATA_SCIENCE',
  AI_SOLUTIONS: 'AI_SOLUTIONS',
  OTHER: 'OTHER'
};

export type ServiceType = (typeof ServiceType)[keyof typeof ServiceType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type ServiceType = $Enums.ServiceType

export const ServiceType: typeof $Enums.ServiceType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AuthenticatedUsers
 * const authenticatedUsers = await prisma.authenticatedUser.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AuthenticatedUsers
   * const authenticatedUsers = await prisma.authenticatedUser.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.authenticatedUser`: Exposes CRUD operations for the **AuthenticatedUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthenticatedUsers
    * const authenticatedUsers = await prisma.authenticatedUser.findMany()
    * ```
    */
  get authenticatedUser(): Prisma.AuthenticatedUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectTicket`: Exposes CRUD operations for the **ProjectTicket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectTickets
    * const projectTickets = await prisma.projectTicket.findMany()
    * ```
    */
  get projectTicket(): Prisma.ProjectTicketDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AuthenticatedUser: 'AuthenticatedUser',
    ProjectTicket: 'ProjectTicket'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "authenticatedUser" | "projectTicket"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AuthenticatedUser: {
        payload: Prisma.$AuthenticatedUserPayload<ExtArgs>
        fields: Prisma.AuthenticatedUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthenticatedUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatedUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthenticatedUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatedUserPayload>
          }
          findFirst: {
            args: Prisma.AuthenticatedUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatedUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthenticatedUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatedUserPayload>
          }
          findMany: {
            args: Prisma.AuthenticatedUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatedUserPayload>[]
          }
          create: {
            args: Prisma.AuthenticatedUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatedUserPayload>
          }
          createMany: {
            args: Prisma.AuthenticatedUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AuthenticatedUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatedUserPayload>
          }
          update: {
            args: Prisma.AuthenticatedUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatedUserPayload>
          }
          deleteMany: {
            args: Prisma.AuthenticatedUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthenticatedUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuthenticatedUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatedUserPayload>
          }
          aggregate: {
            args: Prisma.AuthenticatedUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthenticatedUser>
          }
          groupBy: {
            args: Prisma.AuthenticatedUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthenticatedUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthenticatedUserCountArgs<ExtArgs>
            result: $Utils.Optional<AuthenticatedUserCountAggregateOutputType> | number
          }
        }
      }
      ProjectTicket: {
        payload: Prisma.$ProjectTicketPayload<ExtArgs>
        fields: Prisma.ProjectTicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectTicketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectTicketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTicketPayload>
          }
          findFirst: {
            args: Prisma.ProjectTicketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectTicketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTicketPayload>
          }
          findMany: {
            args: Prisma.ProjectTicketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTicketPayload>[]
          }
          create: {
            args: Prisma.ProjectTicketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTicketPayload>
          }
          createMany: {
            args: Prisma.ProjectTicketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProjectTicketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTicketPayload>
          }
          update: {
            args: Prisma.ProjectTicketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTicketPayload>
          }
          deleteMany: {
            args: Prisma.ProjectTicketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectTicketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProjectTicketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTicketPayload>
          }
          aggregate: {
            args: Prisma.ProjectTicketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectTicket>
          }
          groupBy: {
            args: Prisma.ProjectTicketGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectTicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectTicketCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectTicketCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    authenticatedUser?: AuthenticatedUserOmit
    projectTicket?: ProjectTicketOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model AuthenticatedUser
   */

  export type AggregateAuthenticatedUser = {
    _count: AuthenticatedUserCountAggregateOutputType | null
    _min: AuthenticatedUserMinAggregateOutputType | null
    _max: AuthenticatedUserMaxAggregateOutputType | null
  }

  export type AuthenticatedUserMinAggregateOutputType = {
    id: string | null
    username: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    lastLogin: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AuthenticatedUserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    lastLogin: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AuthenticatedUserCountAggregateOutputType = {
    id: number
    username: number
    passwordHash: number
    role: number
    lastLogin: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AuthenticatedUserMinAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    role?: true
    lastLogin?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AuthenticatedUserMaxAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    role?: true
    lastLogin?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AuthenticatedUserCountAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    role?: true
    lastLogin?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AuthenticatedUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthenticatedUser to aggregate.
     */
    where?: AuthenticatedUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthenticatedUsers to fetch.
     */
    orderBy?: AuthenticatedUserOrderByWithRelationInput | AuthenticatedUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthenticatedUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthenticatedUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthenticatedUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthenticatedUsers
    **/
    _count?: true | AuthenticatedUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthenticatedUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthenticatedUserMaxAggregateInputType
  }

  export type GetAuthenticatedUserAggregateType<T extends AuthenticatedUserAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthenticatedUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthenticatedUser[P]>
      : GetScalarType<T[P], AggregateAuthenticatedUser[P]>
  }




  export type AuthenticatedUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthenticatedUserWhereInput
    orderBy?: AuthenticatedUserOrderByWithAggregationInput | AuthenticatedUserOrderByWithAggregationInput[]
    by: AuthenticatedUserScalarFieldEnum[] | AuthenticatedUserScalarFieldEnum
    having?: AuthenticatedUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthenticatedUserCountAggregateInputType | true
    _min?: AuthenticatedUserMinAggregateInputType
    _max?: AuthenticatedUserMaxAggregateInputType
  }

  export type AuthenticatedUserGroupByOutputType = {
    id: string
    username: string
    passwordHash: string
    role: $Enums.Role
    lastLogin: Date | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: AuthenticatedUserCountAggregateOutputType | null
    _min: AuthenticatedUserMinAggregateOutputType | null
    _max: AuthenticatedUserMaxAggregateOutputType | null
  }

  type GetAuthenticatedUserGroupByPayload<T extends AuthenticatedUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthenticatedUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthenticatedUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthenticatedUserGroupByOutputType[P]>
            : GetScalarType<T[P], AuthenticatedUserGroupByOutputType[P]>
        }
      >
    >


  export type AuthenticatedUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    role?: boolean
    lastLogin?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["authenticatedUser"]>



  export type AuthenticatedUserSelectScalar = {
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    role?: boolean
    lastLogin?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AuthenticatedUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "passwordHash" | "role" | "lastLogin" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["authenticatedUser"]>

  export type $AuthenticatedUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthenticatedUser"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      passwordHash: string
      role: $Enums.Role
      lastLogin: Date | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["authenticatedUser"]>
    composites: {}
  }

  type AuthenticatedUserGetPayload<S extends boolean | null | undefined | AuthenticatedUserDefaultArgs> = $Result.GetResult<Prisma.$AuthenticatedUserPayload, S>

  type AuthenticatedUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthenticatedUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthenticatedUserCountAggregateInputType | true
    }

  export interface AuthenticatedUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthenticatedUser'], meta: { name: 'AuthenticatedUser' } }
    /**
     * Find zero or one AuthenticatedUser that matches the filter.
     * @param {AuthenticatedUserFindUniqueArgs} args - Arguments to find a AuthenticatedUser
     * @example
     * // Get one AuthenticatedUser
     * const authenticatedUser = await prisma.authenticatedUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthenticatedUserFindUniqueArgs>(args: SelectSubset<T, AuthenticatedUserFindUniqueArgs<ExtArgs>>): Prisma__AuthenticatedUserClient<$Result.GetResult<Prisma.$AuthenticatedUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuthenticatedUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthenticatedUserFindUniqueOrThrowArgs} args - Arguments to find a AuthenticatedUser
     * @example
     * // Get one AuthenticatedUser
     * const authenticatedUser = await prisma.authenticatedUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthenticatedUserFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthenticatedUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthenticatedUserClient<$Result.GetResult<Prisma.$AuthenticatedUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthenticatedUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatedUserFindFirstArgs} args - Arguments to find a AuthenticatedUser
     * @example
     * // Get one AuthenticatedUser
     * const authenticatedUser = await prisma.authenticatedUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthenticatedUserFindFirstArgs>(args?: SelectSubset<T, AuthenticatedUserFindFirstArgs<ExtArgs>>): Prisma__AuthenticatedUserClient<$Result.GetResult<Prisma.$AuthenticatedUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthenticatedUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatedUserFindFirstOrThrowArgs} args - Arguments to find a AuthenticatedUser
     * @example
     * // Get one AuthenticatedUser
     * const authenticatedUser = await prisma.authenticatedUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthenticatedUserFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthenticatedUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthenticatedUserClient<$Result.GetResult<Prisma.$AuthenticatedUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuthenticatedUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatedUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthenticatedUsers
     * const authenticatedUsers = await prisma.authenticatedUser.findMany()
     * 
     * // Get first 10 AuthenticatedUsers
     * const authenticatedUsers = await prisma.authenticatedUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authenticatedUserWithIdOnly = await prisma.authenticatedUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthenticatedUserFindManyArgs>(args?: SelectSubset<T, AuthenticatedUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthenticatedUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuthenticatedUser.
     * @param {AuthenticatedUserCreateArgs} args - Arguments to create a AuthenticatedUser.
     * @example
     * // Create one AuthenticatedUser
     * const AuthenticatedUser = await prisma.authenticatedUser.create({
     *   data: {
     *     // ... data to create a AuthenticatedUser
     *   }
     * })
     * 
     */
    create<T extends AuthenticatedUserCreateArgs>(args: SelectSubset<T, AuthenticatedUserCreateArgs<ExtArgs>>): Prisma__AuthenticatedUserClient<$Result.GetResult<Prisma.$AuthenticatedUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuthenticatedUsers.
     * @param {AuthenticatedUserCreateManyArgs} args - Arguments to create many AuthenticatedUsers.
     * @example
     * // Create many AuthenticatedUsers
     * const authenticatedUser = await prisma.authenticatedUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthenticatedUserCreateManyArgs>(args?: SelectSubset<T, AuthenticatedUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AuthenticatedUser.
     * @param {AuthenticatedUserDeleteArgs} args - Arguments to delete one AuthenticatedUser.
     * @example
     * // Delete one AuthenticatedUser
     * const AuthenticatedUser = await prisma.authenticatedUser.delete({
     *   where: {
     *     // ... filter to delete one AuthenticatedUser
     *   }
     * })
     * 
     */
    delete<T extends AuthenticatedUserDeleteArgs>(args: SelectSubset<T, AuthenticatedUserDeleteArgs<ExtArgs>>): Prisma__AuthenticatedUserClient<$Result.GetResult<Prisma.$AuthenticatedUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuthenticatedUser.
     * @param {AuthenticatedUserUpdateArgs} args - Arguments to update one AuthenticatedUser.
     * @example
     * // Update one AuthenticatedUser
     * const authenticatedUser = await prisma.authenticatedUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthenticatedUserUpdateArgs>(args: SelectSubset<T, AuthenticatedUserUpdateArgs<ExtArgs>>): Prisma__AuthenticatedUserClient<$Result.GetResult<Prisma.$AuthenticatedUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuthenticatedUsers.
     * @param {AuthenticatedUserDeleteManyArgs} args - Arguments to filter AuthenticatedUsers to delete.
     * @example
     * // Delete a few AuthenticatedUsers
     * const { count } = await prisma.authenticatedUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthenticatedUserDeleteManyArgs>(args?: SelectSubset<T, AuthenticatedUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthenticatedUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatedUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthenticatedUsers
     * const authenticatedUser = await prisma.authenticatedUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthenticatedUserUpdateManyArgs>(args: SelectSubset<T, AuthenticatedUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuthenticatedUser.
     * @param {AuthenticatedUserUpsertArgs} args - Arguments to update or create a AuthenticatedUser.
     * @example
     * // Update or create a AuthenticatedUser
     * const authenticatedUser = await prisma.authenticatedUser.upsert({
     *   create: {
     *     // ... data to create a AuthenticatedUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthenticatedUser we want to update
     *   }
     * })
     */
    upsert<T extends AuthenticatedUserUpsertArgs>(args: SelectSubset<T, AuthenticatedUserUpsertArgs<ExtArgs>>): Prisma__AuthenticatedUserClient<$Result.GetResult<Prisma.$AuthenticatedUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuthenticatedUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatedUserCountArgs} args - Arguments to filter AuthenticatedUsers to count.
     * @example
     * // Count the number of AuthenticatedUsers
     * const count = await prisma.authenticatedUser.count({
     *   where: {
     *     // ... the filter for the AuthenticatedUsers we want to count
     *   }
     * })
    **/
    count<T extends AuthenticatedUserCountArgs>(
      args?: Subset<T, AuthenticatedUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthenticatedUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthenticatedUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatedUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthenticatedUserAggregateArgs>(args: Subset<T, AuthenticatedUserAggregateArgs>): Prisma.PrismaPromise<GetAuthenticatedUserAggregateType<T>>

    /**
     * Group by AuthenticatedUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatedUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthenticatedUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthenticatedUserGroupByArgs['orderBy'] }
        : { orderBy?: AuthenticatedUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthenticatedUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthenticatedUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthenticatedUser model
   */
  readonly fields: AuthenticatedUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthenticatedUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthenticatedUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuthenticatedUser model
   */
  interface AuthenticatedUserFieldRefs {
    readonly id: FieldRef<"AuthenticatedUser", 'String'>
    readonly username: FieldRef<"AuthenticatedUser", 'String'>
    readonly passwordHash: FieldRef<"AuthenticatedUser", 'String'>
    readonly role: FieldRef<"AuthenticatedUser", 'Role'>
    readonly lastLogin: FieldRef<"AuthenticatedUser", 'DateTime'>
    readonly isActive: FieldRef<"AuthenticatedUser", 'Boolean'>
    readonly createdAt: FieldRef<"AuthenticatedUser", 'DateTime'>
    readonly updatedAt: FieldRef<"AuthenticatedUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuthenticatedUser findUnique
   */
  export type AuthenticatedUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthenticatedUser
     */
    select?: AuthenticatedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthenticatedUser
     */
    omit?: AuthenticatedUserOmit<ExtArgs> | null
    /**
     * Filter, which AuthenticatedUser to fetch.
     */
    where: AuthenticatedUserWhereUniqueInput
  }

  /**
   * AuthenticatedUser findUniqueOrThrow
   */
  export type AuthenticatedUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthenticatedUser
     */
    select?: AuthenticatedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthenticatedUser
     */
    omit?: AuthenticatedUserOmit<ExtArgs> | null
    /**
     * Filter, which AuthenticatedUser to fetch.
     */
    where: AuthenticatedUserWhereUniqueInput
  }

  /**
   * AuthenticatedUser findFirst
   */
  export type AuthenticatedUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthenticatedUser
     */
    select?: AuthenticatedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthenticatedUser
     */
    omit?: AuthenticatedUserOmit<ExtArgs> | null
    /**
     * Filter, which AuthenticatedUser to fetch.
     */
    where?: AuthenticatedUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthenticatedUsers to fetch.
     */
    orderBy?: AuthenticatedUserOrderByWithRelationInput | AuthenticatedUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthenticatedUsers.
     */
    cursor?: AuthenticatedUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthenticatedUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthenticatedUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthenticatedUsers.
     */
    distinct?: AuthenticatedUserScalarFieldEnum | AuthenticatedUserScalarFieldEnum[]
  }

  /**
   * AuthenticatedUser findFirstOrThrow
   */
  export type AuthenticatedUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthenticatedUser
     */
    select?: AuthenticatedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthenticatedUser
     */
    omit?: AuthenticatedUserOmit<ExtArgs> | null
    /**
     * Filter, which AuthenticatedUser to fetch.
     */
    where?: AuthenticatedUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthenticatedUsers to fetch.
     */
    orderBy?: AuthenticatedUserOrderByWithRelationInput | AuthenticatedUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthenticatedUsers.
     */
    cursor?: AuthenticatedUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthenticatedUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthenticatedUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthenticatedUsers.
     */
    distinct?: AuthenticatedUserScalarFieldEnum | AuthenticatedUserScalarFieldEnum[]
  }

  /**
   * AuthenticatedUser findMany
   */
  export type AuthenticatedUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthenticatedUser
     */
    select?: AuthenticatedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthenticatedUser
     */
    omit?: AuthenticatedUserOmit<ExtArgs> | null
    /**
     * Filter, which AuthenticatedUsers to fetch.
     */
    where?: AuthenticatedUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthenticatedUsers to fetch.
     */
    orderBy?: AuthenticatedUserOrderByWithRelationInput | AuthenticatedUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthenticatedUsers.
     */
    cursor?: AuthenticatedUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthenticatedUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthenticatedUsers.
     */
    skip?: number
    distinct?: AuthenticatedUserScalarFieldEnum | AuthenticatedUserScalarFieldEnum[]
  }

  /**
   * AuthenticatedUser create
   */
  export type AuthenticatedUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthenticatedUser
     */
    select?: AuthenticatedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthenticatedUser
     */
    omit?: AuthenticatedUserOmit<ExtArgs> | null
    /**
     * The data needed to create a AuthenticatedUser.
     */
    data: XOR<AuthenticatedUserCreateInput, AuthenticatedUserUncheckedCreateInput>
  }

  /**
   * AuthenticatedUser createMany
   */
  export type AuthenticatedUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthenticatedUsers.
     */
    data: AuthenticatedUserCreateManyInput | AuthenticatedUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthenticatedUser update
   */
  export type AuthenticatedUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthenticatedUser
     */
    select?: AuthenticatedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthenticatedUser
     */
    omit?: AuthenticatedUserOmit<ExtArgs> | null
    /**
     * The data needed to update a AuthenticatedUser.
     */
    data: XOR<AuthenticatedUserUpdateInput, AuthenticatedUserUncheckedUpdateInput>
    /**
     * Choose, which AuthenticatedUser to update.
     */
    where: AuthenticatedUserWhereUniqueInput
  }

  /**
   * AuthenticatedUser updateMany
   */
  export type AuthenticatedUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthenticatedUsers.
     */
    data: XOR<AuthenticatedUserUpdateManyMutationInput, AuthenticatedUserUncheckedUpdateManyInput>
    /**
     * Filter which AuthenticatedUsers to update
     */
    where?: AuthenticatedUserWhereInput
    /**
     * Limit how many AuthenticatedUsers to update.
     */
    limit?: number
  }

  /**
   * AuthenticatedUser upsert
   */
  export type AuthenticatedUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthenticatedUser
     */
    select?: AuthenticatedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthenticatedUser
     */
    omit?: AuthenticatedUserOmit<ExtArgs> | null
    /**
     * The filter to search for the AuthenticatedUser to update in case it exists.
     */
    where: AuthenticatedUserWhereUniqueInput
    /**
     * In case the AuthenticatedUser found by the `where` argument doesn't exist, create a new AuthenticatedUser with this data.
     */
    create: XOR<AuthenticatedUserCreateInput, AuthenticatedUserUncheckedCreateInput>
    /**
     * In case the AuthenticatedUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthenticatedUserUpdateInput, AuthenticatedUserUncheckedUpdateInput>
  }

  /**
   * AuthenticatedUser delete
   */
  export type AuthenticatedUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthenticatedUser
     */
    select?: AuthenticatedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthenticatedUser
     */
    omit?: AuthenticatedUserOmit<ExtArgs> | null
    /**
     * Filter which AuthenticatedUser to delete.
     */
    where: AuthenticatedUserWhereUniqueInput
  }

  /**
   * AuthenticatedUser deleteMany
   */
  export type AuthenticatedUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthenticatedUsers to delete
     */
    where?: AuthenticatedUserWhereInput
    /**
     * Limit how many AuthenticatedUsers to delete.
     */
    limit?: number
  }

  /**
   * AuthenticatedUser without action
   */
  export type AuthenticatedUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthenticatedUser
     */
    select?: AuthenticatedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthenticatedUser
     */
    omit?: AuthenticatedUserOmit<ExtArgs> | null
  }


  /**
   * Model ProjectTicket
   */

  export type AggregateProjectTicket = {
    _count: ProjectTicketCountAggregateOutputType | null
    _min: ProjectTicketMinAggregateOutputType | null
    _max: ProjectTicketMaxAggregateOutputType | null
  }

  export type ProjectTicketMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phoneNumber: string | null
    service: $Enums.ServiceType | null
    organization: string | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectTicketMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phoneNumber: string | null
    service: $Enums.ServiceType | null
    organization: string | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectTicketCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    phoneNumber: number
    service: number
    organization: number
    message: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectTicketMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phoneNumber?: true
    service?: true
    organization?: true
    message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectTicketMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phoneNumber?: true
    service?: true
    organization?: true
    message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectTicketCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phoneNumber?: true
    service?: true
    organization?: true
    message?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectTicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectTicket to aggregate.
     */
    where?: ProjectTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectTickets to fetch.
     */
    orderBy?: ProjectTicketOrderByWithRelationInput | ProjectTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectTickets
    **/
    _count?: true | ProjectTicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectTicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectTicketMaxAggregateInputType
  }

  export type GetProjectTicketAggregateType<T extends ProjectTicketAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectTicket[P]>
      : GetScalarType<T[P], AggregateProjectTicket[P]>
  }




  export type ProjectTicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectTicketWhereInput
    orderBy?: ProjectTicketOrderByWithAggregationInput | ProjectTicketOrderByWithAggregationInput[]
    by: ProjectTicketScalarFieldEnum[] | ProjectTicketScalarFieldEnum
    having?: ProjectTicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectTicketCountAggregateInputType | true
    _min?: ProjectTicketMinAggregateInputType
    _max?: ProjectTicketMaxAggregateInputType
  }

  export type ProjectTicketGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    service: $Enums.ServiceType
    organization: string
    message: string
    createdAt: Date
    updatedAt: Date
    _count: ProjectTicketCountAggregateOutputType | null
    _min: ProjectTicketMinAggregateOutputType | null
    _max: ProjectTicketMaxAggregateOutputType | null
  }

  type GetProjectTicketGroupByPayload<T extends ProjectTicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectTicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectTicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectTicketGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectTicketGroupByOutputType[P]>
        }
      >
    >


  export type ProjectTicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phoneNumber?: boolean
    service?: boolean
    organization?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["projectTicket"]>



  export type ProjectTicketSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phoneNumber?: boolean
    service?: boolean
    organization?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectTicketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "phoneNumber" | "service" | "organization" | "message" | "createdAt" | "updatedAt", ExtArgs["result"]["projectTicket"]>

  export type $ProjectTicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectTicket"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      email: string
      phoneNumber: string
      service: $Enums.ServiceType
      organization: string
      message: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["projectTicket"]>
    composites: {}
  }

  type ProjectTicketGetPayload<S extends boolean | null | undefined | ProjectTicketDefaultArgs> = $Result.GetResult<Prisma.$ProjectTicketPayload, S>

  type ProjectTicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectTicketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectTicketCountAggregateInputType | true
    }

  export interface ProjectTicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectTicket'], meta: { name: 'ProjectTicket' } }
    /**
     * Find zero or one ProjectTicket that matches the filter.
     * @param {ProjectTicketFindUniqueArgs} args - Arguments to find a ProjectTicket
     * @example
     * // Get one ProjectTicket
     * const projectTicket = await prisma.projectTicket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectTicketFindUniqueArgs>(args: SelectSubset<T, ProjectTicketFindUniqueArgs<ExtArgs>>): Prisma__ProjectTicketClient<$Result.GetResult<Prisma.$ProjectTicketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectTicket that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectTicketFindUniqueOrThrowArgs} args - Arguments to find a ProjectTicket
     * @example
     * // Get one ProjectTicket
     * const projectTicket = await prisma.projectTicket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectTicketFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectTicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectTicketClient<$Result.GetResult<Prisma.$ProjectTicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectTicket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTicketFindFirstArgs} args - Arguments to find a ProjectTicket
     * @example
     * // Get one ProjectTicket
     * const projectTicket = await prisma.projectTicket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectTicketFindFirstArgs>(args?: SelectSubset<T, ProjectTicketFindFirstArgs<ExtArgs>>): Prisma__ProjectTicketClient<$Result.GetResult<Prisma.$ProjectTicketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectTicket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTicketFindFirstOrThrowArgs} args - Arguments to find a ProjectTicket
     * @example
     * // Get one ProjectTicket
     * const projectTicket = await prisma.projectTicket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectTicketFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectTicketFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectTicketClient<$Result.GetResult<Prisma.$ProjectTicketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectTickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTicketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectTickets
     * const projectTickets = await prisma.projectTicket.findMany()
     * 
     * // Get first 10 ProjectTickets
     * const projectTickets = await prisma.projectTicket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectTicketWithIdOnly = await prisma.projectTicket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectTicketFindManyArgs>(args?: SelectSubset<T, ProjectTicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectTicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectTicket.
     * @param {ProjectTicketCreateArgs} args - Arguments to create a ProjectTicket.
     * @example
     * // Create one ProjectTicket
     * const ProjectTicket = await prisma.projectTicket.create({
     *   data: {
     *     // ... data to create a ProjectTicket
     *   }
     * })
     * 
     */
    create<T extends ProjectTicketCreateArgs>(args: SelectSubset<T, ProjectTicketCreateArgs<ExtArgs>>): Prisma__ProjectTicketClient<$Result.GetResult<Prisma.$ProjectTicketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectTickets.
     * @param {ProjectTicketCreateManyArgs} args - Arguments to create many ProjectTickets.
     * @example
     * // Create many ProjectTickets
     * const projectTicket = await prisma.projectTicket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectTicketCreateManyArgs>(args?: SelectSubset<T, ProjectTicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProjectTicket.
     * @param {ProjectTicketDeleteArgs} args - Arguments to delete one ProjectTicket.
     * @example
     * // Delete one ProjectTicket
     * const ProjectTicket = await prisma.projectTicket.delete({
     *   where: {
     *     // ... filter to delete one ProjectTicket
     *   }
     * })
     * 
     */
    delete<T extends ProjectTicketDeleteArgs>(args: SelectSubset<T, ProjectTicketDeleteArgs<ExtArgs>>): Prisma__ProjectTicketClient<$Result.GetResult<Prisma.$ProjectTicketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectTicket.
     * @param {ProjectTicketUpdateArgs} args - Arguments to update one ProjectTicket.
     * @example
     * // Update one ProjectTicket
     * const projectTicket = await prisma.projectTicket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectTicketUpdateArgs>(args: SelectSubset<T, ProjectTicketUpdateArgs<ExtArgs>>): Prisma__ProjectTicketClient<$Result.GetResult<Prisma.$ProjectTicketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectTickets.
     * @param {ProjectTicketDeleteManyArgs} args - Arguments to filter ProjectTickets to delete.
     * @example
     * // Delete a few ProjectTickets
     * const { count } = await prisma.projectTicket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectTicketDeleteManyArgs>(args?: SelectSubset<T, ProjectTicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectTickets
     * const projectTicket = await prisma.projectTicket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectTicketUpdateManyArgs>(args: SelectSubset<T, ProjectTicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProjectTicket.
     * @param {ProjectTicketUpsertArgs} args - Arguments to update or create a ProjectTicket.
     * @example
     * // Update or create a ProjectTicket
     * const projectTicket = await prisma.projectTicket.upsert({
     *   create: {
     *     // ... data to create a ProjectTicket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectTicket we want to update
     *   }
     * })
     */
    upsert<T extends ProjectTicketUpsertArgs>(args: SelectSubset<T, ProjectTicketUpsertArgs<ExtArgs>>): Prisma__ProjectTicketClient<$Result.GetResult<Prisma.$ProjectTicketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTicketCountArgs} args - Arguments to filter ProjectTickets to count.
     * @example
     * // Count the number of ProjectTickets
     * const count = await prisma.projectTicket.count({
     *   where: {
     *     // ... the filter for the ProjectTickets we want to count
     *   }
     * })
    **/
    count<T extends ProjectTicketCountArgs>(
      args?: Subset<T, ProjectTicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectTicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectTicketAggregateArgs>(args: Subset<T, ProjectTicketAggregateArgs>): Prisma.PrismaPromise<GetProjectTicketAggregateType<T>>

    /**
     * Group by ProjectTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTicketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectTicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectTicketGroupByArgs['orderBy'] }
        : { orderBy?: ProjectTicketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectTicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectTicket model
   */
  readonly fields: ProjectTicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectTicket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectTicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectTicket model
   */
  interface ProjectTicketFieldRefs {
    readonly id: FieldRef<"ProjectTicket", 'String'>
    readonly firstName: FieldRef<"ProjectTicket", 'String'>
    readonly lastName: FieldRef<"ProjectTicket", 'String'>
    readonly email: FieldRef<"ProjectTicket", 'String'>
    readonly phoneNumber: FieldRef<"ProjectTicket", 'String'>
    readonly service: FieldRef<"ProjectTicket", 'ServiceType'>
    readonly organization: FieldRef<"ProjectTicket", 'String'>
    readonly message: FieldRef<"ProjectTicket", 'String'>
    readonly createdAt: FieldRef<"ProjectTicket", 'DateTime'>
    readonly updatedAt: FieldRef<"ProjectTicket", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectTicket findUnique
   */
  export type ProjectTicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTicket
     */
    select?: ProjectTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTicket
     */
    omit?: ProjectTicketOmit<ExtArgs> | null
    /**
     * Filter, which ProjectTicket to fetch.
     */
    where: ProjectTicketWhereUniqueInput
  }

  /**
   * ProjectTicket findUniqueOrThrow
   */
  export type ProjectTicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTicket
     */
    select?: ProjectTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTicket
     */
    omit?: ProjectTicketOmit<ExtArgs> | null
    /**
     * Filter, which ProjectTicket to fetch.
     */
    where: ProjectTicketWhereUniqueInput
  }

  /**
   * ProjectTicket findFirst
   */
  export type ProjectTicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTicket
     */
    select?: ProjectTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTicket
     */
    omit?: ProjectTicketOmit<ExtArgs> | null
    /**
     * Filter, which ProjectTicket to fetch.
     */
    where?: ProjectTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectTickets to fetch.
     */
    orderBy?: ProjectTicketOrderByWithRelationInput | ProjectTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectTickets.
     */
    cursor?: ProjectTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectTickets.
     */
    distinct?: ProjectTicketScalarFieldEnum | ProjectTicketScalarFieldEnum[]
  }

  /**
   * ProjectTicket findFirstOrThrow
   */
  export type ProjectTicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTicket
     */
    select?: ProjectTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTicket
     */
    omit?: ProjectTicketOmit<ExtArgs> | null
    /**
     * Filter, which ProjectTicket to fetch.
     */
    where?: ProjectTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectTickets to fetch.
     */
    orderBy?: ProjectTicketOrderByWithRelationInput | ProjectTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectTickets.
     */
    cursor?: ProjectTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectTickets.
     */
    distinct?: ProjectTicketScalarFieldEnum | ProjectTicketScalarFieldEnum[]
  }

  /**
   * ProjectTicket findMany
   */
  export type ProjectTicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTicket
     */
    select?: ProjectTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTicket
     */
    omit?: ProjectTicketOmit<ExtArgs> | null
    /**
     * Filter, which ProjectTickets to fetch.
     */
    where?: ProjectTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectTickets to fetch.
     */
    orderBy?: ProjectTicketOrderByWithRelationInput | ProjectTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectTickets.
     */
    cursor?: ProjectTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectTickets.
     */
    skip?: number
    distinct?: ProjectTicketScalarFieldEnum | ProjectTicketScalarFieldEnum[]
  }

  /**
   * ProjectTicket create
   */
  export type ProjectTicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTicket
     */
    select?: ProjectTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTicket
     */
    omit?: ProjectTicketOmit<ExtArgs> | null
    /**
     * The data needed to create a ProjectTicket.
     */
    data: XOR<ProjectTicketCreateInput, ProjectTicketUncheckedCreateInput>
  }

  /**
   * ProjectTicket createMany
   */
  export type ProjectTicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectTickets.
     */
    data: ProjectTicketCreateManyInput | ProjectTicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectTicket update
   */
  export type ProjectTicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTicket
     */
    select?: ProjectTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTicket
     */
    omit?: ProjectTicketOmit<ExtArgs> | null
    /**
     * The data needed to update a ProjectTicket.
     */
    data: XOR<ProjectTicketUpdateInput, ProjectTicketUncheckedUpdateInput>
    /**
     * Choose, which ProjectTicket to update.
     */
    where: ProjectTicketWhereUniqueInput
  }

  /**
   * ProjectTicket updateMany
   */
  export type ProjectTicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectTickets.
     */
    data: XOR<ProjectTicketUpdateManyMutationInput, ProjectTicketUncheckedUpdateManyInput>
    /**
     * Filter which ProjectTickets to update
     */
    where?: ProjectTicketWhereInput
    /**
     * Limit how many ProjectTickets to update.
     */
    limit?: number
  }

  /**
   * ProjectTicket upsert
   */
  export type ProjectTicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTicket
     */
    select?: ProjectTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTicket
     */
    omit?: ProjectTicketOmit<ExtArgs> | null
    /**
     * The filter to search for the ProjectTicket to update in case it exists.
     */
    where: ProjectTicketWhereUniqueInput
    /**
     * In case the ProjectTicket found by the `where` argument doesn't exist, create a new ProjectTicket with this data.
     */
    create: XOR<ProjectTicketCreateInput, ProjectTicketUncheckedCreateInput>
    /**
     * In case the ProjectTicket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectTicketUpdateInput, ProjectTicketUncheckedUpdateInput>
  }

  /**
   * ProjectTicket delete
   */
  export type ProjectTicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTicket
     */
    select?: ProjectTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTicket
     */
    omit?: ProjectTicketOmit<ExtArgs> | null
    /**
     * Filter which ProjectTicket to delete.
     */
    where: ProjectTicketWhereUniqueInput
  }

  /**
   * ProjectTicket deleteMany
   */
  export type ProjectTicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectTickets to delete
     */
    where?: ProjectTicketWhereInput
    /**
     * Limit how many ProjectTickets to delete.
     */
    limit?: number
  }

  /**
   * ProjectTicket without action
   */
  export type ProjectTicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTicket
     */
    select?: ProjectTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTicket
     */
    omit?: ProjectTicketOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AuthenticatedUserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    passwordHash: 'passwordHash',
    role: 'role',
    lastLogin: 'lastLogin',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AuthenticatedUserScalarFieldEnum = (typeof AuthenticatedUserScalarFieldEnum)[keyof typeof AuthenticatedUserScalarFieldEnum]


  export const ProjectTicketScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phoneNumber: 'phoneNumber',
    service: 'service',
    organization: 'organization',
    message: 'message',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectTicketScalarFieldEnum = (typeof ProjectTicketScalarFieldEnum)[keyof typeof ProjectTicketScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const AuthenticatedUserOrderByRelevanceFieldEnum: {
    id: 'id',
    username: 'username',
    passwordHash: 'passwordHash'
  };

  export type AuthenticatedUserOrderByRelevanceFieldEnum = (typeof AuthenticatedUserOrderByRelevanceFieldEnum)[keyof typeof AuthenticatedUserOrderByRelevanceFieldEnum]


  export const ProjectTicketOrderByRelevanceFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phoneNumber: 'phoneNumber',
    organization: 'organization',
    message: 'message'
  };

  export type ProjectTicketOrderByRelevanceFieldEnum = (typeof ProjectTicketOrderByRelevanceFieldEnum)[keyof typeof ProjectTicketOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ServiceType'
   */
  export type EnumServiceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceType'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type AuthenticatedUserWhereInput = {
    AND?: AuthenticatedUserWhereInput | AuthenticatedUserWhereInput[]
    OR?: AuthenticatedUserWhereInput[]
    NOT?: AuthenticatedUserWhereInput | AuthenticatedUserWhereInput[]
    id?: StringFilter<"AuthenticatedUser"> | string
    username?: StringFilter<"AuthenticatedUser"> | string
    passwordHash?: StringFilter<"AuthenticatedUser"> | string
    role?: EnumRoleFilter<"AuthenticatedUser"> | $Enums.Role
    lastLogin?: DateTimeNullableFilter<"AuthenticatedUser"> | Date | string | null
    isActive?: BoolFilter<"AuthenticatedUser"> | boolean
    createdAt?: DateTimeFilter<"AuthenticatedUser"> | Date | string
    updatedAt?: DateTimeFilter<"AuthenticatedUser"> | Date | string
  }

  export type AuthenticatedUserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: AuthenticatedUserOrderByRelevanceInput
  }

  export type AuthenticatedUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: AuthenticatedUserWhereInput | AuthenticatedUserWhereInput[]
    OR?: AuthenticatedUserWhereInput[]
    NOT?: AuthenticatedUserWhereInput | AuthenticatedUserWhereInput[]
    passwordHash?: StringFilter<"AuthenticatedUser"> | string
    role?: EnumRoleFilter<"AuthenticatedUser"> | $Enums.Role
    lastLogin?: DateTimeNullableFilter<"AuthenticatedUser"> | Date | string | null
    isActive?: BoolFilter<"AuthenticatedUser"> | boolean
    createdAt?: DateTimeFilter<"AuthenticatedUser"> | Date | string
    updatedAt?: DateTimeFilter<"AuthenticatedUser"> | Date | string
  }, "id" | "username">

  export type AuthenticatedUserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AuthenticatedUserCountOrderByAggregateInput
    _max?: AuthenticatedUserMaxOrderByAggregateInput
    _min?: AuthenticatedUserMinOrderByAggregateInput
  }

  export type AuthenticatedUserScalarWhereWithAggregatesInput = {
    AND?: AuthenticatedUserScalarWhereWithAggregatesInput | AuthenticatedUserScalarWhereWithAggregatesInput[]
    OR?: AuthenticatedUserScalarWhereWithAggregatesInput[]
    NOT?: AuthenticatedUserScalarWhereWithAggregatesInput | AuthenticatedUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuthenticatedUser"> | string
    username?: StringWithAggregatesFilter<"AuthenticatedUser"> | string
    passwordHash?: StringWithAggregatesFilter<"AuthenticatedUser"> | string
    role?: EnumRoleWithAggregatesFilter<"AuthenticatedUser"> | $Enums.Role
    lastLogin?: DateTimeNullableWithAggregatesFilter<"AuthenticatedUser"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"AuthenticatedUser"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"AuthenticatedUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AuthenticatedUser"> | Date | string
  }

  export type ProjectTicketWhereInput = {
    AND?: ProjectTicketWhereInput | ProjectTicketWhereInput[]
    OR?: ProjectTicketWhereInput[]
    NOT?: ProjectTicketWhereInput | ProjectTicketWhereInput[]
    id?: StringFilter<"ProjectTicket"> | string
    firstName?: StringFilter<"ProjectTicket"> | string
    lastName?: StringFilter<"ProjectTicket"> | string
    email?: StringFilter<"ProjectTicket"> | string
    phoneNumber?: StringFilter<"ProjectTicket"> | string
    service?: EnumServiceTypeFilter<"ProjectTicket"> | $Enums.ServiceType
    organization?: StringFilter<"ProjectTicket"> | string
    message?: StringFilter<"ProjectTicket"> | string
    createdAt?: DateTimeFilter<"ProjectTicket"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectTicket"> | Date | string
  }

  export type ProjectTicketOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    service?: SortOrder
    organization?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: ProjectTicketOrderByRelevanceInput
  }

  export type ProjectTicketWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectTicketWhereInput | ProjectTicketWhereInput[]
    OR?: ProjectTicketWhereInput[]
    NOT?: ProjectTicketWhereInput | ProjectTicketWhereInput[]
    firstName?: StringFilter<"ProjectTicket"> | string
    lastName?: StringFilter<"ProjectTicket"> | string
    email?: StringFilter<"ProjectTicket"> | string
    phoneNumber?: StringFilter<"ProjectTicket"> | string
    service?: EnumServiceTypeFilter<"ProjectTicket"> | $Enums.ServiceType
    organization?: StringFilter<"ProjectTicket"> | string
    message?: StringFilter<"ProjectTicket"> | string
    createdAt?: DateTimeFilter<"ProjectTicket"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectTicket"> | Date | string
  }, "id">

  export type ProjectTicketOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    service?: SortOrder
    organization?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectTicketCountOrderByAggregateInput
    _max?: ProjectTicketMaxOrderByAggregateInput
    _min?: ProjectTicketMinOrderByAggregateInput
  }

  export type ProjectTicketScalarWhereWithAggregatesInput = {
    AND?: ProjectTicketScalarWhereWithAggregatesInput | ProjectTicketScalarWhereWithAggregatesInput[]
    OR?: ProjectTicketScalarWhereWithAggregatesInput[]
    NOT?: ProjectTicketScalarWhereWithAggregatesInput | ProjectTicketScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectTicket"> | string
    firstName?: StringWithAggregatesFilter<"ProjectTicket"> | string
    lastName?: StringWithAggregatesFilter<"ProjectTicket"> | string
    email?: StringWithAggregatesFilter<"ProjectTicket"> | string
    phoneNumber?: StringWithAggregatesFilter<"ProjectTicket"> | string
    service?: EnumServiceTypeWithAggregatesFilter<"ProjectTicket"> | $Enums.ServiceType
    organization?: StringWithAggregatesFilter<"ProjectTicket"> | string
    message?: StringWithAggregatesFilter<"ProjectTicket"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProjectTicket"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProjectTicket"> | Date | string
  }

  export type AuthenticatedUserCreateInput = {
    id?: string
    username: string
    passwordHash: string
    role?: $Enums.Role
    lastLogin?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthenticatedUserUncheckedCreateInput = {
    id?: string
    username: string
    passwordHash: string
    role?: $Enums.Role
    lastLogin?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthenticatedUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthenticatedUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthenticatedUserCreateManyInput = {
    id?: string
    username: string
    passwordHash: string
    role?: $Enums.Role
    lastLogin?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthenticatedUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthenticatedUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectTicketCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    service: $Enums.ServiceType
    organization: string
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectTicketUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    service: $Enums.ServiceType
    organization: string
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectTicketUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    service?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    organization?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectTicketUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    service?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    organization?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectTicketCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    service: $Enums.ServiceType
    organization: string
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectTicketUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    service?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    organization?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectTicketUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    service?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    organization?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AuthenticatedUserOrderByRelevanceInput = {
    fields: AuthenticatedUserOrderByRelevanceFieldEnum | AuthenticatedUserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AuthenticatedUserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    lastLogin?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthenticatedUserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    lastLogin?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthenticatedUserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    lastLogin?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumServiceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[]
    notIn?: $Enums.ServiceType[]
    not?: NestedEnumServiceTypeFilter<$PrismaModel> | $Enums.ServiceType
  }

  export type ProjectTicketOrderByRelevanceInput = {
    fields: ProjectTicketOrderByRelevanceFieldEnum | ProjectTicketOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProjectTicketCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    service?: SortOrder
    organization?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectTicketMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    service?: SortOrder
    organization?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectTicketMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    service?: SortOrder
    organization?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumServiceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[]
    notIn?: $Enums.ServiceType[]
    not?: NestedEnumServiceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ServiceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceTypeFilter<$PrismaModel>
    _max?: NestedEnumServiceTypeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumServiceTypeFieldUpdateOperationsInput = {
    set?: $Enums.ServiceType
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumServiceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[]
    notIn?: $Enums.ServiceType[]
    not?: NestedEnumServiceTypeFilter<$PrismaModel> | $Enums.ServiceType
  }

  export type NestedEnumServiceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[]
    notIn?: $Enums.ServiceType[]
    not?: NestedEnumServiceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ServiceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceTypeFilter<$PrismaModel>
    _max?: NestedEnumServiceTypeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}