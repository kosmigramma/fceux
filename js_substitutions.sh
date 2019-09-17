#!/bin/bash

sed -i "s/SDL.audioContext\['destination'\]/window.SDL.destination/g" bin/fceux.js
sed -i "s/'fceux.wasm'/window.neswasm/g" bin/fceux.js
