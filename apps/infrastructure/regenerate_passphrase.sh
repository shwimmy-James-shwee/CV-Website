read -p "Enter stack name (default: dev): " Stack
Stack=${Stack:-dev}
ProjectDir=$(pwd)

read -sp "Enter new passphrase: " Pass
echo ''

rm -rf ~/.pulumi/stacks/infra-iac/
rm -rf ./rename_temp
mkdir ./rename_temp
cp ./Pulumi.yaml ./rename_temp/Pulumi.yaml
cd ./rename_temp

pulumi login --local
echo -n $Pass > temp_passphrase
export PULUMI_CONFIG_PASSPHRASE_FILE=./temp_passphrase
pulumi stack init $Stack

echo ''
echo '--------------------------------------------------------'
sed -i "1c$(head -n 1 Pulumi.$Stack.yaml)" $ProjectDir/Pulumi.$Stack.yaml
echo This line has been updated to your project Pulumi.$Stack.yaml && head -n 1 Pulumi.$Stack.yaml

echo ''
echo '--------------------------------------------------------'
echo Also, Remember to update PULUMI_CONFIG_PASSPHRASE on github to \"$Pass\" 
echo ''

cd $ProjectDir
rm -rf ~/.pulumi/stacks/infra-iac/
rm -rf ./rename_temp