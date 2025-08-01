import app from './app.js';

import 'dotenv/config';

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
