export const initMocks = async () => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof window === 'undefined') {
      const { server } = await import('./server');
      void server.listen();
    } else {
      const { worker } = await import('./browser');
      void worker.start();
    }
  }
};
