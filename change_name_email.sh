git filter-branch --env-filter '

OLD_EMAIL="10907849+hn2t@user.noreply.gitee.com"
NEW_NAME="wangningsai"
NEW_EMAIL="wangningsai@126.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$NEW_NAME"
    export GIT_COMMITTER_EMAIL="$NEW_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$NEW_NAME"
    export GIT_AUTHOR_EMAIL="$NEW_EMAIL"
fi
' HEAD ^origin/${branch}
