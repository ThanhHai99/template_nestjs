start cmd /k "npm run format && exit"
pause
git fetch --all
git pull --all
git add .
git commit -m "%date% %time%"
@SET BRANCH=
FOR /F %%I IN ('git branch --show-current') DO @SET "BRANCH=%%I"
git push origin %BRANCH%
