FROM alpine:latest
LABEL authors="Opportunity DevOps Team"

# Create new user and group
RUN addgroup -S botman && adduser -S botman -G botman

# Install python3, nodejs and Firefox
RUN apk add --update nodejs npm python3 py3-pip firefox

# Create application directory
RUN mkdir -p /home/botman

# Change to application directory, copy files and set botman user as their owner
WORKDIR /home/botman
COPY --chown=botman:botman . .

# Move geckodriver directory
RUN mv geckodriver /usr/local/bin

# Install python3 and nodejs dependencies
RUN python3 -m pip install bs4 selenium && npm install

# Exposes botman tcp port
EXPOSE 3000

# Change to botman user space
USER botman

# Start botman
CMD ["node", "index.js"]
