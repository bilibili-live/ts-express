#!/usr/bin/env bash

# ./build release 重新打包所有文件
# ./build clear   清理 `dist` 目录
# ./build         常规打包操作

src="src"
dist="dist"
isClear=$1

function clear() {
  rm -rf dist
}

function build() {
  if [ $1 == 1 ]; then
    rm -rf dist
    tsc
  fi
  if [ ! -d "dist" ]; then
    mkdir $dist
  fi
  cp -rf $src/public $dist
  cp -rf $src/type $dist
  cp -rf $src/views $dist
}

if [[ $isClear == 'clear' ]]; then
  clear
elif [[ $isClear == 'release' ]]; then
  build 1
else
  build 0
fi