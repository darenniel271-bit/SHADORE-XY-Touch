#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$DIR/android/gradlew" ]; then
  exec "$DIR/android/gradlew" -p "$DIR/android" "$@"
else
  echo "Gradle wrapper not found in android/gradlew"
  exit 1
fi
