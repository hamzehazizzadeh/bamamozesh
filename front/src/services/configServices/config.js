const origin = {
  production: "https://api.bamamozesh.ir",
  development: "http://localhost:4000",
};

export const hostname = origin[process.env.NODE_ENV];

export const base_url = `${hostname}`;
