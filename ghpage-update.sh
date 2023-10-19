#!/bin/bash
echo $'\n\n==>git checkout gh-pages'
git checkout gh-pages

echo $'\n\n==>git merge main/
git merge main

echo $'\n\n==>git push origin gh-pages'
git push origin gh-pages

echo $'\n\n==>git checkout main'
git checkout main
