#!/bin/bash

OS=$(uname -s)
COMPILED_JS="main-compiled-compressed.js"
COMPILED_JS_PATH="js\/${COMPILED_JS}"

rm -rf ./build
mkdir -p build

cp -R ./source/* ./build

cd ./build/js/ 

if [[ "${OS}" == *Linux* ]]
then
    echo "Operative system: Linux"

    echo "Compiling js..."
    /usr/bin/r.js -o ./build_config.js
    RET=$?
    if [[ ${RET} != 0 ]]
    then
        exit ${RET}
    fi

    echo "Uglify2 main-compiled.js --> ${COMPILED_JS}"
    /usr/bin/uglifyjs main-compiled.js > ${COMPILED_JS}
    RET=$?
    if [[ ${RET} != 0 ]]
    then
        exit ${RET}
    fi

    # comment gzipping for now
    #echo "Gzipping file for faster servitude"
    #gzip -9 main-compiled-compressed.js
    #mv main-compiled-compressed.js.gz main-compiled-compressed.js

    echo "Replacing path to main.js"

    cd ..
    sed -i "s/data-main=\"js\/main.js\"/data-main=\"${COMPILED_JS_PATH}\"/g" ./index.html
elif [[ "${OS}" == *Darwin* ]]
then
    echo "Operative system: MacOSX"

    echo "Compiling js..."
    r.js -o ./build_config.js
    RET=$?
    if [[ ${RET} != 0 ]]
    then
        exit ${RET}
    fi

    echo "Uglify2 main-compiled.js --> ${COMPILED_JS}"
    uglifyjs main-compiled.js > ${COMPILED_JS}
    RET=$?
    if [[ ${RET} != 0 ]]
    then
        exit ${RET}
    fi

    # comment gzipping for now
    #echo "Gzipping file for faster servitude"
    #gzip -9 main-compiled-compressed.js
    #mv main-compiled-compressed.js.gz main-compiled-compressed.js

    echo "Replacing path to main.js"

    cd ..
    sed -i '' "s/data-main=\"js\/main.js\"/data-main=\"${COMPILED_JS_PATH}\"/g" ./index.html
fi

exit 0