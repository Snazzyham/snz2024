#!/usr/bin/env fish
# Create a draft post in src/content/writing and open it in Apostrophe.
# Usage: pnpm run newpost [title words...]

set -l root (path resolve (status dirname)/..)
set -l title (string join ' ' $argv)
if test -z "$title"
    read -P 'Post title: ' title
end
if test -z "$title"
    echo 'No title given, aborting.' >&2
    exit 1
end

set -l slug (string lower -- $title | string replace -ra '[^a-z0-9]+' '-' | string trim -c '-')
set -l file $root/src/content/writing/$slug.md
if test -e $file
    echo "Already exists: $file" >&2
    exit 1
end

set -l escaped (string replace -a '"' '\\"' -- $title)
printf '---\ntitle: "%s"\ndate: "%s"\ndraft: true\n---\n\n' $escaped (date +%F) >$file
echo "Created $file"

flatpak run org.gnome.gitlab.somas.Apostrophe $file >/dev/null 2>&1 &
disown
