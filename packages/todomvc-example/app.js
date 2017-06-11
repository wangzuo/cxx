import cxx from 'cxx/app';
import routes from './routes';
import schema from './schema';

const app = cxx({ routes, schema });

export default app;
