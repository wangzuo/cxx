import App from 'cxx';
import routes from './routes';
import schema from './schema';

const app = new App({ routes, schema });

export default app;
