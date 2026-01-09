import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { authApi } from "@/services/auth";
import { productApi } from "@/services/product";
import { transactionApi } from "@/services/transaction";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [transactionApi.reducerPath]: transactionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware, productApi.middleware, transactionApi.middleware]),
});

setupListeners(store.dispatch);

// infer the 'rootstate' and 'appdispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// infered type: {posts: PostsState, comments: commentstate, users: UsersState}

export type AppDispatch = typeof store.dispatch;
