/** @type {import('next').NextConfig} */


const isProd = process.env.NODE_ENV === "production"
const node_env = process.env.STATE
const prodPath = node_env === 'production'? '/ordertrackerbeta' : node_env === 'staging' ? '/Xcelerator/OrderTracker': '';
const nextConfig = {
  reactStrictMode: true,
  basePath: prodPath,
  env: {
    iisPath: prodPath,
    REACT_APP_GOOGLE_MAPS_API_KEY:'AIzaSyBFbOeEx0KCTfOZP9z6Hw_jLyesmN3yl4E', 
    baseURL: (isProd && node_env) === 'production' ? "apps.cdldelivers.com/trackingpage/api" : (isProd && node_env) === "staging" ? "test.cdldelivers.com/Xcelerator/CDLTracker/api" : "localhost/Xcelerator/CDLTracker/api" 
  },
}

module.exports = nextConfig
