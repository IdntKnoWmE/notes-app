# Multi Stage build

# === Stage 1 Build the React Application ===
# Base node image for application, here AS (alias) is used for using this build stage later
FROM node:lts-alpine AS build

# It will create a work directory for our apploication called app and will move the main pointer
#to that folder using cd /app
WORKDIR /app

# Copy lock files to install exact production versions
COPY package*.json ./

# npm ci (clean install) is same as npm install only diff is that it strictly follows package-lock.json
RUN npm ci

#Copy all files from our application to /app folder (the dockerfile should be in the root directory for it)
COPY . .

# Now build will compile your app to check your everything installed mention in package.json and then build the whole
# to make it usable by compressing, translating and removing unncecessay files or code from packages.
RUN npm run build


# === Stage 2 Build the Nginx (used as direct web server hosting the static files (html, css, JS and images)) ===
FROM nginx:alpine

# Copy the static files from above 'build' stage container to this stage container
# Here, copy is donf from /app/dist as after vite build everything it drops all the production ready assets into /app/dist folder.
# here, html is the folder in /usr/share/nginx/ which is used by nginx container to serve static files
COPY --from=build /app/dist /usr/share/nginx/html

# Now Expose 80 ports on nginx container to listen the web traffic
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# Here this above command signify:
# 1) nginx -> Execute the nginx execution file to launch ngnx web server
# 2) -g -> global directive flag that tells Ngins that the setting after this flag will apply globally in the server.
# 3) daemon off; -> The main setting, on normal setup daemon is ON which makes Nginx to run in background freeing
#   up the terminal screen but in docker the primary process is that we run using CMD command and if it is running in
#    background then docker will think that process is down as it is not blocking the docker kill process so, that's
#    why daemon is turned off.















