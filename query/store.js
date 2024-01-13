import fs from 'fs';

const read = () => {
  if (fs.existsSync('query.json')) {
    return JSON.parse(fs.readFileSync('query.json', 'utf8'));
  } else {
    return {};
  }
};

const write = (query) => {
  if (fs.existsSync('query.json')) {
    fs.rmSync('query.json', { force: true });
  } 
  fs.writeFileSync('query.json', JSON.stringify(query));
};

const readTitle = () => {
  if (fs.existsSync('title.json')) {
    return JSON.parse(fs.readFileSync('title.json', 'utf8'));
  } else {
    return {};
  }
}

const writeTitle = (title) => {
  if (fs.existsSync('title.json')) {
    fs.rmSync('title.json', { force: true });
  } 
  fs.writeFileSync('title.json', JSON.stringify(title));
};

export default {
  read,
  write,
  readTitle,
  writeTitle
};
