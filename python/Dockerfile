FROM mitmproxy/mitmproxy

# Copy local code to the container image.
ENV APP_HOME /srv/python
WORKDIR $APP_HOME

# Copy local code to the container image.
COPY . .

# Run the service on container startup.
EXPOSE 8080
CMD ["mitmdump", "-s", "proxy.py", "-q"]