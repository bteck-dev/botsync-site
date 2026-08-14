#!/usr/bin/env bash
set -Eeuo pipefail

app_root=${1:?Application root is required}
release_id=${2:?Release ID is required}
health_url=${3:?Health-check URL is required}

case "$app_root" in
  /home/*/*) ;;
  *) echo "Refusing unsafe application root: $app_root" >&2; exit 1 ;;
esac

if [[ ! "$release_id" =~ ^[A-Za-z0-9._-]+$ ]]; then
  echo "Invalid release ID" >&2
  exit 1
fi

releases_dir="$app_root/releases"
incoming_dir="$app_root/incoming"
release_dir="$releases_dir/$release_id"
archive="$incoming_dir/$release_id.tgz"
current_link="$app_root/current"
next_link="$app_root/current.next"

mkdir -p "$releases_dir" "$incoming_dir" "$app_root/tmp"
test -f "$archive"
test ! -e "$release_dir"

mkdir "$release_dir"
tar -xzf "$archive" -C "$release_dir"
test -f "$release_dir/.output/server/index.mjs"
test -d "$release_dir/.output/public"

previous_target=""
if [[ -L "$current_link" ]]; then
  previous_target=$(readlink "$current_link")
fi

ln -s "$release_dir" "$next_link"
mv -Tf "$next_link" "$current_link"
touch "$app_root/tmp/restart.txt"

healthy=false
for _ in {1..12}; do
  deployed_release=$(
    curl --fail --silent --show-error --max-time 10 \
      "${health_url%/}/__release.txt" 2>/dev/null || true
  )
  if [[ "$deployed_release" == "$release_id" ]]; then
    healthy=true
    break
  fi
  sleep 5
done

if [[ "$healthy" != true ]]; then
  echo "Health check failed; rolling back." >&2
  if [[ -n "$previous_target" && -d "$previous_target" ]]; then
    ln -s "$previous_target" "$next_link"
    mv -Tf "$next_link" "$current_link"
  else
    rm -f "$current_link"
  fi
  touch "$app_root/tmp/restart.txt"
  rm -f "$archive"
  rm -rf "$release_dir"
  exit 1
fi

rm -f "$archive"
echo "Release $release_id is live."
