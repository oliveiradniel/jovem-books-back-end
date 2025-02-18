import fs from 'fs';
import dotenv from 'dotenv';

const envConfig = dotenv.parse(fs.readFileSync('.env'));

const envKeys = Object.keys(envConfig);

const envExampleContent = envKeys.map(key => `${key}="<value>"`).join('\n');

fs.writeFile('.env.example', envExampleContent, err => {
  if (err) {
    console.log('Error writing to .env.example', err);
  } else {
    console.log('File update successfully');
  }
});
