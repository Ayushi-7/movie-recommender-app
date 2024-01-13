import fs from 'fs';

const read = () => {
  if (fs.existsSync('detail.json')) {
    const detail = fs.readFileSync('detail.json');
    return JSON.parse(detail);
  } else {
    return {};
  }
};

const write = (detail) => {
  fs.writeFileSync('detail.json', JSON.stringify(detail));
};

export default {
  read,
  write,
};
