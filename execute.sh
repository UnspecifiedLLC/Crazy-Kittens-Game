docker-compose -f kittens-compose.yml up&
source test.sh
echo "done"
open -na "Google Chrome" --args --incognito http://127.0.0.1:8080/test &>/dev/null
google-chrome --incognito http://127.0.0.1:8080/test &>/dev/null
open -na "Google Chrome" --args --incognito http://127.0.0.1:8080/target/site/surefire-report.html &>/dev/null
google-chrome --incognito http://127.0.0.1:8080/target/site/surefire-report.html &>/dev/null
http-server .
docker-compose -f kittens-compose.yml down