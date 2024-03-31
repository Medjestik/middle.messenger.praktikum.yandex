import EventBus from './EventBus.ts';

export enum WSTransportEvents {
    open = 'open',
    message = 'message',
    error = 'error',
    close = 'close'
}

export default class WSTransport extends EventBus {
  private socket?: WebSocket;

  private pingInterval?: ReturnType<typeof setInterval>;

  private readonly pingIntervalTime = 30000;

  private url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public send(data: string | number | object) {
    if (!this.socket) {
      throw new Error('Соединение не установлено');
    }
    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    if (this.socket) {
      throw new Error('Соединение уже установлено');
    }

    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);
    this.setupPing();

    return new Promise((resolve, reject) => {
      this.on(WSTransportEvents.error, reject);
      this.on(WSTransportEvents.open, () => {
        this.off(WSTransportEvents.error, reject);
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
    clearInterval(this.pingInterval);
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, this.pingIntervalTime);

    this.on(WSTransportEvents.close, () => {
      clearInterval(this.pingInterval);
      this.pingInterval = undefined;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSTransportEvents.open);
    });

    socket.addEventListener('close', () => {
      this.emit(WSTransportEvents.close);
    });

    socket.addEventListener('error', (e: Event) => {
      this.emit(WSTransportEvents.error, e);
    });

    socket.addEventListener('message', (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (['pong', 'user connected'].includes(data?.type)) {
          return;
        }
        this.emit(WSTransportEvents.message, data);
      } catch {
        // игнориуем ошибки разбора JSON
      }
    });
  }
}
