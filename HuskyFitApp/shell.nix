let
  pkgs = import <nixpkgs> {};
in
  pkgs.mkShell rec {
    name = "webdev";

    buildInputs = with pkgs; [
      # nodePackages.serverless
      # glow
      nodejs-16_x
      # android-studio
      # android-tools
      # android-udev-rules
      # gradle
      nodePackages.expo-cli
      # awscli
      (yarn.override {nodejs = nodejs-16_x;})
      # (python39.withPackages (pp:
      #   with pp; [
      #     beautifulsoup4
      #     requests
      #   ]))
    ];
  }
# ln -s /nix/store/85g2scxv2d41n7vsp5vrqak5j6nkd9a6-android-tools-31.0.3p1/bin/adb /home/morp/Android/Sdk/platform-tools/adb
