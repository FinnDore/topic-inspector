[![CODESTYLE](.github\badges\code-style-prettier.svg)](https://prettier.io/)
[![LICENCE](.github\badges\licence-mit.svg)](https://github.com/FinnDore/topic-inspector/blob/main/LICENSE)
[![STATUS](.github\badges\status-pre-alpha.svg)](https://github.com/FinnDore/topic-inspector)
[![SUPPORTS](.github\badges\supports-win-_-linux-_-mac.svg)](https://github.com/FinnDore/topic-inspector)

# TopicInspector

A lightweight tool for inspecting topic sizes for all your Kafka brokers.

### Upcoming features:

-   Timeline view. See the size of your topics over time
-   Topic grouping. Group topics with similar names together. Useful when using frameworks like spring that partition your topics automatically.
-   Automatic data gathering. Let Topic Inspector run kafka-log-dirs to automatically update the chart in real-time as well as gather historic data to be viewed later.
-   Persistent storage of app settings.
-   Hosted version.
