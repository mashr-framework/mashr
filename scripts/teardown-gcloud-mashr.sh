#-----------------------------------------------------------------------------#
# How to uninstall `gcloud`:
# https://cloud.google.com/sdk/docs/uninstall-cloud-sdk
#-----------------------------------------------------------------------------#
gcloud_install_dir=$(gcloud info --format='value(installation.sdk_root)')
gcloud_config_dir=$(gcloud info --format='value(config.paths.global_config_dir)')

echo "deleting: $gcloud_install_dir";
sudo rm -rf $gcloud_install_dir || del $gcloud_install_dir;

echo "deleting: $gcloud_config_dir";
sudo rm -rf $gcloud_config_dir || del $gcloud_config_dir;

# add the line below because of errors on ubuntu during install
# sudo rm /etc/apt/sources.list.d/google-cloud-sdk*
# sudo rm /home/bitnami/google-cloud-sdk

#-----------------------------------------------------------------------------#
# How to install `gcloud` for debian
# doesn't seem to work on Mat's amazon ubuntu 16.04 machine
# https://cloud.google.com/sdk/docs/downloads-apt-get
#-----------------------------------------------------------------------------#
# echo 'installing gcloud for Debian/Ubuntu'
# export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)"
# echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
# curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
# sudo apt-get update && sudo apt-get install google-cloud-sdk

#-----------------------------------------------------------------------------#
# How to install `gcloud` for mac
# don't add to PATH after the first time installing
# https://cloud.google.com/sdk/docs/downloads-interactive#mac
#-----------------------------------------------------------------------------#
echo ""
echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
echo "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv"
echo ""
echo "DON'T MODIFY PROFILE TO UPDATE YOUR PATH AFTER THE FIRST TIME INSTALLING"
echo ""
echo "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"
echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
echo ""

curl https://sdk.cloud.google.com | bash
echo 'Restarting your shell:'
source ~/.bashrc
echo "------------------------------------------------------------------------"

#-----------------------------------------------------------------------------#
echo ""
echo 'gcloud init (you may need to create a project to use first):'
echo ""
gcloud init
