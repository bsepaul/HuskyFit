# UConnFit

Below are instructions on how to access, modify and test the application - for developers of UConnFit

# Git

## Clone the repository

    git clone https://github.com/bsepaul/UConnFit.git
    cd UConnFit

## Setting up Git branch

Naming convention: 3 initials and type of branch

    git branch <branch_name>
    git checkout <branch_name>
    git push --set-upstream origin <branch_name>
    git pull origin HEAD

### Example: Bridget's front-end branch

    git branch bms-front
    git checkout bms-front
    git push --set-upstream origin bms-front
    git pull origin HEAD

# Testing the app

## Install expo application from App Store on mobile device

Android Device - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

iOS device - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)

## To run the project

    cd UConnFitApp
    npm start

# Installations and initializations (macOS)

## React Native

Install node and watchman using homebrew

    brew install node
    brew install watchman

Ensure your device is running ruby 2.7.6

    ruby --version

Install [ruby manager](https://github.com/rbenv/rbenv) if your device is running an older version of ruby

     brew install ruby-build
     rbenv init                     # close current terminal window and open a new one for changes to take effect
     rbenv install -l               # to list latest stable versions of ruby
     rbenv install <version no>

     rbenv global <version>         # to use this version as the default for your machine
     rbenv local <version>          # to use this version as the default for this directory

- \*[note](https://github.com/rbenv/rbenv/issues/939): if the above commands don't change the ruby version that your system is running, check that your **~./bash_profile** or **~./zshrc** file includes the line **rbenv init\***

  - on macOS, you can check your configuration by checking that **which -a ruby** outputs **~/.rbenv/shims/ruby** then **/usr/bin/ruby**

Install ruby gem bundler

    gem install bundler

Install cocoapods

    gem install cocoapods       # may need to use sudo or brew if this fails
