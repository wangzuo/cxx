import cxx from 'cxx/app';
import routes from './routes';
import schema from './schema';

const app = cxx({ routes, schema });

app.get('/hello-world', (req, res) => {
  res.send('hello world');
});

export default app;
