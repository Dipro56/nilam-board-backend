import mongoose from 'mongoose';
import app from './app';

const port = 5000;

main().catch((err) => console.log(err));

//using cores middleware

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/nilam-board-test');
    console.log('DB coonnected');
  } catch (err) {
    console.log('Failed to connect');
    console.log(err);
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
