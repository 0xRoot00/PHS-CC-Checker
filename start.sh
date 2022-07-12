clear
figlet PHS CC Checker
read -p "Enter SK: " sk
echo "API_KEY=${sk}" > checker/.env
clear
figlet PHS CC Checker
cd checker && yarn start