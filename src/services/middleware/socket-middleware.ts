import { refreshToken } from '@/utils/api';

import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';

import type { RootState } from '../store';

export type WsActions<R, S> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onConnecting?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
  sendMessage?: ActionCreatorWithPayload<S>;
};

const RECONNECT_PERIOD = 5000;

export const socketMiddleware = <A, B>(
  wsActions: WsActions<A, B>,
  withTokenRefresh = false
): Middleware<Record<string, never>, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      disconnect,
      onConnecting,
      onClose,
      onOpen,
      onError,
      onMessage,
      sendMessage,
    } = wsActions;
    const { dispatch } = store;
    let reconnectTimer: number | ReturnType<typeof setTimeout> = 0;
    let isConnected = false;
    let url = '';

    return (next) => (action) => {
      if (connect.match(action)) {
        socket = new WebSocket(action.payload);
        url = action.payload;
        isConnected = true;
        onConnecting && dispatch(onConnecting());

        socket.onopen = (): void => {
          onOpen && dispatch(onOpen());
        };
        socket.onclose = (): void => {
          onClose && dispatch(onClose());

          if (isConnected) {
            reconnectTimer = setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        };
        socket.onerror = (): void => {
          dispatch(onError('Error'));
        };
        socket.onmessage = (event): void => {
          const { data } = event;

          try {
            const parsedData = JSON.parse(data);

            if (withTokenRefresh && parsedData.message === 'Invalid or missing token') {
              refreshToken()
                .then((refreshedData) => {
                  const wssUrl = new URL(url);
                  wssUrl.searchParams.set(
                    'token',
                    refreshedData.accessToken.replace('Bearer ', '')
                  );
                  dispatch(connect(wssUrl.toString()));
                })
                .catch((error) => {
                  dispatch(onError((error as Error).message));
                });

              dispatch(disconnect());

              return;
            }

            dispatch(onMessage(parsedData));
          } catch (error) {
            dispatch(onError((error as Error).message));
          }
        };

        return;
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket.close();
        socket = null;

        return;
      }

      if (socket && sendMessage?.match(action)) {
        const { payload } = action;
        try {
          const stringifiedPayload = JSON.stringify(payload);
          socket.send(stringifiedPayload);
        } catch (error) {
          dispatch(onError((error as Error).message));
        }

        return;
      }

      return next(action);
    };
  };
};
