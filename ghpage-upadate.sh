#!/bin/bash
echo "git checkout gh-pages"
git checkout gh-pages

echo "git merge main"
git merge main

echo "git push origin gh-pages"
git push origin gh-pages

echo "git checkout main"
git checkout main
