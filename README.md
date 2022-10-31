# UConnFit

### Below are instructions on how to access, modify and test the application - for developers of UConnFit

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

# Install NPM

    brew install node
    node -v
    sudo npm i -g expo-cli

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

     brew install rbenv ruby-build
     rbenv init                     # close current terminal window and open a new one for changes to take effect
     rbenv install -l               # to list latest stable versions of ruby
     rbenv install <version no>

     rbenv global <version>         # to use this version as the default for your machine
     rbenv local <version>          # to use this version as the default for this directory

- \*[note](https://github.com/rbenv/rbenv/issues/939): if the above commands don't change the ruby version that your system is running, check that your **~./bash_profile** or **~./zshrc** file includes the line **rbenv init\***

  - on macOS, you can check your configuration by checking that **which -a ruby** outputs **~/.rbenv/shims/ruby** then **/usr/bin/ruby**

Install ruby gem bundler

    gem install bundler         # may need to use sudo or brew if this fails

Install cocoapods

    gem install cocoapods       # may need to use sudo or brew if this fails

# IOS Simulator

### 1. Mac: Install Xcode from the app store - [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

### 2. Open simulator

'Xcode' -> 'Open Developer Tool' -> 'Simulator'

### 3. Change type of device

'File' -> 'Open Simulator' -> Choose whichever device you want

### 4. Type 'i' into terminal

Make sure you are in 'UConnFitApp' folder and have run:

    npm start

# Android Simulator

[Follow instructions here](https://docs.expo.dev/workflow/android-studio-emulator/)

### 1. Download Android Studio - [Android Studio](https://developer.android.com/studio)

Choose 'Next' -> 'Standard' -> 'Next' -> 'Next' -> Accept all agreements -> 'Finish'

### 2. Configure

Choose 'More Actions' -> 'SDK Manager'

Under 'SDK Tools' select:

- Android SDK Build-Tools
- Android Emulator
- Android SDK Platform-Tools
- Intel x86 Emulator Accelerator

### 3. macOS or Linux - add environment variables

Add environment variables to either .zshenv or .bash_profile depending on which shell you're using

    [ -d "$HOME/Library/Android/sdk" ] && ANDROID_HOME=$HOME/Library/Android/sdk || ANDROID_HOME=$HOME/Android/Sdk
    echo "export ANDROID_HOME=$ANDROID_HOME" >> ~/`[[ $SHELL == *"zsh" ]] && echo '.zshenv' || echo '.bash_profile'`

macOS only - add platform tools path

    echo "export PATH=$ANDROID_HOME/platform-tools:\$PATH" >> ~/`[[ $SHELL == *"zsh" ]] && echo '.zshenv' || echo '.bash_profile'`

Reload environment variables

    source ~/`[[ $SHELL == *"zsh" ]] && echo '.zshenv' || echo '.bash_profile'`

### 4. Set up the simulator

In Android Studio:

Choose 'More Actions' -> 'Virtual Device Manager' -> 'Create Device'

Click the play button to open the device simulator

### 5. Run application on simulated device

Back in terminal, in the UConnFit/UConnFitApp directory

    npm start

Type 'a' to start android simulation

    a

# Install Dependencies

    npm install @react-navigation/native
    npm install @react-navigation/bottom-tabs

# Publishing

### App can be accessed at expo.io/@username/app

    expo publish
