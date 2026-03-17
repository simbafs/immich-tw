FROM ghcr.io/immich-app/immich-server:release

COPY script.js /usr/src/app/script.js
RUN node /usr/src/app/script.js
